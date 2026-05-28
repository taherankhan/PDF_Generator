export function runWhenIdle(task: () => void, timeoutMs = 2000): () => void {
  if (typeof window === 'undefined') {
    task();
    return () => undefined;
  }
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(task, { timeout: timeoutMs });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(task, 1);
  return () => window.clearTimeout(id);
}
