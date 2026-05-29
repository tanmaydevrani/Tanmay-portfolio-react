import React from "react";

function Button({ children, type = "button", variant = "primary", className = "", ...props }) {
  const base = "ios-btn";
  const variants = {
    primary: "ios-btn-primary",
    secondary: "ios-btn-secondary",
  };
  return (
    <button
      type={type}
      className={`${base} ${variants[variant] ?? ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
