import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/homePage';
import EmployeePage from '../../pages/employeePage';
import { Text } from '@chakra-ui/react';

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="new" element={<Text>Employee creation form</Text>} />
            <Route path="employee/:id" element={<EmployeePage />} />
        </Routes>
    );
}

export default MainRouter;
