import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function IQTestsLanding() {
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
          IQ Tests
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          color="gray.700"
          fontWeight="bold"
          fontFamily="Cormorant Garamond"
        >
          The average human IQ lies somewhere between 90 and 110 — a bell curve where the vast majority reside, never questioning the limits of their intellect.
          <br /><br />
          But IQ is more than just a number. It is a measure of your reasoning, memory, attention to detail, and capacity to adapt. It is the fingerprint of your mind — the metric that separates the passive from the potent.
          <br /><br />
          Knowing your IQ is not vanity — it is self-awareness. In a world that constantly measures your worth, why not take command and measure your potential on your own terms?
          <br /><br />
          Here, you embark on a trial of the mind. A precise and unforgiving assessment awaits — one that reveals not what you already know, but how deeply you can think.
        </Text>

        <VStack spacing={4} pt={6}>
          <Button
            size="lg"
            bg="#a68f6c"
            color="white"
            _hover={{ bg: '#927c5c' }}
            fontWeight="bold"
            fontFamily="'Open Sans', sans-serif"
            onClick={() => navigate('/iq')}
          >
            Take the Full IQ Test
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default IQTestsLanding;
