import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEmployee as createEmployeeService, getAllEmployees as getAllEmployeesService } from '../../services/EmployeeService';
import { changeAppState } from "../slices/appSlice";
import { saveEmployees } from "../slices/employeesSlice";

export interface INewEmployee {
    name: string;
    salary: number;
    age: number;
};

export const createEmployee = createAsyncThunk(
    'employees/create',
    async (data: INewEmployee, { dispatch }) => {
        dispatch(changeAppState({
            status: 'fetching',
            message: 'Creating employee...'
        }));
        const res = await createEmployeeService(data);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: 'ready', message: 'The employee has been successfully created' }));
        } else {
            dispatch(changeAppState({
                status: 'errorFetching',
                message: res.message
            }));
        }
    }
)

export const getAllEmployees = createAsyncThunk(
    'employees/getAll',
    async (_, { dispatch }) => {
        dispatch(changeAppState({
            status: 'fetching',
            message: 'Fetching employees...'
        }));
        const res = await getAllEmployeesService();

        if (res.status === 'success') {
            dispatch(changeAppState({ status: 'ready', message: 'Employees fetched successfully' }));
            dispatch(saveEmployees(res.data));
        } else {
            dispatch(changeAppState({
                status: 'errorFetching',
                message: res.message,
            }))
        }
    }
)