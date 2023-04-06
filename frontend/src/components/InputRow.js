import React, { useState } from 'react';
import InputRow from './InputRow';

function AddRemoveInput() {
  const [rows, setRows] = useState([{ id: 1 }]);
  const [counter, setCounter] = useState(1);

  const handleAddRow = () => {
    const newId = counter + 1;
    setRows([...rows, { id: newId }]);
    setCounter(newId);
  };

  const handleDeleteRow = (id) => {
    const filteredRows = rows.filter((row) => row.id !== id);
    setRows(filteredRows);
  };

  return (
    <div>
      {rows.map((row) => (
        <InputRow key={row.id} id={row.id} onDelete={handleDeleteRow} />
      ))}
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
}

export default AddRemoveInput;
