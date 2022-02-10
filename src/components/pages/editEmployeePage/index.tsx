import React, { useEffect, useState } from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack, Spacer, Flex, useToast, IconButton, HStack, Icon, Spinner } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployeeById, INewEmployee, updateEmployee } from '../../../redux/thunks/employeesThunks';
import { RootState } from '../../../redux/store';
import Alert from '../../alerts/Alert';
import { IoReloadCircle, IoTrash } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentEmployee } from '../../../redux/slices/employeesSlice';

const EditEmployeePage = () => {
    const [isDeleteSecondStep, setIsDeleteSecondStep] = useState(false);

    const { id } = useParams();

    const dispatch = useDispatch();
    const toast = useToast();

    const { appState, currentEmployee } = useSelector((state: RootState) => ({
        appState: state.app.appState,
        currentEmployee: state.employees.current,
    }));

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
            defaultValues: {
                name: currentEmployee?.employee_name,
                salary: currentEmployee?.employee_salary,
                age: currentEmployee?.employee_age,
            }
        });
    }

    const { register, handleSubmit, formState: { errors }, watch } = useCreateForm();
    const onSubmit: SubmitHandler<INewEmployee> = () => {
        dispatch(updateEmployee({ id: Number(id), ...watch() }))
    };

    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteEmployee(Number(id)));
        navigate('/')
    };

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
                                dispatch(updateEmployee({ id: Number(id), ...watch() }));
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
    }, [appState, dispatch, id, toast, watch]);

    useEffect(() => {
        dispatch(getEmployeeById(Number(id)));

        return () => {
            dispatch(setCurrentEmployee(undefined));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!currentEmployee) {
        return (
            <Flex justify="center" align="center" h="full">
                <Spinner size="xl" color="brand.300" />
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap={12} align="stretch">
            <HStack>
                <Heading>{currentEmployee?.employee_name}</Heading>
                {
                    isDeleteSecondStep ? (
                        <>
                            <Button colorScheme="green" onClick={handleDelete}>Confirm</Button>
                            <Button colorScheme="red" variant="outline" onClick={() => setIsDeleteSecondStep(false)}>Cancel</Button>
                        </>
                    ) : (
                        <IconButton aria-label="delete-employee-button" onClick={() => setIsDeleteSecondStep(true)} colorScheme="red" icon={<Icon as={IoTrash} />} />
                    )
                }
            </HStack>
            <VStack as="form" gap={3} align="stretch" onSubmit={handleSubmit(onSubmit)} w="full">
                <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input {...register('name')} defaultValue={currentEmployee.employee_name} />
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
                    <NumberInput defaultValue={currentEmployee.employee_salary}>
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
                    <NumberInput defaultValue={currentEmployee.employee_age}>
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
        </Flex >
    );
};

export default EditEmployeePage;
