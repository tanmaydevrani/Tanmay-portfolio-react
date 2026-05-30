import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../lib/adminAuth";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { to: "/admin/projects", label: "Projects", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { to: "/admin/experience", label: "Experience", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { to: "/admin/about", label: "About", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { to: "/admin/messages", label: "Messages", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { to: "/admin/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

function SvgIcon({ path, size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-secondary)" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ width: 240, background: "var(--bg-elevated)", borderRight: "1px solid var(--separator)" }}
      >
        <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: "1px solid var(--separator)" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold" style={{ background: "var(--label)", color: "var(--bg)" }}>
            TD
          </div>
          <span className="font-semibold text-[14px]" style={{ color: "var(--label)" }}>Admin Panel</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <SvgIcon path={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3" style={{ borderTop: "1px solid var(--separator)" }}>
          <button onClick={handleSignOut} className="admin-sidebar-item w-full" style={{ color: "var(--red)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
          <NavLink to="/" className="admin-sidebar-item" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Portfolio
          </NavLink>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0" data-main>
        <header className="flex items-center gap-3 px-5 py-3 sticky top-0 z-20" style={{ background: "var(--bg-blur)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--separator)" }}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)} style={{ color: "var(--label)", background: "none", border: "none", cursor: "pointer" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </header>
        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>

      <style>{`@media (min-width: 768px) { [data-main] { margin-left: 240px; } }`}</style>
    </div>
  );
}
