import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import PaginationButton from '../PaginationButton';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface IPaginationProps {
    pages: number;
    currentPage: number;
    canPrevious: boolean;
    canNext: boolean;
    setCurrentPage: (index: number) => void;
};

const Pagination = ({ pages, currentPage, setCurrentPage, canPrevious, canNext }: IPaginationProps) => {
    return (
        <Flex>
            <PaginationButton disabled={canPrevious} setCurrentPage={setCurrentPage} index={currentPage - 1}>
                <Icon
                    as={IoIosArrowBack}
                    boxSize={4}
                />
            </PaginationButton>
            {
                Array.from(Array(pages).keys()).map((_, index) => (
                    <PaginationButton key={`pagination-${index}`} active={currentPage === index} hideOnMobile setCurrentPage={setCurrentPage} index={index}>{index + 1}</PaginationButton>
                ))
            }
            <PaginationButton disabled={canNext} setCurrentPage={setCurrentPage} index={currentPage + 1}>
                <Icon
                    as={IoIosArrowForward}
                    boxSize={4}
                />
            </PaginationButton>
        </Flex>
    );
};

export default Pagination;
