import React from 'react';
import { Box, Button, Flex, Heading, Text, Icon, VStack } from '@chakra-ui/react';
import { FaQuestionCircle, FaQrcode, FaLink } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';

const workshopName = "IITD"
const location = "NYC"
const date = "12 Jan, 2023"

const WorkshopPage = () => (
    <>
        <Navbar />
        <Flex
            direction="column"
            align="center"
            justify="center"
            p={12}
            bg="#0E0E10"
        >
            <Box
                w="100%"
                p={4}
                mb={4}
                bg="#13131A"
                boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)"
                borderRadius="1rem"
                border="1px solid #191A2B"
            >
                <Heading as="h1" fontWeight="600" fontSize="2.5rem" color="white" textAlign="center" mb={4}>
                    {workshopName}
                </Heading>
                <Text fontSize="1.5rem" color="#A0A3C1" textAlign="center" mb={2}>{date}</Text>
                <Text fontSize="1.5rem" color="#A0A3C1" textAlign="center" mb={4}>{location}</Text>
            </Box>

            <VStack spacing={6} mt="5rem" w="100%" align="center">
                <Flex justify="space-evenly" gap="2rem">
                    <Button rounded="2rem" bg="#5F54D8" w="22rem" h="6rem" fontSize="2rem" leftIcon={<Icon as={FaQuestionCircle} />} colorScheme="voilet">
                        Create Quiz
                    </Button>
                    <Button rounded="2rem" leftIcon={<Icon as={FaQrcode} />} bg="#5F54D8" w="22rem" h="6rem" fontSize="2rem" colorScheme="voilet">
                        Create NFT QR
                    </Button>
                </Flex>
                <Button rounded="2rem" leftIcon={<Icon as={FaLink} />} w="40%" bg="#5F54D8" h="6rem" fontSize="2rem" colorScheme="voilet">
                    Add Important Links
                </Button>
            </VStack>
        </Flex>
    </>
);

export default WorkshopPage;
