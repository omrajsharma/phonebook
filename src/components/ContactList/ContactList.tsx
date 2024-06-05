import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from '../../redux/contacts/contactsSelectors';
import { useAppSelector } from '../../hooks';

import { Box, List, Typography } from '@mui/material';

import ContactItem from '../ContactItem';

const ContactList: React.FC = () => {
  const contacts = useAppSelector(selectVisibleContacts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isMatchingContacts = contacts.length === 0 && !isLoading && !error;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '800px', m: '0 auto' }}>
      {isMatchingContacts && (
        <Typography
          sx={{ m: '4px auto 0 auto', width: { xs: '90%', sm: '500px' } }}
          variant="h6"
          component="div"
        >
          There is no sush contact
        </Typography>
      )}

      <List sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '0' }}>
        {contacts.map(({ id, name, number }) => (
          <ContactItem key={id} id={id} name={name} number={number} />
        ))}
      </List>
    </Box>
  );
};

export default ContactList;
