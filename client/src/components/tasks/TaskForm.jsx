import { useEffect, useState } from "react";
import { createTask, updateTask } from "../../services/api";
import Button from "../ui/Button";

const initial = { title: "", description: "", priority: "medium", status: "todo", dueDate: "", project: "" };

export default function TaskForm({ task, projects, onSaved, onCancel }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "todo",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        project: task.project?._id || task.project || ""
      });
    } else {
      setForm(initial);
    }
  }, [task]);

  function change(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      const payload = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        project: form.project || null,
        dueDate: form.dueDate || null
      };

      const saved = task
        ? await updateTask(task._id, payload)
        : await createTask(payload);

      onSaved(saved);
      if (!task) setForm(initial);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>
        Title
        <input name="title" value={form.title} onChange={change} placeholder="Task title" />
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={change} placeholder="What needs to be done?" rows="3" />
      </label>

      <div className="two-col">
        <label>
          Status
          <select name="status" value={form.status} onChange={change}>
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={change}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <div className="two-col">
        <label>
          Due date
          <input type="date" name="dueDate" value={form.dueDate} onChange={change} />
        </label>

        <label>
          Project
          <select name="project" value={form.project} onChange={change}>
            <option value="">No project</option>
            {projects.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </label>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
        <Button type="submit">{task ? "Save changes" : "Create task"}</Button>
      </div>
    </form>
  );
}
