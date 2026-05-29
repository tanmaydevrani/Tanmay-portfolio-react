import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n/index.js";
import "./index.css";
import App from "./App.jsx";
import { Home, About, Experience, Projects, Blog, BlogPost, Contact } from "./pages/index.js";
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import ProjectsAdmin from "./admin/pages/ProjectsAdmin.jsx";
import BlogAdmin from "./admin/pages/BlogAdmin.jsx";
import ExperienceAdmin from "./admin/pages/ExperienceAdmin.jsx";
import AboutAdmin from "./admin/pages/AboutAdmin.jsx";
import MessagesAdmin from "./admin/pages/MessagesAdmin.jsx";
import SettingsAdmin from "./admin/pages/SettingsAdmin.jsx";
import { store } from "./store/store.js";
import { useAuth } from "./hooks/useAuth.js";

function ThemeWrapper({ children }) {
  const theme = useSelector((s) => s.theme.theme);
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  return children;
}

function AdminRoute({ children }) {
  const { authed } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authed) navigate("/admin/login", { replace: true });
  }, [authed, navigate]);
  return authed ? children : null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "experience", element: <Experience /> },
      { path: "projects", element: <Projects /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Navigate to="/admin/dashboard" replace /> },
      { path: "login", element: <AdminLogin /> },
      { path: "dashboard", element: <AdminRoute><Dashboard /></AdminRoute> },
      { path: "projects", element: <AdminRoute><ProjectsAdmin /></AdminRoute> },
      { path: "blog", element: <AdminRoute><BlogAdmin /></AdminRoute> },
      { path: "experience", element: <AdminRoute><ExperienceAdmin /></AdminRoute> },
      { path: "about", element: <AdminRoute><AboutAdmin /></AdminRoute> },
      { path: "messages", element: <AdminRoute><MessagesAdmin /></AdminRoute> },
      { path: "settings", element: <AdminRoute><SettingsAdmin /></AdminRoute> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </Provider>
  </StrictMode>
);
