import { createContext, useContext } from "react";

export const TasksContext = createContext(null);
export function useTasks() {
  const value = useContext(TasksContext);
  if (!value) throw new Error("TasksProvider отсутствует");
  return value;
}
