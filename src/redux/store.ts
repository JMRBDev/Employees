import { configureStore } from "@reduxjs/toolkit";
import appReducer from './slices/appSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        userPreferences: userPreferencesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
