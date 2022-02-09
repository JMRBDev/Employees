import React from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Box, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { IEmployee } from '../../../interfaces/IEmployee';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const FormSchema = Yup.object().shape({
    employee_name: Yup.string().required('Name is required'),
    employee_salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
    employee_age: Yup.number().typeError('Age must be a number').required('Age is required'),
    employee_image: Yup.mixed()
        .test(
            "fileSize",
            "File size is too large (5MB max.)",
            (value) => value[0].size <= 5242880 && value[0].size > 0)
        .test(
            "fileType",
            "Only jpg, png and jpeg are supported",
            (value) => ["image/jpeg", "image/png", "image/jpg"].includes(value.type)),
});

const useCreateForm = () => {
    return useForm<IEmployee>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(FormSchema),
    });
}

const EmployeePage = () => {
    const { register, handleSubmit, formState: { errors } } = useCreateForm();
    const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

    console.log({ errors })

    return (
        <>
            <Heading>New employee</Heading>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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

                <FormControl isInvalid={!!errors.employee_image}>
                    <FormLabel htmlFor='employee_image'>Image</FormLabel>
                    <Input {...register('employee_image')} />
                    {!errors.employee_image ? (
                        <FormHelperText>
                            Employee profile image.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{errors.employee_image?.message}</FormErrorMessage>

                    )}
                </FormControl>
                <Button type="submit" disabled={!!Object.keys(errors).length}>
                    Submit
                </Button>
            </Box>
        </>
    )
}

export default EmployeePage;
