import { LogsDto } from '@/types/Greet';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type LogsState = {
  logs: LogsDto | null;
};

type InitialState = {
  value: LogsState;
};

const initialState = {
  value: {
    logs: Cookies.get('logs-details')
      ? JSON.parse(Cookies.get('logs-details')!)
      : null,
  },
} as InitialState;

export const logs = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<LogsDto>) => {
      return {
        value: {
          ...state.value,
          logs: action.payload,
        },
      };
    },
  },
});

export const { setLogs } = logs.actions;
export default logs.reducer;
