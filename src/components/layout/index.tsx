import React, { useEffect } from 'react';
import { Box, VStack, Container, Divider, useToast } from '@chakra-ui/react';
import Navbar from 'src/components/navigation/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import APP_STATUS from 'src/enums/APP_STATUS';
import Footer from 'src/components/footer';

interface ILayoutProps {
    children: React.ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
    const { appState } = useSelector((state: RootState) => ({
        appState: state.app.appState,
    }));

    const toast = useToast();

    useEffect(() => {
        if (appState.status === APP_STATUS.FETCHING) {
            toast({
                title: 'Info',
                description: appState.message,
                status: 'info',
                isClosable: true,
            });
        } else if (appState.status === APP_STATUS.ERROR_FETCHING) {
            toast({
                title: 'Error',
                description: appState.message,
                status: 'error',
                isClosable: true,
            });
        } else {
            toast.closeAll();
        }
    }, [appState.status, appState.message, toast]);

    return (
        <Box as="main">
            <Navbar />
            <VStack as={Container} maxW="container.md" minH="100vh">
                <Box pt={24} w="full" flex={1}>
                    {children}
                </Box>
                <Box w="full" py={16}>
                    <Divider mb={6} />
                    <Footer />
                </Box>
            </VStack>

        </Box>
    );
}

export default Layout;
