import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/auth-context';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Tooltip,
  Zoom,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AddIcon from '@mui/icons-material/Add';
import logo from '../../assets/SOUTHMARKET.png';
import './Nav.css';
import './Nav.module.css';
import VisibilityIcon from "@mui/icons-material/Visibility";


const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = () => {
    logout(() => {
      setSnackbarOpen(true);
      navigate('/signin');
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar className="nav">
        <img 
  src={logo} 
  alt="Logo" 
  className="logo" 
  onClick={() => navigate('/')} 
  style={{ cursor: 'pointer' }} 
/>
          <Typography variant="h4" className="name">
            
          </Typography>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            className="navLink"
            activeClassName="active"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/about"
            className="navLink"
            activeClassName="active"
          >
            About
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/contact"
            className="navLink"
            activeClassName="active"
          >
            Contact
          </Button>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="What are you looking for?"
              className="inputBase"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {/* Área à direita para Sign Up/Sign In ou Sign Out */}
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout} className="navLink">
                Sign Out
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/signup"
                  className="navLink"
                  activeClassName="active"
                >
                  Sign Up
                </Button>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/signin"
                  className="navLink"
                  activeClassName="active"
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>

          {isAuthenticated && (
            <>
              <Tooltip
                title="Profile"
                arrow
                slots={{ transition: Zoom }}
                slotProps={{
                  popper: { modifiers: [{ name: 'offset', options: { offset: [0, -14] } }] },
                }}
              >
                <IconButton color="inherit" component={NavLink} to="/profile" className="iconButton profile">
                  <AccountCircleTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Favorites"
                arrow
                slots={{ transition: Zoom }}
                slotProps={{
                  popper: { modifiers: [{ name: 'offset', options: { offset: [0, -14] } }] },
                }}
              >
                <IconButton color="inherit" component={NavLink} to="/favourites" className="iconButton favourites">
                  <FavoriteTwoToneIcon />
                </IconButton>
              </Tooltip>
              {/* Botão Add Listing sem fundo azul */}
              <Tooltip title="Add Listing" arrow>
  <IconButton
    onClick={() => navigate("/newListing")}
    disableRipple
    className="iconButton addListing"
    sx={{
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus': {
        backgroundColor: 'transparent',
      },
      '&:active': {
        backgroundColor: 'transparent',
      },
    }}
  >
    <AddIcon sx={{ color: 'white' }} /> {/* ou 'black' dependendo do seu tema */}
  </IconButton>
</Tooltip>
<Tooltip title="My Listing" arrow>
  <IconButton
    onClick={() => navigate("/myListings")}
    disableRipple
    className="iconButton addListing"
    sx={{
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus': {
        backgroundColor: 'transparent',
      },
      '&:active': {
        backgroundColor: 'transparent',
      },
    }}
  >
    <VisibilityIcon sx={{ color: 'white' }} /> {/* ou 'black' dependendo do seu tema */}
  </IconButton>
</Tooltip>


              <Tooltip
                title="Cart"
                arrow
                slots={{ transition: Zoom }}
                slotProps={{
                  popper: { modifiers: [{ name: 'offset', options: { offset: [0, -14] } }] },
                }}
              >
                <IconButton color="inherit" component={NavLink} to="/cart" className="iconButton cart">
                  <ShoppingCartTwoToneIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Goodbye!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Nav;
