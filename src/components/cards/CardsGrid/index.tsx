import React, { useState } from 'react';
import { Flex, Grid, GridItem, Skeleton, VStack } from '@chakra-ui/react';
import EmployeeCard from '../EmployeeCard';
import Pagination from '../../pagination/Pagination';

interface ICardsGridProps {
    pages: any[][];
    pageSize: number;
    isLoaded: boolean;
};

const CardsGrid = ({ pages, pageSize, isLoaded }: ICardsGridProps) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    return (
        <VStack align="stretch">
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="5">
                {isLoaded ? pages?.[currentPage]?.map((cardData) => (
                    <GridItem key={`employee-card-${cardData.id}`}>
                        <EmployeeCard employee={cardData} />
                    </GridItem>
                )) : Array.from(Array(pageSize)).map((_, index) => (
                    <Skeleton isLoaded={isLoaded} key={`employee-card-placeholder-${index}`} p={3} borderRadius="md">
                        <GridItem>
                            <EmployeeCard />
                        </GridItem>
                    </Skeleton>
                ))}
            </Grid>
            {isLoaded && (
                <Flex w="full" justify="center" pt={12}>
                    <Pagination pages={pages.length} currentPage={currentPage} setCurrentPage={(index) => setCurrentPage(index)} />
                </Flex>
            )}
        </VStack>
    );
}

export default CardsGrid;
