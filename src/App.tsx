import { Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { lazy } from 'react';
import { useAppSelector, useAppDispatch, useAuth } from './hooks';
import { selectThemeDarkMode } from './redux/theme/themeSelectors';
import { refreshUser } from './redux/auth/authOperations';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

import Loader from './components/Loader';
import SharedLayout from './components/SharedLayout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const darkMode = useAppSelector(selectThemeDarkMode);
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [darkMode]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={<RestrictedRoute component={RegisterPage} redirectTo={'/contacts'} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={LoginPage} redirectTo={'/contacts'} />}
            />

            <Route
              path="/contacts"
              element={<PrivateRoute component={ContactsPage} redirectTo={'/login'} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </ThemeProvider>
  );
};

export default App;
