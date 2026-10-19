import { apiRequest } from "./api.js";

export const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];
export const topics = ["Web Design", "Research", "Copywriting"];

// The API owns IDs (_id). Never substitute a demo ID or an array index.
export function normalizeTask(task) {
  const id = task?._id ?? task?.id;
  if (id == null || String(id) === "") throw new Error("Сервер вернул задачу без ID");
  return { ...task, id: String(id) };
}

function readTasks(data) {
  if (!Array.isArray(data?.tasks)) throw new Error("Сервер вернул некорректный список задач");
  return data.tasks.map(normalizeTask);
}

export function findTask(tasks, id) {
  return tasks.find((task) => String(task.id) === String(id));
}

export function dateInputValue(value) {
  if (!value) return "";
  const iso = /^(\d{4}-\d{2}-\d{2})(?:T.*)?$/.exec(value);
  if (iso) return iso[1];
  // Supports the legacy sample format without importing the sample dataset.
  const legacy = /^(\d{2})\.(\d{2})\.(\d{2}|\d{4})$/.exec(value);
  if (!legacy) return "";
  return `${legacy[3].length === 2 ? "20" : ""}${legacy[3]}-${legacy[2]}-${legacy[1]}`;
}

export function formatTaskDate(value) {
  const date = dateInputValue(value);
  return date ? date.split("-").reverse().join(".") : (value || "Срок не указан");
}

export function taskPayload(values) {
  const title = values.title.trim();
  if (!title) throw new Error("Введите название задачи");
  if (!topics.includes(values.topic)) throw new Error("Выберите категорию задачи");
  if (!statuses.includes(values.status)) throw new Error("Выберите статус задачи");
  const date = values.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date) {
    throw new Error("Укажите корректный срок выполнения");
  }
  return { title, ...(values.description.trim() ? { description: values.description.trim() } : {}), topic: values.topic,
    status: values.status, date: `${date}T00:00:00.000Z` };
}

export async function loadTasks(signal) {
  return readTasks(await apiRequest("/kanban", { signal }, true));
}
export async function createTask(values) {
  return readTasks(await apiRequest("/kanban", { method: "POST", body: JSON.stringify(taskPayload(values)) }, true));
}
export async function updateTask(id, values) {
  return readTasks(await apiRequest(`/kanban/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(taskPayload(values)) }, true));
}
export async function deleteTask(id) {
  return readTasks(await apiRequest(`/kanban/${encodeURIComponent(id)}`, { method: "DELETE" }, true));
}
