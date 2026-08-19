const API_URL = "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}


// =========================
// TASKS
// =========================

export const getTasks = (projectId = "") =>
  request(
    projectId
      ? `/tasks?project=${projectId}`
      : "/tasks"
  );

export const getTask = (id) =>
  request(`/tasks/${id}`);

export const createTask = (data) =>
  request("/tasks", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateTask = (id, data) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: "DELETE"
  });


// =========================
// PROJECTS
// =========================

export const getProjects = () =>
  request("/projects");

export const getProject = (id) =>
  request(`/projects/${id}`);

export const createProject = (data) =>
  request("/projects", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateProject = (id, data) =>
  request(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteProject = (id) =>
  request(`/projects/${id}`, {
    method: "DELETE"
  });