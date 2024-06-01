// src/components/DeleteTaskButton.js
import React from 'react';
import axios from '../axiosConfig';

const DeleteTaskButton = ({ taskId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      console.log('Task deleted:', response.data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return <button onClick={handleDelete}>Delete Task</button>;
};

export default DeleteTaskButton;
