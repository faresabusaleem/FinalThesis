import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Cormorant Garamond', serif`,
    body: `'Cormorant Garamond', serif`,
  },
  colors: {
    brand: {
      50: '#f8f4f0',
      100: '#e8e2d9',
      200: '#d7cfc0',
      300: '#c5baa4',
      400: '#b3a489',
      500: '#998b6f',
      600: '#7a6e58',
      700: '#5a5140',
      800: '#3c352b',
      900: '#1e1a14',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.50',
        color: 'brand.900',
        lineHeight: 'tall',
      },
      a: {
        color: 'brand.600',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export default theme;
