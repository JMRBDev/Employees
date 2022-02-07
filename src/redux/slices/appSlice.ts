import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    status: 'ready' | 'loading' | 'errorLoading' | 'fetching' | 'errorFetching' | 'error';
};

const initialState: AppState = {
    status: 'ready',
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<AppState['status']>) => {
            state.status = action.payload;
        },
    },
});

export const { changeStatus } = appSlice.actions;
export default appSlice.reducer;
