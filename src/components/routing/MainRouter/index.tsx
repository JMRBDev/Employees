import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/pages/homePage';
import NewEmployeePage from 'src/components/pages/newEmployeePage';
import EditEmployeePage from 'src/components/pages/editEmployeePage';

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
