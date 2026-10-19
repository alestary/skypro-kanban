import { test as base, expect } from "@playwright/test";
import { cards } from "../../data.js";

const api = "https://wedev-api.sky.pro/api";
const seed = () => cards.map(({ id, ...card }) => ({ ...card, _id: String(id),
  description: `Описание задачи ${id}`, date: `2026-11-0${id}T00:00:00.000Z` }));
const test = base.extend({
  server: async ({ page }, provide) => {
    const server = { tasks: seed(), calls: [], failure: null, delay: 0 };
    const errors = [], runtime = [];
    page.on("pageerror", (error) => runtime.push(error.message));
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
    await page.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
    await page.addInitScript(() => {
      if (localStorage.getItem("qa-initialized")) return;
      localStorage.setItem("qa-initialized", "true");
      localStorage.setItem("token", "qa-token");
      localStorage.setItem("userName", "QA");
      // Poison stale local data: it must never replace the actual server record.
      localStorage.setItem("kanbanCards", JSON.stringify([{ id: 5, title: "Неверная локальная карточка" }]));
    });
    await page.route(`${api}/kanban**`, async (route) => {
      const req = route.request();
      const method = req.method();
      const id = decodeURIComponent(new URL(req.url()).pathname.split("/")[3] || "");
      server.calls.push({ method, id, body: req.postData() });
      expect(req.headers().authorization).toBe("Bearer qa-token");
      if (server.delay) await new Promise((resolve) => setTimeout(resolve, server.delay));
      if (server.failure) {
        const failure = server.failure;
        return route.fulfill({ status: failure.status || 500, json: { error: failure.message || "Ошибка API для QA" } });
      }
      if (method === "POST" || method === "PUT") {
        // This API expects a JSON string body and parses it itself (text/plain).
        expect(req.headers()["content-type"]).toContain("text/plain");
        const data = { description: "", ...JSON.parse(req.postData()) };
        if (method === "POST") server.tasks.push({ _id: `opaque-created-${server.calls.length}`, ...data });
        else {
          const index = server.tasks.findIndex((task) => task._id === id);
          if (index < 0) return route.fulfill({ status: 404, json: { error: "Задача не найдена" } });
          server.tasks[index] = { ...server.tasks[index], ...data };
        }
      }
      if (method === "DELETE") server.tasks = server.tasks.filter((task) => task._id !== id);
      return route.fulfill({ status: method === "GET" ? 200 : 201, json: { tasks: server.tasks } });
    });
    await page.route(`${api}/user/**`, async (route) => {
      const body = JSON.parse(route.request().postData());
      if (body.password === "wrong") return route.fulfill({ status: 400, json: { error: "Неверный пароль" } });
      return route.fulfill({ json: { user: { token: "qa-token", name: "QA", login: body.login } } });
    });
    await provide(server);
    expect(runtime, "uncaught browser exceptions").toEqual([]);
    if (!test.info().annotations.some((item) => item.type === "expected-http-error")) expect(errors, "browser console errors").toEqual([]);
    else expect(errors.filter((error) => !error.includes("Failed to load resource"))).toEqual([]);
  },
});

const dialog = (page) => page.getByRole("dialog");
async function board(page) {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toBeVisible();
}
async function openTask(page, title = "Название задачи 5") {
  await page.getByRole("button", { name: `Открыть задачу «${title}»`, exact: true }).click();
  await expect(page.getByRole("heading", { name: "Редактирование задачи", exact: true })).toBeVisible();
}
const mutations = (server) => server.calls.filter((call) => call.method !== "GET");

test("existing tasks, ID 5 and missing IDs show authoritative data", async ({ page, server }) => {
  server.delay = 100;
  for (const id of [5, 1, 3, 6]) {
    await page.goto(`/card/${id}`);
    const task = server.tasks.find((task) => task._id === String(id));
    await expect(dialog(page).getByRole("heading", { name: task.title, exact: true })).toBeVisible();
    await expect(dialog(page)).toContainText(task.topic);
    await expect(dialog(page)).toContainText(task.status);
    await expect(dialog(page)).toContainText(task.description);
    await expect(dialog(page)).toContainText(`0${id}.11.2026`);
    await expect(dialog(page)).not.toContainText("Неверная локальная карточка");
    await dialog(page).getByRole("button", { name: "Закрыть", exact: true }).click();
  }
  for (const url of ["/card/does-not-exist", "/edit-card/does-not-exist"]) {
    await page.goto(url);
    await expect(dialog(page)).toContainText("Задача не найдена");
    await expect(dialog(page).getByRole("button", { name: "Вернуться на доску" })).toBeVisible();
  }
});

