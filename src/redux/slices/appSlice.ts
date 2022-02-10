import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    appState: {
        status?: 'idle' | 'ready' | 'fetching' | 'errorFetching';
        message?: string;
    }
};

const initialState: AppState = {
    appState: {
        status: 'idle',
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeAppState: (state, action: PayloadAction<AppState['appState']>) => {
            state.appState = action.payload;
        },
    },
});

export const { changeAppState } = appSlice.actions;
export default appSlice.reducer;
