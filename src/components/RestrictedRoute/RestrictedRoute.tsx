import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

interface IRestrictedRouteProps {
  component: React.ComponentType<any>;
  redirectTo?: string;
}

const RestrictedRoute: React.FC<IRestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