test("opaque server ID overrides local demo ID 5", async ({ page, server }) => {
  server.tasks = [{ ...server.tasks[4], _id: "659ad0aad0e154bebca2b6b3", id: 5, title: "Реальная серверная задача" }];
  await page.goto("/");
  await page.getByRole("link", { name: "Реальная серверная задача", exact: true }).click();
  await expect(page).toHaveURL(/card\/659ad0aad0e154bebca2b6b3$/);
  await expect(dialog(page).getByRole("heading", { name: "Реальная серверная задача" })).toBeVisible();
  await page.goto("/card/5");
  await expect(dialog(page)).toContainText("Задача не найдена");
});

test("ellipsis directly opens the prefilled task form by mouse, Enter and Space", async ({ page, server }) => {
  await board(page);
  const trigger = page.getByRole("button", { name: "Открыть задачу «Название задачи 5»", exact: true });
  for (const key of ["Enter", "Space"]) {
    await trigger.focus(); await page.keyboard.press(key);
    await expect(page.getByLabel("Название задачи", { exact: true })).toHaveValue("Название задачи 5");
    await expect(page.getByLabel("Название задачи", { exact: true })).toBeFocused();
    await expect(page.getByRole("menu")).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toHaveCount(0); await expect(trigger).toBeFocused();
  }
  await openTask(page);
  await expect(page).toHaveURL(/edit-card\/5$/);
  await expect(page.getByLabel("Описание задачи", { exact: true })).toHaveValue("Описание задачи 5");
  await page.getByRole("button", { name: "Отмена", exact: true }).click();
  expect(mutations(server)).toHaveLength(0);
});

test("edit prefilled fields, save exact task, persist after refresh", async ({ page, server }) => {
  await board(page); await openTask(page);
  await expect(page.getByLabel("Название задачи", { exact: true })).toHaveValue("Название задачи 5");
  await expect(page.getByLabel("Описание задачи", { exact: true })).toHaveValue("Описание задачи 5");
  await expect(page.getByLabel("Срок выполнения", { exact: true })).toHaveValue("2026-11-05");
  await expect(page.getByLabel("Статус", { exact: true })).toHaveValue("Готово");
  await page.getByLabel("Название задачи", { exact: true }).fill("Изменённая задача");
  await page.getByLabel("Описание задачи", { exact: true }).fill("Обновлённое описание");
  await page.getByRole("button", { name: "Research", exact: true }).click();
  await page.getByLabel("Статус", { exact: true }).selectOption("Тестирование");
  await page.getByLabel("Срок выполнения", { exact: true }).fill("2026-12-25");
  await page.getByRole("button", { name: "Сохранить изменения" }).click();
  await expect(dialog(page)).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Изменённая задача", exact: true })).toBeVisible();
  expect(server.tasks).toHaveLength(6);
  expect(server.tasks.find((task) => task._id === "5")).toMatchObject({ topic: "Research", status: "Тестирование", date: "2026-12-25T00:00:00.000Z", description: "Обновлённое описание" });
  expect(mutations(server).map(({ method, id }) => ({ method, id }))).toEqual([{ method: "PUT", id: "5" }]);
  await page.reload();
  await page.getByRole("link", { name: "Изменённая задача", exact: true }).click();
  await expect(dialog(page)).toContainText("Обновлённое описание");
  await expect(dialog(page)).toContainText("25.12.2026");
  await expect(dialog(page)).toContainText("Тестирование");
});

test("cancel, Escape and backdrop discard edits; modal traps focus", async ({ page, server }) => {
  for (const action of ["cancel", "escape", "backdrop"]) {
    await page.goto("/edit-card/5");
    await page.getByLabel("Название задачи", { exact: true }).fill("Не сохранять");
    if (action === "cancel") {
      await page.getByRole("button", { name: "Отмена", exact: true }).click();
    } else if (action === "escape") {
      const first = page.getByLabel("Название задачи", { exact: true });
      await first.focus(); await page.keyboard.press("Shift+Tab");
      await expect(page.getByRole("button", { name: "Сохранить изменения" })).toBeFocused();
      await page.keyboard.press("Tab"); await expect(first).toBeFocused();
      await page.keyboard.press("Escape");
    } else await page.mouse.click(2, 2);
    await expect(dialog(page)).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toBeVisible();
  }
  expect(mutations(server)).toHaveLength(0);
});

