import * as yup from 'yup';

const logInSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required field.'),
  password: yup
    .string()
    .min(7, 'Password should be of minimum 7 characters length')
    .required('Password is required field'),
});

export interface IUserDataForLogIn extends yup.Asserts<typeof logInSchema> {}

export const validationSchemaLogIn = logInSchema as yup.Schema<IUserDataForLogIn>;
