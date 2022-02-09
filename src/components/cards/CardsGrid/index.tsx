import React, { useEffect } from 'react';
import { Flex, Grid, GridItem, Skeleton, useToast, VStack } from '@chakra-ui/react';
import EmployeeCard from '../EmployeeCard';
import Pagination from '../../pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setCurrentPage } from '../../../redux/slices/userPreferencesSlice';
import { changeStatus } from '../../../redux/slices/appSlice';
import { saveEmployees } from '../../../redux/slices/employeesSlice';
import { getAllEmployees } from '../../../services/EmployeeService';
import { IEmployee } from '../../../interfaces/IEmployee';

const CardsGrid = () => {
    const { pageSize, employees } = useSelector((state: RootState) => ({
        pageSize: state.userPreferences.pageSize as number,
        employees: state.employees.all as IEmployee[],
    }));

    const currentPage: number = useSelector((state: RootState) => state.userPreferences.employeesGridCurrentPage);
    const dispatch = useDispatch();
    const toast = useToast();

    const getPreparedPages = (pageSize: number) => {
        const preparedPages = [];
        for (let i = 0; i < employees.length; i += pageSize) {
            preparedPages.push(employees.slice(i, i + pageSize));
        }

        return preparedPages;
    }

    useEffect(() => {
        const _getAllEmployees = async () => {
            dispatch(changeStatus('fetching'));
            const res = await getAllEmployees();
            if (res.status === 'success') {
                dispatch(changeStatus('ready'));
                dispatch(saveEmployees(res.data));
            } else {
                dispatch(changeStatus('errorFetching'));
            }

            toast({
                title: res.status.toUpperCase(),
                description: res.message,
                status: res.status,
                duration: res.status === 'error' ? null : 5000,
                isClosable: true,
            });
        };

        _getAllEmployees();
    }, [dispatch, toast]);

    return (
        <VStack align="stretch">
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="5">
                {employees.length > 0 ? getPreparedPages(pageSize)?.[currentPage]?.map((cardData) => (
                    <GridItem key={`employee-card-${cardData.id}`}>
                        <EmployeeCard employee={cardData} />
                    </GridItem>
                )) : Array.from(Array(pageSize)).map((_, index) => (
                    <Skeleton isLoaded={employees.length > 0} key={`employee-card-placeholder-${index}`} p={3} borderRadius="md">
                        <GridItem>
                            <EmployeeCard />
                        </GridItem>
                    </Skeleton>
                ))}
            </Grid>
            {employees.length > 0 && (
                <Flex w="full" justify="center" pt={12}>
                    <Pagination pages={getPreparedPages(pageSize).length} currentPage={currentPage} setCurrentPage={(index) => dispatch(setCurrentPage(index))} />
                </Flex>
            )}
        </VStack>
    );
}

export default CardsGrid;
