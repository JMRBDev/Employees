import React, { useEffect } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changeStatus } from '../../../redux/slices/appSlice';
import { getAllEmployees } from '../../../services/EmployeeService/index';

const HomePage = () => {
    const appStatus = useSelector((state: RootState) => state.app.status);
    const dispatch = useDispatch();

    useEffect(() => {
        const _getAllEmployees = async () => {
            dispatch(changeStatus('fetching'));
            const res = await getAllEmployees();
            console.log(res);
            if (res.status === 'success') {
                dispatch(changeStatus('ready'));
            } else {
                dispatch(changeStatus('errorFetching'));
            }
        };

        _getAllEmployees();
    }, [dispatch]);
    return (
        <>
            <Heading as="h1">Employee Directory</Heading>
            <Heading as="h2" size="lg">Jose Rosendo</Heading>
            <Text>App {appStatus}</Text>
        </>
    );
}

export default HomePage;
