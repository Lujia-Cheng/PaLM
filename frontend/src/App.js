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
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [age, setAge] = useState([20, 40]);
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [medicalConditions, setMedicalConditions] = useState([""]);
  const [rows, setRows] = useState([{ treatment: "", name: "" }]);
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
    setRows([...rows, { medication: "", dosage: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleReset = () => {
    setAge([20, 40]);
    setGender("");
    setEthnicity("");
    setMedicalConditions([""]);
    setRows([{ medication: "", dosage: "" }]);
  };

  const handleSearch = () => {};

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
                    max={100}
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
            <Box p={3} flexGrow={1}>
              <Typography variant="h6">Proposing Treatment</Typography>
              {rows.map((row, index) => (
                <Box key={index} display="flex" alignItems="center" my={2}>
                  <Box mr={2} flexGrow={1}>
                    <FormControl fullWidth>
                      <InputLabel>type</InputLabel>
                      <Select
                        name="Type"
                        value={row.type}
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
                      name="type"
                      label="name"
                      value={row.dosage}
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
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={2}
          >
            <Box my={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Reset All
              </Button>
            </Box>
            <Box p={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchPage;

// import {
//   AppBar,
//   Box,
//   Button,
//   Container,
//   FormControl,
//   InputLabel,
//   TableRow,
//   TableCell,
//   NativeSelect,
//   Paper,
//   BrowserRouter,
//   Route,
//   Switch,
//   IconButton,
//   Select,
//   Slider,
//   MenuItem,
//   TextField,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import React, { useState } from "react";
// // import { Link } from "react-router-dom";

// const styles = {
//   panel: {
//     height: "calc(100vh - 64px)",
//     display: "flex",
//     flexDirection: "row",
//   },
//   leftPanel: {
//     outline: true,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "space-between",
//     flex: 1,
//     padding: 16,
//   },
//   rightPanel: {
//     outline: true,
//     backgroundColor: "#e0e0e0",
//     justifyContent: "space-between",
//     flex: 1,
//     padding: 16,
//   },
//   wrapper: { flex: 1, justifyContent: "space-between", padding: 16 },
//   searchTermsWrapper: {},
// };

// function valuetext(value) {
//   return `${value}`;
// }

// function App() {
//   const [inputs, setInputs] = useState([{ option: "", text: "" }]);

//   const minDistance = 10;
//   const [value, setValue] = React.useState([20, 37]);
//   const handleChange = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (newValue[1] - newValue[0] < minDistance) {
//       if (activeThumb === 0) {
//         const clamped = Math.min(newValue[0], 100 - minDistance);
//         setValue([clamped, clamped + minDistance]);
//       } else {
//         const clamped = Math.max(newValue[1], minDistance);
//         setValue([clamped - minDistance, clamped]);
//       }
//     } else {
//       setValue(newValue);
//     }
//   };

//   const handleInputChange = (index, event) => {
//     const values = [...inputs];
//     values[index][event.target.name] = event.target.value;
//     setInputs(values);
//   };

//   const handleAddClick = () => {
//     setInputs([...inputs, { option: "", text: "" }]);
//   };
//   const handleResetClick = () => {
//     setInputs([{ option: "", text: "" }]);
//   };

//   const handleDeleteRow = (index) => {
//     const newInputs = [...inputs];
//     newInputs.splice(index, 1);
//     setInputs(newInputs);
//   };

//   const handleSearch = () => {};

//   const options = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//   ];

//   return (
//     <div>
//       <header role="banner">
//         <AppBar position="fixed" style={styles.header}>
//           <Toolbar>
//             <Typography variant="h6">PaLM</Typography>{" "}
//           </Toolbar>{" "}
//         </AppBar>
//       </header>
//       <section id="main">
//         <Box sx={{ marginTop: "80px" }}>
//           <Container sx={styles.panel} height="90%">
//             <Paper style={styles.leftPanel}>
//               <Container>
//                 Age
//                 <Slider
//                   label="Age"
//                   aria-label="Always visible"
//                   getAriaLabel={() => "Minimum distance shift"}
//                   value={value}
//                   maxWidth="50%"
//                   onChange={handleChange}
//                   valueLabelDisplay="auto"
//                   getAriaValueText={valuetext}
//                 />
//               </Container>
//             </Paper>

//             <Paper style={styles.rightPanel}>
//               <Container style={styles.wrapper}>
//                 {inputs.map((input, index) => (
//                   <Container key={index} style={styles.wrapper}>
//                     {/*FIXME fix share width */}
//                     <Select
//                       sx={{ width: "20%" }}
//                       label="Option"
//                       name="option"
//                       value={input.option}
//                       onChange={(event) => handleInputChange(index, event)}
//                     >
//                       {options.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     <TextField
//                       sx={{ width: "70%" }}
//                       label="Text"
//                       name="text"
//                       value={input.text}
//                       onChange={(event) => handleInputChange(index, event)}
//                     />
//                     {/* TODO add delete row button */}
//                     <IconButton onClick={() => handleDeleteRow(index)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </Container>
//                 ))}
//               </Container>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddClick}
//               >
//                 Add
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleResetClick}
//               >
//                 Reset
//               </Button>
//             </Paper>
//           </Container>{" "}
//           <IconButton onClick={() => handleSearch()}>
//             <SearchIcon />
//           </IconButton>
//         </Box>
//       </section>
//     </div>
//   );
// }

// export default App;
