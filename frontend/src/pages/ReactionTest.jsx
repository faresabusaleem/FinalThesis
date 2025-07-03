import { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading } from '@chakra-ui/react';
import axios from 'axios';

function ReactionTest() {
  const [screen, setScreen] = useState('start'); 
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showDots, setShowDots] = useState(true);
  const [showClickText, setShowClickText] = useState(false);

  const saveScore = async (time) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:4000/api/results', {
        testName: 'reaction-test',
        score: time
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Failed to submit score:', err);
    }
  };

  const startTest = () => {
    setScreen('waiting');
    setShowDots(true);
    setShowClickText(false);
    const delay = Math.floor(Math.random() * 3000) + 2000;
    const id = setTimeout(() => {
      setStartTime(Date.now());
      setShowDots(false);
      setShowClickText(true);
      setScreen('active');
    }, delay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (screen === 'start') {
      startTest();
    } else if (screen === 'waiting') {
      clearTimeout(timeoutId);
      setScreen('tooSoon');
    } else if (screen === 'active') {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      saveScore(time);
      setScreen('result');
    } else if (screen === 'result' || screen === 'tooSoon') {
      startTest();
    }
  };

  return (
    <Box
      bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
      minH="100vh"
      onClick={handleClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="'Open Sans', sans-serif"
    >
      {screen === 'start' && (
        <VStack spacing={6} textAlign="center">
          <Heading fontSize={{ base: '4xl', md: '6xl' }} fontFamily="Cormorant Garamond" color="gray.800">
            Reaction Time Test
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700" fontWeight="medium">
            Click anywhere to begin. When the screen turns green, click as fast as you can.
          </Text>
        </VStack>
      )}

      {screen === 'waiting' && (
        <Box bg="red.500" w="100%" h="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {showDots && (
            <Text fontSize="6xl" color="white" fontWeight="bold">...</Text>
          )}
          <Text fontSize="2xl" color="white" fontWeight="bold" mt={4}>Wait for Green</Text>
        </Box>
      )}

      {screen === 'active' && (
        <Box bg="green.500" w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
          {showClickText && (
            <Text fontSize="5xl" color="white" fontWeight="bold">Click!</Text>
          )}
        </Box>
      )}

      {screen === 'result' && (
        <Box w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
          <VStack spacing={4} textAlign="center">
            <Heading fontSize={{ base: '4xl', md: '5xl' }} fontFamily="Cormorant Garamond" color="gray.800">
              Your Reaction Time
            </Heading>
            <Text fontSize="4xl" color="gray.700">{reactionTime} ms</Text>
            <Text fontSize="md" color="gray.600">Click anywhere to try again</Text>
          </VStack>
        </Box>
      )}

      {screen === 'tooSoon' && (
        <Box w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center">
          <VStack spacing={4} textAlign="center">
            <Heading fontSize={{ base: '4xl', md: '5xl' }} fontFamily="Cormorant Garamond" color="gray.800">
              Too Soon!
            </Heading>
            <Text fontSize="lg" color="gray.700">You clicked before the screen turned green.</Text>
            <Text fontSize="md" color="gray.600">Click anywhere to try again</Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default ReactionTest;
