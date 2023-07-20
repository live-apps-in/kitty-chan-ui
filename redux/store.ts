import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import guildReducer from './slices/guildSlice';
import greetReducer from './slices/greetSlice';
import logsReducer from './slices/logsSlice';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    authReducer,
    guildReducer,
    greetReducer,
    logsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
