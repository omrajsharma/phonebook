import { RootState } from '../store';

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectAuthIsLoading = (state: RootState) => state.auth.authIsLoading;

export const selectAuthError = (state: RootState) => state.auth.authError;
