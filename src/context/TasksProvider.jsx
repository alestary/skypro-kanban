import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { TasksContext } from "./TasksContext.js";
import { createRequestQueue } from "../services/requestQueue.js";
import * as api from "../services/tasks.js";

export default function TasksProvider({ children }) {
  const { isAuth } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(() => Boolean(isAuth));
  const [error, setError] = useState("");
  const [enqueue] = useState(createRequestQueue);
  const [revision, setRevision] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setTasks([]);
      setError("");
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setError("");

    enqueue(async () => {
      if (signal.aborted) return;

      const next = await api.loadTasks(signal);

      if (!signal.aborted) {
        setTasks(next);
      }
    })
      .catch((requestError) => {
        if (!signal.aborted) {
          setError(requestError.message || "Не удалось загрузить задачи");
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [enqueue, revision, isAuth]);

  function reload() {
    if (!isAuth) return;

    setLoading(true);
    setError("");
    setRevision((previous) => previous + 1);
  }

  function mutate(request) {
    if (!isAuth) {
      return Promise.reject(
        new Error("Необходимо войти в аккаунт")
      );
    }

    return enqueue(async () => {
      if (!mounted.current) {
        throw new DOMException("Окно задачи закрыто", "AbortError");
      }

      const next = await request();

      if (mounted.current) {
        setTasks(next);
      }

      return next;
    });
  }

  function create(values) {
    return mutate(() => api.createTask(values));
  }

  function update(id, values) {
    return mutate(() => api.updateTask(id, values));
  }

  function remove(id) {
    return mutate(() => api.deleteTask(id));
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        error,
        reload,
        create,
        update,
        remove,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
