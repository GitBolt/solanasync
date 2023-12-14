import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, Center, Heading, Badge, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { answerQuiz } from '@/util/program/answerQuiz';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

interface Question {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

type Props = {
  details: Question[];
  quizCode: number,
  done: boolean
};


const QuizGame = ({ details, quizCode, done }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [points, setPoints] = useState<number[]>([]);
  const [resultsShown, setResultsShown] = useState(false);
  const wallet = useAnchorWallet()

  useEffect(() => {
    setStartTime(new Date());
    const interval = setInterval(() => {
      setTimer(oldTimer => oldTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const calculatePoints = (timeTaken: number, isCorrect: boolean): number => {
    const lessTimeMorePoints = Math.max(0, 15 - timeTaken);
    return isCorrect ? 1 * lessTimeMorePoints : 0;
  };

  const goToNextQuestion = async () => {
    if (selectedOption === null) return;

    const endTime = new Date();
    const timeTaken = Math.max(0, (endTime.getTime() - (startTime?.getTime() || 0)) / 1000 - 1);
    const isCorrect = selectedOption === details[currentQuestionIndex].correctOptionIndex;

    setPoints([...points, calculatePoints(timeTaken, isCorrect)]);
    setTimer(0);

    if (currentQuestionIndex < details.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      const res = await answerQuiz(wallet as NodeWallet, quizCode, points)
      if (!res.error) {
        setResultsShown(true);
      }
    }
  };

  return (
    <Center>
      <Box borderColor="gray.700" p={4} borderRadius="1rem" w="full" maxW="60%" borderWidth="1px">
        {!resultsShown && !done ? (
          <>
            <Heading textAlign="center" mb={6} color="white">Q: {details[currentQuestionIndex].question}</Heading>
            <Text textAlign="center" mb={3} color="gray.400">Time Elapsed: {timer} seconds</Text>
            <VStack>
              {details[currentQuestionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  size="lg"
                  fontSize="1.8rem"
                  padding="3rem 2rem"
                  w="100%"
                  bg={index == selectedOption ? "#5F54D8" : "gray.800"}
                  color="white"
                  _hover={{ bg: "#5F54D8" }}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </Button>
              ))}
              <Button
                mt={6}
                onClick={goToNextQuestion}
                isDisabled={selectedOption === null}
                color="white"
                bg="#5F54D8"
                fontSize="2rem"
                padding="2rem 4rem"
              >
                {currentQuestionIndex < details.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </VStack>

          </>
        ) : (
          <VStack spacing={4} alignItems="center">
            <Heading mb={6} color="white">Quiz Results</Heading>
            {details.map((question, index) => (
              <Box key={index} w="full" p={4} borderWidth="1px" borderRadius="md" borderColor="gray.700" bg="gray.900">
                <Text fontSize="1.7rem" fontWeight="bold" color="white">{index + 1}. {question.question}</Text>
                <Badge mt="1rem" fontSize="1rem" colorScheme={points[index] > 0 ? 'green' : 'red'} mr={2}>
                  {points[index] > 0 ? 'Correct' : 'Incorrect'}
                </Badge>
                <Text mt="1rem" color="#5F54D8" fontSize="1.2rem" fontWeight={600}>Your Answer: {question.options[question.correctOptionIndex]}</Text>
                <Text fontSize="1.4rem" color="green.200">Correct Answer: {question.options[question.correctOptionIndex]}</Text>
              </Box>
            ))}
            <Text fontSize="xl" mt={4} color="white">
              Total Points: {Math.round(points.reduce((acc, point) => acc + point, 0))}
            </Text>
          </VStack>
        )}
      </Box>
    </Center>
  );
};

export default QuizGame;
