import { Helmet } from 'react-helmet-async';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../../hooks';

import { StyledLink } from './HomePage.styled';

const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Helmet>
        <title>MyPhonebook</title>
      </Helmet>
      <Typography component="h1" variant="h3">
        Welcome to your Phonebook
      </Typography>
      {!isLoggedIn && (
        <Typography component="p" variant="h6">
          You can <StyledLink to="/register">register</StyledLink> or{' '}
          <StyledLink to="/login">login</StyledLink> if you already have an account. You will be
          able to add a list of contacts, which you can edit, delete or filter.
        </Typography>
      )}

      {isLoggedIn && (
        <Typography component="p" variant="h6">
          You are already logged in! Go to <StyledLink to="/contacts">contacts</StyledLink> to add
          new friends!
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;
