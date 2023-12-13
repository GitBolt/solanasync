import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, VStack, HStack, Text, Icon, Grid, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Navbar } from '@/components/Navbar';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

type Props = {
  title: string,
  date: string,
  location: string,
  id: string,
}

const WorkshopItem = ({ title, date, location, id }: Props) => (
  <LinkBox
    w="100%"
    p={4}
    mb={4}
    minW="25rem"
    cursor="pointer"
    minH="10rem"
    bg="#13131A"
    boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
    borderRadius="1rem"
    border="1px solid #191A2B"
  >
    <LinkOverlay href={"/workshop/" + id}>
      <Text fontSize="1.5rem" color="white" mb={2}>{title}</Text>
    </LinkOverlay>
    <Flex alignItems="center" mb={1}>
      <Icon as={FaCalendarAlt} color="#838DE9" mr={2} />
      <Text fontSize="1.3rem" color="#A0A3C1">{new Date(date).toLocaleDateString()}</Text>
    </Flex>
    <Flex alignItems="center">
      <Icon as={FaMapMarkerAlt} color="#838DE9" mr={2} />
      <Text fontSize="1.3rem" color="#A0A3C1">{location}</Text>
    </Flex>
  </LinkBox>
);

const WorkshopLandingPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const { publicKey } = useWallet();
  const router = useRouter()
  
  useEffect(() => {
    
    const fetchWorkshops = async () => {
      if (!publicKey) return;
      try {
        const response = await fetch(`/api/workshops/${publicKey}`);
        const data = await response.json();
        const sortedWorkshops = data.workshops.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        setWorkshops(sortedWorkshops);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();
  }, [publicKey]);

  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        align="start"
        justify="center"
        p={12}
        bg="#0E0E10"
      >
        <HStack justify="space-between" w="100%" mb={6}>
          <Heading as="h1" fontWeight="100" fontSize="3rem" color="white">
            Your Workshops
          </Heading>
          <Button
            background="#5F54D8"
            color="white"
            borderRadius="1rem"
            fontSize="1.5rem"
            height="3rem"
            padding="1rem 2rem"
            onClick={() => router.push("/new")}
            _hover={{ background: "#9A91FF" }}
          >
            New Workshop
          </Button>
        </HStack>
        <VStack align="start" spacing={4}>
          <Heading as="h2" fontWeight="600" fontSize="2rem" color="#838DE9" mb={4}>
            Workshops
          </Heading>
          <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
            {workshops.map((workshop: any) => (
              <WorkshopItem
                title={workshop.name}
                date={workshop.date}
                location={workshop.location}
                id={workshop._id}
                key={workshop._id}
              />
            ))}
          </Grid>
        </VStack>
      </Flex>
    </>
  );
};

export default WorkshopLandingPage;
