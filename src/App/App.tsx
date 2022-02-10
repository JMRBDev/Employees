import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../components/theme';
import MainRouter from '../components/routing/MainRouter';
import Layout from '../components/layout/index';

const App = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <MainRouter />
    </Layout>
  </ChakraProvider>
);

export default App;
