import { Helmet } from 'react-helmet-async';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