test("validation and failed PUT preserve form and original data; retry works", async ({ page, server }) => {
  test.info().annotations.push({ type: "expected-http-error" });
  await page.goto("/edit-card/5");
  await page.getByLabel("Название задачи", { exact: true }).fill("   ");
  await page.getByRole("button", { name: "Сохранить изменения" }).click();
  await expect(page.getByRole("alert")).toHaveText("Введите название задачи");
  expect(mutations(server)).toHaveLength(0);
  await page.getByLabel("Название задачи", { exact: true }).fill("После повтора");
  await page.getByLabel("Срок выполнения", { exact: true }).fill("");
  await page.getByRole("button", { name: "Сохранить изменения" }).click();
  await expect(page.getByRole("alert")).toHaveText("Укажите корректный срок выполнения");
  expect(mutations(server)).toHaveLength(0);
  await page.getByLabel("Срок выполнения", { exact: true }).fill("2026-12-01");
  server.failure = { message: "Сохранение недоступно" };
  await page.getByRole("button", { name: "Сохранить изменения" }).click();
  await expect(page.getByRole("alert")).toHaveText("Сохранение недоступно");
  expect(server.tasks[4].title).toBe("Название задачи 5");
  await expect(page.getByLabel("Название задачи", { exact: true })).toHaveValue("После повтора");
  server.failure = null;
  await page.getByRole("button", { name: "Сохранить изменения" }).click();
  await expect(page.getByRole("link", { name: "После повтора", exact: true })).toBeVisible();
});

