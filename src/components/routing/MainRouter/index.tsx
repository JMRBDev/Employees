import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/pages/homePage';
import NewEmployeePage from 'src/components/pages/newEmployeePage';
import EditEmployeePage from 'src/components/pages/editEmployeePage';
import withRouter from 'src/hoc/withRouter';
import { useDispatch } from 'react-redux';
import { changeAppState } from 'src/redux/slices/appSlice';
import APP_STATUS from 'src/enums/APP_STATUS';

const MainRouter = ({ router }: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeAppState({ status: APP_STATUS.IDLE }));
    }, [dispatch, router.location]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="new" element={<NewEmployeePage />} />
            <Route path="employee/:id" element={<EditEmployeePage />} />
        </Routes>
    );
}

export default withRouter(MainRouter);
