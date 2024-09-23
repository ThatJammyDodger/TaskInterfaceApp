import './Navbar.css'

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { NavBarButtons } from './Buttons/NavbarButtons';
import { useAuth0 } from '@auth0/auth0-react';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Your Tasks', path: '/tasks', requireAuth: true},
  { name: 'Profile', path: '/profile', requireAuth: true },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { isAuthenticated } = useAuth0();
  const [ upages, setPages ] = useState(filterPagesAuth(isAuthenticated))
  useEffect(() => {
    setPages(filterPagesAuth(isAuthenticated))
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  let renderPages;
  const siteName = "Project 1"

  return (
    <AppBar position="static" sx={{ backgroundColor: '#003366' }}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'white',
                textDecoration: 'none',
                }}
            >
                {siteName}
            </Typography>
          </Link>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {upages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: 'white' }}
          >
            {siteName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {upages.map((page) => (
              <Button
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <NavBarButtons />

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

function filterPagesAuth(isAuth) {
  return isAuth ? pages : pages.filter(p => p.requireAuth!=true);
}