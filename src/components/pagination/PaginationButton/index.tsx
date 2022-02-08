import React from 'react';
import { Button } from "@chakra-ui/react";

interface IPaginationButtonProps {
    hideOnMobile?: boolean;
    active?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    setCurrentPage: (index: number) => void;
    index: number;
};

const PaginationButton = ({ hideOnMobile, active, children, disabled = false, setCurrentPage, index }: IPaginationButtonProps) => {
    return (
        <Button
            display={hideOnMobile && !active ? { base: "none", sm: "block" } : "block"}
            disabled={disabled}
            colorScheme="gray"
            bg={active ? "gray.600" : "gray.900"}
            color={active ? "gray.50" : "gray.400"}
            onClick={() => setCurrentPage(index)}
        >
            {children}
        </Button>
    );
};

export default PaginationButton;