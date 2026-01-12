const Task = require("../models/Task");

/* CREATE TASK */
exports.createTask = async (req, res) => {
  try {
    const { internId, title, status } = req.body;

    if (!internId || !title) {
      return res.status(400).json({ message: "internId and title required" });
    }

    const task = await Task.create({
      internId,
      title,
      status
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET TASKS BY INTERN */
exports.getTasksByIntern = async (req, res) => {
  try {
    const { internId } = req.params;
    const tasks = await Task.find({ internId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE TASK */
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE TASK */
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
