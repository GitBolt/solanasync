// @ts-nocheck

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  useDisclosure,
  VStack,
  Icon,
  Text,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { FaUpload, FaQrcode, FaMagic } from 'react-icons/fa';
import { uploadFile } from '@/util/storage';
import { useRouter } from 'next/router';
import { useCustomToast } from '@/hooks/toast';
import { getConcurrentMerkleTreeAccountSize } from '@solana/spl-account-compression';
import { Connection, SystemProgram, Transaction } from '@solana/web3.js';
import { findLeastDepthPair } from '@/util/helper';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@metaplex-foundation/js';

const CreateNFTCollectionModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast()
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const { signTransaction, publicKey } = useWallet()
  const router = useRouter()

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };


  const createCollection = async () => {
    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL)
    if (!collectionName || !symbol || !imageFile) {
      toast({
        type: 'error',
        message: 'All fields are required',
      });
      return;
    }

    setLoading(true);


    const imageUrl = await uploadFile(imageFile);

    toast({
      type: 'info',
      message: 'Metadata Uploaded. Processing...',
    });

    const { maxDepth, maxBufferSize } = findLeastDepthPair(size)

    const requiredSpace = getConcurrentMerkleTreeAccountSize(
      maxDepth,
      maxBufferSize,
      maxDepth - 5,
    );
    const storageCost = await connection.getMinimumBalanceForRentExemption(
      requiredSpace,
    );
    console.log("Storage Cost: ", storageCost)
    const feeTransferIx = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey("7sehf2oSyv5r4kir5V2ruzLmU2aihU7fXw1uPAah5Cj"),
      lamports: storageCost,
    })

    const tx = new Transaction().add(feeTransferIx)


    const { blockhash } = await connection.getLatestBlockhash()
    tx.recentBlockhash = blockhash
    tx.feePayer = publicKey

    const signedTx = await signTransaction(tx)
    const serialized = signedTx.serialize()
    const base64 = serialized.toString("base64");

    const payload = {
      name: collectionName,
      symbol: symbol,
      workshopId: router.query.id,
      nftImageUri: imageUrl,
      size: size,
      tx: base64
    };

    const res = await fetch("/api/createCollection", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      toast({
        type: 'success',
        message: 'NFT Collection created successfully',
      });

      router.push("/workshop/" + router.query.id + "/nft")
    } else {
      toast({
        type: 'error',
        message: 'Failed to create NFT Collection',
      });
    }
    setLoading(false);

  };

  return (
    <>
      <Button
        onClick={onOpen}
        rounded="2rem"
        bg="#5F54D8"
        w="20rem"
        h="5rem"
        fontSize="2rem"
        leftIcon={<Icon as={FaQrcode} />}
        colorScheme="voilet">
        Create NFT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg="#13131A" color="white" borderRadius="1rem">
          <ModalHeader>Create NFT Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={8} padding="1rem 0">

              <Box display="flex" alignItems="center" justifyContent="start" w="full">
                <Box w="8rem" h="8rem" borderWidth="1px" borderRadius="lg" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
                  {previewUrl ? <Flex style={{ width: '100%', height: '100%' }} align="center" justify="center" cursor="pointer">
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </Flex> : <>
                    <Flex onClick={() => document.querySelector('input[type="file"]')!.click()} style={{ width: '100%', height: '100%' }} align="center" justify="center" cursor="pointer">
                      <FaUpload size="2rem" onClick={() => document.querySelector('input[type="file"]')!.click()} />
                    </Flex>
                  </>}
                </Box>
                <Box ml={4}>
                  <Text fontSize="1.3rem" fontWeight={700}>File Name: {imageFile ? imageFile!.name : 'No file selected'}</Text>
                  {previewUrl && <Button colorScheme="twitter" onClick={() => document.querySelector('input[type="file"]')!.click()} > Change Image</Button>}
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    display="none"
                  />
                </Box>
              </Box>

              <Input
                bg="#13131A"
                borderColor="#34394D"
                placeholder="Collection Name"
                fontSize="1.2rem"
                color="white"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
              <Input
                bg="#13131A"
                borderColor="#34394D"
                placeholder="Symbol"
                fontSize="1.2rem"
                maxLength={6}
                color="white"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />

              <NumberInput min={1}
                max={100000}>
                <NumberInputField bg="#13131A"
                  borderColor="#34394D"
                  placeholder="Size"
                  fontSize="1.2rem"
                  color="white"
                  value={size}
                  onChange={(e) => setSize(e.target.value)} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Button
                isDisabled={loading}
                _hover={{ bg: "green" }}
                alignSelf="center"
                w="30%"
                fontSize="1.2rem"
                height="3rem"
                color="white"
                isLoading={loading}
                leftIcon={<FaMagic />}
                bg="#318151"
                onClick={createCollection}
              >
                Create
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNFTCollectionModal;
