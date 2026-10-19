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
  const { tasks, loading, error, update, remove } = useTasks();
  const task = findTask(tasks, id);
  const [busy, setBusy] = useState(false);
  const close = () => navigate("/", { replace: true });
  const ready = !loading && !error && task;
  return <Modal titleId={ready ? "task-form-title" : "edit-state-title"} onClose={close} busy={busy}>
    {ready ? <TaskForm key={task.id} task={task} onSave={(values) => update(task.id, values)}
      onDelete={() => remove(task.id)} onClose={close} onBusyChange={setBusy} /> : <>
      <div id="edit-state-title"><TaskLoadState missing /></div>
      <button type="button" onClick={close}>Вернуться на доску</button>
    </>}
  </Modal>;
}
