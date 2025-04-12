import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { signin } from "../../frontend-ctrl/api-auth.js";
import { useAuth } from "../../helpers/auth-context";
import { resetPassword } from "../../frontend-ctrl/api-user.js"; // Função criada
import "./Signin.css";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    text: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showSnackbar = (type, text) => {
    setSnackbar({ open: true, type, text });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const clickSubmit = () => {
    if (!isValidEmail(values.email)) {
      showSnackbar("error", "Please enter a valid email address.");
      return;
    }

    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        showSnackbar("error", data.error);
      } else {
        login(data, () => {
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    });
  };

  const handleResetPassword = () => {
    if (!isValidEmail(values.email)) {
      showSnackbar("error", "Please enter a valid email to reset.");
      return;
    }

    resetPassword(values.email).then((data) => {
      if (data && data.error) {
        showSnackbar("error", data.error);
      } else {
        showSnackbar("success", "Password has been reset to 123456789.");
      }
    });
  };

  return (
    <div className="signin-container">
      <Card className="signin-card">
        <div className="signin-left"></div>

        <div className="signin-right">
          <Typography variant="h4" className="signin-title" fontWeight={"bold"}>
            Welcome Back
          </Typography>
          <TextField
            id="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            fullWidth
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={clickSubmit}
            fullWidth
            className="signin-button"
          >
            Log In
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={handleResetPassword}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Reset Password
          </Button>

          <Typography variant="body2" className="signin-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </div>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
