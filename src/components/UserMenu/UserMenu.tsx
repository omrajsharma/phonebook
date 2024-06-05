import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { useAuth, useAppDispatch } from '../../hooks';
import { logOut } from '../../redux/auth/authOperations';

import AddContactModal from '../AddContactModal';
import { StyledButton, StyledNavLink } from './UserMenu.styled';

const UserMenu: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleLogout = () => dispatch(logOut());

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Typography variant="h6" component={StyledNavLink} to="/contacts">
          Contacts
        </Typography>
        <Typography variant="h6" component={StyledButton} onClick={handleOpenModal}>
          <Typography variant="h6" component="p" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            Add contact
          </Typography>
        </Typography>

        <IconButton
          sx={{
            color: 'inherit',
            display: { xs: 'flex', sm: 'none' },
          }}
          onClick={handleOpenModal}
        >
          <PersonAddAlt1Icon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Typography variant="h6" component="p" sx={{ display: { xs: 'none', md: 'inline-block' } }}>
          Welcome, {user.name}!
        </Typography>

        <Typography variant="h6" component={StyledButton} onClick={handleLogout}>
          <Typography
            variant="h6"
            component="p"
            sx={{ display: { xs: 'none', md: 'inline-block' } }}
          >
            Logout
          </Typography>
          <LogoutIcon />
        </Typography>
      </Box>
      <AddContactModal isOpen={isOpen} handleClose={handleCloseModal} />
    </Box>
  );
};

export default UserMenu;
