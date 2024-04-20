import React from 'react';
import { useWallet, Wallet as SolanaWallet } from '@solana/wallet-adapter-react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Button,
  Box,
  Divider,
} from '@chakra-ui/react';
import { truncatedPublicKey } from '@/util/helper';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiCopy, FiDelete } from 'react-icons/fi';
import { useCustomToast } from '@/hooks/toast';

// Styles configuration
const styleConfig = {
  button: {
    background: "#5249B1",
    hoverBackground: "#645CC7",
    color: "white",
    width: "13rem",
    borderRadius: "0.9rem",
    border: "1px solid #4B42B0"
  },
  menuItem: {
    height: "2.5rem",
    color: "#A8A8E3",
    background: "#13151D",
    fontSize: "1.2rem",
    fontWeight: 400,
    gap: '0.8rem',
  },
  menuList: {
    padding: "0.5rem",
    background: "#13151D",
    borderRadius: "0.6rem",
    border: "1px solid #1E2132",
    boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.17)",
  },
  iconBox: {
    height: "1.5rem",
    width: "1.5rem",
    iconcolor: "#5F54D8"
  },
};

const ConnectWalletButton: React.FC = () => {
  const { wallets, select, connected, publicKey, wallet, connect } = useWallet();
  const toast = useCustomToast()

  const copyPublicKey = () => {
    if (!publicKey) {
      toast({
        type: "error",
        message: "Public key could not copied"
      })
      return
    }
    navigator.clipboard.writeText(publicKey.toBase58());
    toast({ type: "success", message: 'Copied Address' });
  };

  const onConnectWallet = async (wallet: SolanaWallet) => {
    console.log('Connection event', wallet.readyState);
    select(wallet.adapter.name);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        _active={{ background: styleConfig.button.hoverBackground }}
        _hover={{ background: styleConfig.button.hoverBackground }}
        background={styleConfig.button.background}
        color={styleConfig.button.color}
        w={styleConfig.button.width}
        border={styleConfig.button.border}
        borderRadius={styleConfig.button.borderRadius}
        rightIcon={
          connected && wallet ? (
            <Box {...styleConfig.iconBox}>
              <img
                src={wallet.adapter.icon}
                alt={`${wallet.adapter.name} Icon`}
              />
            </Box>
          ) : <Box {...styleConfig.iconBox}>
            <ChevronDownIcon color="white" {...styleConfig.iconBox} />
          </Box>
        }
      >
        {!connected && <Text fontSize="1.2rem" fontWeight={400}>Connect Wallet</Text>}
        {connected && wallet && (
          <Text fontSize="1.2rem" fontWeight={400}>
            {truncatedPublicKey(publicKey!.toString(), 4)}
          </Text>
        )}
      </MenuButton>

      {connected && (
        <MenuList {...styleConfig.menuList}>
          <MenuItem {...styleConfig.menuItem} onClick={copyPublicKey}>
            <FiCopy color={styleConfig.iconBox.iconcolor} />
            Copy Address
          </MenuItem>

          <Divider my="0.2rem" border="1px solid #1E2132" />

          <MenuItem
            {...styleConfig.menuItem}
            onClick={async () => {
              if (wallet) {
                await wallet.adapter.disconnect();
                toast({
                  type: "success",
                  message: "Disconnected wallet"
                })
              }
            }}
          >
            <FiDelete color={styleConfig.iconBox.iconcolor} />
            Disconnect
          </MenuItem>
        </MenuList>
      )}

      {!connected && wallets && (
        <MenuList {...styleConfig.menuList}>
          {wallets.map((wallet: SolanaWallet) => (
            <MenuItem
              key={wallet.adapter.name}
              {...styleConfig.menuItem}
              onClick={async () => {
                onConnectWallet(wallet);
              }}
            >
              <Flex gap="1rem" align="center" justify="center">
                <Box {...styleConfig.iconBox}>
                  <img
                    width={100}
                    loading="lazy"
                    src={wallet.adapter.icon}
                    alt={`${wallet.adapter.name} Icon`}
                  />
                </Box>
                <Text>
                  {wallet.adapter.name}
                </Text>
              </Flex>

            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
};

export default ConnectWalletButton;
