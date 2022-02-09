import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/homePage';
import EmployeePage from '../../pages/employeePage';

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="new" element={<EmployeePage />} />
            <Route path="employee/:id" element={<EmployeePage />} />
        </Routes>
    );
}

export default MainRouter;
