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

const Intervention = () => {
  const [rows, setRows] = useState([
    { interventionType: "", interventionName: "" },
  ]);

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
  return (
    <Box p={3} flexGrow={1}>
      <Typography variant="h6">Compare Proposed Interventions</Typography>
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
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          <AddIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Intervention;
