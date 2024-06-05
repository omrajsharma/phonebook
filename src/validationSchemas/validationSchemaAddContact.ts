import * as yup from 'yup';

const phoneRegExp = /^\+[0-9]{10,}$/;

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, 'Name may contain only 20 letters')
    .required(
      'Name is required field. Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      'Invalid phone number. Phone number must start with "+" and have at least 10 digits'
    )
    .required('Number is a required field'),
});

export interface IContactData extends yup.Asserts<typeof contactSchema> {}

export const validationSchemaAddContact = contactSchema as yup.Schema<IContactData>;
