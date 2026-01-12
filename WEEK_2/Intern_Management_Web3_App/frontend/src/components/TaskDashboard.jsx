import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000/api/tasks";

function TaskDashboard({ internId }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!internId) return;
    const res = await fetch(`${BASE_URL}/intern/${internId}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [internId]);

  const createTask = async () => {
    if (!title) return alert("Task title required");

    await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        internId,
        title,
        status: "pending"
      })
    });

    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (taskId, status) => {
    await fetch(`${BASE_URL}/update/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await fetch(`${BASE_URL}/delete/${taskId}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  return (
    <>
    <div className="taskdashboard">
      <h1>Tasks</h1>
    <div className="task_card">
      <h2>Add task</h2>
      <div>
        <input
          type="text"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="addtaskBtn" onClick={createTask}>Add</button>
      </div>

      {tasks.length === 0 && <p>No tasks yet</p>}

      <br />
      <h2>My Tasks</h2>
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "8px"
          }}
        >
          <strong>{task.title}</strong>
          <select
            value={task.status}
            onChange={(e) =>
              updateStatus(task._id, e.target.value)
            }
          >
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">completed</option>
          </select>

          <button className="deleteBtn" onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
    </div>
    </>
  );
}

export default TaskDashboard;
