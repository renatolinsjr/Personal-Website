export function useOptimizedTask() {
  /**
   * Runs a heavy task by yielding to the main thread.
   * Uses the Scheduler API (postTask) when available, or fallbacks to setTimeout(0).
   */
  const runTask = (fn: () => void) => {
    // Check if the browser supports the Scheduler API (modern Chrome)
    if (typeof window !== "undefined" && "scheduler" in window) {
      // @ts-expect-error because window is not typed to have scheduler property
      scheduler.postTask(fn, { priority: "background" });
    } else {
      setTimeout(fn, 0);
    }
  };

  return { runTask };
}
