import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, VStack, HStack, Text, Icon, Grid, LinkBox, LinkOverlay, Center, Divider } from '@chakra-ui/react';
import { Navbar } from '@/components/Navbar';
import { FaCalendarAlt, FaCertificate, FaCheckCircle, FaMapMarkerAlt, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

type Props = {
  title: string,
  start: string,
  end: string,
  capacity: number,
  location: string,
  id: string,
  nft: boolean,
  quiz: boolean,
}

const WorkshopItem = ({ title, start, end, capacity, location, id, nft, quiz }: Props) => (
  <LinkBox
    w="100%"
    p={4}
    mb={4}
    cursor="pointer"
    minH="10rem"
    minW="25rem"
    bg="#13131A"
    boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
    borderRadius="1rem"
    border="1px solid #191A2B"
  >
    <LinkOverlay href={"/workshop/" + id}>
      <Text fontSize="1.5rem" color="white" fontWeight={700} mb={2}>{title}</Text>
    </LinkOverlay>
    <Flex direction={{ base: 'column', sm: 'row' }} alignItems="center" mb={1}>
      <Icon as={FaCalendarAlt} color="#838DE9" mr={2} />
      <Text fontSize="1.3rem" color="#7C7E97">Start: {new Date(start).toLocaleString()}</Text>
    </Flex>
    <Flex direction={{ base: 'column', sm: 'row' }} alignItems="center">
      <Icon as={FaMapMarkerAlt} color="#838DE9" mr={2} />
      <Text fontSize="1.3rem" color="#7C7E97">{location}</Text>
    </Flex>

    <Divider borderColor="#282B4D" my="0.6rem" />

    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Flex align="center">
          <Text fontSize="1rem" color="#8F90A2" mr={2}>Quiz</Text>
          {quiz ? <Icon as={FaCheckCircle} color="#35C64C" /> : <Icon as={FaTimesCircle} color="red" />}
        </Flex>
        <Flex align="center">
          <Text fontSize="1rem" color="#8F90A2" mr={2}>Solana Pay NFT</Text>
          {nft ? <Icon as={FaCheckCircle} color="#35C64C" /> : <Icon as={FaTimesCircle} color="red" />}
        </Flex>
      </Box>
    </Flex>
  </LinkBox>
);




const WorkshopLandingPage = () => {
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);
  const [pastWorkshops, setPastWorkshops] = useState([]);
  const { publicKey } = useWallet();
  const router = useRouter();

  
  useEffect(() => {
    const fetchWorkshops = async () => {
      if (!publicKey) return;
      try {
        const response = await fetch(`/api/workshops/${publicKey}`);
        const data = await response.json();
        const now = new Date();
        const sortedWorkshops = data.workshops.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());

        const upcoming = sortedWorkshops.filter((workshop: any) => new Date(workshop.start) >= now);
        const past = sortedWorkshops.filter((workshop: any) => new Date(workshop.start) < now);

        setUpcomingWorkshops(upcoming);
        setPastWorkshops(past);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();
  }, [publicKey]);

  const renderWorkshops = (workshops: any) => (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={6}>
      {workshops && workshops.length ? workshops.map((workshop: any) => (
        <WorkshopItem
          title={workshop.name}
          start={workshop.start}
          end={workshop.end}
          capacity={workshop.capacity}
          location={workshop.location}
          id={workshop._id}
          key={workshop._id}
          nft={workshop.cNFTMetadata}
          quiz={workshop.quizMetadata}
        />
      )) : <Text fontSize="2rem" color="white">Nothing here</Text>}
    </Grid>
  );

  return (
    <>
      <Navbar />
      {publicKey ? <Flex
        direction="column"
        align="start"
        justify="center"
        p={12}
        bg="#0E0E10"
      >
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" w="100%" mb={6}>
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
        </Flex>
        <VStack align="start" spacing={4}>
          <Heading as="h2" fontWeight="600" fontSize="2rem" color="#838DE9" mb={4}>
            Upcoming Workshops
          </Heading>
          {renderWorkshops(upcomingWorkshops)}

          <Heading as="h2" fontWeight="600" fontSize="2rem" color="#838DE9" mb={4} mt={10}>
            Past Workshops
          </Heading>
          {renderWorkshops(pastWorkshops)}
        </VStack>
      </Flex> : <Center><Text fontSize="2rem" color="white">Connect wallet to get started</Text></Center>}
    </>
  );
};

export default WorkshopLandingPage;
