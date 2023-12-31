import React, { useEffect, useState } from 'react';
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
import { useCustomToast } from '@/hooks/toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

const WorkshopLandingPage = () => {
  const toast = useCustomToast()
  const { publicKey } = useWallet()
  const [userExists, setUserExists] = useState<boolean>(false)
  const router = useRouter()
  const [processing, setProcessing] = useState<boolean>(false)

  const [details, setDetails] = useState<any>({
    date: new Date()
  })

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/user/${publicKey}`)
        .then(response => response.json())
        .then(() => setUserExists(true))
        .catch(() => setUserExists(false));
    }
  }, [publicKey]);

  const handleCreateWorkshop = async () => {
    setProcessing(true)
    console.log(details)
    if (!details.title || !details.date || !details.location) {
      toast({
        type: "error",
        message: "All fields required"
      });
      setProcessing(false)
      return;
    }

    if (!userExists) {
      try {
        const response = await fetch('/api/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ publicKey })
        });

        if (!response.ok) {
          throw new Error('Failed to create user');
        }

        setUserExists(true);
        setProcessing(false)
      } catch (error) {
        toast({
          message: "User Creation Failed",
          type: "error"
        });
        setProcessing(false)
        return;
      }
    }

    try {
      const response = await fetch('/api/createWorkshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: details.location, date: details.date, name: details.title, ownerPubKey: publicKey })
      });

      if (!response.ok) {
        setProcessing(false)
        throw new Error('Failed to create workshop');
      }

      toast({
        type: "success",
        message: "Workshop Created"
      });
      setProcessing(false)
      router.push('/dashboard');
    } catch (error) {
      toast({
        type: "error",
        message: "Workshop Creation Failed"
      });
      setProcessing(false)
    }
  }
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

          <Text textAlign="start" fontSize="1.4rem" color="#838DE9" fontWeight={600} w="100%" >Title</Text>
          <Input
            onChange={(e) => setDetails({ ...details, title: e.target.value })}
            style={{
              border: "1px solid #34394D",
              color: "white",
              height: "3rem",
              fontSize: "1.3rem"
            }} placeholder="Title" borderColor="lightgray" bg="transparent" />
          <Text textAlign="start" fontSize="1.4rem" color="#838DE9" fontWeight={600} w="100%">Date</Text>

          <DateTimePicker className="picker" calendarClassName="calender" onChange={(e) => setDetails({ ...details, date: e })} value={details.date} />


          <Text textAlign="start" fontSize="1.4rem" color="#838DE9" fontWeight={600} w="100%">Location</Text>
          <Input
            onChange={(e) => setDetails({ ...details, location: e.target.value })}
            style={{
              border: "1px solid #34394D",
              color: "white",
              height: "3rem",
              fontSize: "1.3rem"
            }} placeholder="Location" borderColor="lightgray" bg="transparent" />

          <Button
            disabled={processing}
            background="#5F54D8"
            color="white"
            borderRadius="1rem"
            fontSize="1.5rem"
            height="3rem"
            onClick={handleCreateWorkshop}
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
