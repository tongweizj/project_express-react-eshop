import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/auth-context";
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
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "../../assets/SOUTHMARKET.png";
import "./Nav.css";
import "./Nav.module.css";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogout = () => {
    logout(() => {
      setSnackbarOpen(true);
      navigate("/signin");
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Limpa o campo de busca após a navegação
    }
  };

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar className="nav">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Typography variant="h4" className="name"></Typography>
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
            <InputBase
              placeholder="What are you looking for?"
              className="inputBase"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(); // Agora redireciona corretamente
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton onClick={handleSearch} className="searchButton">
              <SearchIcon />
            </IconButton>
          </div>

          {/* Área à direita para Sign Up/Sign In ou Sign Out */}
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
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
              <Tooltip title="Profile" arrow>
                <IconButton
                  color="inherit"
                  component={NavLink}
                  to="/profile"
                  className="iconButton profile"
                >
                  <AccountCircleTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Favorites" arrow>
                <IconButton
                  color="inherit"
                  component={NavLink}
                  to="/favourites"
                  className="iconButton favourites"
                >
                  <FavoriteTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Listing" arrow>
                <IconButton
                  onClick={() => navigate("/newListing")}
                  className="iconButton addListing"
                >
                  <AddIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="My Listing" arrow>
                <IconButton
                  onClick={() => navigate("/myListings")}
                  className="iconButton addListing"
                >
                  <VisibilityIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cart" arrow>
                <IconButton
                  color="inherit"
                  component={NavLink}
                  to="/cart"
                  className="iconButton cart"
                >
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Goodbye!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Nav;
