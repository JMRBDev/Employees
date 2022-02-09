import React from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast, Grid, VStack, Text, Spacer } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IEmployee } from '../../../interfaces/IEmployee';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../../redux/slices/appSlice';
import { createEmployee } from '../../../services/EmployeeService';
import EmployeeCard from '../../cards/EmployeeCard';

const EmployeePage = () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const FormSchema = Yup.object().shape({
        employee_name: Yup.string().required('Name is required'),
        employee_salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
        employee_age: Yup.number().typeError('Age must be a number').required('Age is required'),
    });

    const useCreateForm = () => {
        return useForm<IEmployee>({
            mode: 'onChange',
            reValidateMode: 'onChange',
            resolver: yupResolver(FormSchema),
        });
    }

    const { register, handleSubmit, formState: { errors }, watch } = useCreateForm();
    const onSubmit: SubmitHandler<IEmployee> = (data) => {
        const _createEmployee = async () => {
            dispatch(changeStatus('fetching'));
            const res = await createEmployee(data);
            if (res.status === 'success') {
                dispatch(changeStatus('ready'));
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

        _createEmployee();
    };

    return (
        <>
            <Heading>New employee</Heading>
            <Grid gap={8} gridTemplateColumns={{ base: '1fr', sm: '2fr 1fr' }} alignItems="flex-start">
                <VStack as="form" gap={3} align="stretch" onSubmit={handleSubmit(onSubmit)} w="full">
                    <FormControl isRequired isInvalid={!!errors.employee_name}>
                        <FormLabel htmlFor='employee_name'>Name</FormLabel>
                        <Input {...register('employee_name')} />
                        {!errors.employee_name ? (
                            <FormHelperText>
                                Employee name.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>{errors.employee_name?.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.employee_salary}>
                        <FormLabel htmlFor='employee_salary'>Salary</FormLabel>
                        <NumberInput>
                            <NumberInputField {...register('employee_salary')} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        {!errors.employee_salary ? (
                            <FormHelperText>
                                Employee salary.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>{errors.employee_salary?.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.employee_age}>
                        <FormLabel htmlFor='employee_age'>Age</FormLabel>
                        <Input type="number" {...register('employee_age')} />
                        {!errors.employee_age ? (
                            <FormHelperText>
                                Employee age.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>{errors.employee_age?.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <Spacer />

                    <Button type="submit" disabled={!!Object.keys(errors).length}>
                        Submit
                    </Button>
                </VStack>

                <VStack align="stretch" justify="space-between" bg="gray.700" overflow="hidden" h="full" p={3} borderRadius={16}>
                    <EmployeeCard employee={{
                        employee_name: watch().employee_name,
                        employee_salary: watch().employee_salary,
                        employee_age: watch().employee_age,
                    }} />
                    <Text align="center" color="gray.500">Preview card</Text>
                </VStack>
            </Grid>
        </>
    );
};

export default EmployeePage;
