import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaArrowCircleRight, FaInstagram, FaTwitter } from "react-icons/fa";

type Props = {
  setDetails: React.Dispatch<React.SetStateAction<{}>>,
  details: {},
  handleRegisterUser: () => any
}

export const CreateUser = ({ setDetails, details, handleRegisterUser }: Props) => {
  return (
    <VStack padding="2rem" spacing="1rem" w="35rem" height="auto" textAlign="center" bg="#13131A" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" border="1px solid #191A2B" borderRadius="1rem">
      <Text fontSize="2rem" color="white" fontWeight="500">
        Create Profile
      </Text>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Name</Text>
        <Input
          required
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1rem"
          placeholder="Name"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Email</Text>
        <Input
          type="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1rem"
          placeholder="your@email.com"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Bio</Text>
        <Textarea
          onChange={(e) => setDetails({ ...details, bio: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1rem"
          placeholder="Bio"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Twitter</Text>
        <InputGroup>
          <InputLeftElement>
            <FaTwitter style={{ width: "1.5rem", height: "1.5rem", marginRight: "0.5rem" }} color="white" />
          </InputLeftElement>
          <Input
            onChange={(e) => setDetails({ ...details, twitter: e.target.value })}
            variant="flushed"
            color="white"
            fontSize="1rem"
            placeholder="@your_twitter_handle"
            borderColor="#414664"
          />
        </InputGroup>
      </Box>

      <Box w="100%">
        <Text fontSize="1.2rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Instagram</Text>
        <InputGroup >
          <InputLeftElement>
            <FaInstagram style={{ width: "1.5rem", height: "1.5rem", marginRight: "0.5rem" }} color="white" />
          </InputLeftElement>
          <Input
            onChange={(e) => setDetails({ ...details, instagram: e.target.value })}
            variant="flushed"
            color="white"
            fontSize="1rem"
            placeholder="@your_instagram_handle"
            borderColor="#414664"
          />
        </InputGroup>
      </Box>

      <Button
        background="#5F54D8"
        color="white"
        borderRadius="1rem"
        fontSize="1.2rem"
        height="3rem"
        w="100%"
        mt="1.5rem"
        rightIcon={<FaArrowCircleRight />}
        onClick={handleRegisterUser}
        _hover={{ background: "#9A91FF" }}
      >
        Register
      </Button>
    </VStack>
  );
}
