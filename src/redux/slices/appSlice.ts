import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import APP_STATUS from 'src/enums/APP_STATUS';

export interface AppState {
    appState: {
        status?: APP_STATUS;
        message?: string;
    }
};

const initialState: AppState = {
    appState: {
        status: APP_STATUS.IDLE,
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
