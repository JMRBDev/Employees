import React from 'react';
import { Button } from "@chakra-ui/react";

interface IPaginationButtonProps {
    hideOnMobile?: boolean;
    active?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    setCurrentPage?: (index: number) => void;
    index?: number;
};

const PaginationButton = ({ hideOnMobile, active, children, disabled = false, setCurrentPage, index }: IPaginationButtonProps) => {
    return (
        <Button
            mx={1}
            px={4}
            py={2}
            rounded="md"
            display={hideOnMobile && !active ? { base: "none", sm: "block" } : "block"}
            disabled={disabled}
            colorScheme="gray"
            bg={active ? "gray.600" : "gray.900"}
            color={active ? "gray.50" : "gray.400"}
            onClick={setCurrentPage ? () => setCurrentPage(index || 0) : undefined}
        >
            {children}
        </Button>
    );
};

export default PaginationButton;