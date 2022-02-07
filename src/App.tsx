import React from 'react';
import { ChakraProvider, Heading, Text, Link } from '@chakra-ui/react';
import theme from './components/theme';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/homePage';
import EmployeeDetail from './components/pages/employeeDetail';

const App = () => (
  <ChakraProvider theme={theme}>
    <Heading as="h1">Employee Directory</Heading>
    <Heading as="h2" size="lg">Jose Rosendo</Heading>
    <Text>This is a test paragraph</Text>
    <Link href='/'>Home</Link>
    <Link href='/employee-detail'>Employee detail</Link>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="employee-detail" element={<EmployeeDetail />} />
    </Routes>
  </ChakraProvider>
);

export default App;
