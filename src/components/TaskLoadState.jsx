import { useTasks } from "../context/TasksContext.js";

export default function TaskLoadState({ missing = false }) {
  const { loading, error, reload } = useTasks();
  return <div className="task-state" role={error ? "alert" : "status"}>
    <h2>{loading ? "Загрузка задач…" : error || (missing ? "Задача не найдена" : "")}</h2>
    {error && <button type="button" onClick={() => reload()}>Повторить</button>}
  </div>;
}
