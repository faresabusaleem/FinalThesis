import { Box, Heading, Text, VStack, Button, Image, extendTheme, ChakraProvider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/TransparentUpperechelon.png';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  components: {
    Text: {
      baseStyle: {
        fontWeight: "semibold",
      },
    },
    Button: {
      baseStyle: {
        fontFamily: `'Open Sans', sans-serif`,
        fontWeight: 'bold'
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
      }
    }
  },
});

function Homepage() {
  const navigate = useNavigate();

  return (
    <ChakraProvider theme={theme}>
      <Box
        bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
        minH="100vh"
        px={6}
        py={12}
        overflowX="hidden"
      >
        <VStack spacing={8} textAlign="center" maxW="5xl" mx="auto">
          {/* Logo */}
          <Image
            src={Logo}
            alt="Upper Echelon Logo"
            boxSize={{ base: "200px", md: "300px" }}
            objectFit="contain"
            mx="auto"
          />

          {/* Title */}
          <Heading
            fontSize={{ base: "5xl", md: "7xl" }}
            fontFamily="Cormorant Garamond"
            color="gray.800"
          >
            Upper Echelon
          </Heading>

          {/* Intro Text */}
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            color="gray.700"
            fontFamily="Cormorant Garamond"
          >
            You were not born to be average. This is your awakening.
            <br />
            Upper Echelon is not a website — it is a sanctuary of intellect, a sanctuary of clarity.
            <br /><br />
            In a world drowned in distraction, only a few hear the call. Fewer still answer.
            <br />
            We are not here to entertain you. We are here to elevate you.
            <br /><br />
            Each test, each challenge, each reflection here is a trial of the mind — designed to dismantle comfort and expose capacity.
            <br />
            Join the thinkers. The seekers. The defiant minds.
            <br />
            Join the Upper Echelon.
          </Text>

          {/* Buttons */}
          <VStack spacing={4} pt={6}>
            <Button bg="#3D2C29" color="white" _hover={{ bg: "#2B1F1C" }} size="lg" onClick={() => navigate('/iqintro')}>
              Begin the IQ Ascent
            </Button>
            <Button bg="#67594A" color="white" _hover={{ bg: "#574636" }} size="lg" onClick={() => navigate('/practiceintro')}>
              Enter the Mental Forge
            </Button>
            <Button bg="#8E735B" color="white" _hover={{ bg: "#7A624C" }} size="lg" onClick={() => navigate('/blogintro')}>
              Commune with the Conscious
            </Button>
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Homepage;
