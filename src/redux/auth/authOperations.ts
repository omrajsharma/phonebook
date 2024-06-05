import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User, AuthResponse } from './authTypes';
import { AsyncThunkConfig } from '../commonTypes';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk<AuthResponse, User, AsyncThunkConfig>(
  'auth/register',
  async (credentials: User, thunkAPI) => {
    try {
      const { data }: AxiosResponse<AuthResponse> = await axios.post('/users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Registration failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const logIn = createAsyncThunk<
  AuthResponse,
  Omit<User, 'name'>,
  { rejectValue: string; serializedErrorType: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data }: AxiosResponse<AuthResponse> = await axios.post('/users/login', credentials);
    setAuthHeader(data.token);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const logOut = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post<void>('/users/logout');
      clearAuthHeader();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Logout failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const refreshUser = createAsyncThunk<
  Pick<User, 'name' | 'email'>,
  undefined,
  AsyncThunkConfig
>('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(persistedToken);
    const { data }: AxiosResponse<Pick<User, 'name' | 'email'>> = await axios('/users/current');
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Refresh current user failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});
