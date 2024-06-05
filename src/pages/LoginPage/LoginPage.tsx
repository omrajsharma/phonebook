import { Helmet } from 'react-helmet-async';
import LoginForm from '../../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
