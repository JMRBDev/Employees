import React from 'react';
import { Avatar, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { NavLink as Link } from 'react-router-dom';
import { IEmployee } from '../../../interfaces/IEmployee';

interface IEmployeeCardProps {
    employee?: IEmployee;
};

const EmployeeCard = ({ employee }: IEmployeeCardProps) => {
    return (
        <Link to={`employee/${employee?.id}`}>
            <VStack p={6} gap={1} bg="gray.600" borderRadius="md" overflow="hidden" boxShadow="md">
                <Avatar name={employee?.employee_name} src={employee?.employee_image} />
                <Divider />
                <VStack spacing={0} margin="auto" overflow="hidden" maxW="100%">
                    <Heading as="h3" size="md" maxW="100%" isTruncated>
                        {employee?.employee_name || 'Name'}
                    </Heading>
                    <Text color="gray.400" fontSize="sm" maxW="100%" isTruncated>
                        $
                        <Text as="span" fontWeight="bold">
                            {employee?.employee_salary || 'Salary'}
                        </Text>
                        {' '}
                        / year</Text>
                    <Text color="gray.400" fontSize="sm" maxW="100%" isTruncated>
                        <Text as="span" fontWeight="bold">
                            {employee?.employee_age || 'Age'}
                        </Text>
                        {' '}
                        years old
                    </Text>
                </VStack>
            </VStack>
        </Link>
    );
}

export default EmployeeCard;
