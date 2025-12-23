const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();


// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Express server is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

