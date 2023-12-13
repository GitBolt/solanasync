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

const JoinQuizPage = () => {
  const [name, setName] = useState('');
  const [quizRoom, setQuizRoom] = useState('');
  const toast = useCustomToast()
  const wallet = useAnchorWallet()
  const { publicKey } = useWallet()
  const [startFetch, setStartFetch] = useState<boolean>(false)

  const [quizDetails, setQuizDetails] = useState<any>({})

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
      setStartFetch(true)
    } else {
      return toast({
        type:"error",
        message:"No quiz with the ID found"
      })
    }

  };



  useEffect(() => {
    let intervalId: any;
    if (startFetch) {
      const fetchFunc = async () => {
        const res = await getQuizByCode(wallet as NodeWallet, Number(quizRoom))
        if (res.account.isStarted) {
          setStartFetch(false)
        }
      };

      intervalId = setInterval(fetchFunc, 1000); // Fetch every 1 second
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startFetch]);


  return (
    <>
      <Navbar />
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
              <FormLabel color="#C0C6F4" fontSize="lg">Quiz Room Name</FormLabel>
              <Input
                fontSize="1.2rem"
                borderColor="#1D1E27"
                color="white"
                value={quizRoom}
                onChange={(e) => setQuizRoom(e.target.value)}
                size="lg"
              />
            </FormControl>

            {quizDetails && quizDetails.account && quizDetails.account.isStarted == false ? <Text>Quiz is yet to start...</Text> : <Button
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
      </Flex>
    </>
  );
};

export default JoinQuizPage;
