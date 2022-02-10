import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/homePage';
import NewEmployeePage from '../../pages/newEmployeePage';
import EditEmployeePage from '../../pages/editEmployeePage';

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="new" element={<NewEmployeePage />} />
            <Route path="employee/:id" element={<EditEmployeePage />} />
        </Routes>
    );
}

export default MainRouter;
