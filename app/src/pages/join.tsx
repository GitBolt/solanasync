import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text
} from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/toast';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { Navbar } from '@/components/Navbar';
import { getQuizByCode } from '@/util/program/getQuizByCode';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { createQuizUserAccount } from '@/util/program/createQuizUser';
import QuizGame from '@/components/QuizGame';
import { getQuizUser } from '@/util/program/getQuizUser';

const JoinQuizPage = () => {
  const [name, setName] = useState('');
  const [quizRoom, setQuizRoom] = useState('');
  const [quizUser, setQuizUser] = useState<any>();
  const toast = useCustomToast()
  const { publicKey } = useWallet()
  const [start, setStart] = useState<boolean>(false)
  const [quizDetails, setQuizDetails] = useState<any>()
  const wallet = useAnchorWallet()
  const [done, setDone] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleJoinClick = async () => {

    if (!publicKey) {
      return toast({
        type: "error",
        message: "First connect your wallet!"
      })
    }
    if (!name || !quizRoom) {
      toast({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }
    setLoading(true)
    const res = await getQuizByCode(wallet as NodeWallet, Number(quizRoom))
    if (!res.error) {
      if (res.account.isDone) {
        setLoading(false)
        return toast({
          type: "error",
          message: "Quiz is over"
        })
      }
      const quizUserResBe = await getQuizUser(wallet as NodeWallet, Number(quizRoom), publicKey.toBase58())
      if (quizUserResBe.details) {
        setQuizUser({ user: '' })
        return toast({
          type: "success",
          message: "Quiz User Exists. Waiting for Quiz to start..."
        })
      }
      const quizUserRes = await createQuizUserAccount(wallet as NodeWallet, Number(quizRoom), name)
      if (!quizUserRes.error) {
        setQuizUser({ user: '' })
        return toast({
          type: "success",
          message: "Created Quiz Account. Waiting for Quiz to start..."
        })
      }
      setLoading(false)

    } else {
      setLoading(false)
      return toast({
        type: "error",
        message: "No quiz with the ID found"
      })
    }

  };



  useEffect(() => {
    const fetchFunc = async () => {
      console.log(quizRoom, quizUser, wallet)
      if (!quizRoom || !quizUser) return
      if (!wallet) {
        return toast({
          type: "error",
          message: "Connect wallet please"
        })
      }

      const quizUserRes = await getQuizUser(wallet as NodeWallet, Number(quizRoom), wallet.publicKey.toBase58())
      console.log("QUIZ USER RES: ", quizUserRes)
      if (!quizUserRes.error) {
        setQuizUser(quizUserRes.details)
      } else {
        return
      }
      const res = await getQuizByCode(wallet as NodeWallet, Number(quizRoom))
      console.log("RES: ", res)
      setQuizDetails(res)

      if (res.account.isStarted) {
        setStart(true)
      }

      if (res.account.isDone) {
        setDone(true)
      }
    };

    let intervalId = setInterval(fetchFunc, 3000);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [quizRoom, wallet, quizUser]);


  return (
    <>
      <Navbar />
      {start ? (
        <QuizGame details={quizDetails.details} done={done} quizCode={Number(quizRoom)} />
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minHeight="80vh"
          bg="#0E0E10"
          borderColor="gray.700"
        >
          <Box
            p={10}
            width="40rem"
            borderWidth={1}
            borderRadius={12}
            boxShadow="lg"
            bg="#13131A"
            borderColor="gray.700"
          >
            <VStack spacing={6}>
              <Heading as="h2" size="2xl" color="#C0C6F4" textAlign="center">
                Join Quiz
              </Heading>


              <FormControl id="name" isRequired>
                <FormLabel color="#C0C6F4" fontSize="lg">Name</FormLabel>
                <Input
                  borderColor="#1D1E27"
                  color="white"
                  fontSize="1.2rem"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                />
              </FormControl>

              <FormControl id="quiz-room" isRequired>
                <FormLabel color="#C0C6F4" fontSize="lg">Quiz ID</FormLabel>
                <Input
                  fontSize="1.2rem"
                  borderColor="#1D1E27"
                  color="white"
                  value={quizRoom}
                  onChange={(e) => setQuizRoom(e.target.value)}
                  size="lg"
                />
              </FormControl>

              {quizUser ? (
                <Text color="white" fontSize="2rem">
                  You've joined the quiz, waiting for it to start...
                </Text>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={handleJoinClick}
                  color="white"
                  bg="#5F54D8"
                  isLoading={loading}
                  width="50%"
                  _hover={{ background: "#9A91FF" }}
                  size="lg"
                  fontSize="lg"
                >
                  Join
                </Button>
              )}
            </VStack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default JoinQuizPage;
