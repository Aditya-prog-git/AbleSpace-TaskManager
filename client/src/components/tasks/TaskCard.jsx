import { Link } from "react-router-dom";

const statusLabel = {
  todo: "To do",
  "in-progress": "In progress",
  completed: "Completed"
};

export default function TaskCard({ task, onEdit, onDelete, compact = false }) {
  return (
    <article className={`task-card ${compact ? "compact" : ""}`}>
      <div className="task-card-top">
        <span className={`priority priority-${task.priority}`}>{task.priority}</span>
        <button className="more-btn" onClick={() => onEdit(task)}>•••</button>
      </div>

      <Link to={`/tasks/${task._id}`} className="task-title">{task.title}</Link>

      {!compact && task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className={`status status-${task.status}`}>{statusLabel[task.status]}</span>
        {task.dueDate && <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>

      <div className="task-card-bottom">
        <span>{task.project?.name || "General"}</span>
        <button className="delete-link" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </article>
  );
}
