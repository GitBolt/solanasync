import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useMediaQuery
} from '@chakra-ui/react';
import { FiActivity, FiCamera, FiList } from 'react-icons/fi';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/router';
import { DefaultHead } from '@/components/DefaultHead';

const WorkshopLandingPage = () => {
  const [userExists, setUserExists] = useState<boolean>(false)
  const router = useRouter()

  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

  useEffect(() => {

    const fetchData = async () => {
      setUserExists(false);
      try {
        const data = localStorage.getItem("data") || '{}'
        const parsedData = JSON.parse(data)
        if (parsedData && parsedData.email && parsedData.password) {
          setUserExists(true)
        }
      } catch (error) {
        console.error("Error checking user existance", error);
      }
    };

    fetchData();
  }, []);

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
          <Heading as="h1" fontWeight="100" fontSize={isLargerThan600 ? '5.3rem' : '2rem'} maxW="80%" color="white">
            <span style={{ color: "#7B70FF" }}>Supercharge</span> Your Educational Workshops
          </Heading>
          <Text fontSize={isLargerThan600 ? '2rem' :'1.5rem'} color="#9694B6">
            Conduct your next workshop with ease while making it more fun and more easy
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
              icon={FiActivity}
              title="Management Dashboard"
              text="Manage and keep track of your workshops with a simple dashboard"
            />
                 <Feature
              icon={FiList}
              title="Conduct Quizzes"
              text="Engage your audience with on-chain quizzes"
            />
            <Feature
              icon={FiCamera}
              title="Gasless NFT For Audience"
              text="Distribute no-cost NFTs by scanning a simple QR code"
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
