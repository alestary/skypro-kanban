// Test-only entry point. Exercises the real provider with concurrent consumers;
// not imported by src/main.jsx or included in the production Vite build.
import { useState } from "react";
import { createRoot } from "react-dom/client";
import TasksProvider from "../../../src/context/TasksProvider";
import { useTasks } from "../../../src/context/TasksContext.js";

const fields = { title: "First", description: "Description", topic: "Research", status: "В работе", date: "2026-12-01" };
export default function Consumers() {
  const { tasks, loading, remove, update, reload } = useTasks();
  const [done, setDone] = useState("");
  async function run(operations) {
    setDone("");
    const results = await Promise.allSettled(operations.map((operation) => operation()));
    setDone(JSON.stringify(results.map((result) => result.status)));
  }
  return <>
    <p data-testid="ready">{loading ? "loading" : "ready"}</p>
    <pre data-testid="tasks">{JSON.stringify(tasks)}</pre>
    <p data-testid="done">{done}</p>
    <button onClick={() => run([() => remove("A"), () => remove("B")])}>Delete two</button>
    <button onClick={() => run([() => update("A", fields), () => update("A", { ...fields, title: "Second" })])}>Update two</button>
    <button onClick={() => run([() => update("A", fields), () => remove("A")])}>Update then delete</button>
    <button onClick={() => run([() => remove("A"), () => update("A", fields), () => remove("B")])}>Delete then update</button>
    <button onClick={() => { reload(); void run([() => remove("A")]); }}>Reload and delete</button>
  </>;
}
createRoot(document.getElementById("root")).render(<TasksProvider><Consumers /></TasksProvider>);
