import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import guildReducer from './slices/guildSlice';
import greetReducer from './slices/greetSlice';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    authReducer,
    guildReducer,
    greetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
