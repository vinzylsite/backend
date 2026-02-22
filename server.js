const express = require("express"); 
const cors = require("cors"); 
require("dotenv").config(); 
  
const app = express(); 
const PORT = process.env.PORT || 5000; 
  
// Middleware 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Test route 
app.get("/", (req, res) => { 
  res.json({ message: "Server is running!" }); 
}); 
  
app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
});

const taskRoutes = require("./routes/tasks"); 
app.use("/api/tasks", taskRoutes); 

