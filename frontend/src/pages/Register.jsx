import { useState, useContext } from 'react';
import { Box, Button, Heading, Input, VStack, Text, useToast, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", status: "error", duration: 3000 });
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/users/register', {
        email,
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.username);
      setUser(res.data.username);
      toast({ title: "Registered!", status: "success", duration: 2000 });
      navigate('/');
    } catch (err) {
      toast({
        title: "Registration failed",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 3000
      });
    }
  };

  return (
    <Box
      bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
      minH="100vh"
      px={6}
      py={24}
      fontFamily="'Open Sans', sans-serif"
    >
      <VStack spacing={8} maxW="md" mx="auto">
        <Heading
          fontSize={{ base: '4xl', md: '5xl' }}
          fontFamily="Cormorant Garamond"
          fontWeight="extrabold"
          color="gray.800"
        >
          Create Account
        </Heading>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          bg="white"
          borderRadius="md"
        />
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="lg"
          bg="white"
          borderRadius="md"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          bg="white"
          borderRadius="md"
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="lg"
          bg="white"
          borderRadius="md"
        />
        <Button
          onClick={handleRegister}
          bg="#a68f6c"
          color="white"
          _hover={{ bg: '#927c5c' }}
          size="lg"
          width="full"
        >
          Sign Up
        </Button>

        <Text fontSize="sm" color="gray.700">
          Have an account?{' '}
          <Link color="#a68f6c" onClick={() => navigate('/login')}>Log In</Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default Register;
