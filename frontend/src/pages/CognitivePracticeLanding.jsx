import { Box, Heading, Text, VStack, SimpleGrid, Button, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaBrain, FaHashtag, FaEye, FaHandPeace } from 'react-icons/fa';

function CognitivePracticeLanding() {
  const navigate = useNavigate();

  const games = [
    { name: 'Reaction Time', icon: FaBolt, path: '/reaction' },
    { name: 'Sequence Memory', icon: FaBrain, path: '/memory' },
    { name: 'Number Memory', icon: FaHashtag, path: '/number' },
    { name: 'Visual Memory', icon: FaEye, path: '/visual' },
    { name: 'Chimp Test', icon: FaHandPeace, path: '/chimp' },
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
          Cognitive Practice Grounds
        </Heading>

        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          color="gray.700"
          fontWeight="bold"
          fontFamily="Cormorant Garamond"
        >
          These are not mere games — they are calibrated cognitive drills designed to sharpen your reaction time, spatial awareness, memory retention, and pattern recognition. 
          <br /><br />
          Each challenge is an exercise in perception and precision, subtly rewiring your neural pathways. Regular training here is a pact with your own potential — a decision to break past mental complacency.
          <br /><br />
          Strengthen your cognitive edge, one refined trial at a time.
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} pt={6} width="100%">
          {games.map((game, index) => (
            <Box
              key={index}
              onClick={() => navigate(game.path)}
              cursor="pointer"
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
              textAlign="center"
            >
              <Icon as={game.icon} boxSize={10} mb={4} color="#a68f6c" />
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                {game.name}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <Button
          mt={10}
          size="lg"
          bg="#a68f6c"
          color="white"
          _hover={{ bg: '#927c5c' }}
          fontWeight="bold"
          fontFamily="'Open Sans', sans-serif"
          onClick={() => navigate('/leaderboard')}
        >
          View Leaderboards
        </Button>
      </VStack>
    </Box>
  );
}

export default CognitivePracticeLanding;
