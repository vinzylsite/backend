const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const taskRoutes = require("./routes/tasks");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
const logger = (req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
};
app.use(logger);

// Routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware (4 params)
const errorHandler = (err, req, res, next) => {
 console.error(err.stack);
 res.status(500).json({ error: "Server error" });
};
app.use(errorHandler); // add AFTER all routes

// Test route
app.get("/", (req, res) => {
 res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});

