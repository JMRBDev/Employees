import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../../interfaces/IEmployee';

export interface EmployeesState {
    all: IEmployee[];
};

const initialState: EmployeesState = {
    all: [],
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        saveEmployees: (state, action: PayloadAction<EmployeesState['all']>) => {
            state.all = action.payload;
        },
    },
});

export const { saveEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
