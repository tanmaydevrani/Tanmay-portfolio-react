import { useState, useCallback } from "react";

export function useFirestore(fetchFn, fallback = []) {
  const load = useCallback(() => {
    try { return fetchFn() ?? fallback; } catch { return fallback; }
  }, []);

  const [data, setData] = useState(load);

  const reload = useCallback(() => {
    try { setData(fetchFn() ?? fallback); } catch { setData(fallback); }
  }, []);

  return { data, loading: false, error: null, reload };
}
