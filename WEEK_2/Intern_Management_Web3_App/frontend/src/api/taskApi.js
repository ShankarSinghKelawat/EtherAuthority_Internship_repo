const BASE_URL = "http://localhost:5000/api/tasks";

export const createTask = async (data) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getTasksByIntern = async (internId) => {
  const res = await fetch(`${BASE_URL}/intern/${internId}`);
  return res.json();
};

export const updateTask = async (taskId, data) => {
  const res = await fetch(`${BASE_URL}/update/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteTask = async (taskId) => {
  const res = await fetch(`${BASE_URL}/delete/${taskId}`, {
    method: "DELETE"
  });
  return res.json();
};
