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

const HelpCenter = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Cabeçalho */}
      <Box sx={{ textAlign: "center", mb: 9 }}>
        <Typography variant="h4" fontWeight="bold">
          Help Center
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Find the answers and support you need to make the most out of our platform.
        </Typography>
      </Box>

      {/* Pergunta 1 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="help-panel1-content"
          id="help-panel1-header"
        >
          <Typography variant="h6">How do I update my profile information?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            To update your profile, please navigate to your Profile page and click on the "Edit Profile" button. Make your changes and save.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Pergunta 2 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="help-panel2-content"
          id="help-panel2-header"
        >
          <Typography variant="h6">How can I report an issue?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            If you encounter any issues, please visit our Contact Us page to send a detailed report. Our support team will get back to you as soon as possible.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Pergunta 3 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="help-panel3-content"
          id="help-panel3-header"
        >
          <Typography variant="h6">What should I do if a transaction fails?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            In case of a transaction failure, please check your payment details and ensure you have sufficient funds. If the problem persists, contact our support team immediately.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Pergunta 4 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="help-panel4-content"
          id="help-panel4-header"
        >
          <Typography variant="h6">How do I reset my password?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            To reset your password, click on the "Forgot Password?" link on the sign-in page and follow the instructions sent to your registered email.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Pergunta 5 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="help-panel5-content"
          id="help-panel5-header"
        >
          <Typography variant="h6">Where can I find additional resources?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            Additional resources and guides are available on our Resources page. You can also find video tutorials and FAQs to help you navigate the platform.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default HelpCenter;
