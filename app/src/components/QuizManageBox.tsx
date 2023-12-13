import { getQuiz } from "@/util/program/getQuiz"
import { Box, Button, Flex, Icon, LinkBox, Text } from "@chakra-ui/react"
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"


type Props = {
  publicKey: string
}
export const QuizManageBox = ({ publicKey }: Props) => {

  const [questionCount, setQuestionCount] = useState<number>()
  const [date, setDate] = useState<Date>()
  const wallet = useAnchorWallet()

  useEffect(() => {
    const fetchData = async () => {

      const res = await getQuiz(wallet as NodeWallet, publicKey)
      console.log(res)
    }

    fetchData()
  }, [])
  return (
    <Box
      w="100%"
      p={4}
      mb={4}
      minW="25rem"
      height="10rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
      bg="#13131A"
      flexFlow="column"
      boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
      borderRadius="1rem"
      border="1px solid #191A2B"
    >
      <Text>Quiz</Text>

      {/* <Text color="#798393" fontSize="2rem">{questions} Questions</Text> */}

      <Flex w="100%" justify="space-between">
        {/* <Text>{date.toDateString()}</Text> */}
        <Button colorScheme="twitter">Start Quiz</Button>
      </Flex>
    </Box>
  )
}

