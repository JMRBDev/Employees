import axios from 'axios';
import { INewEmployee } from 'src/interfaces';

export const getAllEmployees = async () => {
    try {
        const res = await axios.get(`/employees`);
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
        const res = await axios.get(`/employee/${id}`);
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
        const res = await axios.post(`/create`, data);
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
        const res = await axios.put(`/update/${id}`, { name, salary, age });
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
        const res = await axios.delete(`/delete/${id}`);
        return res.data;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};
