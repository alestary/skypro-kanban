import { useState } from "react";
import { addCardStyles as styles } from "../pages/AddCardPage.styled";
import { dateInputValue, statuses, topics } from "../services/tasks.js";
import Calendar from "./Calendar";

export default function TaskForm({
  task,
  onSave,
  onDelete,
  onClose,
  onCancel,
  onBusyChange,
}) {
  const editing = Boolean(task);

  const [values, setValues] = useState(() => ({
    title: task?.title || "",
    description: task?.description || "",
    topic: task?.topic || topics[0],
    status: task?.status || statuses[0],
    date: dateInputValue(task?.date),
  }));

  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const busy = Boolean(pending);

  function change(field, value) {
    setValues((old) => ({
      ...old,
      [field]: value,
    }));
    setError("");
  }

  async function perform(action, operation) {
    if (busy) return;

    setError("");
    setPending(action);
    onBusyChange?.(true);

    try {
      await operation();
      onClose();
    } catch (error) {
      setError(error.message || "Не удалось выполнить действие");
    } finally {
      setPending("");
      onBusyChange?.(false);
    }
  }

  function submit(event) {
    event.preventDefault();

    if (!values.title.trim()) {
      setError("Введите название задачи");
      return;
    }

    if (!values.date) {
      setError("Выберите срок выполнения задачи");
      return;
    }

    const taskValues = {
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    };

    void perform("save", () => onSave(taskValues));
  }

  function remove() {
    if (busy || !onDelete || !task) return;

    const confirmed = window.confirm(
      `Удалить задачу «${task.title}»?`
    );

    if (!confirmed) return;

    void perform("delete", () => onDelete());
  }

  function handleDateSelect(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    change("date", `${year}-${month}-${day}`);
  }

  function cancel() {
    if (busy) return;

    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  }

  function formatDeadline(dateString) {
    if (!dateString) return "Не выбран";

    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) return "Не выбран";

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Заголовок и категория */}
      <div style={styles.header}>
        <h1 id="task-form-title" style={styles.title}>
          {editing ? values.title : "Создание задачи"}
        </h1>

        <div
          style={{
            ...styles.categoryButton,
            ...styles.categoryColors[values.topic],
            flexShrink: 0,
          }}
        >
          {values.topic}
        </div>
      </div>

      <fieldset disabled={busy} style={styles.fieldset}>
        {/* Статусы */}
        <section style={{ marginBottom: 16 }}>
          <p style={styles.label}>Статус</p>

          <div
            role="group"
            aria-label="Статус задачи"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 10,
            }}
          >
            {statuses.map((status) => {
              const selected = values.status === status;

              return (
                <button
                  key={status}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => change("status", status)}
                  style={{
                    ...(selected
                      ? styles.activeStatusButton
                      : styles.statusButton),
                    borderRadius: 20,
                    padding: "6px 14px",
                    backgroundColor: selected ? "#94A9C7" : "#FFFFFF",
                    color: selected ? "#FFFFFF" : "#94A9C7",
                    border: "1px solid #DCE4EF",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </section>

        {/* Описание и календарь */}
        <div
          style={{
            ...styles.content,
            gridTemplateColumns: "minmax(0, 1fr) 160px",
            alignItems: "start",
          }}
        >
          <div style={styles.leftColumn}>
            <label htmlFor="task-description" style={styles.label}>
              Описание задачи
            </label>

            <textarea
              id="task-description"
              value={values.description}
              onChange={(event) =>
                change("description", event.target.value)
              }
              placeholder="Введите описание задачи..."
              style={{
                ...styles.textarea,
                minHeight: 168,
                resize: "vertical",
              }}
            />
          </div>

          <div style={styles.rightColumn}>
            <p style={styles.label}>Даты</p>

            <div style={{ marginTop: 10 }}>
              <Calendar
                selectedDate={
                  values.date
                    ? new Date(`${values.date}T12:00:00`)
                    : null
                }
                onDateSelect={handleDateSelect}
              />
            </div>

            <p
              style={{
                ...styles.dateHint,
                color: "#94A6BE",
                fontSize: 10,
                marginTop: 8,
              }}
            >
              Срок исполнения:{" "}
              <span style={{ color: "#333333" }}>
                {formatDeadline(values.date)}.
              </span>
            </p>
          </div>
        </div>
      </fieldset>

      {error && (
        <p role="alert" style={styles.error}>
          {error}
        </p>
      )}

      {/* Кнопки действий */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          marginTop: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <button
            type="submit"
            style={styles.submitButton}
            disabled={busy}
          >
            {pending === "save" ? "Сохранение…" : "Сохранить"}
          </button>

          <button
            type="button"
            style={styles.cancelButton}
            disabled={busy}
            onClick={cancel}
          >
            Отменить
          </button>

          {editing && onDelete && (
            <button
              type="button"
              disabled={busy}
              onClick={remove}
              style={{
                ...styles.cancelButton,
                color: "#565EEF",
                border: "1px solid #565EEF",
                backgroundColor: "#FFFFFF",
                borderRadius: 4,
              }}
            >
              {pending === "delete"
                ? "Удаление…"
                : "Удалить задачу"}
            </button>
          )}
        </div>

        <button
          type="button"
          style={styles.submitButton}
          disabled={busy}
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </form>
  );
}