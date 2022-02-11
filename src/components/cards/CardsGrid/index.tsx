import React, { useCallback, useEffect } from 'react';
import { Flex, Grid, GridItem, Heading, HStack, Icon, IconButton, Skeleton, VStack, useToast, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { IoReload } from 'react-icons/io5';
import EmployeeCard from 'src/components/cards/EmployeeCard';
import Pagination from 'src/components/pagination/Pagination';
import { RootState } from 'src/redux/store';
import { setCurrentPage } from 'src/redux/slices/userPreferencesSlice';
import { getAllEmployees } from 'src/redux/thunks/employeesThunks';
import { IEmployee } from 'src/interfaces';
import APP_STATUS from 'src/enums/APP_STATUS';

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

    return (
        <VStack align="stretch">
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
                <Heading as="h2" size="lg">All employees</Heading>
                <HStack justify="space-between">
                    {appState.status === APP_STATUS.ERROR_FETCHING && (
                        <Text color="gray.500" fontSize="xx-small">These results have been pre-cached and may not be updated.</Text>
                    )}
                    <IconButton isLoading={appState.status === APP_STATUS.FETCHING} aria-label="reload-employees" onClick={handleReload} icon={<Icon as={IoReload} />} />
                </HStack>
            </Flex>
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="5">
                {appState.status !== APP_STATUS.FETCHING && employees.length > 0 ? getPreparedPages(pageSize)?.[currentPage]?.map((cardData) => (
                    <GridItem key={`employee-card-${cardData.id}`}>
                        <EmployeeCard employee={cardData} isLink />
                    </GridItem>
                )) : Array.from(Array(pageSize)).map((_, index) => (
                    <Skeleton isLoaded={appState.status !== APP_STATUS.FETCHING && employees.length > 0} key={`employee-card-placeholder-${index}`} p={3} borderRadius="md">
                        <GridItem>
                            <EmployeeCard />
                        </GridItem>
                    </Skeleton>
                ))}
            </Grid>
            {(appState.status !== APP_STATUS.FETCHING && employees.length > 0) && (
                <Flex w="full" justify="center" pt={12}>
                    <Pagination pages={getPreparedPages(pageSize).length} currentPage={currentPage} setCurrentPage={(index) => dispatch(setCurrentPage(index))} />
                </Flex>
            )}
        </VStack>
    );
}

export default CardsGrid;
