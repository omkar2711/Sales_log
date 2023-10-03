import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({ salesData, handleEdit, handleDelete }) {
  return (
    <TableContainer component={Paper} className='table-container' style={{ marginTop: '16px', marginBottom: '16px' }}>
    <Table>
      <TableHead>
        <TableRow className='first-row'>
          <TableCell>Date</TableCell>
          <TableCell>Company</TableCell>
          <TableCell>Task Type</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Contact Person</TableCell>
          <TableCell>Note</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {salesData.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.date}</TableCell>
            <TableCell>{task.companyName}</TableCell>
            <TableCell>{task.taskType}</TableCell>
            <TableCell>{task.time}</TableCell>
            <TableCell>{task.contactPerson}</TableCell>
            <TableCell>{task.note}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(task)}
                style={{ marginRight: '16px' }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default TaskList;
