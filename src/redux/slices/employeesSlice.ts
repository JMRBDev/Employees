import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../../interfaces/IEmployee';

export interface EmployeesState {
    all: IEmployee[];
    current: IEmployee | undefined;
};

const initialState: EmployeesState = {
    all: [],
    current: undefined,
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        saveEmployees: (state, action: PayloadAction<EmployeesState['all']>) => {
            state.all = action.payload;
        },
        setCurrentEmployee: (state, action: PayloadAction<EmployeesState['current']>) => {
            state.current = action.payload;
        }
    },
});

export const { saveEmployees, setCurrentEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
