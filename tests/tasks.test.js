import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeTask, findTask, dateInputValue, formatTaskDate, taskPayload,
  loadTasks, createTask, updateTask, deleteTask } from "../src/services/tasks.js";
import { cards } from "../data.js";

function mockStorage(t) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", { value: { getItem: () => "test-token" }, configurable: true });
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, "localStorage", descriptor);
    else delete globalThis.localStorage;
  });
}

const values = { title: " Название ", description: " Описание ", topic: "Research", status: "В работе", date: "2026-11-05" };

test("all demo IDs, including 5, resolve after normalization without source fallback", () => {
  const tasks = cards.map(normalizeTask);
  for (const card of cards) assert.equal(findTask(tasks, String(card.id)).title, card.title);
  assert.equal(findTask([], "5"), undefined);
  assert.equal(findTask(tasks, "absent"), undefined);
});
test("server _id wins over legacy id and retains server fields", () => {
  const task = normalizeTask({ _id: "mongo-actual", id: 5, title: "Server", userId: "owner" });
  assert.equal(task.id, "mongo-actual");
  assert.equal(task.userId, "owner");
  assert.equal(findTask([task], "5"), undefined);
  assert.throws(() => normalizeTask({ title: "No ID" }), /без ID/);
});
test("date conversion handles ISO and legacy dates without timezone shifts", () => {
  assert.equal(dateInputValue("2026-11-05T23:00:00.000Z"), "2026-11-05");
  assert.equal(dateInputValue("03.11.23"), "2023-11-03");
  assert.equal(formatTaskDate("2026-11-05T00:00:00.000Z"), "05.11.2026");
  assert.equal(dateInputValue(undefined), "");
});
test("validation rejects whitespace, unsupported choices and invalid/missing dates", () => {
  assert.deepEqual(taskPayload(values), { title: "Название", description: "Описание", topic: "Research", status: "В работе", date: "2026-11-05T00:00:00.000Z" });
  for (const change of [{ title: "   " }, { topic: "Other" }, { status: "Other" }, { date: "" }, { date: "2026-02-30" }]) {
    assert.throws(() => taskPayload({ ...values, ...change }));
  }
  assert.equal("description" in taskPayload({ ...values, description: "" }), false);
});
test("CRUD uses authenticated API paths and publishes authoritative lists", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, ...options });
    return Response.json({ tasks: [{ _id: "server-id", ...values }] });
  });
  mockStorage(t);
  assert.equal((await loadTasks())[0].id, "server-id");
  await createTask(values); await updateTask("server/id", values); await deleteTask("server/id");
  assert.deepEqual(calls.map((call) => call.method || "GET"), ["GET", "POST", "PUT", "DELETE"]);
  assert.ok(calls.every((call) => call.headers.Authorization === "Bearer test-token"));
  assert.equal(calls[2].url, "https://wedev-api.sky.pro/api/kanban/server%2Fid");
  assert.equal(calls[1].headers["Content-Type"], undefined);
  assert.equal(JSON.parse(calls[2].body).title, "Название");
});
test("server errors and malformed responses do not become demo tasks", async (t) => {
  mockStorage(t);
  const mocked = t.mock.method(globalThis, "fetch", async () => Response.json({ error: "Сбой сервера" }, { status: 500 }));
  await assert.rejects(loadTasks(), /Сбой сервера/);
  mocked.mock.mockImplementation(async () => Response.json({ tasks: null }));
  await assert.rejects(loadTasks(), /некорректный список/);
  mocked.mock.mockImplementation(async () => new Response("{", { headers: { "content-type": "application/json" } }));
  await assert.rejects(loadTasks(), /некорректный JSON/);
});
