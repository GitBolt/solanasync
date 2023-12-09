import React from 'react';
import { Box, Button, Flex, Heading, VStack, HStack, Text, Icon, Grid } from '@chakra-ui/react';
import { Navbar } from '@/components/Navbar';
import {FaCalendarAlt, FaMapMarkerAlt} from 'react-icons/fa'

const WorkshopItem = ({ title, date, location }: any) => (
  <Box
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
    <Text fontSize="1.5rem" color="white" mb={2}>{title}</Text>
    <Flex alignItems="center" mb={1}>
      <Icon as={FaCalendarAlt} color="#838DE9" mr={2} />
      <Text fontSize="1.3rem" color="#A0A3C1">{date}</Text>
    </Flex>
    <Flex alignItems="center">
      <Icon as={FaMapMarkerAlt} color="#838DE9" mr={2} />
      <Text fontSize="1.3rem" color="#A0A3C1">{location}</Text>
    </Flex>
  </Box>
);

const upcomingWorkshops = [
  { title: 'Workshop 1', date: 'Jan 10', location: 'New York' },
  { title: 'Workshop 2', date: 'Jan 20', location: 'San Francisco' },
  // Add more workshops here...
];

const pastWorkshops = [
  { title: 'Workshop A', date: 'Dec 5', location: 'Los Angeles' },
  { title: 'Workshop B', date: 'Nov 15', location: 'Chicago' },
  // Add more workshops here...
];

const WorkshopLandingPage = () => {
  // Dummy data for workshops

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
            _hover={{ background: "#9A91FF" }}
          >
            New Workshop
          </Button>
        </HStack>
        <VStack align="start" spacing={4}>
        <Heading as="h2" fontWeight="600" fontSize="2rem" color="#838DE9" mb={4}>
            Upcoming Workshops
          </Heading>
          <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
            {upcomingWorkshops.map(workshop => (
              <WorkshopItem title={workshop.title} date={workshop.date} location={workshop.location} key={workshop.title} />
            ))}
          </Grid>
          
          <Heading as="h2" fontWeight="600" fontSize="2rem" color="#838DE9" mb={4}>
            Previous Workshops
          </Heading>
          <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
            {pastWorkshops.map(workshop => (
              <WorkshopItem title={workshop.title} date={workshop.date} location={workshop.location} key={workshop.title} />
            ))}
          </Grid>
        </VStack>
      </Flex>
    </>
  );
};

export default WorkshopLandingPage;
