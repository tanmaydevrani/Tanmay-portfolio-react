import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(form.username, form.password);
      if (ok) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--bg-secondary)" }}>
      <form onSubmit={handleSubmit} className="ios-card p-8 w-full max-w-sm flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl" style={{ background: "var(--label)", color: "var(--bg)" }}>
          TD
        </div>
        <div className="text-center">
          <h1 className="!text-[22px] !font-bold !m-0 mb-1">Admin Panel</h1>
          <p className="text-[14px] !m-0" style={{ color: "var(--label-secondary)" }}>Sign in to manage your portfolio</p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--label)" }}>Username</label>
            <input
              className="ios-input"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: "var(--label)" }}>Password</label>
            <input
              type="password"
              className="ios-input"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Enter password"
            />
          </div>
        </div>

        {error && <p className="text-[13px] w-full !m-0" style={{ color: "var(--red)" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading || !form.username || !form.password}
          className="ios-btn ios-btn-primary w-full justify-center disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
