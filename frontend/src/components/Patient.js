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

const Patient = () => {
  const [age, setAge] = useState([18, 65]);
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [medicalConditions, setMedicalConditions] = useState([""]);

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


  return (
    <Box mx="auto">
      <Paper>
        <Box display="flex">
          <Box p={3} flexGrow={1}>
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
              <Box my={2}>
                <Typography id="age-slider" gutterBottom>
                  Age
                </Typography>
                <Slider
                  value={age}
                  onChange={handleAgeChange}
                  valueLabelDisplay="on"
                  aria-labelledby="age-slider"
                  min={0}
                  max={99}
                />
              </Box>
              <Box my={2}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select value={gender} onChange={handleGenderChange}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box my={2}>
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
        
        </Box>
   
      </Paper>
    </Box>
  );
};
export default Patient;