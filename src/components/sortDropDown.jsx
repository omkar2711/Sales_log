import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function SortDropdown({ sortBy, handleSort }) {
  return (
    <FormControl variant="outlined" fullWidth className="form-container form-control">
      <InputLabel>Sort By</InputLabel>
      <Select
        label="Sort By"
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
      >
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="time">Time</MenuItem>
        <MenuItem value="contactPerson">Contact Person</MenuItem>
        <MenuItem value="taskType">Task Type</MenuItem>
        <MenuItem value="status">Status</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortDropdown;
