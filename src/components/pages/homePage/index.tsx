import React, { useEffect, useState } from 'react';
import { Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changeStatus } from '../../../redux/slices/appSlice';
import { getAllEmployees } from '../../../services/EmployeeService/index';
import EmployeeCard from '../../cards/EmployeeCard';
import { IEmployee } from '../../../interfaces/IEmployee';

const HomePage = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const appStatus = useSelector((state: RootState) => state.app.status);
    const dispatch = useDispatch();

    const toast = useToast();

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
            <Grid templateColumns="repeat(3, 1fr)" gap="5">
                {
                    employees.map((employee: IEmployee) => (
                        <GridItem key={`employee-card-${employee.id}`}>
                            <EmployeeCard employee={employee} />
                        </GridItem>
                    ))
                }
            </Grid>
        </>
    );
}

export default HomePage;
