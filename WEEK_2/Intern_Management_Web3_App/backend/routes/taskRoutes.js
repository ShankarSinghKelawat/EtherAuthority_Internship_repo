const express = require("express");
const {
  createTask,
  getTasksByIntern,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.post("/create", createTask);
router.get("/intern/:internId", getTasksByIntern);
router.put("/update/:taskId", updateTask);
router.delete("/delete/:taskId", deleteTask);

module.exports = router;
