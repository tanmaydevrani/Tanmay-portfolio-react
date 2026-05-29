const SESSION_KEY = "td_admin_auth";

const CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME ?? "tanmaydevrani2",
  password: import.meta.env.VITE_ADMIN_PASSWORD ?? "General@10",
};

export const login = (username, password) => {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
};

export const logout = () => sessionStorage.removeItem(SESSION_KEY);

export const isAuthenticated = () => sessionStorage.getItem(SESSION_KEY) === "true";
