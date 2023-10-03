import React, { useState, useEffect } from 'react';
import './App.css';
import data from './salesData.json';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import SortDropdown from './components/sortDropDown';
import { taskTypeOptions, contactPersonOptions, statusOptions, saveDataToJsonFile } from './constants';
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Button, Box, Modal } from '@mui/material';
import modalStyle from './components/modalStyle'


function App() {
  const [salesData, setSalesData] = useState(data);
  const [editedTask, setEditedTask] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    date: '',
    companyName: '',
    taskType: '',
    time: '',
    contactPerson: '',
    note: '',
    status: '',
  });

  useEffect(() => {
    const savedData = localStorage.getItem('salesData');
    if (savedData) {
      setSalesData(JSON.parse(savedData));
    }
  }, []);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    handleOpenEditModal();
  };

  const handleSaveEdit = (editedTask) => {
    const updatedData = salesData.map((task) =>
      task.id === editedTask.id ? { ...editedTask } : task
    );
    setSalesData(updatedData);
    setEditedTask(null);
    setEditModalOpen(false);

    saveDataToJsonFile(updatedData);
  };

  const handleCancelEdit = () => {
    setEditedTask(null);
    setEditModalOpen(false);
  };

  const handleDelete = (taskId) => {
    const updatedData = salesData.filter((task) => task.id !== taskId);
    setSalesData(updatedData);
  };

  const handleSort = (criteria) => {
    const sortedData = [...salesData];
    sortedData.sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setSalesData(sortedData);
    setSortBy(criteria);
  };

  const handleAddTaskClick = () => {
    setShowAddTaskForm(true);
  };

  const handleNewTaskChange = (field, value) => {
    setNewTask({
      ...newTask,
      [field]: value,
    });
  };

  const handleAddTaskSubmit = () => {
    if (
      !newTask.date ||
      !newTask.companyName ||
      !newTask.taskType ||
      !newTask.time ||
      !newTask.contactPerson ||
      !newTask.status
    ) {
      alert('Please fill in all required fields.');
      return; // Prevent form submission
    }

    // If all required fields are filled, proceed with adding the task
    const updatedData = [...salesData, newTask];
    setSalesData(updatedData);
    setShowAddTaskForm(false);

    saveDataToJsonFile(updatedData);

    setNewTask({
      date: '',
      companyName: '',
      taskType: '',
      time: '',
      contactPerson: '',
      note: '',
      status: '',
    });
  };

  const handleCancelAddTask = () => {
    setShowAddTaskForm(false);
    setNewTask({
      date: '',
      companyName: '',
      taskType: '',
      time: '',
      contactPerson: '',
      note: '',
      status: '',
    });
  };

  return (
    <div className="page">
      <h1>Sales Log</h1>
      <div className="sort-add-buttons">
        <SortDropdown sortBy={sortBy} handleSort={handleSort} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTaskClick}
          className="add-task-button"
        >
          Add Task
        </Button>
      </div>
      <AddTaskForm
        open={showAddTaskForm}
        handleClose={() => setShowAddTaskForm(false)}
        newTask={newTask}
        handleAddTaskSubmit={handleAddTaskSubmit}
        handleCancelAddTask={handleCancelAddTask}
        handleNewTaskChange={handleNewTaskChange}
      />
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '10px' }} >
            Edit Task
          </Typography>
          {editedTask && (
            <>
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                value={editedTask.date}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, date: e.target.value })
                }
                style={{ marginBottom: '10px' }}

              />
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                value={editedTask.companyName}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, companyName: e.target.value })
                }
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Time"
                variant="outlined"
                fullWidth
                value={editedTask.time}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, time: e.target.value })
                }
                style={{ marginBottom: '10px' }}
              />
              <FormControl variant="outlined" fullWidth className="form-container form-control">
                <InputLabel>Task Type</InputLabel>
                <Select
                  label="Task Type"
                  value={editedTask.taskType}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, taskType: e.target.value })
                  }
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
                label="Note"
                variant="outlined"
                fullWidth
                value={editedTask.note}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, note: e.target.value })
                }
                style={{ marginBottom: '10px' }}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Contact Person</InputLabel>
                <Select
                  label="Contact Person"
                  value={editedTask.contactPerson}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      contactPerson: e.target.value,
                    })
                  }
                  style={{ marginBottom: '10px' }}
                >
                  {contactPersonOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={editedTask.status}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, status: e.target.value })
                  }
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
                <Button
                  variant="contained"
                  onClick={() => handleSaveEdit(editedTask)}
                >
                  Save
                </Button>
                <Button variant="contained" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
      <TaskList
        salesData={salesData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
