const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// intern routes
app.use("/api/interns", require("./routes/internRoutes"));
// task routes
app.use("/api/tasks", require("./routes/taskRoutes")); 

module.exports = app;
