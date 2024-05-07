import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react';
import { FiActivity, FiCamera, FiList } from 'react-icons/fi';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import { DefaultHead } from '@/components/DefaultHead';

const WorkshopLandingPage = () => {
  const [userExists, setUserExists] = useState<boolean>(false)
  const { publicKey } = useWallet()
  const router = useRouter()

  useEffect(() => {

    const fetchData = async () => {
      setUserExists(false);
      if (!publicKey) return
      try {
        const res = await fetch("/api/user/" + publicKey);
        if (!res.ok) setUserExists(false)
        if (res.ok) {
          setUserExists(true)
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchData();

  }, [publicKey]);


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
            <span style={{ color: "#7B70FF" }}>Supercharge</span> Your Educational Workshops
          </Heading>
          <Text fontSize="2rem" color="#9694B6">
            Conduct your next workshop with ease while making it more fun and more managable
          </Text>
          <Button
            background="#5F54D8"
            color="white"
            borderRadius="2rem"
            fontSize="2rem"
            padding="2.2rem 3rem"
            mt="2rem"
            onClick={() => router.push(userExists ? "/dashboard" : "/new")}
            zIndex={100}
            _hover={{ background: "#9A91FF" }}
          >
            {userExists ? 'Go to Dashboard' : 'Get Started'}
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
              text="Distribute gasless NFTs by scanning QR powered by Solana pay"
            />
            <Feature
              icon={FiList}
              title="Conduct On-Chain Quizzes"
              text="Engage your audience with Solana powered quizzes"
            />
            <Feature
              icon={FiActivity}
              title="Management Dashboard"
              text="Manage and keep track of your workshops with a simple dashboard"
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
