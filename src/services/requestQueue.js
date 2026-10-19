// One queue per TasksProvider/session. Publish a response inside its operation,
// before the next request starts: API mutations return full-list snapshots.
export function createRequestQueue() {
  let tail = Promise.resolve();
  return function enqueue(operation) {
    const result = tail.then(operation);
    // Return the original failure to its caller, but keep the queue usable.
    tail = result.catch(() => {});
    return result;
  };
}
