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
import{LineChart, XAxis,Tooltip, CartesianGrid,Line} from "recharts";

const SummaryPage = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    age: "",
    gender: "",
    ethnicity: "",
    medicalConditions: [],
  });

  const [proposedIntervention, setProposedIntervention] = useState([]);
  const [interventionType, setInterventionType] = useState("");
  const [interventionName, setInterventionName] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Fetch search criteria from search page using local storage or other means
    const criteria = localStorage.getItem("searchCriteria");
    if (criteria) {
      setSearchCriteria(JSON.parse(criteria));
    }
    const intervention = localStorage.getItem("proposedIntervention");
    if (intervention) {
      setProposedIntervention(JSON.parse(intervention));
    }
  }, []);

  // useEffect(() => {
  //   // Filter results based on interventionType and interventionName
  //   const results = searchCriteria.conditions.filter((condition) => {
  //     return (
  //       condition.interventionType === interventionType &&
  //       condition.interventionName === interventionName
  //     );
  //   });
  //   setFilteredResults(results);
  // }, [searchCriteria, interventionType, interventionName]);

  return (
    <Box py={4}>
      <header role="banner">
        <AppBar position="fixed">
          <Typography variant="h6" padding={1}>
            PaLM
          </Typography>
        </AppBar>
      </header>
      <Box mx="auto" padding={5}>
        <Paper>
          {" "}
          <Box padding={5}>
            <Typography>Summary</Typography>
            <Box mx={10} my={5} display="flex" alignItems="center">
              <Box mr={2} flexGrow={2}>
                <Typography>
                  Age: {searchCriteria.age[0] + " ~ " + searchCriteria.age[1]}
                </Typography>
              </Box>
              <Box mr={2} flexGrow={2}>
                <Typography>
                  Gender: {searchCriteria.gender || "Any"}
                </Typography>
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
                  Pre-conditions:{" "}
                  {searchCriteria.medicalConditions.join(", ") || "None"}
                </Typography>
              </Box>
            </Box>
          </Box>{" "}
        </Paper>

        {proposedIntervention.map((element, index) => {
          const summaries = [
            {
              intervention: "Prednisone",
              cases: 15,
              otherInfo:
                "Average disease duration of 1.5 years; complete remission in 10 patients.",
            },
            {
              intervention: "Ventolin",
              cases: 12,
              otherInfo:
                "9 out of 12 patients have positive antinuclear antibody (ANA) test; 6 patients with joint pain.",
            },
            {
              intervention: "Amoxil",
              cases: 8,
              otherInfo:
                "3 out of 8 patients reported photosensitivity; 2 patients developed mild rash.",
            },
            {
              intervention: "Zithromax",
              cases: 7,
              otherInfo:
                "4 out of 7 patients experienced a reduction in disease activity; no significant side effects reported.",
            },
            {
              intervention: "Synthroid",
              cases: 4,
              otherInfo:
                "All patients showed improvement in fatigue and reduced inflammation markers.",
            },
          ];
          const summary = summaries[index];
          return (
            <Box my={10} key={index}>
              <Paper padding={5}>
                <Box padding={5}>
                  <Typography>
                    Intervention {index + 1}: {element.interventionName}
                  </Typography>
                  <Typography>Cases: {summary.cases}</Typography>
                  <Typography>
                    Other Relevant Information: {summary.otherInfo}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          );
        })}

        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
          <Box p={2}>
            <Button
              variant="contained"
              color="secondary"
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
