import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../../redux/contacts/contactsSelectors';

import { fetchContacts } from '../../redux/contacts/contactsOperations';

import Filter from '../../components/Filter';
import ContactList from '../../components/ContactList';
import Loader from '../../components/Loader';

const ContactsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const contacts = useAppSelector(selectContacts);
  const error = useAppSelector(selectError);

  const showEmptyPhoneBook = contacts.length === 0 && !isLoading && !error;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <Filter />
      {isLoading && <Loader />}
      {contacts.length > 0 && <ContactList />}
      {showEmptyPhoneBook && (
        <Typography
          sx={{ m: '4px auto 0 auto', width: { xs: '90%', sm: '500px' } }}
          variant="h6"
          component="div"
        >
          Your phonebook is empty. Please add contact.
        </Typography>
      )}
      {error && (
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Something went wrong...Try reloading the page
        </Typography>
      )}
    </div>
  );
};

export default ContactsPage;
