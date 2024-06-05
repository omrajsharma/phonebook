import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

interface IPrivateRouteProps {
  component: React.ComponentType<any>;
  redirectTo?: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export default PrivateRoute;
