import React from 'react';
import { Flex, Grid, GridItem, Skeleton, VStack } from '@chakra-ui/react';
import EmployeeCard from '../EmployeeCard';
import Pagination from '../../pagination/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setCurrentPage } from '../../../redux/slices/userPreferencesSlice';

interface ICardsGridProps {
    pages: any[][];
    pageSize: number;
    isLoaded: boolean;
};

const CardsGrid = ({ pages, pageSize, isLoaded }: ICardsGridProps) => {
    const currentPage = useSelector((state: RootState) => state.userPreferences.employeesGridCurrentPage);
    const dispatch = useDispatch();

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
                    <Pagination pages={pages.length} currentPage={currentPage} setCurrentPage={(index) => dispatch(setCurrentPage(index))} />
                </Flex>
            )}
        </VStack>
    );
}

export default CardsGrid;
