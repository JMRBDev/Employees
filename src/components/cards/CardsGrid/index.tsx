import React, { useCallback, useEffect } from 'react';
import { Flex, Grid, GridItem, Heading, HStack, Icon, IconButton, Skeleton, VStack, useToast, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { IoReload, IoReloadCircle } from 'react-icons/io5';
import EmployeeCard from '../EmployeeCard';
import Pagination from '../../pagination/Pagination';
import { RootState } from '../../../redux/store';
import { setCurrentPage } from '../../../redux/slices/userPreferencesSlice';
import { getAllEmployees } from '../../../redux/thunks/employeesThunks';
import { IEmployee } from '../../../interfaces/IEmployee';
import Alert from '../../alerts/Alert';

const CardsGrid = () => {
    const { pageSize, currentPage, employees, appState } = useSelector((state: RootState) => ({
        pageSize: state.userPreferences.pageSize as number,
        currentPage: state.userPreferences.employeesGridCurrentPage as number,
        employees: state.employees.all as IEmployee[],
        appState: state.app.appState,
    }));

    const dispatch = useDispatch();

    const getPreparedPages = (pageSize: number) => {
        const preparedPages = [];
        for (let i = 0; i < employees.length; i += pageSize) {
            preparedPages.push(employees.slice(i, i + pageSize));
        }

        return preparedPages;
    }

    const toast = useToast();

    const handleReload = useCallback(
        () => {
            toast.closeAll();
            dispatch(getAllEmployees())
        },
        [dispatch, toast],
    );

    useEffect(() => {
        if (employees.length === 0) {
            dispatch(getAllEmployees());
        }
    }, [employees.length, dispatch]);

    useEffect(() => {
        if (appState.status === 'errorFetching') {
            toast({
                render: () => (
                    <Alert
                        type="error"
                        message={appState.message}
                        actionButton={{
                            icon: IoReloadCircle,
                            onClick: () => {
                                handleReload();
                            }
                        }}
                    />
                ),
                isClosable: false,
                duration: 5000,
            });
        } else if (appState.status === 'ready') {
            toast({
                render: () => (
                    <Alert
                        type="success"
                        message={appState.message}
                    />
                ),
                isClosable: false,
                duration: 5000,
            });
        }
    }, [appState, handleReload, dispatch, toast]);

    return (
        <VStack align="stretch">
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
                <Heading as="h2" size="lg">All employees</Heading>
                <HStack justify="space-between">
                    {appState.status === 'errorFetching' && (
                        <Text color="gray.500" fontSize="xx-small">These results have been pre-cached and may not be updated.</Text>
                    )}
                    <IconButton isLoading={appState.status === 'fetching'} aria-label="reload-employees" onClick={handleReload} icon={<Icon as={IoReload} />} />
                </HStack>
            </Flex>
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="5">
                {appState.status !== 'fetching' && employees.length > 0 ? getPreparedPages(pageSize)?.[currentPage]?.map((cardData) => (
                    <GridItem key={`employee-card-${cardData.id}`}>
                        <EmployeeCard employee={cardData} isLink />
                    </GridItem>
                )) : Array.from(Array(pageSize)).map((_, index) => (
                    <Skeleton isLoaded={appState.status !== 'fetching' && employees.length > 0} key={`employee-card-placeholder-${index}`} p={3} borderRadius="md">
                        <GridItem>
                            <EmployeeCard />
                        </GridItem>
                    </Skeleton>
                ))}
            </Grid>
            {(appState.status !== 'fetching' && employees.length > 0) && (
                <Flex w="full" justify="center" pt={12}>
                    <Pagination pages={getPreparedPages(pageSize).length} currentPage={currentPage} setCurrentPage={(index) => dispatch(setCurrentPage(index))} />
                </Flex>
            )}
        </VStack>
    );
}

export default CardsGrid;
