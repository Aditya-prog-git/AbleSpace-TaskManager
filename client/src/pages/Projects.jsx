import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createProject, deleteProject, getProjects } from "../services/api";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", color: "#8b5cf6" });
  const [error, setError] = useState("");

  async function load() {
    try { setProjects(await getProjects()); }
    catch (err) { setError(err.message); }
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Project name is required.");
    try {
      const project = await createProject(form);
      setProjects((current) => [project, ...current]);
      setForm({ name: "", description: "", color: "#8b5cf6" });
      setModal(false);
      setError("");
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    if (!window.confirm("Delete this project?")) return;
    await deleteProject(id);
    setProjects((current) => current.filter((p) => p._id !== id));
  }

  return (
    <>
      <div className="page-toolbar">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="muted">Organize tasks into focused workspaces.</p>
        </div>
        <Button onClick={() => setModal(true)}>+ New project</Button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project._id}>
            <div className="project-color" style={{ background: project.color }} />
            <div className="project-card-head">
              <div className="project-icon" style={{ color: project.color }}>◆</div>
              <button className="more-btn" onClick={() => remove(project._id)}>•••</button>
            </div>
            <h3>{project.name}</h3>
            <p>{project.description || "No description."}</p>
            <div className="project-footer">
              <span>Project</span>

              <Link
                to={`/projects/${project._id}`}
                className="project-details-link"
              >
                View details →
              </Link>
            </div>
          </article>
        ))}
        {projects.length === 0 && <div className="empty-state">No projects yet. Create your first one.</div>}
      </div>

      <Modal open={modal} title="Create project" onClose={() => setModal(false)}>
        <form className="form-grid" onSubmit={submit}>
          <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project name" /></label>
          <label>Description<textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" /></label>
          <label>Accent color<input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} /></label>
          <div className="form-actions"><Button type="submit">Create project</Button></div>
        </form>
      </Modal>
    </>
  );
}
