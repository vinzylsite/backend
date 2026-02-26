const express = require("express");
const router = express.Router();
const { tasks: db } = require("../database");

let tasks = [
 { id: 1, title: "Learn JavaScript", completed: false },
 { id: 2, title: "Learn React", completed: false },
 { id: 3, title: "Learn MUI", completed: false },
];
let nextId = 4;

router.get("/", (req, res) => {
 res.json(tasks);
});

router.get("/:id", (req, res) => {
  const task = tasks.find( t => t.id === parseInt(req.params.id));
 if (!task) return res.status(404)
 .json({ error: "Task not found" });
 res.json(task);
});

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

router.get("/", (req, res) => {
  db.find({}).sort({ createdAt: -1 }).exec((err, tasks) => {
    if (err) return res.status(500)
      .json({ error: "Failed to fetch tasks" });
    res.json(tasks);
  });
});

router.get("/:id", (req, res) => {
  db.findOne({ _id: req.params.id }, (err, task) => {
    if (err) return res.status(500)
      .json({ error: "Database error" });
    if (!task) return res.status(404)
      .json({ error: "Task not found" });
    res.json(task);
  });
});

router.post("/", (req, res) => {
  const { title, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400)
      .json({ error: "Title is required" });
  }

  const newTask = {
    title: title.trim(),
    completed: false,
    priority: priority || "medium",
  };

  db.insert(newTask, (err, task) => {
    if (err) return res.status(500)
      .json({ error: "Failed to create task" });
    res.status(201).json(task);
  });
});

router.put("/:id", (req, res) => {
  const { title, completed, priority } = req.body;
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (completed !== undefined) updates.completed = completed;
  if (priority !== undefined) updates.priority = priority;

  db.update(
    { _id: req.params.id },
    { $set: updates },
    { returnUpdatedDocs: true },
    (err, numReplaced, updatedDoc) => {
      if (err) return res.status(500)
        .json({ error: "Failed to update" });
      if (numReplaced === 0) return res.status(404)
        .json({ error: "Task not found" });
      res.json(updatedDoc);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) return res.status(500)
      .json({ error: "Failed to delete" });
    if (numRemoved === 0) return res.status(404)
      .json({ error: "Task not found" });
    res.json({ message: "Task deleted", _id: req.params.id });
  });
});

module.exports = router;