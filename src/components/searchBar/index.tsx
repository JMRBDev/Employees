import React, { ChangeEvent, useState, useRef, } from 'react';
import { Box, FormControl, HStack, Input } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IEmployee } from 'src/interfaces';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [foundResults, setFoundResults] = useState<IEmployee[]>([]);

    const navigate = useNavigate();

    const { employees } = useSelector((state: RootState) => ({
        employees: state.employees.all as IEmployee[],
    }));

    const formRef = useRef<HTMLFormElement>(null);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setIsSearching(true);
            setFoundResults(employees.filter((employee) => employee.employee_name.toLowerCase().includes(event.target.value.toLowerCase())));
        }
    }

    const handleClickResult = (employee: IEmployee) => {
        navigate(`employee/${employee.id}`);
    }

    const handleOnBlur = () => {
        setIsSearching(false);
        if (formRef.current) {
            formRef.current.reset();
        }
    }

    return (
        <FormControl as={HStack} w="auto">
            <Box position="relative">
                <form ref={formRef}>
                    <Input placeholder="Search employee" onFocus={handleSearch} onChange={handleSearch} onBlur={handleOnBlur} />
                    {isSearching && (
                        <Box position="absolute" overflow="auto" bg="gray.900" w="full" maxH={64} mt={2} borderRadius={3}>
                            {foundResults.map((employee) => (
                                <Box key={`search-item${employee.id}`} onMouseDown={() => handleClickResult(employee)} py={2} px={4} _hover={{ bg: 'gray.600' }}>
                                    {employee.employee_name}
                                </Box>
                            ))}
                        </Box>
                    )}
                </form>
            </Box>
        </FormControl>
    );
}

export default SearchBar;
