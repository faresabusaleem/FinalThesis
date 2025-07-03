import { Box, Button, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function CognitivePractice() {
  const navigate = useNavigate();

  return (
    <Box p={10} minHeight="100vh" bg="brand.bg" color="brand.text">
      <VStack spacing={6} textAlign="center" mb={20}>
        <Heading fontSize="5xl" fontWeight="bold">
          Cultivate the Mind
        </Heading>
        <Text maxW="4xl" fontSize="lg" color="brand.subtle">
          Welcome to the sanctum of mental refinement. Here, every second is a sacred ritual,
          every test a mirror to your cognition. Engage not for amusement — but for ascension.
        </Text>
      </VStack>

      <Stack spacing={8} align="center">
        <Button size="lg" colorScheme="brand" variant="solid" onClick={() => navigate('/reaction')}>
          Reaction Time ⚡
        </Button>
        <Button size="lg" colorScheme="brand" variant="solid" onClick={() => navigate('/memory')}>
          Memory Test 🧠
        </Button>
        <Button size="lg" colorScheme="brand" variant="solid" onClick={() => navigate('/number')}>
          Number Memory 🔢
        </Button>
        <Button size="lg" colorScheme="brand" variant="solid" onClick={() => navigate('/visual')}>
          Visual Memory 🧩
        </Button>
        <Button size="lg" colorScheme="brand" variant="solid" onClick={() => navigate('/chimp')}>
          Chimp Test 🐒
        </Button>
        <Button size="lg" colorScheme="brand" variant="outline" onClick={() => navigate('/leaderboard')}>
          Global Leaderboards 🏆
        </Button>
      </Stack>
    </Box>
  );
}

export default CognitivePractice;
