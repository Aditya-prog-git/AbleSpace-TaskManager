import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, getTasks } from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);

        const [projectData, taskData] = await Promise.all([
          getProject(id),
          getTasks(id)
        ]);

        setProject(projectData);
        setTasks(taskData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(
        (task) => task.status === "completed"
      ).length,
      inProgress: tasks.filter(
        (task) => task.status === "in-progress"
      ).length,
      todo: tasks.filter(
        (task) => task.status === "todo"
      ).length
    };
  }, [tasks]);

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (error) {
    return <div className="error-banner">{error}</div>;
  }

  if (!project) {
    return (
      <div className="error-banner">
        Project not found.
      </div>
    );
  }

  return (
    <div className="project-details-page">

      <Link to="/projects" className="back-link">
        ← Back to projects
      </Link>

      <div className="project-details-card">

        <div
          className="project-details-accent"
          style={{ background: project.color }}
        />

        <div className="project-details-header">

          <div>
            <div
              className="project-details-icon"
              style={{
                color: project.color
              }}
            >
              ◆
            </div>

            <h2>{project.name}</h2>

            <p>
              {project.description ||
                "No description provided."}
            </p>
          </div>

          <span className="project-label">
            Project
          </span>

        </div>

        <div className="project-stats">

          <div>
            <span>Total tasks</span>
            <strong>{stats.total}</strong>
          </div>

          <div>
            <span>To do</span>
            <strong>{stats.todo}</strong>
          </div>

          <div>
            <span>In progress</span>
            <strong>{stats.inProgress}</strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>

        </div>

        <div className="project-task-section">

          <div className="project-task-header">
            <div>
              <h3>Tasks</h3>
              <p>
                Tasks belonging to this project
              </p>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="project-empty">
              No tasks have been added to this project yet.
            </div>
          ) : (
            <div className="project-task-list">

              {tasks.map((task) => (
                <Link
                  key={task._id}
                  to={`/tasks/${task._id}`}
                  className="project-task-row"
                >
                  <div>
                    <strong>{task.title}</strong>

                    <small>
                      {task.description ||
                        "No description"}
                    </small>
                  </div>

                  <div className="project-task-meta">

                    <span
                      className={`priority priority-${task.priority}`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`status status-${task.status}`}
                    >
                      {task.status}
                    </span>

                    <span className="task-arrow">
                      →
                    </span>

                  </div>
                </Link>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}