const express = require("express"); 
const router = express.Router(); 
  
let tasks = [ 
  { id: 1, title: "Learn JavaScript", completed: false }, 
  { id: 2, title: "Learn React", completed: false }, 
  { id: 3, title: "Learn MUI", completed: false }, 
]; 
let nextId = 4; 
  
// GET all tasks 
router.get("/", (req, res) => { 
  res.json(tasks); 
}); 
  
// GET single task 
router.get("/:id", (req, res) => { 

           const task = tasks.find( 
    t => t.id === parseInt(req.params.id) 
  ); 
  if (!task) return res.status(404) 
    .json({ error: "Task not found" }); 
  res.json(task); 
}); 
  
// POST create task 
router.post("/", (req, res) => { 
  const { title } = req.body; 
  if (!title || !title.trim()) { 
    return res.status(400) 
      .json({ error: "Title is required" }); 
  } 
  const newTask = { 
    id: nextId++, 
    title: title.trim(), 
    completed: false 
  }; 
  tasks.push(newTask); 
  res.status(201).json(newTask); 
}); 
  
// PUT update task 
router.put("/:id", (req, res) => { 
  const task = tasks.find( 
    t => t.id === parseInt(req.params.id) 
  ); 
  if (!task) return res.status(404) 
    .json({ error: "Task not found" }); 
  const { title, completed } = req.body; 
  if (title !== undefined) task.title = title; 
  if (completed !== undefined) task.completed = completed; 
  res.json(task); 
}); 
  
// DELETE task 
router.delete("/:id", (req, res) => { 
  const index = tasks.findIndex( 
    t => t.id === parseInt(req.params.id) 
  ); 
  if (index === -1) return res.status(404) 
    .json({ error: "Task not found" }); 
  tasks.splice(index, 1); 
  res.json({ message: "Task deleted" }); 
}); 
  
module.exports = router;
