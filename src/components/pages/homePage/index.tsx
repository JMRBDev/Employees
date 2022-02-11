import React from 'react';
import { VStack, Flex, Heading, HStack, Text, IconButton, Icon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IoReload } from 'react-icons/io5';
import CardsGrid from 'src/components/cards/CardsGrid';
import { RootState } from 'src/redux/store';
import { IEmployee } from 'src/interfaces';
import APP_STATUS from 'src/enums/APP_STATUS';
import { getAllEmployees } from 'src/redux/thunks/employeesThunks';

const HomePage = () => {
    const { appState } = useSelector((state: RootState) => ({
        pageSize: state.userPreferences.pageSize as number,
        currentPage: state.userPreferences.employeesGridCurrentPage as number,
        employees: state.employees.all as IEmployee[],
        appState: state.app.appState,
    }));

    const dispatch = useDispatch();

    return (
        <VStack align="stretch" gap={6}>
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
                <Heading as="h1" size="lg">All employees</Heading>
                <HStack justify="space-between">
                    {appState.status === APP_STATUS.ERROR_FETCHING && (
                        <Text color="gray.500" fontSize="xs">These results have been pre-cached and may not be updated.</Text>
                    )}
                    <IconButton isLoading={appState.status === APP_STATUS.FETCHING} aria-label="reload" onClick={() => dispatch(getAllEmployees())} icon={<Icon as={IoReload} />} />
                </HStack>
            </Flex>

            <CardsGrid />
        </VStack>
    );
}

export default HomePage;
