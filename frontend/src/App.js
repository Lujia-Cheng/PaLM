import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  TableRow,
  TableCell,
  NativeSelect,
  Paper,
  IconButton,
  Select,
  Slider,
  MenuItem,
  Components,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

const styles = {
  panel: {
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "row",
  },
  leftPanel: {
    outline: true,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    flex: 1,
    padding: 16,
  },
  rightPanel: {
    outline: true,
    backgroundColor: "#e0e0e0",
    justifyContent: "space-between",
    flex: 1,
    padding: 16,
  },
  wrapper: { flex: 1, justifyContent: "space-between", padding: 16 },
  searchTermsWrapper: {},
};

function valuetext(value) {
  return `${value}`;
}

function App() {
  const [inputs, setInputs] = useState([{ option: "", text: "" }]);

  const minDistance = 10;
  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index][event.target.name] = event.target.value;
    setInputs(values);
  };

  const handleAddClick = () => {
    setInputs([...inputs, { option: "", text: "" }]);
  };
  const handleResetClick = () => {
    setInputs([{ option: "", text: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div>
      <header role="banner">
        <AppBar position="fixed" style={styles.header}>
          <Toolbar>
            <Typography variant="h6">PaLM</Typography>
          </Toolbar>
        </AppBar>
      </header>
      <section id="main">
        <Box sx={{ marginTop: "80px" }}>
          <Container sx={styles.panel}>
            <Paper style={styles.leftPanel}>
              <Container>
                <Slider
                  label="Age"
                  aria-label="Always visible"
                  getAriaLabel={() => "Minimum distance shift"}
                  value={value}
                  maxWidth="50%"
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Container>
            </Paper>

            <Paper style={styles.rightPanel}>
              <Container style={styles.wrapper}>
                {inputs.map((input, index) => (
                  <Container key={index} style={styles.wrapper}>
                    {/*FIXME fix share width */}
                    <Select
                      sx={{ width: "20%" }}
                      label="Option"
                      name="option"
                      value={input.option}
                      onChange={(event) => handleInputChange(index, event)}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      sx={{ width: "70%" }}
                      label="Text"
                      name="text"
                      value={input.text}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    {/* TODO add delete row button */}
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Container>
                ))}
              </Container>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddClick}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResetClick}
              >
                Reset
              </Button>
            </Paper>
          </Container>
        </Box>
      </section>
    </div>
  );
}

export default App;
