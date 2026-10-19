import { useEffect, useRef, useState } from "react";
import { TasksContext } from "./TasksContext.js";
import { createRequestQueue } from "../services/requestQueue.js";
import * as api from "../services/tasks.js";

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enqueue] = useState(createRequestQueue);
  const mounted = useRef(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // Reads share the mutation queue, so a delayed refresh cannot publish an
    // older snapshot after a successful edit/delete. StrictMode's aborted reads
    // are skipped even if they were still waiting in the queue.
    enqueue(async () => {
      if (signal.aborted) return;
      const next = await api.loadTasks(signal);
      if (!signal.aborted) setTasks(next);
    }).catch((error) => {
      if (!signal.aborted) setError(error.message);
    }).finally(() => {
      if (!signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [enqueue, revision]);

  function reload() {
    setLoading(true); setError(""); setRevision((old) => old + 1);
  }

  function mutate(request) {
    return enqueue(async () => {
      // Never execute waiting operations using another account's later token.
      if (!mounted.current) throw new DOMException("Окно задачи закрыто", "AbortError");
      const next = await request();
      if (mounted.current) setTasks(next);
    });
  }
  function create(values) { return mutate(() => api.createTask(values)); }
  function update(id, values) { return mutate(() => api.updateTask(id, values)); }
  function remove(id) { return mutate(() => api.deleteTask(id)); }

  return <TasksContext.Provider value={{ tasks, loading, error, reload, create, update, remove }}>
    {children}
  </TasksContext.Provider>;
}
