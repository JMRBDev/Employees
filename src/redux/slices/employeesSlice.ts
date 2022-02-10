import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../../interfaces/IEmployee';

export interface EmployeesState {
    all: IEmployee[];
    currentEmployee: IEmployee | undefined;
};

const initialState: EmployeesState = {
    all: [],
    currentEmployee: undefined,
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        saveEmployees: (state, action: PayloadAction<EmployeesState['all']>) => {
            state.all = action.payload;
        },
        setCurrentEmployee: (state, action: PayloadAction<EmployeesState['currentEmployee']>) => {
            state.currentEmployee = action.payload;
        },
    },
});

export const { saveEmployees, setCurrentEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
