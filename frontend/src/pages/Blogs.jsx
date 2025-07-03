import { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, SimpleGrid, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/blogposts');
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Box
      bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
      minH="100vh"
      px={6}
      py={24}
      fontFamily="'Open Sans', sans-serif"
    >
      <VStack spacing={10} textAlign="center" maxW="6xl" mx="auto">
        <Heading
          fontSize={{ base: '4xl', md: '6xl' }}
          fontFamily="Cormorant Garamond"
          fontWeight="extrabold"
          color="gray.800"
        >
          Explore Communal Insights
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          color="gray.700"
          fontWeight="bold"
          fontFamily="Cormorant Garamond"
        >
          Here lies a growing archive of minds. Dive into a breadth of knowledge and perspective,
          where each blog is a window into deep inquiry, rigorous curiosity, and reflective thought.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
          {blogs.map((blog) => (
            <Box
              key={blog._id}
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
              cursor="pointer"
              onClick={() => navigate(`/blogs/${blog._id}`)}
              textAlign="left"
            >
              <Heading size="md" mb={2} fontFamily="Cormorant Garamond" color="gray.800">
                {blog.title}
              </Heading>
              <Text color="gray.600" noOfLines={3} fontSize="md">
                {blog.content}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                By {blog.author.name}
              </Text>
              <Button
                mt={4}
                size="sm"
                bg="#a68f6c"
                color="white"
                _hover={{ bg: '#927c5c' }}
              >
                Read More
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default Blogs;
