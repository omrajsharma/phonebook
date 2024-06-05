import { useAppSelector } from './reduxHooks';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectAuthIsLoading,
  selectAuthError,
} from '../redux/auth/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const user = useAppSelector(selectUser);
  const authIsLoading = useAppSelector(selectAuthIsLoading);
  const authError = useAppSelector(selectAuthError);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    authIsLoading,
    authError,
  };
};
