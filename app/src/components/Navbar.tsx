import { Flex, LinkBox, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic";
import Link from "next/link";
const Wallets = dynamic(() => import("../components/WalletButton"), { ssr: false });

export const Navbar = () => {
  return (
    <Flex zIndex="10" bg="#0E0E10" h="1rem" w="100%" justify="space-between" align="center" p="9">

      <Link href="/">
        <LinkBox fontSize="1.2rem" color="blue.400" fontWeight={600} borderRadius="1rem">
          <img src='/sync.png' style={{height:"50px", width:"120px"}}/>
          </LinkBox>
      </Link>
      <Wallets />
    </Flex>
  )
}