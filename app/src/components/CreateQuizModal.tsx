import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  useDisclosure,
  VStack,
  HStack,
  IconButton,
  Icon,
  Text,
  useToast,
  Box,
  Link,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaCheck, FaLink, FaQuestionCircle, FaSave } from 'react-icons/fa';
import { uploadJson } from '@/util/storage';
import { useCustomToast } from '@/hooks/toast';
import { createQuizAccount } from '@/util/program/createQuizAccount';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useRouter } from 'next/router';

type Question = {
  question: string;
  options: string[];
  correctOptionIndex: number | null;
};


type Props = {
  setUpdateState: any
}
const CreateQuizModal = ({ setUpdateState }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useCustomToast()

  const wallet = useAnchorWallet()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
  ]);

  const router = useRouter()

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOptionIndex: null }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, qIndex) => qIndex !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const markAsCorrect = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOptionIndex = oIndex;
    setQuestions(newQuestions);
  };


  const saveQuiz = async () => {

    if (questions.length == 0 || questions[0].question == '') {
      return toast({
        type: "error",
        message: "Quiz Cant't Be Empty"
      })
    }
    setLoading(true)
    const res = await uploadJson(JSON.stringify(questions))
    if (res) {
      toast({ type: "success", message: "Link Uploaded", linkTitle: "See On-Chain Quiz Details", link: res })
      const quizRes = await createQuizAccount(
        wallet as NodeWallet,
        res,
        router.query.id as string
      )
      if (!quizRes.error) {
        const res = await fetch("/api/createQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            workshopId: router.query.id,
            quizAddress: quizRes.quizAccount
          })
        })
        if (res.ok) {
          toast({ type: "success", message: "Quiz Created On-chain", linkTitle: "Transaction", link: "https://solscan.io/tx/" + quizRes.sig })
        }
        setUpdateState(+new Date())
        onClose()
      }
      console.log(quizRes)
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        rounded="2rem"
        bg="#5F54D8"
        w="20rem"
        h="5rem"
        fontSize="2rem"
        leftIcon={<Icon as={FaQuestionCircle} />}
        colorScheme="voilet">
        Create Quiz
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg="#13131A" color="white" borderRadius="1rem">
          <ModalHeader>Create your workshop Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={8} padding="1rem 0">
              {questions.map((q, qIndex) => (
                <VStack key={qIndex} spacing={2} w="100%" align="start">
                  <HStack w="100%" justify="space-between">
                    <Text color="#838DE9" textAlign="start" fontSize="1.3rem" fontWeight={700} mb={1}>Question {qIndex + 1}</Text>
                    <IconButton
                      bg="red"
                      aria-label="Remove question"
                      color="white"
                      size="sm"
                      _hover={{ bg: "red" }}
                      icon={<DeleteIcon width="1.3rem" height="1.3rem" />}
                      onClick={() => removeQuestion(qIndex)}
                    />
                  </HStack>
                  <Input
                    bg="#13131A"
                    borderColor="#34394D"
                    placeholder='Enter your question'
                    fontSize="1.2rem"
                    color="white"
                    value={q.question}
                    onChange={(e) => updateQuestion(qIndex, e.target.value)}
                  />
                  {q.options.map((option, oIndex) => (
                    <HStack key={oIndex} spacing={2}>
                      <Text fontSize="1rem" color="#A0A3C1" w="25%">Option {oIndex + 1}</Text>
                      <Input
                        bg="#13131A"
                        borderColor="#34394D"
                        placeholder='Enter your option'
                        fontSize="1.2rem"
                        value={option}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        color="white"
                      />
                      <IconButton
                        aria-label="Mark as correct"
                        icon={<CheckIcon />}
                        bg={q.correctOptionIndex === oIndex ? 'green.500' : '#1E2B23'}
                        _hover={{ bg: "transparent" }}
                        onClick={() => markAsCorrect(qIndex, oIndex)}
                      />
                    </HStack>
                  ))}
                </VStack>
              ))}
              <Button _hover={{ bg: "#5F54D8" }} leftIcon={<AddIcon />} bg="#5F54D8" onClick={addQuestion}>
                Add Question
              </Button>
              <Button
                isDisabled={loading}
                _hover={{ bg: "green" }} alignSelf="center" w="30%" fontSize="1.2rem" height="3rem" rightIcon={<FaSave />} bg="#318151" onClick={saveQuiz}>
                Save Quiz
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQuizModal;
