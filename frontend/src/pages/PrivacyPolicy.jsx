import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function PrivacyPolicy() {
  return (
    <Box px={6} py={20} maxW="6xl" mx="auto" fontFamily="'Open Sans', sans-serif">
      <VStack spacing={8} align="start">
        <Heading fontSize="4xl" fontFamily="'Cormorant Garamond', serif">Privacy Policy</Heading>

        <Text fontSize="lg">
          At Upper Echelon, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
        </Text>

        <Heading fontSize="2xl" mt={8}>Information We Collect</Heading>
        <Text fontSize="md">
          We collect information you voluntarily provide when registering, such as your email and username. We may also collect usage data to improve performance and user experience.
        </Text>

        <Heading fontSize="2xl" mt={8}>How We Use Your Data</Heading>
        <Text fontSize="md">
          Your data is used solely for improving our services, customizing your experience, and ensuring secure access. We do not sell or share your personal data with third parties.
        </Text>

        <Heading fontSize="2xl" mt={8}>Cookies</Heading>
        <Text fontSize="md">
          We use cookies to remember your preferences and optimize functionality. You can disable cookies in your browser settings, though some features may not function properly.
        </Text>

        <Heading fontSize="2xl" mt={8}>Data Security</Heading>
        <Text fontSize="md">
          We implement robust security measures to protect your data. All sensitive information is encrypted and stored securely. Access is restricted and audited.
        </Text>

        <Heading fontSize="2xl" mt={8}>Your Rights</Heading>
        <Text fontSize="md">
          You have the right to access, modify, or delete your data at any time. For any requests, please contact us through the Contact page.
        </Text>

        <Heading fontSize="2xl" mt={8}>Policy Updates</Heading>
        <Text fontSize="md">
          We may update this policy occasionally. Continued use of our platform implies acceptance of the updated terms.
        </Text>
      </VStack>
    </Box>
  );
}

export default PrivacyPolicy;


