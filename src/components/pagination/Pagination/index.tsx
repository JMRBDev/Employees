import React from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import PaginationButton from '../PaginationButton';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface IPaginationProps {
    pages: number;
    currentPage: number;
    setCurrentPage: (index: number) => void;
};

const Pagination = ({ pages, currentPage, setCurrentPage }: IPaginationProps) => {
    return (
        <HStack>
            <PaginationButton disabled={currentPage === 0} setCurrentPage={setCurrentPage} index={currentPage - 1}>
                <Icon as={IoIosArrowBack} />
            </PaginationButton>
            {
                Array.from(Array(pages).keys()).map((_, index) => (
                    <PaginationButton key={`pagination-${index}`} active={currentPage === index} hideOnMobile setCurrentPage={setCurrentPage} index={index}>{index + 1}</PaginationButton>
                ))
            }
            <PaginationButton disabled={currentPage === pages - 1} setCurrentPage={setCurrentPage} index={currentPage + 1}>
                <Icon as={IoIosArrowForward} />
            </PaginationButton>
        </HStack>
    );
};

export default Pagination;
