import React, { useState } from 'react';
import axios from '../axiosConfig';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks', {
        Title: title,
        Description: description,
        Status: status,
      });
      onTaskAdded(response.data);
      setTitle('');
      setDescription('');
      setStatus('');
      setMessage('Task added successfully!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Error adding task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Task
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
        Add Task
      </Button>
      {message && <Typography color="secondary">{message}</Typography>}
    </form>
  );
};

export default AddTaskForm;
