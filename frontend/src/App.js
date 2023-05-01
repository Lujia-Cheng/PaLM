import React, { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [age, setAge] = useState([18, 65]);
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [medicalConditions, setMedicalConditions] = useState([""]);
  const [rows, setRows] = useState([
    { interventionType: "", interventionName: "" },
  ]);
  const minAgeDiff = 10;

  const handleAgeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minAgeDiff) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minAgeDiff);
        setAge([clamped, clamped + minAgeDiff]);
      } else {
        const clamped = Math.max(newValue[1], minAgeDiff);
        setAge([clamped - minAgeDiff, clamped]);
      }
    } else {
      setAge(newValue);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEthnicityChange = (event) => {
    setEthnicity(event.target.value);
  };

  const handleMedicalConditionChange = (event, index) => {
    const newMedicalConditions = [...medicalConditions];
    newMedicalConditions[index] = event.target.value;
    setMedicalConditions(newMedicalConditions);
  };

  const handleAddMedicalCondition = () => {
    setMedicalConditions([...medicalConditions, ""]);
  };

  const handleDeleteMedicalCondition = (index) => {
    const newMedicalConditions = [...medicalConditions];
    newMedicalConditions.splice(index, 1);
    setMedicalConditions(newMedicalConditions);
  };

  const handleRowChange = (event, index) => {
    const newRows = [...rows];
    newRows[index][event.target.name] = event.target.value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { interventionType: "", interventionName: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleReset = () => {
    setAge([18, 65]);
    setGender("");
    setEthnicity("");
    setMedicalConditions([""]);
    setRows([{ interventionType: "", interventionName: "" }]);
  };

  const handleSearch = async () => {
    const searchCriteria = { age, gender, ethnicity, medicalConditions };
    localStorage.setItem("searchCriteria", JSON.stringify(searchCriteria));
    localStorage.setItem("proposedIntervention", JSON.stringify(rows));
    window.location.assign("/summary");
  };

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
        <Box p={3}>
          <Paper p={3}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>
                Search Page
              </Typography>
              <Box mb={2}>
                <Typography variant="body1">
                  Please enter your patient criteria below:
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">Demographics</Typography>

                <Box mb={2}>
                  <Typography id="age-slider" gutterBottom>
                    Age
                  </Typography>
                  <Slider
                    value={age}
                    onChange={handleAgeChange}
                    valueLabelDisplay="on"
                    aria-labelledby="age-slider"
                    min={0}
                    max={100}
                  />
                </Box>
                <Box mb={2}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select value={gender} onChange={handleGenderChange}>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel>Ethnicity</InputLabel>
                    <Select value={ethnicity} onChange={handleEthnicityChange}>
                      <MenuItem value="caucasian">Caucasian</MenuItem>
                      <MenuItem value="africanAmerican">
                        African American
                      </MenuItem>
                      <MenuItem value="asian">Asian</MenuItem>
                      <MenuItem value="latino">Latino</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box my={2}>
                  <Typography>Pre-existing Conditions</Typography>
                  {medicalConditions.map((condition, index) => (
                    <Box key={index} my={2} display="flex" alignItems="center">
                      <Box mr={2} flexGrow={2}>
                        <TextField
                          fullWidth
                          label={`Condition ${index + 1}`}
                          value={condition}
                          onChange={(event) =>
                            handleMedicalConditionChange(event, index)
                          }
                        />
                      </Box>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteMedicalCondition(index)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  ))}
                  <Box my={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddMedicalCondition}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
          <Paper my={5}>
            <Box p={3}>
              <Typography variant="h6">
                Compare Proposed Interventions
              </Typography>
              {rows.map((row, index) => (
                <Box key={index} display="flex" alignItems="center" my={2}>
                  <Box mr={1}>
                    <Typography>Intervention {index + 1}:</Typography>
                  </Box>
                  <Box mr={2} flexGrow={1}>
                    <FormControl fullWidth>
                      <InputLabel>type</InputLabel>
                      <Select
                        name="interventionType"
                        value={row.interventionType}
                        onChange={(event) => handleRowChange(event, index)}
                      >
                        <MenuItem value="Medication">Medication</MenuItem>
                        <MenuItem value="Surgery">Surgery</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box mr={2} flexGrow={2}>
                    <TextField
                      fullWidth
                      name="interventionName"
                      label="name"
                      value={row.interventionName}
                      onChange={(event) => handleRowChange(event, index)}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              ))}
              <Box my={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRow}
                >
                  <AddIcon />
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" my={2}>
          <Box my={2}>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset All
            </Button>
          </Box>
          <Box p={2}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchPage;
