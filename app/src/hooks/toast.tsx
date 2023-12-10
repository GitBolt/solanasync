import { useToast, Box, Text, Link } from '@chakra-ui/react';
import { FaCheck, FaTimes, FaInfo, FaLink } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface ToastOptions {
  type: 'success' | 'error' | 'info';
  link?: string;
  linkTitle?: string;
  message?: string;
}

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ type, link, message, linkTitle }: ToastOptions) => {
    const config: { [key: string]: { icon: IconType; color: string; defaultMsg: string } } = {
      success: {
        icon: FaCheck,
        color: '#4bff4b',
        defaultMsg: 'Success Message',
      },
      error: {
        icon: FaTimes,
        color: '#FF2424',
        defaultMsg: 'Error Message',
      },
      info: {
        icon: FaInfo,
        color: '#2f9aff',
        defaultMsg: 'Info Message',
      },
    };

    const { icon: Icon, color, defaultMsg } = config[type];

    toast({
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
      render: () => (
        <Box
          color="white"
          p={5}
          bg="#0F1217"
          borderRadius="md"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.6)"
          alignItems="start"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap="1rem">
            <Icon size="1.2em" color={color} />
            <Text fontSize="lg" fontWeight="medium" color={color}>
              {message || defaultMsg}
            </Text>
          </Box>

          {link && (
            <Link
              w="100%"
              href={link}
              isExternal
              display="flex"
              mt="0.5rem"
              alignItems="center"
              gap="1rem"
              color="blue.500"
              fontSize="lg"
            >
              <FaLink size="1.2em" />
              {linkTitle || 'See More'}
            </Link>
          )}
        </Box>
      ),
    });
  };

  return showToast;
};
