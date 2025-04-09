import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Cabeçalho */}
      <Box sx={{ textAlign: "center", mb: 9 }}>
        <Typography variant="h4" fontWeight="bold">
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Find answers to the most common questions about our platform.
        </Typography>
      </Box>

      {/* FAQ Items */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">How do I register?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            To register, click on the "Sign Up" button on the top menu and fill out your information. You’ll be able to start buying and selling right away!
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6">How do I buy items?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            Simply browse the available listings, add your desired items to your cart, and proceed to checkout using our secure payment system.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h6">How can I sell my items?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            Click on "New Listing" to list an item for sale. Fill in the details about your product, and once it’s approved, it will be live on our platform.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography variant="h6">How do I contact support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            You can reach our support team by clicking on the "Contact Us" link in the footer or by emailing us at support@example.com.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography variant="h6">Are transactions secure?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            Yes, our platform uses state-of-the-art security measures and encryption protocols to ensure that all transactions are safe and secure.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FAQ;
