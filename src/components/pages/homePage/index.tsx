import React from 'react';
import { Heading } from '@chakra-ui/react';
import CardsGrid from '../../cards/CardsGrid/index';

const HomePage = () => {
    return (
        <>
            <Heading as="h1">Employee Directory</Heading>
            <Heading as="h2" size="lg">Jose Rosendo</Heading>
            <CardsGrid />
        </>
    );
}

export default HomePage;
