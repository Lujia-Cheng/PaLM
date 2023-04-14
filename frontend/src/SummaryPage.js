import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  AppBar,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

const SummaryPage = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    age: "",
    gender: "",
    ethnicity: "",
    medicalConditions: [],
  });
  
  const [proposedTreatment, setProposedTreatment] = useState([]);
  const [treatmentType, setTreatmentType] = useState("");
  const [treatmentName, setTreatmentName] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Fetch search criteria from search page using local storage or other means
    const criteria = localStorage.getItem("searchCriteria");
    if (criteria) {
      setSearchCriteria(JSON.parse(criteria));
    }
    const treatment = localStorage.getItem("proposedTreatment");
    if (treatment) {
      setProposedTreatment(JSON.parse(treatment));
    }
  }, []);

  // useEffect(() => {
  //   // Filter results based on treatmentType and treatmentName
  //   const results = searchCriteria.conditions.filter((condition) => {
  //     return (
  //       condition.treatmentType === treatmentType &&
  //       condition.treatmentName === treatmentName
  //     );
  //   });
  //   setFilteredResults(results);
  // }, [searchCriteria, treatmentType, treatmentName]);

  return (
    <Box py={4}>
      <header role="banner">
        <AppBar position="fixed">
          <Typography variant="h6" padding={1}>
            PaLM
          </Typography>
        </AppBar>
      </header>
      <Box mx="auto">
        <Box mx ={5}my ={5}>Summary</Box>
        <Box mx={5} sx={{ p: 2, border: "1px dashed black" }}>
          <Box mx={10} my={5} display="flex" alignItems="center">
            <Box mr={2} flexGrow={2}>
              <Typography>
                Age: {searchCriteria.age[0] + " ~ " + searchCriteria.age[1]}
              </Typography>
            </Box>
            <Box mr={2} flexGrow={2}>
              <Typography>Gender: {searchCriteria.gender || "Any"}</Typography>
            </Box>
            <Box mr={2} flexGrow={2}>
              <Typography>
                Ethnicity: {searchCriteria.ethnicity || "Any"}
              </Typography>
            </Box>
          </Box>
          <Box mx={10} my={5} display="flex" alignItems="center">
            <Box mr={2} flexGrow={2}>
              <Typography>
                Pre-conditions: {searchCriteria.medicalConditions || "None"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box mx={5} my={2} sx={{ p: 2, border: "1px solid black" }}>
          {proposedTreatment.map((element, index) => (
            <Box key={index} my={2} >
              <Typography>
                Treatment {index + 1}: {element.treatmentName}
              </Typography>
              <Box>TODO: ajax connect to database, fetch, and filter the result</Box>
            </Box>
          ))}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.assign("/")}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryPage;
