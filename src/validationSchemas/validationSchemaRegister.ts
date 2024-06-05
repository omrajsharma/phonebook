import * as yup from 'yup';

export const registrationShema = yup.object().shape({
  name: yup.string().required('Name is required field.'),
  email: yup.string().email('Enter a valid email').required('Email is required field.'),
  password: yup
    .string()
    .min(7, 'Password should be of minimum 7 characters length')
    .required('Password is required field'),
});

export interface IUserDataForRegistration extends yup.Asserts<typeof registrationShema> {}

export const validationSchemaRegistration =
  registrationShema as yup.Schema<IUserDataForRegistration>;
