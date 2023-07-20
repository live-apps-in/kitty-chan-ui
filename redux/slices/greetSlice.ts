import { GreetDto } from '@/types/Features';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type GreetState = {
  greet: GreetDto | null;
};

type InitialState = {
  value: GreetState;
};

const initialState = {
  value: {
    greet: Cookies.get('greet-details')
      ? JSON.parse(Cookies.get('greet-details')!)
      : null,
  },
} as InitialState;

export const greet = createSlice({
  name: 'greet',
  initialState,
  reducers: {
    setGreet: (state, action: PayloadAction<GreetDto>) => {
      return {
        value: {
          ...state.value,
          greet: action.payload,
        },
      };
    },
  },
});

export const { setGreet } = greet.actions;
export default greet.reducer;
