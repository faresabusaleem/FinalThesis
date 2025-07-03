import { Box, Flex, HStack, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../assets/TransparentUpperechelon.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <Box
      width="100%"
      bg="#eae6dd"
      borderBottom="2px solid #a68f6c"
      boxShadow="2xl"
      py={3}
      px={8}
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <HStack spacing={3} cursor="pointer" onClick={() => navigate('/')}>
          <Image src={Logo} alt="Logo" boxSize="36px" />
          <Text
            fontSize="2xl"
            fontWeight="bold"
            fontFamily="Cormorant Garamond"
            color="gray.800"
            letterSpacing="wide"
          >
            Upper Echelon
          </Text>
        </HStack>

        <HStack spacing={4}>
          {isLoggedIn ? (
            <Button
              size="sm"
              variant="solid"
              bg="#a68f6c"
              color="white"
              _hover={{ bg: '#927c5c' }}
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                color="#4a4a4a"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                size="sm"
                variant="solid"
                bg="#a68f6c"
                color="white"
                _hover={{ bg: '#927c5c' }}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
