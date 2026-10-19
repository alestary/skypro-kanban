import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequestQueue } from "../src/services/requestQueue.js";

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

test("waiting operations start only after prior response is published", async () => {
  const enqueue = createRequestQueue();
  const response = deferred();
  const events = [];
  const first = enqueue(async () => { events.push("request A"); await response.promise; events.push("publish A"); });
  const second = enqueue(async () => { events.push("request B"); events.push("publish B"); });
  await Promise.resolve();
  assert.deepEqual(events, ["request A"]);
  response.resolve(); await Promise.all([first, second]);
  assert.deepEqual(events, ["request A", "publish A", "request B", "publish B"]);
});

test("rejection reaches its caller while subsequent operations continue", async () => {
  const enqueue = createRequestQueue();
  const failed = enqueue(async () => { throw new Error("API failure"); });
  const next = enqueue(async () => "updated server snapshot");
  await assert.rejects(failed, /API failure/);
  assert.equal(await next, "updated server snapshot");
});

test("queues belong to separate providers and do not block another session", async () => {
  const first = createRequestQueue(), second = createRequestQueue();
  const wait = deferred();
  const pending = first(() => wait.promise);
  assert.equal(await second(async () => "another session"), "another session");
  wait.resolve(); await pending;
});
