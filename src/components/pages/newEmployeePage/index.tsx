import React from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Grid, VStack, Text, Spacer, Flex } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from 'src/components/cards/EmployeeCard';
import { createEmployee as createEmployeeThunk } from 'src/redux/thunks/employeesThunks';
import { RootState } from 'src/redux/store';
import { INewEmployee } from 'src/interfaces';
import APP_STATUS from 'src/enums/APP_STATUS';

const NewEmployeePage = () => {
    const dispatch = useDispatch();

    const FormSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        salary: Yup.number().required('Salary is required').typeError('Salary must be a number').min(0, 'Salary must be greater than 0'),
        age: Yup.number().required('Age is required').typeError('Age must be a number').min(0, 'Age must be greater than 0').max(125, 'Age must be less than 125'),
    });

    const useCreateForm = () => {
        return useForm<INewEmployee>({
            mode: 'onChange',
            reValidateMode: 'onChange',
            resolver: yupResolver(FormSchema),
        });
    }

    const { register, handleSubmit, formState: { errors }, watch } = useCreateForm();
    const onSubmit: SubmitHandler<INewEmployee> = () => {
        dispatch(createEmployeeThunk(watch()));
    };

    const { appState } = useSelector((state: RootState) => ({
        appState: state.app.appState,
    }));

    return (
        <Flex direction="column" gap={12} align="stretch">
            <Heading as="h1" size="lg">New employee</Heading>
            <Grid gap={8} gridTemplateColumns={{ base: '1fr', sm: '2fr 1fr' }} alignItems="flex-start">
                <VStack as="form" gap={3} align="stretch" onSubmit={handleSubmit(onSubmit)} w="full">
                    <FormControl isRequired isInvalid={!!errors.name}>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input {...register('name')} />
                        {!errors.name ? (
                            <FormHelperText>
                                Employee name.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.salary}>
                        <FormLabel htmlFor='salary'>Salary</FormLabel>
                        <NumberInput min={0}>
                            <NumberInputField {...register('salary')} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        {!errors.salary ? (
                            <FormHelperText>
                                Employee salary.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>{errors.salary?.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.age}>
                        <FormLabel htmlFor='age'>Age</FormLabel>
                        <NumberInput min={0} max={125}>
                            <NumberInputField {...register('age')} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        {!errors.age ? (
                            <FormHelperText>
                                Employee age.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
                        )}
                    </FormControl>

                    <Spacer />

                    <Button isLoading={appState.status === APP_STATUS.FETCHING} type="submit" disabled={!!Object.keys(errors).length || appState.status === APP_STATUS.FETCHING}>
                        Submit
                    </Button>
                </VStack>

                <VStack align="stretch" justify="space-between" bg="gray.700" overflow="hidden" h="full" p={3} borderRadius={16}>
                    <EmployeeCard employee={{
                        employee_name: watch().name || 'Name',
                        employee_salary: watch().salary || 0,
                        employee_age: watch().age || 18,
                    }} />
                    <Text align="center" color="gray.500">Preview card</Text>
                </VStack>
            </Grid>
        </Flex>
    );
};

export default NewEmployeePage;
