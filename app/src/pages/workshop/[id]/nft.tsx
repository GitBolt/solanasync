import React, { useState, useEffect } from 'react';
import { Keypair } from "@solana/web3.js";
import QRCode from "react-qr-code";
import { Box, Flex, Text, Button, VStack, Icon, Link, useToast, Tbody, Table, Tr, Td } from '@chakra-ui/react';
import { InfoIcon, CloseIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const GaslessSolanaPayNFT = () => {
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [nftDetails, setNftDetails] = useState<any>();
  const [error, setError] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchWorkshopData(id as string);
    }
  }, [id]);

  const fetchWorkshopData = async (workshopId: string) => {
    try {
      const response = await fetch(`/api/workshops/id/${workshopId}`);
      if (response.status === 200) {
        const workshop = await response.json();
        if (workshop.cNFTMetadata) {
          setError(false)
          setNftDetails(workshop.cNFTMetadata);
          setQrCodeValue("solana:" + encodeURIComponent(`https://solanasync.com/api/mint?id=${workshopId}`));
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return (
      <VStack spacing={8} align="stretch" p={12} bg="#0E0E10">
        <Text as="h1" fontWeight="bold" fontSize="4xl" color="white" align="center">
          You have not created gasless NFT QR for this workshop yet
        </Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={8} align="stretch" p={12} bg="#0E0E10">
      <Text as="h1" fontWeight="bold" fontSize="4xl" color="white" align="center">
        Gasless Solana Pay NFT
      </Text>
      <Flex justify="center" wrap="wrap" gap={6}>
        <Box p={6} bg="#13131A" borderRadius="lg" boxShadow="xl">
          <VStack spacing={4}>
            <Icon as={InfoIcon} w={10} h={10} color="white" />
            <Text fontSize="2xl" color="white">NFT QR Code</Text>
            <QRCode value={qrCodeValue} size={256} />
          </VStack>
        </Box>
        {nftDetails && (
          <Box p={6} bg="#13131A" borderRadius="lg" boxShadow="xl">
            <VStack spacing={4}>
              <Icon as={CheckCircleIcon} w={10} h={10} color="green.500" />
              <Text fontSize="2xl" color="white">NFT Details</Text>

              <Box bg="blue.800" color="white" border="1px" borderColor="gray.200" p={4} borderRadius="md">
                <VStack spacing={4} align="left">

                  <Text fontWeight="bold">Merkle Tree Address:</Text>
                  <Link href={`https://solscan.io/address/${nftDetails.merkleTreeAddress}`} isExternal color="blue.300">
                    {nftDetails.merkleTreeAddress}
                  </Link>

                  <Text fontWeight="bold">Mint Account:</Text>
                  <Link href={`https://solscan.io/address/${nftDetails.mintAccount}`} isExternal color="blue.300">
                    {nftDetails.mintAccount}
                  </Link>

                  <Text fontWeight="bold">Metadata Account:</Text>
                  <Link href={`https://solscan.io/address/${nftDetails.metadataAccount}`} isExternal color="blue.300">
                    {nftDetails.metadataAccount}
                  </Link>
                </VStack>
              </Box>

            </VStack>
          </Box>
        )}
      </Flex>
    </VStack>
  );
};

export default GaslessSolanaPayNFT;
