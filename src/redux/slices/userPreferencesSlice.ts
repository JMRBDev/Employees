import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferencesState {
    pageSize: number;
    employeesGridCurrentPage: number;
};

const initialState: UserPreferencesState = {
    pageSize: 6,
    employeesGridCurrentPage: 0,
};

export const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        changePageSize: (state, action: PayloadAction<UserPreferencesState['pageSize']>) => {
            state.pageSize = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<UserPreferencesState['employeesGridCurrentPage']>) => {
            state.employeesGridCurrentPage = action.payload;
        },
    },
});

export const { changePageSize, setCurrentPage } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
