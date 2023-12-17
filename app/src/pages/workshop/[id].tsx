import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, Icon, VStack, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { FaQuestionCircle, FaQrcode, FaLink, FaArrowLeft } from 'react-icons/fa';
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


  return (
    <>
      <Navbar />
      <Button
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
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={12}
        bg="#0E0E10"
      >
        <Box
          w="60%"
          p={4}
          mb={4}
          bg="#13131A"
          boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
          borderRadius="1rem"
          border="1px solid #191A2B"
        >
          <Heading as="h1" fontWeight="600" fontSize="2.5rem" color="white" textAlign="center" mb={4}>
            {workshop.name}
          </Heading>
          <Text fontSize="1.5rem" color="#A0A3C1" textAlign="center" mb={2}>{new Date(workshop.date).toLocaleString()}</Text>
          <Text fontSize="1.5rem" color="#A0A3C1" textAlign="center" mb={4}>{workshop.location}</Text>
        </Box>

        <VStack spacing={6} mt="5rem" w="100%" align="center">
          <Flex justify="space-evenly" gap="2rem">
            {workshop && workshop.quizMetadata ?
              <QuizManageBox publicKey={workshop.quizMetadata.quizAddress} /> : <CreateQuizModal setUpdateState={setUpdateState} />
            }
            {workshop && workshop.cNFTMetadata ?
              <LinkBox bg="#13131A"
                boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
                borderRadius="1rem"
                border="1px solid #191A2B"
                display="flex"
                justifyContent="center"
                minW="25rem"
                alignItems="center"
                height="13rem"
                padding="0 2rem"
                alignContent="center"
              >
                <LinkOverlay href={`/workshop/${router.query.id}/nft`}>
                  <Text fontSize="1.8rem" color="white" w="100%" textAlign="center">View Solana Pay Gasless NFT</Text>
                </LinkOverlay>
              </LinkBox> : <CreateNFTCollectionModal />}
          </Flex>
          {/* <Button rounded="2rem" leftIcon={<Icon as={FaLink} />} w="40%" bg="#5F54D8" h="6rem" fontSize="2rem" colorScheme="voilet">
						Add Important Links
					</Button> */}
        </VStack>
      </Flex>
    </>
  )
}

export default WorkshopPage;
