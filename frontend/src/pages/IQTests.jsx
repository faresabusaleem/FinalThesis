import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function IQTests() {
  const navigate = useNavigate();

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
          Available IQ Tests
        </Heading>

        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          color="gray.700"
          fontWeight="bold"
          fontFamily="Cormorant Garamond"
        >
          Choose from a curated selection of globally recognized IQ tests. These tests are not games — they are cognitive diagnostics designed to reveal the architecture of your intelligence.
        </Text>

        <VStack spacing={6} pt={6} width="100%">
          <Button
            size="lg"
            width="100%"
            bg="#a68f6c"
            color="white"
            _hover={{ bg: '#927c5c' }}
            fontWeight="bold"
            fontFamily="'Open Sans', sans-serif"
            onClick={() => navigate('/iq/mensa-norway')}
          >
            Mensa Norway IQ Test
          </Button>

          <Button
            size="lg"
            width="100%"
            bg="#a68f6c"
            color="white"
            _hover={{ bg: '#927c5c' }}
            fontWeight="bold"
            fontFamily="'Open Sans', sans-serif"
            onClick={() => navigate('/iq/classic')}
          >
            Classic 40-Question IQ Assessment
          </Button>

          <Button
            size="lg"
            width="100%"
            bg="#a68f6c"
            color="white"
            _hover={{ bg: '#927c5c' }}
            fontWeight="bold"
            fontFamily="'Open Sans', sans-serif"
            onClick={() => navigate('/iq/matrix')}
          >
            Raven’s Progressive Matrices
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default IQTests;
