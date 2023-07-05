import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type AuthState = {
  isAuth: boolean;
  userDetails: any;
};

type InitialState = {
  value: AuthState;
};

const initialState = {
  value: {
    isAuth: false,
    userDetails: Cookies.get('userDetails')
      ? JSON.parse(Cookies.get('userDetails')!)
      : null,
  },
} as InitialState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      return {
        value: {
          isAuth: true,
          userDetails: action.payload,
        },
      };
    },

    logOut: () => {
      Cookies.remove('userDetails');
      Cookies.remove('accessToken');
      return initialState;
    },
  },
});

export const { setUserDetails, logOut } = auth.actions;
export default auth.reducer;
