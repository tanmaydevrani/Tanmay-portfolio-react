import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeBtn from "../ThemeBtn";
import LanguageSwitcher from "../LanguageSwitcher";
import { mobileNavItems } from "./navItems.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── Desktop floating nav ── */}
      <div className="nav-float-wrapper desktop-nav">
        <nav
          className={`ios-nav flex items-center justify-between w-full max-w-5xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "shadow-md" : ""
          }`}
        >
          <Logo />

          <div className="hidden md:flex items-center gap-1">
            <NavLinks />
          </div>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeBtn />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 hover:bg-[var(--fill-tertiary)]"
              aria-label="Menu"
              style={{ color: "var(--label)" }}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl overflow-hidden py-2 z-50"
            style={{
              background: "var(--bg-blur)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              border: "1px solid var(--separator)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <NavLinks className="block !px-4 !py-3 !rounded-none border-b border-[var(--separator)] last:border-0" />
          </div>
        )}
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="mobile-tab-bar justify-around px-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            end={item.link === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-150 min-w-0 ${
                isActive ? "text-[var(--blue)]" : "text-[var(--label-secondary)]"
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] font-medium">{t(item.name)}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
