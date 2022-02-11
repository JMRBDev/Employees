import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';
import employeesReducer from './slices/employeesSlice';

const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['app', 'userPreferences'],
};

const rootReducer = combineReducers({
    app: appReducer,
    userPreferences: userPreferencesReducer,
    employees: employeesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
