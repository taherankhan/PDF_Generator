export function runWhenIdle(task: () => void, timeoutMs = 2000): () => void {
  if (typeof window === 'undefined') {
    task();
    return () => undefined;
  }
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(task, { timeout: timeoutMs });
    return () => window.cancelIdleCallback(id);
  }
  const id = globalThis.setTimeout(task, 1);
  return () => globalThis.clearTimeout(id);
}
