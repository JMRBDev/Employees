import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'src/components/theme';
import MainRouter from 'src/components/routing/MainRouter';
import Layout from 'src/components/layout';

const App = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <MainRouter />
    </Layout>
  </ChakraProvider>
);

export default App;
