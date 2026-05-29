const SESSION_KEY = "td_admin_auth";

// These are client-side only — not server secrets.
// Change the password to something only you know.
const U = import.meta.env.VITE_ADMIN_USERNAME ?? "tanmaydevrani2";
const P = import.meta.env.VITE_ADMIN_PASSWORD ?? "General@10";

export const login = (username, password) => {
  if (username === U && password === P) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
};

export const logout = () => sessionStorage.removeItem(SESSION_KEY);

export const isAuthenticated = () => sessionStorage.getItem(SESSION_KEY) === "true";
