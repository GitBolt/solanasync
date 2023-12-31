import { getQuiz } from "@/util/program/getQuiz"
import { startQuiz } from "@/util/program/startQuiz"
import { Box, Button, Flex, Icon, LinkBox, Text } from "@chakra-ui/react"
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"

type Props = {
  publicKey: string
}
export const QuizManageBox = ({ publicKey }: Props) => {

  const [questionCount, setQuestionCount] = useState<number>()
  const [date, setDate] = useState<Date>()
  const [id, setId] = useState<number>()
  const wallet = useAnchorWallet()
  const router = useRouter()

  const manageStart = async () => {
    router.push("/quiz/" + id)

  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuiz(wallet as NodeWallet, publicKey)
      setQuestionCount(res.questionCount);
      console.log("DATE: ", res.date)
      setDate(new Date(res.date));
      setId(res.code)
    }

    fetchData()
  }, [publicKey])

  return (
    <Box
      w="100%"
      p="1rem 2rem"
      minW="20rem"
      bg="#13131A"
      height="8rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="1rem"
      border="1px solid #191A2B"
    >
      <Text fontSize="2rem" alignSelf="flex-start" fontWeight={700} color="white">Quiz</Text>
      <Flex w="100%" justify="space-between">
        <Text fontSize="1.8rem" alignSelf="center" color="#798393">
          {questionCount} Questions
        </Text>
        <Button isDisabled={!id} onClick={manageStart} height="3rem" fontSize="1.2rem" color="#9A91FF" variant="outline" borderColor="#9A91FF" _hover={{ bg: "#9A91FF", color: "white" }} alignSelf="flex-end">
          Manage Quiz
        </Button>
      </Flex>
    </Box>
  )
}
