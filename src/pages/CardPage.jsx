
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styles } from "./CardPage.styled";
import { addCardStyles } from "./AddCardPage.styled";
import Modal from "../components/Modal";
import TaskLoadState from "../components/TaskLoadState";
import { useTasks } from "../context/TasksContext.js";
import { findTask, formatTaskDate } from "../services/tasks.js";

export default function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, loading, error, remove, reload } = useTasks();

  const task = findTask(tasks, id);

  const [busy, setBusy] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const close = () => navigate("/", { replace: true });

  async function handleDelete() {
    if (!task || busy) return;

    const confirmed = window.confirm(
      `Удалить задачу «${task.title}»?`
    );

    if (!confirmed) return;

    setBusy(true);
    setDeleteError("");

    try {
      await remove(task.id);
      close();
    } catch (error) {
      setDeleteError(
        error.message || "Не удалось удалить задачу"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      titleId="card-title"
      onClose={close}
      busy={busy}
    >
      {loading ? (
        <>
          <h1 id="card-title" style={styles.title}>
            Загрузка задачи
          </h1>

          <TaskLoadState />

          <button
            type="button"
            style={styles.primaryButton}
            onClick={close}
          >
            Вернуться на доску
          </button>
        </>
      ) : error ? (
        <>
          <h1 id="card-title" style={styles.title}>
            Не удалось загрузить задачу
          </h1>

          <p role="alert">{error}</p>

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={reload}
            >
              Повторить загрузку
            </button>

            <button
              type="button"
              style={styles.primaryButton}
              onClick={close}
            >
              Вернуться на доску
            </button>
          </div>
        </>
      ) : !task ? (
        <>
          <h1 id="card-title" style={styles.title}>
            Задача не найдена
          </h1>

          <p>
            Возможно, задача была удалена или её адрес неверен.
          </p>

          <button
            type="button"
            style={styles.primaryButton}
            onClick={close}
          >
            Вернуться на доску
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              ...styles.header,
              flexWrap: "wrap",
            }}
          >
            <h1 id="card-title" style={styles.title}>
              {task.title}
            </h1>

            <span
              style={{
                ...styles.category,
                ...addCardStyles.categoryColors[task.topic],
              }}
            >
              {task.topic}
            </span>
          </div>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Статус</h2>

            <span
              style={{
                ...styles.status,
                ...styles.activeStatus,
              }}
            >
              {task.status}
            </span>
          </section>

          <div className="task-view-content">
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Описание задачи
              </h2>

              <div style={styles.description}>
                {task.description || "Описание отсутствует"}
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>
                Срок выполнения
              </h2>

              <p style={styles.date}>
                {formatTaskDate(task.date)}
              </p>
            </section>
          </div>

          {deleteError && (
            <p
              role="alert"
              style={addCardStyles.error}
            >
              {deleteError}
            </p>
          )}

          <div style={styles.actions}>
            <div style={styles.actionGroup}>
              <button
                type="button"
                disabled={busy}
                style={styles.secondaryButton}
                onClick={() =>
                  navigate(
                    `/edit-card/${encodeURIComponent(task.id)}`
                  )
                }
              >
                Редактировать задачу
              </button>

              <button
                type="button"
                disabled={busy}
                style={styles.dangerButton}
                onClick={handleDelete}
              >
                {busy ? "Удаление…" : "Удалить задачу"}
              </button>
            </div>

            <button
              type="button"
              disabled={busy}
              style={styles.primaryButton}
              onClick={close}
            >
              Закрыть
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
