import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { Navbar } from '@/components/Navbar';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const WorkshopLandingPage = () => {
  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={12}
        bg="#0E0E10"
      >
        <VStack padding="2rem" spacing={4} w="40rem" height="40rem" mb={6} textAlign="center" bg="#13131A" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" style={{
          border: '1.795px solid #191A2B',
          borderRadius: "3rem"
        }}>
          <Heading as="h1" fontWeight="100" fontSize="3rem" color="white">
            New Workshop
          </Heading>

          <Text textAlign="start" fontSize="1.4rem" color="#838DE9" fontWeight={600} w="100%">Title</Text>
          <Input style={{
            border: "1px solid #34394D",
            color: "white",
            height: "3rem",
            fontSize: "1.3rem"
          }} placeholder="Title" borderColor="lightgray" bg="transparent" />
          <Text textAlign="start" fontSize="1.4rem" color="#838DE9" fontWeight={600} w="100%">Date</Text>
>

          <DateTimePicker className="picker" calendarClassName="calender" onChange={() => { }} value={new Date()} />


          <Text textAlign="start" fontSize="1.4rem" color="#838DE9" fontWeight={600} w="100%">Location</Text>
          <Input style={{
            border: "1px solid #34394D",
            color: "white",
            height: "3rem",
            fontSize: "1.3rem"
          }} placeholder="Location" borderColor="lightgray" bg="transparent" />

          <Button
            background="#5F54D8"
            color="white"
            borderRadius="1rem"
            fontSize="1.5rem"
            height="3rem"
            padding="1rem 2rem"
            zIndex={100}
            _hover={{ background: "#9A91FF" }}
          >
            Add Workshop
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default WorkshopLandingPage;
