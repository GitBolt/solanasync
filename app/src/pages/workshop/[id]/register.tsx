import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Icon, Center, Button, FormControl, FormLabel, Input, Divider, useMediaQuery } from '@chakra-ui/react';
import { FaArrowAltCircleRight, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useCustomToast } from '@/hooks/toast';
import Link from 'next/link';

const RegisterPage = () => {
  const router = useRouter();
  const [workshop, setWorkshop] = useState<any>({});
  const [host, setHost] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    goals: '',
  });

  const [success, setSuccess] = useState<boolean>(false)

  const toast = useCustomToast()

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  const [check1240] = useMediaQuery('(max-width: 1240px)')

  useEffect(() => {
    const fetchWorkshop = async () => {
      if (!router.query.id) return;
      try {
        const response = await fetch(`/api/workshops/id/${router.query.id}`);
        const data = await response.json();
        setWorkshop(data.workshopData);
        setHost(data.host);
      } catch (error) {
        console.error('Error fetching workshop:', error);
      }
    };

    fetchWorkshop();
  }, [router.query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.name) {
      return toast({ "type": "error", message: "Name and email are required" })
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workshopId: router.query.id,
          userData: formData,
        }),
      });

      console.log("Register server response: ", response)
      if (response.ok) {
        console.log('User registered successfully');
        toast({ type: "success", message: "Succesfully registered for workshop" })
        setSuccess(true)
        await fetch("/api/mail", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            title: workshop.name,
            start: workshop.start,
            end: workshop.end,
            capacity: workshop.capacity,
            meet: workshop.links ? workshop.links.meet : "",
            description: workshop.description
          })
        })
      } else {
        console.error('Error registering user:', response.statusText);
        toast({ type: "error", message: "Error registering for workshop" })
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast({ type: "error", message: "Error registering for workshop" })
    }
  };


  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" alignItems="center" justifyContent="center" mt="4rem">
        <Flex direction={check1240 ? 'column' : 'row'} w="1200px" alignItems="center" justifyContent="center" gap="1rem">

          <Box w={check1240 ? "80%" : "50%"} padding="3rem" mb={4} bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27">
            <Text fontWeight="700" w="100%" textAlign="start" fontSize="3.2rem" color="white">
              {workshop.name}
            </Text>

            <Text textAlign="start" color="gray.400" fontSize="2rem">{workshop.description}</Text>
            <Text fontSize="1.4rem" color="#818599" mt={4}>
              Starts on: <span style={{ color: 'white' }}>{formatDate(workshop.start)} {' '} {formatTime(workshop.start)}</span>
            </Text>

            <Text fontSize="1.4rem" color="#818599" mt={4}>
              Ends on: <span style={{ color: 'white' }}>{formatDate(workshop.end)} {' '} {formatTime(workshop.end)}</span>
            </Text>

            <Text fontSize="1.4rem" color="#818599" mt={2}>
              Location: <span style={{ color: 'white' }}>{workshop.location}</span>
            </Text>

            <Divider bg="#818599" flex="1" mt="2rem" mb="0.8rem" border="1px solid #2f314f" />
            <Text fontSize="1.5rem" color="#818599">
              Hosted By
            </Text>

            <Flex align="center" justify="space-between" mt="0.2rem">
              <Text fontSize="1.4rem" color="white" >
                {host.name}
              </Text>
              <Flex>
                {host.instagram && <Link href={`https://instagram.com/${host.twitter.replace("@", "")}`} target="_blank">
                  <Icon as={FaInstagram} boxSize={6} color="#818599" />
                </Link>}

                {host.twitter && <Link href={`https://twitter.com/${host.twitter.replace("@", "")}`} target="_blank">
                  <Icon as={FaTwitter} boxSize={6} color="#818599" ml={4} />
                </Link>}

              </Flex>
            </Flex>
            <Divider mt="0.8rem" bg="#818599" flex="1" border="1px solid #2f314f" />


            <Text fontSize="1.4rem" color="white" mt={4}>
              Registration Count: {workshop?.attendees?.length ? workshop.attendees.length : 0}
            </Text>
          </Box>



          {new Date(workshop.end) > new Date() ? !success ? <Box w={check1240 ? '80%' : "50%"} p={check1240 ? 2 : 12}>
            <Center>
              <Heading as="h1" fontSize="3rem" color="white" mb={8}>
                Register
              </Heading>
            </Center>

            <form onSubmit={handleSubmit} style={{
              background: "rgb(28, 31, 41)",
              padding: "3rem 2rem",
              borderRadius: "1rem",

            }}>


              <FormControl id="name" mb={4}>
                <FormLabel color="white">Name</FormLabel>
                <Input type="text" name="name"
                  bg="#1F1F29"
                  borderColor="#34394D"
                  placeholder='Enter your name'
                  fontSize="1.5rem"
                  color="white"

                  value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl id="email" mb={4}>
                <FormLabel color="white">Email</FormLabel>
                <Input type="email" name="email"
                  bg="#1F1F29"
                  borderColor="#34394D"
                  placeholder='Enter your email'
                  fontSize="1.5rem"
                  color="white"
                  value={formData.email} onChange={handleChange} />
              </FormControl>
              {/* <FormControl id="phoneNumber" mb={4}>
                <FormLabel color="white">Phone Number</FormLabel>
                <Input type="text" name="phoneNumber"
                  bg="#1F1F29"
                  borderColor="#34394D"
                  placeholder='Enter your phone number'
                  fontSize="1.5rem"
                  color="white"
                  value={formData.phoneNumber} onChange={handleChange} />
              </FormControl> */}
              <FormControl id="goals" mb={4}>
                <FormLabel color="white">Goals</FormLabel>
                <Input type="text" name="goals"
                  bg="#1F1F29"
                  borderColor="#34394D"
                  placeholder='What is your goal with attending this workshop?'
                  fontSize="1.5rem"
                  color="white" value={formData.goals} onChange={handleChange} />

              </FormControl>
              <Button type="submit"
                rounded="1rem"
                bg="#5F54D8"
                mt="2rem"
                w="100%"
                h="3.5rem"
                fontSize="1.5rem"
                rightIcon={<Icon as={FaArrowAltCircleRight} />}
                colorScheme="voilet">
                Register
              </Button>
            </form>
          </Box> :
            <Text color="white" textAlign="center" fontSize="3rem" width="50%">You are in! Feel free to close the tab now.</Text>
            : <Box mb="2rem" w={check1240 ? "80%" : '50%'}>
              <p style={{ fontSize: "2.5rem", color: '#cacafb', fontWeight: "700", textAlign: 'center' }}>The workshop is over. Thanks for joining!</p>

            </Box>}
        </Flex >
      </Flex >

    </>
  );
}

export default RegisterPage;
