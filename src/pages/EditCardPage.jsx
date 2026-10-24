
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import TaskLoadState from "../components/TaskLoadState";
import { useTasks } from "../context/TasksContext.js";
import { findTask } from "../services/tasks.js";

export default function EditCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, loading, error, update, remove, reload } = useTasks();

  const task = findTask(tasks, id);

  const [busy, setBusy] = useState(false);

  const close = () => navigate("/", { replace: true });

  return (
    <Modal
      titleId={task && !loading && !error
        ? "task-form-title"
        : "edit-state-title"}
      onClose={close}
      busy={busy}
    >
      {loading ? (
        <>
          <h1 id="edit-state-title">Загрузка задачи</h1>
          <TaskLoadState />

          <button type="button" onClick={close}>
            Вернуться на доску
          </button>
        </>
      ) : error ? (
        <>
          <h1 id="edit-state-title">
            Не удалось загрузить задачи
          </h1>

          <p role="alert">{error}</p>

          <button type="button" onClick={reload}>
            Повторить загрузку
          </button>

          <button type="button" onClick={close}>
            Вернуться на доску
          </button>
        </>
      ) : !task ? (
        <>
          <h1 id="edit-state-title">Задача не найдена</h1>

          <p>
            Возможно, задача была удалена или ссылка неверна.
          </p>

          <button type="button" onClick={close}>
            Вернуться на доску
          </button>
        </>
      ) : (
        <TaskForm
          key={task.id}
          task={task}
          onSave={(values) => update(task.id, values)}
          onDelete={() => remove(task.id)}
          onClose={close}
          onBusyChange={setBusy}
        />
      )}
    </Modal>
  );
}
