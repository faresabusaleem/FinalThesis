import { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast({
        title: 'Unauthorized',
        description: 'You must be logged in to publish a blog.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    try {
      await axios.post(
        'http://localhost:4000/api/blogposts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: 'Blog published',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
      navigate('/blogs');
    } catch (err) {
      toast({
        title: 'Failed to publish blog',
        description: err.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true
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
      <VStack spacing={8} maxW="2xl" mx="auto">
        <Heading
          fontSize={{ base: '4xl', md: '5xl' }}
          fontFamily="Cormorant Garamond"
          fontWeight="extrabold"
          color="gray.800"
          textAlign="center"
        >
          Share Your Reflections
        </Heading>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="lg"
          bg="white"
          borderRadius="md"
        />

        <Textarea
          placeholder="Your thoughts go here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          bg="white"
          borderRadius="md"
        />

        <Button
          onClick={handleCreate}
          bg="#a68f6c"
          color="white"
          _hover={{ bg: '#927c5c' }}
          size="lg"
          width="full"
        >
          Publish Blog
        </Button>
      </VStack>
    </Box>
  );
}

export default CreateBlog;
