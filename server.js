const express = require('express');

const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());

// Path to the tasks JSON file
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from the JSON file
const readTasks = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

// Helper function to write tasks to the JSON file
const writeTasks = (tasks) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};


// GET endpoint to retrieve all tasks
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await readTasks();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read tasks' });
    }
  });

// POST endpoint to add a new task
app.post('/tasks', async (req, res) => {
  const { title,  description, completed,lastUpdated } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const tasks = await readTasks();
    const newTask = {
      id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title,
      description,
      completed:false,
      lastUpdated: new Date().toISOString(), // Use system timestamp
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save task' });
  }
});

// PATCH endpoint to update a task by its ID
app.patch('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title,  description, completed,lastUpdated } = req.body;
  
    try {
      let tasks = await readTasks();
      const taskIndex = tasks.findIndex(t => t.id === id);
  
      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Update the task
      if (title !== undefined) {
        tasks[taskIndex].title = title;
      }
      if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
      }
      if (description !== undefined) {
        tasks[taskIndex].description = description;
      }
      tasks[taskIndex].lastUpdated = new Date().toISOString(); // Update timestamp
  
      await writeTasks(tasks);
      res.json(tasks[taskIndex]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

  // Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    try {
      const tasks = await readTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }
      tasks.splice(taskIndex, 1);
      await writeTasks(tasks);
      res.status(204).end(); // No content to send back
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
