import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 !no-underline group">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-transform duration-200 group-hover:scale-105"
        style={{ background: "var(--label)", color: "var(--bg)" }}
      >
        TD
      </div>
      <span className="font-semibold text-[15px] hidden sm:block" style={{ color: "var(--label)" }}>
        Tanmay Devrani
      </span>
    </Link>
  );
}