test("delete cancellation and confirmation, no document reload", async ({ page, server }) => {
  await board(page);
  let navigations = 0;
  page.on("request", (request) => { if (request.isNavigationRequest()) navigations++; });
  await openTask(page); page.once("dialog", (d) => d.dismiss());
  await dialog(page).getByRole("button", { name: "Удалить задачу", exact: true }).click();
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toBeVisible();
  expect(mutations(server)).toHaveLength(0);
  page.once("dialog", (d) => d.accept());
  await dialog(page).getByRole("button", { name: "Удалить задачу", exact: true }).click();
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toHaveCount(0);
  expect(server.tasks).toHaveLength(5);
  expect(navigations).toBe(0);
  await page.reload();
  await expect(page.getByRole("link", { name: "Название задачи 1", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toHaveCount(0);
  await page.goto("/card/1");
  await expect(dialog(page).getByRole("heading", { name: "Название задачи 1", exact: true })).toBeVisible();
  page.once("dialog", (d) => d.accept());
  await dialog(page).getByRole("button", { name: "Удалить задачу", exact: true }).click();
  await expect(dialog(page)).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Название задачи 1", exact: true })).toHaveCount(0);
});

test("failed delete leaves task and shows an actionable error", async ({ page, server }) => {
  test.info().annotations.push({ type: "expected-http-error" });
  await board(page); await openTask(page); server.failure = { message: "Удаление недоступно" };
  page.once("dialog", (d) => d.accept());
  await dialog(page).getByRole("button", { name: "Удалить задачу", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText("Удаление недоступно");
  expect(server.tasks).toHaveLength(6);
  await expect(page.getByLabel("Название задачи", { exact: true })).toHaveValue("Название задачи 5");
});

test("create then edit uses returned opaque ID; double submission is prevented", async ({ page, server }) => {
  await board(page);
  await page.getByRole("button", { name: "Создать новую задачу" }).click();
  await expect(page.getByRole("heading", { name: "Создание задачи" })).toBeVisible();
  await page.getByLabel("Название задачи", { exact: true }).fill("Новая задача QA");
  await page.getByLabel("Срок выполнения", { exact: true }).fill("2026-12-30");
  await page.getByRole("button", { name: "Copywriting", exact: true }).click();
  server.delay = 150;
  await page.getByRole("button", { name: "Создать задачу", exact: true }).click();
  await expect(page.getByRole("button", { name: "Сохранение…" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Отмена", exact: true })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Новая задача QA", exact: true })).toBeVisible();
  const created = server.tasks.find((task) => task.title === "Новая задача QA");
  expect(created._id).toContain("opaque-created-"); expect(server.tasks).toHaveLength(7);
  await openTask(page, "Новая задача QA");
  await expect(page.getByLabel("Название задачи", { exact: true })).toHaveValue("Новая задача QA");
  await page.getByLabel("Название задачи", { exact: true }).fill("Новая задача после правки");
  await page.getByRole("button", { name: "Сохранить изменения" }).click();
  await expect(page.getByRole("link", { name: "Новая задача после правки", exact: true })).toBeVisible();
  expect(mutations(server).map((c) => c.method)).toEqual(["POST", "PUT"]);
  expect(mutations(server)[1].id).toBe(created._id); expect(server.tasks).toHaveLength(7);
});

test("server error is distinct from missing task, retry and empty board", async ({ page, server }) => {
  test.info().annotations.push({ type: "expected-http-error" });
  server.failure = { message: "Список недоступен" };
  await page.goto("/card/5");
  await expect(dialog(page)).toContainText("Список недоступен");
  await expect(dialog(page)).not.toContainText("Задача не найдена");
  server.failure = null;
  await dialog(page).getByRole("button", { name: "Повторить", exact: true }).click();
  await expect(dialog(page).getByRole("heading", { name: "Название задачи 5", exact: true })).toBeVisible();
  server.tasks = []; await page.goto("/");
  await expect(page.getByText("Задач пока нет. Создайте новую задачу.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toHaveCount(0);
});

test("404 stays centered; create/edit share responsive form layout", async ({ page, server }) => {
  expect(server.tasks.length).toBe(6);
  await page.goto("/unregistered/nested/url");
  await expect(page.getByRole("heading", { name: "404", exact: true })).toBeVisible();
  const bounds = await page.getByRole("heading", { name: "404", exact: true }).locator("..").boundingBox();
  const viewport = page.viewportSize();
  expect(Math.abs(bounds.x + bounds.width / 2 - viewport.width / 2)).toBeLessThan(2);
  expect(Math.abs(bounds.y + bounds.height / 2 - viewport.height / 2)).toBeLessThan(2);
  await page.getByRole("link", { name: "Вернуться на главную" }).click();
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toBeVisible();
  for (const url of ["/card/5", "/edit-card/5", "/add-card"]) {
    await page.goto(url); await expect(dialog(page)).toBeVisible();
    await expect(dialog(page).getByText("Загрузка задач…")).toHaveCount(0);
    if (url !== "/card/5") await expect(page.getByLabel("Название задачи", { exact: true })).toBeVisible();
    const widths = await dialog(page).evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth }));
    expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("protected routes, login errors, registration and logout clear session", async ({ page, server }) => {
  test.info().annotations.push({ type: "expected-http-error" });
  await board(page);
  await page.evaluate(() => localStorage.removeItem("token"));
  for (const url of ["/", "/card/5", "/edit-card/5", "/add-card", "/exit"]) {
    await page.goto(url); await expect(page).toHaveURL(/\/login$/);
  }
  await page.goto("/register"); await expect(page.getByRole("heading", { name: "Регистрация", exact: true })).toBeVisible();
  await page.getByPlaceholder("Имя", { exact: true }).fill("QA");
  await page.getByPlaceholder("Эл. почта", { exact: true }).fill("qa@example.test");
  await page.getByPlaceholder("Пароль", { exact: true }).fill("qa-password");
  await page.getByRole("button", { name: "Зарегистрироваться", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByPlaceholder("Эл. почта", { exact: true }).fill("qa@example.test");
  await page.getByPlaceholder("Пароль", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText("Неверный пароль");
  await page.getByPlaceholder("Пароль", { exact: true }).fill("qa-password");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page.getByRole("link", { name: "Название задачи 5", exact: true })).toBeVisible();
  await page.goto("/login"); await expect(page).toHaveURL(/\/$/);
  await page.goto("/exit"); await page.getByRole("button", { name: "Нет, остаться", exact: true }).click();
  expect(await page.evaluate(() => localStorage.getItem("token"))).toBe("qa-token");
  await page.goto("/exit"); await page.getByRole("button", { name: "Да, выйти", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => localStorage.getItem("token"))).toBeNull();
  await page.reload(); await expect(page).toHaveURL(/\/login$/);
  expect(server.tasks).toHaveLength(6);
});

test("expired server session redirects to login, no false not-found state", async ({ page, server }) => {
  test.info().annotations.push({ type: "expected-http-error" });
  server.failure = { status: 401, message: "Пользователь не найден" };
  await page.goto("/card/5");
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => localStorage.getItem("token"))).toBeNull();
});
