import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Task List
      </Typography>
      <List>
        {tasks.map(task => (
          <ListItem key={task.Task_id}>
            <ListItemText 
              primary={task.Title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {task.Description}
                  </Typography>
                  <br />
                  Status: {task.Status}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onUpdate(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.Task_id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
