import { Box, Heading, Text, VStack, SimpleGrid, Button, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaFeatherAlt, FaPenFancy, FaLightbulb } from 'react-icons/fa';

function BlogsLanding() {
  const navigate = useNavigate();

  const options = [
    { name: 'Explore Blogs', icon: FaFeatherAlt, path: '/blogs' },
    { name: 'Write a Blog', icon: FaPenFancy, path: '/create-blog' },
  ];

  return (
    <Box
      bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
      minH="100vh"
      px={6}
      py={24}
      fontFamily="'Open Sans', sans-serif"
    >
      <VStack spacing={10} textAlign="center" maxW="5xl" mx="auto">
        <Heading
          fontSize={{ base: "5xl", md: "7xl" }}
          fontFamily="Cormorant Garamond"
          fontWeight="extrabold"
          color="gray.800"
        >
          Conscious Communal
        </Heading>

        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          color="gray.700"
          fontWeight="bold"
          fontFamily="Cormorant Garamond"
        >
          This is your sanctum of reflection and contribution.
          <br /><br />
          Within these pages, you may write and share insights into cognition, consciousness, perception, memory, and all branches of human intellect. Whether quoting peer-reviewed studies or penning philosophical insights — this is your canvas.
          <br /><br />
          The written word endures beyond the self. Join a growing archive of minds who think deeper, speak clearer, and question louder.
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8} pt={6} width="100%">
          {options.map((item, index) => (
            <Box
              key={index}
              onClick={() => navigate(item.path)}
              cursor="pointer"
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
              textAlign="center"
            >
              <Icon as={item.icon} boxSize={10} mb={4} color="#a68f6c" />
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                {item.name}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default BlogsLanding;
