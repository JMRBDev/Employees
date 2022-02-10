import React from 'react';
import { Box, VStack, Container, Text, Divider } from '@chakra-ui/react';
import Navbar from 'src/components/navigation/Navbar';

interface ILayoutProps {
    children: React.ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
    return (
        <Box as="main">
            <Navbar />
            <VStack as={Container} maxW="container.md" minH="100vh">
                <Box pt={24} w="full" flex={1}>
                    {children}
                </Box>
                <Box w="full" py={16}>
                    <Divider mb={6} />
                    <Text>Footer</Text>
                </Box>
            </VStack>

        </Box>
    );
}

export default Layout;
