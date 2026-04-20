const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend

// In-memory tasks (replace with DB later)
let tasks = [
    { id: 1, title: "Learn Node.js basics", completed: false, priority: "high", dueDate: "2026-04-25" },
    { id: 2, title: "Build portfolio projects", completed: true, priority: "medium", dueDate: "2026-04-20" }
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
        priority: req.body.priority || "medium",
        dueDate: req.body.dueDate || null
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Toggle complete
app.patch('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});