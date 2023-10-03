import React from 'react';
import { Modal, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { taskTypeOptions, contactPersonOptions, statusOptions } from '../constants'; // Import the constants here
import '../App.css';
import  modalStyle from './modalStyle'

function AddTaskForm({ open, handleClose, newTask, handleAddTaskSubmit, handleCancelAddTask, handleNewTaskChange }) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle} >
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '10px' }} >
                    Add Task
                </Typography>
                <TextField
                    label="Date"
                    variant="outlined"
                    fullWidth
                    value={newTask.date}
                    onChange={(e) => handleNewTaskChange('date', e.target.value)}
                    required // Mark as required
                    style={{ marginBottom: '10px' }} 
                   
                />
                <TextField
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    value={newTask.companyName}
                    onChange={(e) => handleNewTaskChange('companyName', e.target.value)}
                    required // Mark as required
                    style={{ marginBottom: '10px' }} 

                   
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Task Type</InputLabel>
                    <Select
                        label="Task Type"
                        value={newTask.taskType}
                        onChange={(e) => handleNewTaskChange('taskType', e.target.value)}
                        required // Mark as required
                    style={{ marginBottom: '10px' }} 

                        
                    >
                        {taskTypeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Time"
                    variant="outlined"
                    fullWidth
                    value={newTask.time}
                    onChange={(e) => handleNewTaskChange('time', e.target.value)}
                    required // Mark as required
                    style={{ marginBottom: '10px' }} 

                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Contact Person</InputLabel>
                    <Select
                        label="Contact Person"
                        value={newTask.contactPerson}
                        onChange={(e) => handleNewTaskChange('contactPerson', e.target.value)}
                        required // Mark as required
                    style={{ marginBottom: '10px' }} 

                    >
                        {contactPersonOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Note"
                    variant="outlined"
                    fullWidth
                    value={newTask.note}
                    onChange={(e) => handleNewTaskChange('note', e.target.value)}
                    style={{ marginBottom: '10px' }} 

                // Note field is not marked as required
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        value={newTask.status}
                        onChange={(e) => handleNewTaskChange('status', e.target.value)}
                        required // Mark as required
                    style={{ marginBottom: '10px' }} 

                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="edit-form-buttons">
                    <Button variant="contained" onClick={handleAddTaskSubmit}>
                        Add Task
                    </Button>
                    <Button variant="contained" onClick={handleCancelAddTask}>
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default AddTaskForm;
