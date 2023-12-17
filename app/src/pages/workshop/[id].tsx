import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, Icon, VStack, LinkBox, LinkOverlay, Center } from '@chakra-ui/react';
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaLink, FaQuestionCircle, FaQrcode, FaArrowLeft } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import CreateQuizModal from '@/components/CreateQuizModal';
import CreateNFTCollectionModal from '@/components/CreateNFTModal';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { QuizManageBox } from '@/components/QuizManageBox';

const WorkshopPage = () => {

  const { publicKey } = useWallet()
  const router = useRouter()
  const [workshop, setWorkshop] = useState<any>({})
  const [updateState, setUpdateState] = useState<number>(+new Date())

  useEffect(() => {

    const fetchWorkshops = async () => {
      if (!publicKey || !router.query.id) return;
      try {
        const response = await fetch(`/api/workshops/id/${router.query.id}`);
        const data = await response.json();
        console.log("Workshop: ", data)
        setWorkshop(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();
  }, [publicKey, updateState, router.query]);



  const formatDate = (date: Date) => {
    // Function to format the date
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    // Function to format the time
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <>
      <Navbar />
      {publicKey ? <Flex direction="column" align="center" justify="center" p={12} bg="#0E0E10">
        <Box w="70%">
          <Button
            alignSelf="start"
            leftIcon={<FaArrowLeft />}
            color="#5F54D8"
            borderColor="#5F54D8"
            _hover={{ bg: "transparent" }}
            variant="outline"
            onClick={() => router.push("/dashboard")}
            m={4}
          >
            Back to Dashboard
          </Button>
        </Box>
        <Box w="70%" padding="3rem" mb={4} bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27">
          <Flex justify="space-between" align="center">
            <Box>
              <Heading as="h1" fontWeight="700" fontSize="2.5rem" color="white" textAlign="center">{workshop.name}</Heading>
              <Flex align="center" marginTop="1rem" gap="1rem">

                <Icon as={FaCalendarAlt} color="#818599" width="1.8rem" height="1.8rem" />
                <Flex flexFlow="column">
                  <Text fontSize="1.2rem" color="#818599">{formatDate(workshop.date)}</Text>
                  <Text fontSize="1.2rem" color="#818599">Starts at {formatTime(workshop.date)}</Text>
                </Flex>
              </Flex>

              <Flex align="center" mt={2} gap="1rem">
                <Icon as={FaMapMarkerAlt} color="#818599" width="1.8rem" height="1.8rem" />
                <Text fontSize="1.2rem" color="#818599">{workshop.location}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Flex justify="space-between" w="70%">
          <Box w="50%" padding="2rem" bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27" mr={4}>
            <Heading color="#505161" mb={4}>Features</Heading>
            <Flex justify="space-evenly" gap="2rem" align="center" flexFlow="column">
              {workshop && workshop.quizMetadata ?
                <QuizManageBox publicKey={workshop.quizMetadata.quizAddress} /> : <CreateQuizModal setUpdateState={setUpdateState} />
              }
              {workshop && workshop.cNFTMetadata ?
                <LinkBox
                  bg="#13131A"
                  borderRadius="1rem"
                  border="1px solid #191A2B"
                  display="flex"
                  justifyContent="center"
                  minW="100%"
                  _hover={{bg:"#25242f"}}
                  alignItems="center"
                  height="8rem"
                  alignContent="center"
                >
                  <LinkOverlay href={`/workshop/${router.query.id}/nft`}>
                    <Text fontSize="1.8rem" color="white" w="100%" textAlign="center">View Solana Pay Gasless NFT</Text>
                  </LinkOverlay>
                </LinkBox> : <CreateNFTCollectionModal />}
            </Flex>
          </Box>

          <Box w="50%" p={4} bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27">
            <Heading color="#505161" mb={4}>Links</Heading>
          </Box>
        </Flex>
      </Flex> : <Center><Text fontSize="3rem" color="white">Connect Wallet Required</Text></Center>}
    </>
  )
}

export default WorkshopPage;
