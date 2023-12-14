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
  useToast,
  Text
} from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/toast';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { Navbar } from '@/components/Navbar';
import { getQuizByCode } from '@/util/program/getQuizByCode';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { createQuizAccount } from '@/util/program/createQuizAccount';
import { createQuizUserAccount } from '@/util/program/createQuizUser';
import QuizGame from '@/components/QuizGame';

const JoinQuizPage = () => {
  const [name, setName] = useState('');
  const [quizRoom, setQuizRoom] = useState('');
  const toast = useCustomToast()
  const { publicKey } = useWallet()
  const [start, setStart] = useState<boolean>(false)
  const [quizDetails, setQuizDetails] = useState<any>()
  const wallet = useAnchorWallet()
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
    const res = await getQuizByCode(wallet as NodeWallet, Number(quizRoom))
    if (!res.error) {
      const quizUserRes = await createQuizUserAccount(wallet as NodeWallet, Number(quizRoom))
      if (!quizUserRes.error) {
        return toast({
          type: "success",
          message: "Created Quiz Account. Waiting for Quiz to start..."
        })
      }
    } else {
      return toast({
        type: "error",
        message: "No quiz with the ID found"
      })
    }

  };



  useEffect(() => {
    const fetchFunc = async () => {
      if (!quizRoom) return
      const res = await getQuizByCode(wallet as NodeWallet, Number(quizRoom))
      setQuizDetails(res)

      if (res.account.isStarted) {
        setStart(true)
      }
    };

    let intervalId = setInterval(fetchFunc, 5000);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [quizRoom, wallet]);


  return (
    <>
      <Navbar />
      {start ? <>
      <QuizGame details={quizDetails.details}/>
      </> : <Flex
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

            {quizDetails ? <Text color="white" fontSize="2rem">Quiz is yet to start...</Text> : <Button
              colorScheme="blue"
              onClick={handleJoinClick}
              color="white"
              bg="#5F54D8"
              width="50%"
              _hover={{ background: "#9A91FF" }}
              size="lg"
              fontSize="lg"
            >
              Join
            </Button>}
          </VStack>
        </Box>
      </Flex>}
    </>
  );
};

export default JoinQuizPage;
