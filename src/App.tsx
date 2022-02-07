import React from 'react';
import { ChakraProvider, Heading, Text } from '@chakra-ui/react';
import theme from './components/theme';

const App = () => (
  <ChakraProvider theme={theme}>
    <Heading as="h1">Hello React</Heading>
    <Text>This is a test paragraph</Text>
  </ChakraProvider>
);

export default App;
