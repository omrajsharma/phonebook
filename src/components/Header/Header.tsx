import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch, useAuth } from '../../hooks';
import { toggleTheme } from '../../redux/theme/themeSlice';

import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';

const Header: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: 600,
              textDecoration: 'none',
              flexGrow: 1,
              color: 'inherit',
              display: { xs: 'none', md: 'block' },
              width: '200px',
            }}
          >
            My phonebook
          </Typography>
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
          <IconButton sx={{ ml: 1 }} onClick={() => dispatch(toggleTheme())} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
