import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, useToast, Flex, Skeleton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changeStatus } from '../../../redux/slices/appSlice';
import { getAllEmployees } from '../../../services/EmployeeService/index';
import EmployeeCard from '../../cards/EmployeeCard';
import { IEmployee } from '../../../interfaces/IEmployee';
import Pagination from '../../pagination/Pagination';

const HomePage = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const appStatus = useSelector((state: RootState) => state.app.status);
    const dispatch = useDispatch();

    const toast = useToast();

    const pageSize = 6;

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
                setEmployees(res.data);
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
        <>
            <Heading as="h1">Employee Directory</Heading>
            <Heading as="h2" size="lg">Jose Rosendo</Heading>
            <Text>App {appStatus}</Text>
            {
                employees.length > 0 ? (
                    <Grid templateColumns="repeat(3, 1fr)" gap="5">
                        {
                            getPreparedPages(pageSize)?.[currentPage]?.map((employee: IEmployee) => (
                                <GridItem key={`employee-card-${employee.id}`}>
                                    <EmployeeCard employee={employee} />
                                </GridItem>
                            ))
                        }
                    </Grid>
                ) : (
                    <Grid templateColumns="repeat(3, 1fr)" gap="5">
                        {Array.from(Array(pageSize).keys()).map((_, index) => (
                            <Skeleton key={`employee-card-placeholder-${index}`}>
                                <EmployeeCard />
                            </Skeleton>
                        ))}
                    </Grid>
                )
            }
            {
                employees.length > 0 && (
                    <Flex w="full" justify="center" pt={12}>
                        <Pagination pages={getPreparedPages(pageSize).length} currentPage={currentPage} setCurrentPage={(index) => setCurrentPage(index)} canPrevious={currentPage === 0} canNext={currentPage === getPreparedPages(pageSize).length - 1} />
                    </Flex>
                )
            }
        </>
    );
}

export default HomePage;
