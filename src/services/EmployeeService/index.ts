import axios from 'axios';
import { API_URL } from 'src/constants';
import { INewEmployee } from 'src/redux/thunks/employeesThunks';

export const getAllEmployees = async () => {
    try {
        const res = await axios.get(`${API_URL}/employees`);
        return res.data;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};

export const getEmployeeById = async (id: number | string) => {
    try {
        const res = await axios.get(`${API_URL}/employee/${id}`);
        return res.data;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};

export const createEmployee = async (data: INewEmployee) => {
    try {
        const res = await axios.post(`${API_URL}/create`, data);
        return res.data;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};

export const updateEmployee = async ({ id, name, salary, age }: INewEmployee) => {
    try {
        const res = await axios.put(`${API_URL}/update/${id}`, { name, salary, age });
        return res.data;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};

export const deleteEmployee = async (id: number) => {
    try {
        const res = await axios.delete(`${API_URL}/delete/${id}`);
        return res.data;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};
