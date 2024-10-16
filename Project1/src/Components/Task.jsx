import React from 'react';
import { TextField, Checkbox, FormControlLabel, Box, Button } from '@mui/material';

export default function Task({ task, setTask, deleteTask }) {

  const handleDetailsChange = (event) => {
    setTask({ ...task, details: event.target.value });
  };

  const handleIsCompleteChange = (event) => {
    setTask({ ...task, isComplete: event.target.checked });
  };

  return (
    <Box>
      <ul>
        <li>{task.taskName}</li>
      </ul>
      <TextField
        label="Details"
        value={task.details}
        onChange={handleDetailsChange}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={task.isComplete}
            onChange={handleIsCompleteChange}
          />
        }
        label="Completed"
      />
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => deleteTask(task.taskId)} // Call deleteTask with taskId
      >
        Delete Task
      </Button>
    </Box>
  );
}