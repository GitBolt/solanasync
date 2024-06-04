import { Box, Flex, LinkBox, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic";
import Link from "next/link";
const Wallets = dynamic(() => import("../components/WalletButton"), { ssr: false });

export const Navbar = () => {
  return (
    <Flex zIndex="10" bg="#0E0E10" h="1rem" w="100%" justify="space-between" align="center" p="9">

      <Link href="/">
        <LinkBox fontSize="1.2rem" color="blue.400" fontWeight={600} borderRadius="1rem">
          <img src='/icon.png'
           style={{ height: "50px", width: "120px", objectFit:'cover' }} />
        </LinkBox>
      </Link>

      <Flex gap="2rem" align="center">
        <a style={{fontSize:"1.2rem", fontWeight:400, color:"#c2cdd9"}} href="https://github.com/solana-workshops" target="_blank">Resources</a>
        <Link href="/guide">
          <Text fontSize="1.2rem" color="gray.300" fontWeight={400} >Guide</Text></Link>
        <Wallets />
      </Flex>
    </Flex>
  )
}