import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './authOperations';
import { AuthState } from './authTypes';
import { isError } from '../helpers';

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  authIsLoading: false,
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authIsLoading = false;
        state.authError = null;
      })
      .addCase(logIn.pending, state => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authIsLoading = false;
        state.authError = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.authError = null;
        state.authIsLoading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.authError = null;
        state.authIsLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.authError = action.payload;
        state.authIsLoading = false;
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
