import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
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
  const [existingUserDetails, setExistingUserDetails] = useState<any | null>(null)
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
      setExistingUserDetails(null);
      try {
        const localData = localStorage.getItem("data") || '{}'
        const parsedData = JSON.parse(localData)
        const res = await fetch("/api/user/" + parsedData.email);
        if (!res.ok) {
          setExistingUserDetails(null);
        } else {
          const data = await res.json()
          setExistingUserDetails({
            id: data._id,
            email: data.email
          })
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);


  const handleRegisterUser = async () => {
    if (!userDetails.name || !userDetails.bio || !userDetails.email) {
      toast({
        type: "error",
        message: "Name, Email and Bio are required fields"
      });
      return;
    }

    const res = await fetch("/api/user/" + userDetails.email);
    if (res.ok) {
      toast({ type: "error", message: "Email already taken" })
      return
    }

    try {
      console.log('Saving: ', userDetails)
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
          name: userDetails.name,
          password: userDetails.password,
          bio: userDetails.bio,
          twitter: userDetails.twitter,
          instagram: userDetails.instagram,
          email: userDetails.email,
        })
      });

      if (!response.ok) {
        toast({ type: "error", message: "Failed to create user, try again" })
        return
      }
      toast({ type: "success", message: "Registered User Successfully" })
      const data = await response.json()
      setExistingUserDetails({
        id: data._id,
        email: data.email
      });
      localStorage.setItem("data", JSON.stringify({
        id: data._id,
        email: userDetails.email,
        password: userDetails.password,
        name: userDetails.name
      }))
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
      console.log("Saving: ", workshopDetails, "Owner Id: ", existingUserDetails.email, existingUserDetails.id)
      const response = await fetch('/api/createWorkshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: workshopDetails.location,
          start: workshopDetails.start,
          description: workshopDetails.description,
          end: workshopDetails.end,
          name: workshopDetails.title,
          capacity: workshopDetails.capacity,
          ownerId: existingUserDetails!.id,
          owner: existingUserDetails!.email
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
        {!existingUserDetails ? (
          <CreateUser handleRegisterUser={handleRegisterUser} setDetails={setUserDetails} details={userDetails} />
        ) : (
          <CreateWorkshop handleCreateWorkshop={handleCreateWorkshop} setDetails={setWorkshopDetails} details={workshopDetails} />
        )}

      </Flex>
    </>
  );
};

export default WorkshopLandingPage;
