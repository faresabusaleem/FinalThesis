import { Box, Button, Heading, Input, Textarea, VStack, Text } from '@chakra-ui/react';

function Contact() {
  return (
    <Box px={6} py={20} maxW="4xl" mx="auto" fontFamily="'Open Sans', sans-serif">
      <VStack spacing={8} align="start">
        <Heading fontSize="4xl" fontFamily="'Cormorant Garamond', serif">Contact Us</Heading>
        <Text fontSize="lg">
          For any inquiries, feedback, or support, feel free to reach out. We value your communication.
        </Text>

        <Input placeholder="Your Name" size="lg" bg="white" borderRadius="md" />
        <Input placeholder="Your Email" size="lg" bg="white" borderRadius="md" />
        <Textarea placeholder="Your Message" rows={6} size="lg" bg="white" borderRadius="md" />

        <Button bg="#a68f6c" color="white" _hover={{ bg: '#927c5c' }} size="lg">
          Send Message
        </Button>
      </VStack>
    </Box>
  );
}

export default Contact;
