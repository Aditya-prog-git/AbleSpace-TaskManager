import TaskCard from "./TaskCard";

const columns = [
  ["todo", "To do"],
  ["in-progress", "In progress"],
  ["completed", "Completed"]
];

export default function TaskBoard({ tasks, onEdit, onDelete }) {
  return (
    <div className="board">
      {columns.map(([status, label]) => {
        const items = tasks.filter((task) => task.status === status);
        return (
          <section className="board-column" key={status}>
            <div className="column-title">
              <span>{label}</span>
              <span className="count">{items.length}</span>
            </div>
            <div className="column-list">
              {items.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} compact />
              ))}
              {items.length === 0 && <div className="empty-column">No tasks</div>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
