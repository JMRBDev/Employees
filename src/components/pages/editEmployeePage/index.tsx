import React, { useEffect, useState } from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack, Spacer, Flex, IconButton, HStack, Icon, Skeleton } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployeeById, updateEmployee } from 'src/redux/thunks/employeesThunks';
import { RootState } from 'src/redux/store';
import { IoReload, IoTrash } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentEmployee } from 'src/redux/slices/employeesSlice';
import { INewEmployee } from 'src/interfaces';
import APP_STATUS from 'src/enums/APP_STATUS';

const EditEmployeePage = () => {
    const [isDeleteSecondStep, setIsDeleteSecondStep] = useState(false);

    const { id } = useParams();

    const dispatch = useDispatch();

    const { appState, currentEmployee } = useSelector((state: RootState) => ({
        appState: state.app.appState,
        currentEmployee: state.employees.current,
    }));

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

    const { register, handleSubmit, formState: { errors } } = useCreateForm();
    const onSubmit: SubmitHandler<INewEmployee> = (data) => {
        dispatch(updateEmployee({ id: Number(id), ...data }))
    };

    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteEmployee(Number(id)));
        navigate('/')
    };

    useEffect(() => {
        dispatch(getEmployeeById(Number(id)));

        return () => {
            dispatch(setCurrentEmployee(undefined));
        }
    }, [dispatch, id]);

    return (
        <VStack align="stretch">
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
                <Heading as="h1" size="lg">Employee details</Heading>
                <HStack>
                    <Skeleton isLoaded={appState.status === APP_STATUS.READY}>
                        {
                            isDeleteSecondStep ? (
                                <HStack align="end">
                                    <Button colorScheme="green" onClick={handleDelete}>Confirm</Button>
                                    <Button colorScheme="red" variant="outline" onClick={() => setIsDeleteSecondStep(false)}>Cancel</Button>
                                </HStack>
                            ) : (
                                <IconButton aria-label="delete-employee-button" onClick={() => setIsDeleteSecondStep(true)} colorScheme="red" icon={<Icon as={IoTrash} />} />
                            )
                        }
                    </Skeleton>
                    <IconButton isLoading={appState.status === APP_STATUS.FETCHING} aria-label="reload" onClick={() => dispatch(getEmployeeById(Number(id)))} icon={<Icon as={IoReload} />} />
                </HStack>
            </Flex>
            <VStack as="form" gap={3} align="stretch" onSubmit={handleSubmit(onSubmit)} w="full">
                <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    {(appState.status === APP_STATUS.READY && currentEmployee?.employee_name) ? (
                        <Input {...register('name')} defaultValue={currentEmployee?.employee_name} />
                    ) : (
                        <Skeleton>
                            <Input />
                        </Skeleton>
                    )}
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
                    {(appState.status === APP_STATUS.READY && currentEmployee?.employee_salary) ? (
                        <NumberInput min={0} defaultValue={currentEmployee?.employee_salary}>
                            <NumberInputField {...register('salary')} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    ) : (
                        <Skeleton>
                            <Input />
                        </Skeleton>
                    )}
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
                    {(appState.status === APP_STATUS.READY && currentEmployee?.employee_age) ? (
                        <NumberInput min={0} max={125} defaultValue={currentEmployee?.employee_age}>
                            <NumberInputField {...register('age')} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    ) : (
                        <Skeleton>
                            <Input />
                        </Skeleton>
                    )}
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
        </VStack >
    );
};

export default EditEmployeePage;
