import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box py={4}>
      <Box maxWidth={600} mx="auto">
        <Paper>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Summary Page
            </Typography>
            <Box my={2}>
              <Typography variant="body1">
                This is the summary page. You have successfully navigated to
                this page from the search page.
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SummaryPage;
