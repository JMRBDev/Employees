import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferencesState {
    pageSize: number;
};

const initialState: UserPreferencesState = {
    pageSize: 6,
};

export const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        changePageSize: (state, action: PayloadAction<UserPreferencesState['pageSize']>) => {
            state.pageSize = action.payload;
        },
    },
});

export const { changePageSize } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
