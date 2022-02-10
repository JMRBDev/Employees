import React, { useEffect } from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Grid, VStack, Text, Spacer, Flex, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from '../../cards/EmployeeCard';
import { createEmployee as createEmployeeThunk, INewEmployee } from '../../../redux/thunks/employeesThunks';
import { RootState } from '../../../redux/store';
import Alert from '../../alerts/Alert';
import { IoReloadCircle } from 'react-icons/io5';

const NewEmployeePage = () => {
    const dispatch = useDispatch();

    const FormSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
        age: Yup.number().typeError('Age must be a number').required('Age is required'),
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

    const toast = useToast();

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
                                toast.closeAll();
                                dispatch(createEmployeeThunk(watch()));
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
                isClosable: true,
                duration: 5000,
            });
        }
    }, [appState, dispatch, toast, watch]);

    return (
        <Flex direction="column" gap={12} align="stretch">
            <Heading>New employee</Heading>
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
                        <NumberInput>
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
                        <NumberInput>
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

                    <Button isLoading={appState.status === 'fetching'} type="submit" disabled={!!Object.keys(errors).length || appState.status === 'fetching'}>
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