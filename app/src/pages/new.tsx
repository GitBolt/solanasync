import React, { useEffect, useState } from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import { Navbar } from '@/components/Navbar';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useCustomToast } from '@/hooks/toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { CreateUser } from '@/components/CreateUser';
import { CreateWorkshop } from '@/components/CreateWorkshop';

const WorkshopLandingPage = () => {
  const toast = useCustomToast()
  const { publicKey } = useWallet()
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  const [userDetails, setUserDetails] = useState<any>({
    name: '',
    bio: '',
    twitter: '',
    instagram: '',
    email: ''
  })

  const [workshopDetails, setWorkshopDetails] = useState<any>({
    title: '',
    description: '',
    start: '',
    location: '',
    end: '',
    capacity: 10
  })

  useEffect(() => {
    const fetchData = async () => {
      setUserId(null);
      if (!publicKey) return
      try {
        const res = await fetch("/api/user/" + publicKey);
        if (!res.ok) {
          setUserId(null);
        } else {
          const data = await res.json()
          setUserId(data._id)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [publicKey]);


  const handleRegisterUser = async () => {
    if (!userDetails.name || !userDetails.bio || !userDetails.email) {
      toast({
        type: "error",
        message: "Name, Email and Bio are required fields"
      });
      return;
    }
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userDetails.name,
          bio: userDetails.bio,
          twitter: userDetails.twitter,
          instagram: userDetails.instagram,
          email: userDetails.email,
          publicKey: publicKey
        })
      });

      if (!response.ok) {
        toast({ type: "error", message: "Failed to create user, try again" })
        return
      }
      toast({ type: "success", message: "Registered User Successfully" })
      const data = await response.json()
      setUserId(data._id);
    } catch (error) {
      toast({
        message: "User Creation Failed",
        type: "error"
      });
      return;
    }
  }

  const handleCreateWorkshop = async () => {
    try {
      const response = await fetch('/api/createWorkshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: workshopDetails.location,
          start: workshopDetails.start,
          end: workshopDetails.end,
          name: workshopDetails.title,
          capacity: workshopDetails.capacity,
          ownerPubKey: publicKey,
          ownerId: userId
        })
      });

      const res = await response.json()
      if (!response.ok) {
        toast({
          type: "error",
          message: res.message || "Failed to create workshop"
        });
        return
      }

      toast({
        type: "success",
        message: "Workshop Created"
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        type: "error",
        message: "Workshop Creation Failed"
      });
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
        {!userId ? (
          <CreateUser handleRegisterUser={handleRegisterUser} setDetails={setUserDetails} details={userDetails} />
        ) : (
          <CreateWorkshop handleCreateWorkshop={handleCreateWorkshop} setDetails={setWorkshopDetails} details={workshopDetails} />
        )}
      </Flex>
    </>
  );
};

export default WorkshopLandingPage;
