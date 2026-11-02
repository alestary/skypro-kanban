import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import TaskLoadState from "../components/TaskLoadState";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TasksContext.js";

export default function AddCardPage() {
  const navigate = useNavigate();
  const { create, loading, error, reload } = useTasks();
  const [busy, setBusy] = useState(false);
  const close = () => navigate("/", { replace: true });
  return (
    <Modal titleId="task-form-title" onClose={close} busy={busy} variant="form">
      {loading ? <><h1 id="task-form-title">Создание задачи</h1><TaskLoadState /></> :
       error ? <><h1 id="task-form-title">Не удалось загрузить задачи</h1><p role="alert">{error}</p>
         <button type="button" onClick={reload}>Повторить загрузку</button></> :
       <TaskForm onSave={create} onClose={close} onBusyChange={setBusy} />}
    </Modal>
  );
}
