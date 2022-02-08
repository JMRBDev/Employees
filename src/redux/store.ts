import { configureStore } from "@reduxjs/toolkit";
import appReducer from './slices/appSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';
import employeesReducer from './slices/employeesSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        userPreferences: userPreferencesReducer,
        employees: employeesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
