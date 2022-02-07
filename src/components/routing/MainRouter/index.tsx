import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/homePage';
import EmployeePage from '../../pages/employeePage';

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="employee" element={<EmployeePage />} />
        </Routes>
    );
}

export default MainRouter;
