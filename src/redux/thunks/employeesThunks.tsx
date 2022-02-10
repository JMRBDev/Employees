import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEmployee as createEmployeeService, getAllEmployees as getAllEmployeesService, getEmployeeById as getEmployeeByIdService, updateEmployee as updateEmployeeService, deleteEmployee as deleteEmployeeService } from '../../services/EmployeeService';
import { changeAppState } from "../slices/appSlice";
import { saveEmployees, setCurrentEmployee } from "../slices/employeesSlice";

export interface INewEmployee {
    id?: number;
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

export const getEmployeeById = createAsyncThunk(
    'employees/getById',
    async (id: number | string, { dispatch }) => {
        dispatch(changeAppState({
            status: 'fetching',
            message: `Fetching employee with ID ${id}...`
        }));
        const res = await getEmployeeByIdService(id);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: 'ready', message: `Employee with ID ${id} fetched successfully` }));
            dispatch(setCurrentEmployee(res.data));
        } else {
            dispatch(changeAppState({
                status: 'errorFetching',
                message: res.message,
            }))
        }
    }
)

export const updateEmployee = createAsyncThunk(
    'employees/update',
    async (data: INewEmployee, { dispatch }) => {
        dispatch(changeAppState({
            status: 'fetching',
            message: `Updating employee with ID ${data.id}...`
        }));
        const res = await updateEmployeeService(data);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: 'ready', message: `Employee with ID ${data.id} updated successfully` }));
        } else {
            dispatch(changeAppState({
                status: 'errorFetching',
                message: res.message,
            }))
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'employees/delete',
    async (id: number, { dispatch }) => {
        dispatch(changeAppState({
            status: 'fetching',
            message: `Deleting employee with ID ${id}...`
        }));
        const res = await deleteEmployeeService(id);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: 'ready', message: `Employee with ID ${id} deleted successfully` }));
        } else {
            dispatch(changeAppState({
                status: 'errorFetching',
                message: res.message,
            }))
        }
    }
)