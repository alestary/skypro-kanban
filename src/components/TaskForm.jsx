import { useState } from "react";
import { addCardStyles as styles } from "../pages/AddCardPage.styled";
import { dateInputValue, statuses, topics } from "../services/tasks.js";
import Calendar from "./Calendar";

export default function TaskForm({ task, onSave, onDelete, onClose, onBusyChange }) {
  const editing = Boolean(task);
  const [values, setValues] = useState(() => ({
    title: task?.title || "",
    description: task?.description || "",
    topic: topics.includes(task?.topic) ? task.topic : "",
    status: statuses.includes(task?.status) ? task.status : statuses[0],
    date: dateInputValue(task?.date),
  }));
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const busy = Boolean(pending);

  function change(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function parseCalendarDate(value) {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  async function perform(action, operation) {
    if (busy) return;
    setError("");
    setPending(action);
    onBusyChange?.(true);
    try {
      await operation();
      onClose();
    } catch (requestError) {
      setError(requestError.message || "Не удалось выполнить действие");
    } finally {
      setPending("");
      onBusyChange?.(false);
    }
  }

  function submit(event) {
    event.preventDefault();
    if (!values.title.trim()) return setError("Введите название задачи");
    if (!values.topic) return setError("Выберите категорию задачи");
    if (!values.date) return setError("Укажите корректный срок выполнения");
    void perform("save", () => onSave({
      ...values, title: values.title.trim(), description: values.description.trim(),
    }));
  }

  function remove() {
    if (busy || !onDelete || !task) return;
    if (window.confirm(`Удалить задачу «${task.title}»?`)) {
      void perform("delete", onDelete);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <div style={styles.header}>
        <h1 id="task-form-title" style={styles.title}>{editing ? "Редактирование задачи" : "Создание задачи"}</h1>
        {values.topic && <span style={{ ...styles.categoryButton, ...styles.categoryColors[values.topic] }}>{values.topic}</span>}
      </div>

      <fieldset disabled={busy} style={styles.fieldset}>
        <label htmlFor="task-title" style={styles.label}>Название задачи</label>
        <input id="task-title" value={values.title} onChange={(e) => change("title", e.target.value)}
          placeholder="Введите название задачи" style={styles.input} />

        <section style={{ marginBottom: 16 }}>
          <p style={styles.label}>Статус</p>
          <div role="group" aria-label="Статус задачи" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {statuses.map((status) => (
              <button key={status} type="button" aria-pressed={values.status === status}
                onClick={() => change("status", status)}
                style={{ ...(values.status === status ? styles.activeStatusButton : styles.statusButton),
                  borderRadius: 20, padding: "6px 14px", backgroundColor: values.status === status ? "#94A9C7" : "#fff",
                  color: values.status === status ? "#fff" : "#94A9C7", border: "1px solid #DCE4EF", cursor: "pointer" }}>
                {status}
              </button>
            ))}
          </div>
        </section>

        <section style={styles.categorySection}>
          <p style={styles.label}>Категория задачи</p>
          <div style={styles.categoryList}>
            {topics.map((topic) => (
              <button key={topic} type="button" aria-pressed={values.topic === topic}
                onClick={() => change("topic", topic)}
                style={{ ...styles.categoryButton, ...styles.categoryColors[topic],
                  outline: values.topic === topic ? "2px solid #565EEF" : "none" }}>
                {topic}
              </button>
            ))}
          </div>
        </section>

        <div style={{ ...styles.content, gridTemplateColumns: "minmax(0, 1fr) 160px", marginTop: 16 }}>
          <div style={styles.leftColumn}>
            <label htmlFor="task-description" style={styles.label}>Описание задачи</label>
            <textarea id="task-description" value={values.description}
              onChange={(e) => change("description", e.target.value)}
              placeholder="Введите описание задачи..." style={{ ...styles.textarea, minHeight: 168 }} />
          </div>
          <div style={styles.rightColumn}>
            <p style={styles.label}>Срок выполнения</p>
            <Calendar
              selectedDate={parseCalendarDate(values.date)}
              onDateSelect={(date) => change("date", `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`)}
            />
            <p style={styles.dateHint}>
              {values.date ? `Срок исполнения: ${values.date.split("-").reverse().join(".")}` : "Выберите дату"}
            </p>
          </div>
        </div>
      </fieldset>

      {error && <p role="alert" style={styles.error}>{error}</p>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="submit" disabled={busy} style={styles.submitButton}>
            {pending === "save" ? "Сохранение…" : editing ? "Сохранить изменения" : "Создать задачу"}
          </button>
          <button type="button" disabled={busy} onClick={onClose} style={styles.cancelButton}>Отмена</button>
          {editing && onDelete && <button type="button" disabled={busy} onClick={remove} style={styles.cancelButton}>
            {pending === "delete" ? "Удаление…" : "Удалить задачу"}
          </button>}
        </div>
        <button type="button" disabled={busy} onClick={onClose} style={styles.submitButton}>Закрыть</button>
      </div>
    </form>
  );
}
