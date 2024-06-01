import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import UpdateTaskForm from './components/UpdateTaskForm';
import { Container, Typography, Button, CircularProgress } from '@mui/material';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskList, setShowTaskList] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks(); // Fetch the tasks again to get the updated list
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.Task_id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await axios.put(`/tasks/${updatedTask.Task_id}`, updatedTask);
      setTasks(tasks.map(task => (task.Task_id === updatedTask.Task_id ? updatedTask : task)));
      setTaskToUpdate(null); // Close the update form
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const showUpdateForm = (task) => {
    setTaskToUpdate(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Task Manager
      </Typography>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setShowTaskList(!showTaskList)}
        style={{ marginTop: '20px' }}
      >
        {showTaskList ? 'Hide Task List' : 'Show Task List'}
      </Button>
      {showTaskList && (
        loading ? <CircularProgress style={{ marginTop: '20px' }} /> : 
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onUpdate={showUpdateForm}
        />
      )}
      {taskToUpdate && (
        <UpdateTaskForm
          task={taskToUpdate}
          onTaskUpdated={handleUpdate}
        />
      )}
    </Container>
  );
};

export default App;
