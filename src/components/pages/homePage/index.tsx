import React, { useEffect, useState } from 'react';
import { Heading, Text, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changeStatus } from '../../../redux/slices/appSlice';
import { getAllEmployees } from '../../../services/EmployeeService/index';
import { IEmployee } from '../../../interfaces/IEmployee';
import CardsGrid from '../../cards/CardsGrid/index';

const HomePage = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    const appStatus = useSelector((state: RootState) => state.app.status);
    const pageSize = useSelector((state: RootState) => state.userPreferences.pageSize);
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
            <CardsGrid pages={getPreparedPages(pageSize)} pageSize={pageSize} isLoaded={employees.length > 0} />
        </>
    );
}

export default HomePage;
