import { INewEmployee } from '../../redux/thunks/employeesThunks';
const API_URL = 'http://dummy.restapiexample.com/api/v1';

export const getAllEmployees = async () => {
    try {
        const res = await (await fetch(`${API_URL}/employees`, {
            method: 'GET',
        })).json();

        return res;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};

export const getEmployeeById = async (id: number | string) => {
    try {
        const res = await (await fetch(`${API_URL}/employee/${id}`, {
            method: 'GET',
        })).json();

        return res;
    } catch (err) {
        console.log(err);

        return undefined;
    }
};

export const createEmployee = async (data: INewEmployee) => {
    try {
        const res = await (await fetch(`${API_URL}/create`, {
            method: 'POST',
            body: JSON.stringify(data),
        })).json();

        return res;
    } catch (err) {
        return {
            status: 'error',
            message: (err as Error).message,
        };
    }
};

export const updateEmployee = async (id: number, name?: string, salary?: number, age?: number) => {
    try {
        const res = await (await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                salary,
                age,
            }),
        })).json();

        return res;
    } catch (err) {
        console.log(err);

        return undefined;
    }
};

export const deleteEmployee = async (id: number) => {
    try {
        const res = await (await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        })).json();

        return res;
    } catch (err) {
        console.log(err);

        return undefined;
    }
};
