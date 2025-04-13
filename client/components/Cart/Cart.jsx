import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link
} from "@mui/material";
import { useAuth } from "../../helpers/auth-context";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../../helpers/CartContext.jsx";
import config from '../../config.js';

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    emptyCart
  } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const shipping = 5;

  // Subtotal é a soma dos itens (preço * quantidade)
  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calcula os 13% do subtotal
  const getTax = () => getSubtotal() * 0.13;

  // Total = subtotal + shipping + taxes
  const getTotalPrice = () => getSubtotal() + shipping + getTax();

  // Quantidade total de itens
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (id) => {
    incrementQuantity(id);
  };

  const handleDecrement = (id) => {
    decrementQuantity(id);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    emptyCart(); // Limpa o carrinho
    setShowAlert(true); // Exibe o alerta
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    setTimeout(() => {
      window.location.reload(); // Recarrega a página
    }, 300);
  };

  if (!isAuthenticated) {
    return (
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ margin: "2rem", color: "text.secondary" }}
      >
        Please log in to view your cart.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: "2rem",
        maxWidth: "1200px",
        minHeight: "80vh" // Adicionado para empurrar o footer para baixo
      }}
    >
      {/* Modal de Alerta de Compra Completa */}
      {showAlert && (
        <Dialog
          open={showAlert}
          onClose={handleAlertDismiss}
          aria-labelledby="checkout-dialog-title"
          aria-describedby="checkout-dialog-description"
        >
          <DialogTitle id="checkout-dialog-title">Purchase Complete</DialogTitle>
          <DialogContent>
            <DialogContentText id="checkout-dialog-description">
              Thanks for your purchase! Click "Dismiss" to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertDismiss} color="primary">
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Título Principal */}
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Your Cart
      </Typography>

      {/* GRID para separar a coluna de itens e a coluna de resumo */}
      <Grid container spacing={3}>
        {/* Coluna ESQUERDA: Lista de Produtos */}
        <Grid item xs={12} md={8}>
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <Paper
                key={item._id}
                sx={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#eee"
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", marginBottom: "1rem" }}
                >
                  {item.title}
                </Typography>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <img
                        src={`${config.IMAGE_BASE_URL}/${item.images[0]}`}
                        alt={item.name}
                        style={{
                          width: "100%",
                          maxWidth: "150px",
                          height: "auto",
                          borderRadius: "8px"
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleDecrement(item._id)}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleIncrement(item._id)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(item._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>

                <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
                  <Link href="#" underline="hover">
                    Write a Review
                  </Link>
                </Box>
              </Paper>
            ))}
        </Grid>

        {/* Coluna DIREITA: Resumo do Pedido */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: "1rem",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >
              <Typography variant="body1">
                Subtotal ({getTotalItems()}{" "}
                {getTotalItems() === 1 ? "Item" : "Items"})
              </Typography>
              <Typography variant="body1">
                ${cartItems.length > 0 ? getSubtotal().toFixed(2) : "0.00"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">
                ${cartItems.length > 0 ? shipping.toFixed(2) : "0.00"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >
              <Typography variant="body1">Taxes(13%)</Typography>
              <Typography variant="body1">
                ${cartItems.length > 0 ? getTax().toFixed(2) : "0.00"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3
              }}
            >
              <Typography variant="h6">Total Price</Typography>
              <Typography variant="h6">
                ${cartItems.length > 0 ? getTotalPrice().toFixed(2) : "0.00"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Continue to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
