import { useState, useEffect } from "react";
import { isAuthenticated } from "../lib/adminAuth";

export function useAuth() {
  const [authed, setAuthed] = useState(isAuthenticated());

  useEffect(() => {
    const check = () => setAuthed(isAuthenticated());
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  return { authed, loading: false };
}
