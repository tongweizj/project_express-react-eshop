import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import logo from '../../assets/SOUTHMARKET LOGO[BLACK].png'; // Importando a logo

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorOpen(true);
      return;
    }

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);
  const handleCloseError = () => setErrorOpen(false);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Main Content */}
      <Container 
        maxWidth="md" 
        sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Seção do Formulário */}
          <Grid item xs={12} md={8}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                margin="normal"
              />

              {/* Botão Submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Grid>

          {/* Seção da Logo */}
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Box 
              component="img"
              src={logo}
              alt="SouthMarket Logo"
              sx={{
                width: "100%",
                maxWidth: { xs: 150, sm: 200, md: 450 }, // Valores responsivos
                height: "auto",
                objectFit: "contain",
                margin: { xs: "0 auto", md: "initial" }
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Dialog de Agradecimento */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thanks for getting in touch. We'll get back to you as soon as possible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Erro */}
      <Dialog open={errorOpen} onClose={handleCloseError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all fields before submitting the form.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="error" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contact;
