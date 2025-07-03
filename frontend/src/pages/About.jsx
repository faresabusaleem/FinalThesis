import { Box, Heading, Text, Stack } from '@chakra-ui/react';

function About() {
  return (
    <Box p={8}>
      <Heading mb={4}>About Cognitive Test Hub</Heading>
      <Text mb={4}>
        This platform is inspired by Human Benchmark and designed to test and improve your cognitive abilities.
      </Text>
      <Stack spacing={3}>
        <Box>
          <Heading size="md">Reaction Time</Heading>
          <Text>Test how fast you can respond to a visual cue.</Text>
        </Box>
        <Box>
          <Heading size="md">Memory Test</Heading>
          <Text>Recall and repeat a sequence of tiles. Gets harder each round.</Text>
        </Box>
        <Box>
          <Heading size="md">Number Memory</Heading>
          <Text>See how many numbers you can remember in sequence.</Text>
        </Box>
        <Box>
          <Heading size="md">Visual Memory</Heading>
          <Text>Click on tiles that light up in a sequence. A classic visual pattern memory test.</Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default About;
