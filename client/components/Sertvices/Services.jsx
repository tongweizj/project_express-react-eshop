import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import work1 from "../../assets/working.jpg";
import work2 from "../../assets/working2.jpg";


const Services = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Cabeçalho */}
      <Box sx={{ textAlign: "center", mb: 9 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Our Services
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Discover the essential services we offer to make your buying and selling experience smooth and secure.
        </Typography>
      </Box>

      {/* Seção: Plataforma de Vendas */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }} className="section">
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              Buy &amp; Sell Easily
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Our platform connects buyers and sellers in a user-friendly environment, where you can list items, discover new products, and complete transactions with security and ease.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            className="image"
            src={work1}
            alt="Buy and Sell"
            sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>
      </Grid>

      {/* Seção: Secure Payment & Delivery */}
      <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 6 }} className="section">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Box
            component="img"
            className="image"
            src={work2}
            alt="Secure Payment"
            sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Box>
            <Typography variant="h4" component="h2" gutterBottom>
              Secure Payment &amp; Fast Delivery
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We ensure all transactions are safe with our secure payment gateway. Our trusted delivery partners guarantee your purchases arrive on time.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Seção: Customer Support */}
      <Box sx={{ textAlign: "center", py: 4, bgcolor: "grey.100", borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Customer Support
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Our dedicated support team is here to help you with any questions or issues. We pride ourselves on excellent customer service.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Trusted Platform
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Reliable and secure service for all your transactions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Fast Delivery
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Quick and efficient logistics ensuring timely delivery.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              24/7 Support
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Assistance available around the clock to resolve your issues.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Services;
