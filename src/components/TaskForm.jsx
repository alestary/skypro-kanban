import { useState } from "react";
import { addCardStyles as styles } from "../pages/AddCardPage.styled";
import { dateInputValue, statuses, topics } from "../services/tasks.js";

export default function TaskForm({ task, onSave, onDelete, onClose, onBusyChange }) {
  const editing = Boolean(task);
  const [values, setValues] = useState(() => ({
    title: task?.title || "", description: task?.description || "",
    topic: task?.topic || topics[0], status: task?.status || statuses[0],
    date: dateInputValue(task?.date),
  }));
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const busy = Boolean(pending);
  function change(field, value) { setValues((old) => ({ ...old, [field]: value })); setError(""); }
  async function perform(action, operation) {
    if (busy) return;
    setError(""); setPending(action); onBusyChange(true);
    try { await operation(); onClose(); }
    catch (error) { setError(error.message || "Не удалось выполнить действие"); }
    finally { setPending(""); onBusyChange(false); }
  }
  function submit(event) {
    event.preventDefault();
    void perform("save", () => onSave(values));
  }
  function remove() {
    if (busy || !window.confirm(`Удалить задачу «${task.title}»?`)) return;
    void perform("delete", onDelete);
  }
  return <form onSubmit={submit} noValidate>
    <h1 id="task-form-title" style={styles.title}>{editing ? "Редактирование задачи" : "Создание задачи"}</h1>
    <fieldset disabled={busy} className="task-fields">
      <div className="task-form-content">
        <div style={styles.leftColumn}>
          <label htmlFor="task-title" style={styles.label}>Название задачи</label>
          <input id="task-title" value={values.title} onChange={(e) => change("title", e.target.value)}
            placeholder="Введите название задачи..." style={styles.input} required />
          <label htmlFor="task-description" style={styles.label}>Описание задачи</label>
          <textarea id="task-description" value={values.description} onChange={(e) => change("description", e.target.value)}
            placeholder="Введите описание задачи..." style={styles.textarea} />
        </div>
        <div style={styles.rightColumn}>
          <label htmlFor="task-date" style={styles.label}>Срок выполнения</label>
          <input id="task-date" type="date" value={values.date} onChange={(e) => change("date", e.target.value)}
            style={styles.dateInput} required />
          <p style={styles.dateHint}>Выберите срок исполнения.</p>
          <label htmlFor="task-status" style={{ ...styles.label, marginTop: 20 }}>Статус</label>
          <select id="task-status" value={values.status} onChange={(e) => change("status", e.target.value)}>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </div>
        <div style={styles.categorySection}>
          <p style={styles.label}>Категория</p>
          <div style={styles.categoryList} role="group" aria-label="Категория">
            {topics.map((topic) => <button key={topic} type="button" aria-pressed={values.topic === topic}
              onClick={() => change("topic", topic)} style={{ ...styles.categoryButton, ...styles.categoryColors[topic],
                ...(values.topic === topic ? { outline: "2px solid", outlineOffset: "2px" } : {}) }}>{topic}</button>)}
          </div>
        </div>
      </div>
    </fieldset>
    {error && <p role="alert" style={styles.error}>{error}</p>}
    <div style={{ ...styles.actions, gap: 10, flexWrap: "wrap" }}>
      {editing && onDelete && <button type="button" disabled={busy} onClick={remove}
        style={{ ...styles.cancelButton, color: "#c63737" }}>
        {pending === "delete" ? "Удаление…" : "Удалить задачу"}
      </button>}
      <button type="button" style={styles.cancelButton} disabled={busy} onClick={onClose}>Отмена</button>
      <button type="submit" style={styles.submitButton} disabled={busy}>
        {pending === "save" ? "Сохранение…" : editing ? "Сохранить изменения" : "Создать задачу"}
      </button>
    </div>
  </form>;
}
