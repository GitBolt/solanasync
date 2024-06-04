import { useCustomToast } from "@/hooks/toast";
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, Textarea, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowCircleRight, FaInstagram, FaTwitter } from "react-icons/fa";

type Props = {
  setDetails: React.Dispatch<React.SetStateAction<{}>>,
  details: any,
  handleRegisterUser: () => any,
}

export const CreateUser = ({ setDetails, details, handleRegisterUser }: Props) => {
  const router = useRouter()
  const toast = useCustomToast()
  const [isLogin, setLogin] = useState<boolean>(false)

  const loginF = async () => {
    try {
      const localData = localStorage.getItem("data") || '{}'
      const parsedData = JSON.parse(localData)
      const res = await fetch("/api/user/" + details.email);
      const data = await res.json()
      if (!res.ok || data.password != details.password) {
        toast({ type: "error", message: "Login failed. Either email does not exist or password is wrong" })
        return
      } else {
        toast({ type: "success", message: "Logged in successfully" })
        localStorage.setItem("data", JSON.stringify({
          id: data._id,
          email: details.email,
          password: details.password
        }))
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };


  return (
    <VStack padding="2rem" spacing="1.5rem" w="35rem" height="auto" textAlign="center" bg="#13131A" boxShadow="0px 3.59px 31.9px 0px rgba(0, 0, 0, 0.50)" border="1px solid #191A2B" borderRadius="1.5rem">
      <Text fontSize="2rem" color="white" fontWeight="500">
        Create Profile
      </Text>


      <Box w="100%">
        <Text fontSize="1.5rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Email</Text>
        <Input
          type="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1.5rem"
          placeholder="your@email.com"
          borderColor="#414664"
        />
      </Box>

      <Box w="100%">
        <Text fontSize="1.5rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Password</Text>
        <Input
          type="email"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          variant="flushed"
          color="white"
          fontSize="1.5rem"
          placeholder="xyaz"
          borderColor="#414664"
        />
      </Box>

      {isLogin ? <></> : <>


        <Box w="100%">
          <Text fontSize="1.5rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Name</Text>
          <Input
            required
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            variant="flushed"
            color="white"
            fontSize="1.5rem"
            placeholder="Name"
            borderColor="#414664"
          />
        </Box>

        <Box w="100%">
          <Text fontSize="1.5rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Bio</Text>
          <Textarea
            onChange={(e) => setDetails({ ...details, bio: e.target.value })}
            variant="flushed"
            color="white"
            fontSize="1.5rem"
            placeholder="Bio"
            borderColor="#414664"
          />
        </Box>

        <Box w="100%">
          <Text fontSize="1.5rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Twitter</Text>
          <InputGroup>
            <InputLeftElement>
              <FaTwitter style={{ width: "1.5rem", height: "1.5rem", marginRight: "0.5rem" }} color="white" />
            </InputLeftElement>
            <Input
              onChange={(e) => setDetails({ ...details, twitter: e.target.value })}
              variant="flushed"
              color="white"
              fontSize="1.5rem"
              placeholder="@your_twitter_handle"
              borderColor="#414664"
            />
          </InputGroup>
        </Box>

        <Box w="100%">
          <Text fontSize="1.5rem" color="#838DE9" fontWeight="500" mb="0.5rem" textAlign="start">Instagram</Text>
          <InputGroup >
            <InputLeftElement>
              <FaInstagram style={{ width: "1.5rem", height: "1.5rem", marginRight: "0.5rem" }} color="white" />
            </InputLeftElement>
            <Input
              onChange={(e) => setDetails({ ...details, instagram: e.target.value })}
              variant="flushed"
              color="white"
              fontSize="1.5rem"
              placeholder="@your_instagram_handle"
              borderColor="#414664"
            />
          </InputGroup>
        </Box>
      </>}

      <Button
        background="#5F54D8"
        color="white"
        borderRadius="1.5rem"
        fontSize="1.5rem"
        height="3rem"
        w="100%"
        mt="1.5rem"
        rightIcon={<FaArrowCircleRight />}
        onClick={isLogin ? loginF : handleRegisterUser}
        _hover={{ background: "#9A91FF" }}
      >
        {isLogin ? 'Login' : 'Register'}
      </Button>

      <Text onClick={() => setLogin(!isLogin)}  color="blue.500" fontSize="1.3rem" _hover={{ textDecoration: 'underline' }} cursor="pointer" mt="1rem">{isLogin ? 'Signup instead?' : 'Login instead?'}</Text>
    </VStack>
  );
}
