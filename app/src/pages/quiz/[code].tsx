import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Input, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useCustomToast } from '@/hooks/toast';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { Navbar } from '@/components/Navbar';
import { getQuizByCode } from '@/util/program/getQuizByCode';
import { startQuiz } from '@/util/program/startQuiz';
import { closeQuiz } from '@/util/program/closeQuiz';
import Leaderboard from '@/components/Leaderboard';

const QuizJoinPage = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [quizDetails, setQuizDetails] = useState<any>(null);
  const router = useRouter();
  const { publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const toast = useCustomToast();
  const [started, setStarted] = useState<boolean>(false)
  const [stopped, setStopped] = useState<boolean>(false)

  useEffect(() => {
    if (!router.query.code) return;
    const fetchData = async () => {
      if (!publicKey) {
        return toast({
          type: "error",
          message: "Kindly connect your wallet"
        });
      }
      const res = await getQuizByCode(wallet as NodeWallet, Number(router.query.code));
      if (!res || !res.account || res.error) return
      if (res.account.owner.toBase58() === publicKey?.toBase58()) {
        setHasPermission(true);
        setQuizDetails(res);
        if (res.account.isDone) {
          setStopped(true)
          setStarted(true)
        }
      }
    };

    fetchData();
  }, [publicKey, wallet, router.query]);

  if (!hasPermission) {
    return (
      <>
        <Navbar />
        <VStack spacing={8} align="stretch" p={12} bg="#0E0E10">
          <Text as="h1" fontWeight="bold" fontSize="4xl" color="white" align="center">
            You don't have permission to manage the quiz
          </Text>
        </VStack>
      </>
    );
  }

  const handleStop = async () => {
    const res = await closeQuiz(wallet as NodeWallet, Number(router.query.code))
    if (!res.error) {
      toast({
        type: "success",
        message: "Quiz stopped"
      })
      setStopped(true)
    }
  }

  const handleStart = async () => {
    if (!router.query.code) {
      return toast({
        type: "error",
        message: "Code not found"
      })
    }
    const res = await startQuiz(wallet as NodeWallet, Number(router.query.code))
    if (!res.error) {
      toast({
        type: "success",
        message: "Quiz started"
      })
      setStarted(true)
    }
  };

  return (
    <>
      <Navbar />
      {started ? <>
        {!stopped ? <Box>
          <Text>Quiz Started!</Text>
          <Button onClick={handleStop}>Stop Quiz</Button>
        </Box> :
          <Leaderboard quizCode={Number(router.query.code)}/>}
      </> : <VStack spacing={8} align="center" justify="center" w="full" pt={12} pb={12}>
        <Box w="40rem" bg="#13131A" borderRadius="lg" p={8} boxShadow="xl">
          <VStack spacing={6}>
            <Text fontSize="2.8rem" color="white" fontWeight="bold">Head over to</Text>
            <Input padding="2rem 1rem" fontSize="3rem" _hover={{ bg: "transparent" }} value="solanasync.com/join" isReadOnly variant="filled" size="lg" bg="gray.800" color="white" />
            <Text fontSize="2.8rem" color="white" fontWeight="bold">And enter code</Text>
            <Input padding="2rem 1rem" fontSize="3rem" _hover={{ bg: "transparent" }} value={router.query.code} isReadOnly variant="filled" size="lg" bg="gray.800" color="white" />
            <Button fontSize="2rem" padding="2rem 2rem" onClick={handleStart} colorScheme="blue" >Start Quiz</Button>
          </VStack>
        </Box>
      </VStack>}
    </>
  );
};

export default QuizJoinPage;
