import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navItems } from "./navItems.jsx";

export default function NavLinks({ className = "" }) {
  const { t } = useTranslation();
  return (
    <>
      {navItems.map((nav) => (
        <NavLink
          key={nav.link}
          to={nav.link}
          end={nav.link === "/"}
          className={({ isActive }) =>
            `!no-underline text-[14px] font-medium px-3 py-1.5 rounded-xl transition-all duration-150 ${className} ${
              isActive
                ? "!text-[var(--label)] bg-[var(--fill-tertiary)]"
                : "!text-[var(--label-secondary)] hover:!text-[var(--label)] hover:bg-[var(--fill-tertiary)]"
            }`
          }
        >
          {t(nav.name)}
        </NavLink>
      ))}
    </>
  );
}
