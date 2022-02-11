import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEmployee as createEmployeeService, getAllEmployees as getAllEmployeesService, getEmployeeById as getEmployeeByIdService, updateEmployee as updateEmployeeService, deleteEmployee as deleteEmployeeService } from 'src/services/EmployeeService';
import { changeAppState } from "src/redux/slices/appSlice";
import { saveEmployees, setCurrentEmployee } from "src/redux/slices/employeesSlice";
import APP_STATUS from "src/enums/APP_STATUS";
import { INewEmployee } from "src/interfaces";

export const createEmployee = createAsyncThunk(
    'employees/create',
    async (data: INewEmployee, { dispatch }) => {
        dispatch(changeAppState({
            status: APP_STATUS.FETCHING,
            message: 'Creating employee...'
        }));
        const res = await createEmployeeService(data);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: APP_STATUS.READY, message: 'The employee has been successfully created' }));
        } else {
            dispatch(changeAppState({
                status: APP_STATUS.ERROR_FETCHING,
                message: res.message
            }));
        }
    }
)

export const getAllEmployees = createAsyncThunk(
    'employees/getAll',
    async (_, { dispatch }) => {
        dispatch(changeAppState({
            status: APP_STATUS.FETCHING,
            message: 'Fetching employees...'
        }));
        const res = await getAllEmployeesService();

        if (res.status === 'success') {
            dispatch(changeAppState({ status: APP_STATUS.READY, message: 'Employees fetched successfully' }));
            dispatch(saveEmployees(res.data));
        } else {
            dispatch(changeAppState({
                status: APP_STATUS.ERROR_FETCHING,
                message: res.message,
            }))
        }
    }
)

export const getEmployeeById = createAsyncThunk(
    'employees/getById',
    async (id: number | string, { dispatch }) => {
        dispatch(changeAppState({
            status: APP_STATUS.FETCHING,
            message: `Fetching employee with ID ${id}...`
        }));
        const res = await getEmployeeByIdService(id);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: APP_STATUS.READY, message: `Employee with ID ${id} fetched successfully` }));
            dispatch(setCurrentEmployee(res.data));
        } else {
            dispatch(changeAppState({
                status: APP_STATUS.ERROR_FETCHING,
                message: res.message,
            }))
        }
    }
)

export const updateEmployee = createAsyncThunk(
    'employees/update',
    async (data: INewEmployee, { dispatch }) => {
        dispatch(changeAppState({
            status: APP_STATUS.FETCHING,
            message: `Updating employee with ID ${data.id}...`
        }));
        const res = await updateEmployeeService(data);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: APP_STATUS.READY, message: `Employee with ID ${data.id} updated successfully` }));
        } else {
            dispatch(changeAppState({
                status: APP_STATUS.ERROR_FETCHING,
                message: res.message,
            }))
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'employees/delete',
    async (id: number, { dispatch }) => {
        dispatch(changeAppState({
            status: APP_STATUS.FETCHING,
            message: `Deleting employee with ID ${id}...`
        }));
        const res = await deleteEmployeeService(id);

        if (res.status === 'success') {
            dispatch(changeAppState({ status: APP_STATUS.READY, message: `Employee with ID ${id} deleted successfully` }));
        } else {
            dispatch(changeAppState({
                status: APP_STATUS.ERROR_FETCHING,
                message: res.message,
            }))
        }
    }
)