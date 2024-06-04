import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, Icon, VStack, LinkBox, LinkOverlay, Center, Divider, useMediaQuery } from '@chakra-ui/react';
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaLink, FaQuestionCircle, FaQrcode, FaArrowLeft, FaTicketAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import CreateQuizModal from '@/components/CreateQuizModal';
import CreateNFTCollectionModal from '@/components/CreateNFTModal';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { QuizManageBox } from '@/components/QuizManageBox';
import LinksComponent from '@/components/LinkInput';
import { FaLinkSlash, FaPeopleGroup, FaTicket, FaTicketSimple } from 'react-icons/fa6';
import Link from 'next/link';

const WorkshopPage = () => {

  const { publicKey } = useWallet()
  const router = useRouter()
  const [workshop, setWorkshop] = useState<any>({})
  const [updateState, setUpdateState] = useState<number>(+new Date())
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

  useEffect(() => {

    const fetchWorkshops = async () => {
      if (!router.query.id) return;
      try {
        const response = await fetch(`/api/workshops/id/${router.query.id}`);
        const data = await response.json();
        console.log("Workshop: ", data)
        setWorkshop(data.workshopData);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();
  }, [publicKey, updateState, router.query]);



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

  return (
    <>
      <Navbar />
       <Flex direction="column" align="center" justify="center" p={isLargerThan600 ? 12 : 5} bg="#0E0E10">
        <Box w={isLargerThan600 ? "60%" : "90%"}>
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

        <Flex justify="space-between" w={isLargerThan600 ? "60%" : "90%"} flexFlow={isLargerThan600 ? "row" :'column'}>
          <Box w={isLargerThan600 ? "73%" : '100%'} padding="2rem" mb={4} bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27">
            <Flex flexFlow="column" gap="1rem">
              <Heading as="h1" fontWeight="700" fontSize="3rem" color="white" textAlign="start">{workshop.name}</Heading>

              <Flex justify="space-between" w="100%">

                <Flex flexFlow="column" gap="0.5rem">
                  <Flex align="center" gap="0.5rem">
                    <Icon as={FaCalendarAlt} color="white" width="1.8rem" height="1.8rem" />
                    <Text fontSize="1.5rem" fontWeight={500} color="white">Date & Time</Text>
                  </Flex>

                  <Flex align="center" flexFlow="column" alignItems="start">
                    <Text fontSize="1.3rem" color="#818599" mr={2}>Start: {formatDate(workshop.start)} at {formatTime(workshop.start)}</Text>
                    <Text fontSize="1.3rem" color="#818599">End: {formatDate(workshop.end)} at {formatTime(workshop.end)}</Text>
                  </Flex>
                </Flex>
                <Flex alignItems="start" flexFlow="column">
                  <Flex flexFlow="column">
                    <Flex></Flex>
                    <Flex align="center" gap="0.5rem">
                      <Icon as={FaMapMarkerAlt} color="white" width="1.8rem" height="1.8rem" />
                      <Text fontSize="1.5rem" fontWeight={500} color="white">Location</Text>
                    </Flex>
                    <Text fontSize="1.3rem" color="#818599">{workshop.location}</Text>
                  </Flex>

                  <Flex align="center" mt={2} gap="1rem">
                    <Icon as={FaTicket} color="white" width="1.8rem" height="1.8rem" />
                    <Text fontSize="1.2rem" color="#818599">{workshop.capacity}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>

          <Flex flexFlow="column" gap="2rem" justify="center" alignItems="center" w={isLargerThan600 ? "25%" : '100%'} padding="2rem" mb={4} bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27">
            
            <Flex align="center">
              <Icon as={FaExternalLinkAlt} boxSize={5} color="blue.500" mr={2} />
              <Link href={`/workshop/${workshop._id}/register`} target="_blank">
                <Text color="blue.500" fontSize="1.3rem"  _hover={{ textDecoration: 'underline' }}>
                  Registration Page
                </Text>
              </Link>
            </Flex>


            <Flex align="center" mt={4}>
              <FaPeopleGroup color="#8DA7D3" size={24} />
              <Text ml={2} fontSize="1.3rem" color="#8DA7D3">
                <span style={{ fontWeight: 700 }}>{workshop?.attendees?.length || 0}</span> Registrations
              </Text>
            </Flex>
          </Flex>
        </Flex>



        <Flex justify="space-between" w={isLargerThan600 ? "60%" : "90%"} flexFlow={isLargerThan600 ? 'row' :'column'}>
          <Box w={isLargerThan600 ? "50%" : '100%'} padding="2rem" bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27" mr={4}>
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
                  _hover={{ bg: "#25242f" }}
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

          <Box w={isLargerThan600 ? "50%" : '100%'} p={4} mt={'1rem'} bg="linear-gradient(180deg, #14141A 0%, #18181E 100%)" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" borderRadius="1rem" border="1px solid #1C1C27">
            {workshop ? <LinksComponent workshop={workshop} /> : null}
          </Box>
        </Flex>
      </Flex> 
    </>
  )
}

export default WorkshopPage;
