import { useEffect, useMemo, useState } from "react";
import { deleteTask, getProjects, getTasks } from "../services/api";
import TaskForm from "../components/tasks/TaskForm";
import TaskBoard from "../components/tasks/TaskBoard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("board");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      const [taskData, projectData] = await Promise.all([getTasks(), getProjects()]);
      setTasks(taskData);
      setProjects(projectData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || task.priority === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  function save(task) {
    setTasks((current) => {
      const exists = current.some((item) => item._id === task._id);
      return exists ? current.map((item) => item._id === task._id ? task : item) : [task, ...current];
    });
    setModal(null);
  }

  async function remove(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="page-toolbar">
        <div>
          <h2 className="section-title">All tasks</h2>
          <p className="muted">{tasks.length} tasks in your workspace</p>
        </div>
        <Button onClick={() => setModal({ type: "create" })}>+ Add task</Button>
      </div>

      <div className="filters">
        <div className="search">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." />
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="view-toggle">
          <button className={view === "board" ? "active" : ""} onClick={() => setView("board")}>Board</button>
          <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
        </div>
      </div>

      {loading && <div className="loading">Loading tasks...</div>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && view === "board" && (
        <TaskBoard
          tasks={filtered}
          onEdit={(task) => setModal({ type: "edit", task })}
          onDelete={remove}
        />
      )}

      {!loading && view === "list" && (
        <div className="table-card">
          <table>
            <thead>
              <tr><th>Task</th><th>Priority</th><th>Status</th><th>Project</th><th>Due date</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task._id}>
                  <td><strong>{task.title}</strong><small>{task.description}</small></td>
                  <td><span className={`priority priority-${task.priority}`}>{task.priority}</span></td>
                  <td><span className={`status status-${task.status}`}>{task.status}</span></td>
                  <td>{task.project?.name || "General"}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}</td>
                  <td><button className="text-btn" onClick={() => setModal({ type: "edit", task })}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={Boolean(modal)}
        title={modal?.type === "edit" ? "Edit task" : "Create task"}
        onClose={() => setModal(null)}
      >
        <TaskForm
          task={modal?.task}
          projects={projects}
          onSaved={save}
          onCancel={() => setModal(null)}
        />
      </Modal>
    </>
  );
}
