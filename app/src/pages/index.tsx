import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { FiMonitor, FiBookOpen, FiActivity, FiCamera, FiPaperclip, FiList } from 'react-icons/fi';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import { DefaultHead } from '@/components/DefaultHead';

const WorkshopLandingPage = () => {
  const [workshopsExist, setWorkshopsExist] = useState<boolean>(false)
  const { publicKey } = useWallet()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setWorkshopsExist(false)
      if (publicKey) {
        const workshops = await fetch("/workshops/" + publicKey)
        const res = await workshops.json()
        if (res || res.length) {
          setWorkshopsExist(true)
        } else {
          setWorkshopsExist(false)
        }
      }
      fetchData()
    }
  }, [publicKey])

  return (
    <>
      <DefaultHead />
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={12}
        bg="#0E0E10"
      >
        <VStack textAlign="center">
          <Heading as="h1" fontWeight="100" fontSize="5.3rem" maxW="80%" color="white">
            <span style={{ color: "#7B70FF" }}>Supercharge</span> Your Solana Workshops
          </Heading>
          <Text fontSize="2rem" color="#9694B6">
            Conduct your next IRL Solana workshop with ease while making it more fun
          </Text>
          <Button
            background="#5F54D8"
            color="white"
            borderRadius="2rem"
            fontSize="2rem"
            padding="2.2rem 3rem"
            mt="2rem"
            onClick={() => router.push(workshopsExist ? "/new" : "/dashboard")}
            zIndex={100}
            _hover={{ background: "#9A91FF" }}
          >
            {workshopsExist ? 'New Workshop' : 'Go to Dashboard'}
          </Button>
        </VStack>

        <Box width="100vw" pos="absolute" transform="translate(0, -3rem)" zIndex={0}>
          <img src="/lines.png" style={{ width: "100%", height: "100%" }} />
        </Box>

        <Box py={10} mt="3rem">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={FiCamera}
              title="Gasless NFT For Audience"
              text="Distribute gasless NFTs by scanning QR"
            />
            <Feature
              icon={FiList}
              title="Conduct On-Chain Quizzes"
              text="Engage your audience with Solana powered quizzes."
            />
            <Feature
              icon={FiActivity}
              title="Management Dashboard"
              text="Monitor and manage your workshop with a simple dashboard"
            />
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

const Feature = ({ icon, title, text }: { icon: React.ElementType; title: string; text: string }) => {
  return (
    <VStack
      align="start"
      background="#13131A"
      border="2px solid #232437"
      boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
      borderRadius="2rem"
      padding="1.5rem 1.5rem">
      <Flex background="#31315E" borderRadius="100%" padding="15px">
        <Box as={icon} size="2rem" color="#AFB5F6" />
      </Flex>
      <Text fontWeight="semibold" fontSize="1.8rem" color="#C0C6F4">{title}</Text>
      <Text color="gray.600" fontSize="1.4rem">{text}</Text>
    </VStack>
  );
};

export default WorkshopLandingPage;
