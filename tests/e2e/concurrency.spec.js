import { test, expect } from "@playwright/test";

const task = (id) => ({ _id: id, title: id, topic: "Research", status: "В работе", description: "Description", date: "2026-12-01T00:00:00.000Z" });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function setup(page) {
  const server = { tasks: [task("A"), task("B")], requests: [], responses: [], active: 0, maxActive: 0, slowRead: false };
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.addInitScript(() => localStorage.setItem("token", "qa-token"));
  await page.route("https://wedev-api.sky.pro/api/kanban**", async (route) => {
    const request = route.request();
    const method = request.method();
    const id = new URL(request.url()).pathname.split("/")[3];
    if (method === "GET") {
      const snapshot = structuredClone(server.tasks);
      if (server.slowRead) await pause(400);
      return route.fulfill({ json: { tasks: snapshot } });
    }
    const index = server.requests.length;
    server.requests.push(`${method}:${id}`);
    server.active++; server.maxActive = Math.max(server.maxActive, server.active);
    let status = 201;
    if (method === "DELETE") server.tasks = server.tasks.filter((item) => item._id !== id);
    if (method === "PUT") {
      const at = server.tasks.findIndex((item) => item._id === id);
      if (at < 0) status = 404;
      else server.tasks[at] = { ...server.tasks[at], ...JSON.parse(request.postData()) };
    }
    // Snapshot is taken at processing time, before transport delay. Without a
    // shared queue, the second response overtakes the first and is then undone.
    const snapshot = structuredClone(server.tasks);
    await pause(index === 0 ? 400 : 10);
    server.active--; server.responses.push(`${method}:${id}`);
    await route.fulfill({ status, json: status === 404 ? { error: "Задача не найдена" } : { tasks: snapshot } });
  });
  await page.goto("/tests/e2e/fixtures/provider.html");
  await expect(page.getByTestId("ready")).toHaveText("ready");
  return { server, runtimeErrors };
}
async function displayed(page) { return JSON.parse(await page.getByTestId("tasks").textContent()); }
async function run(page, name, statuses) {
  await page.getByRole("button", { name, exact: true }).click();
  await expect(page.getByTestId("done")).toHaveText(JSON.stringify(statuses));
}

test("two simultaneous deletes cannot resurrect a card when first response is delayed", async ({ page }) => {
  const { server, runtimeErrors } = await setup(page);
  await run(page, "Delete two", ["fulfilled", "fulfilled"]);
  expect(await displayed(page), `response order: ${server.responses.join(", ")}`).toEqual([]);
  expect(server.tasks).toEqual([]);
  expect(server.maxActive).toBe(1);
  expect(server.requests).toEqual(["DELETE:A", "DELETE:B"]);
  expect(runtimeErrors).toEqual([]);
});

test("concurrent updates preserve invocation order and latest fields", async ({ page }) => {
  const { server, runtimeErrors } = await setup(page);
  await run(page, "Update two", ["fulfilled", "fulfilled"]);
  expect((await displayed(page)).find((item) => item.id === "A").title).toBe("Second");
  expect(server.tasks[0].title).toBe("Second");
  expect(server.maxActive).toBe(1); expect(runtimeErrors).toEqual([]);
});

test("an update response cannot resurrect a subsequently deleted task", async ({ page }) => {
  const { server, runtimeErrors } = await setup(page);
  await run(page, "Update then delete", ["fulfilled", "fulfilled"]);
  expect((await displayed(page)).map((item) => item.id)).toEqual(["B"]);
  expect(server.tasks.map((item) => item._id)).toEqual(["B"]);
  expect(server.maxActive).toBe(1); expect(runtimeErrors).toEqual([]);
});

test("failed update after deletion does not poison the queue or recreate the task", async ({ page }) => {
  const { server, runtimeErrors } = await setup(page);
  await run(page, "Delete then update", ["fulfilled", "rejected", "fulfilled"]);
  expect(await displayed(page)).toEqual([]); expect(server.tasks).toEqual([]);
  expect(server.requests).toEqual(["DELETE:A", "PUT:A", "DELETE:B"]);
  expect(server.maxActive).toBe(1); expect(runtimeErrors).toEqual([]);
});

test("a concurrent refresh cannot overwrite a successful mutation", async ({ page }) => {
  const { server, runtimeErrors } = await setup(page);
  server.slowRead = true;
  await run(page, "Reload and delete", ["fulfilled"]);
  await expect(page.getByTestId("ready")).toHaveText("ready");
  expect((await displayed(page)).map((item) => item.id)).toEqual(["B"]);
  expect(runtimeErrors).toEqual([]);
});
