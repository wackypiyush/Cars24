import React, { useState } from 'react';
import axios from '../axiosConfig';
import { TextField, Button, Typography, Box } from '@mui/material';

const UpdateTaskForm = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.Title);
  const [description, setDescription] = useState(task.Description);
  const [status, setStatus] = useState(task.Status);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/${task.Task_id}`, {
        Title: title,
        Description: description,
        Status: status,
      });
      onTaskUpdated({
        ...task,
        Title: title,
        Description: description,
        Status: status,
      });
      setMessage('Task updated successfully!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Error updating task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h2" gutterBottom>
        Update Task
      </Typography>
      <Box mb={2}>
        <TextField 
          label="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          fullWidth 
          required 
        />
      </Box>
      <Box mb={2}>
        <TextField 
          label="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          fullWidth 
          required 
        />
      </Box>
      <Box mb={2}>
        <TextField 
          label="Status" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          fullWidth 
          required 
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Update Task
      </Button>
      {message && <Typography color="secondary">{message}</Typography>}
    </form>
  );
};

export default UpdateTaskForm;
