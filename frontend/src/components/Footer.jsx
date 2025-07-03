import { Box, HStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      as="footer"
      width="100%"
      py={4}
      px={6}
      mt="auto"
      bg="transparent"
      display="flex"
      justifyContent="flex-end"
      position="relative"
      zIndex={0}
    >
      <HStack spacing={6} align="center">
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} UpperEchelon. All rights reserved.
        </Text>
        <Link onClick={() => navigate('/privacy')} fontSize="sm" color="gray.600" _hover={{ textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        <Link onClick={() => navigate('/contact')} fontSize="sm" color="gray.600" _hover={{ textDecoration: 'underline' }}>
          Contact
        </Link>
      </HStack>
    </Box>
  );
}

export default Footer;
