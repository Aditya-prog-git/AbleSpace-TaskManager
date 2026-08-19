import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask, updateTask } from "../services/api";
import Button from "../components/ui/Button";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTask(id).then(setTask).finally(() => setLoading(false));
  }, [id]);

  async function complete() {
    const updated = await updateTask(id, { status: "completed" });
    setTask(updated);
  }

  async function remove() {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    navigate("/tasks");
  }

  if (loading) return <div className="loading">Loading task...</div>;
  if (!task) return <div className="error-banner">Task not found.</div>;

  return (
    <div className="details-page">
      <Link to="/tasks" className="back-link">← Back to tasks</Link>

      <div className="details-card">
        <div className="details-head">
          <div>
            <span className={`priority priority-${task.priority}`}>{task.priority}</span>
            <h2>{task.title}</h2>
            <p>{task.description || "No description provided."}</p>
          </div>
          <span className={`status status-${task.status}`}>{task.status}</span>
        </div>

        <div className="details-grid">
          <div><span>Project</span><strong>{task.project?.name || "General"}</strong></div>
          <div><span>Due date</span><strong>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</strong></div>
          <div><span>Created</span><strong>{new Date(task.createdAt).toLocaleDateString()}</strong></div>
          <div><span>Last updated</span><strong>{new Date(task.updatedAt).toLocaleDateString()}</strong></div>
        </div>

        <div className="form-actions">
          <Button onClick={complete} disabled={task.status === "completed"}>Mark complete</Button>
          <Button variant="danger" onClick={remove}>Delete task</Button>
        </div>
      </div>
    </div>
  );
}
