import { useFirestore } from "../../hooks/useFirestore";
import { getProjects, getBlogPosts, getMessages, getExperience } from "../../lib/storage";
import { defaultProjects, defaultBlogPosts, defaultExperience } from "../../data/defaultContent";
import { Link } from "react-router-dom";

function StatCard({ label, value, color, to }) {
  return (
    <Link to={to} className="ios-card p-5 !no-underline block hover:shadow-lg transition-all duration-200">
      <p className="text-[12px] font-semibold uppercase tracking-wider !m-0 mb-1" style={{ color: "var(--label-tertiary)" }}>{label}</p>
      <p className="!text-[32px] !font-black !m-0" style={{ color }}>{value}</p>
    </Link>
  );
}

export default function Dashboard() {
  const { data: projects } = useFirestore(getProjects, defaultProjects);
  const { data: posts } = useFirestore(() => getBlogPosts(false), defaultBlogPosts);
  const { data: messages } = useFirestore(getMessages, []);
  const { data: exp } = useFirestore(getExperience, defaultExperience);

  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Projects", value: projects.length, color: "var(--blue)", to: "/admin/projects" },
    { label: "Blog Posts", value: posts.length, color: "var(--purple)", to: "/admin/blog" },
    { label: "Messages", value: messages.length, color: "var(--orange)", to: "/admin/messages" },
    { label: "Unread", value: unread, color: unread > 0 ? "var(--red)" : "var(--green)", to: "/admin/messages" },
  ];

  const recent = messages.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="!text-[24px] !font-bold !m-0 mb-1">Dashboard</h1>
        <p className="text-[14px] !m-0" style={{ color: "var(--label-secondary)" }}>Overview of your portfolio content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick actions */}
      <div className="ios-card p-5">
        <h2 className="!text-[16px] !font-bold !m-0 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Project", to: "/admin/projects" },
            { label: "Write Blog Post", to: "/admin/blog" },
            { label: "Edit About", to: "/admin/about" },
            { label: "Update Experience", to: "/admin/experience" },
            { label: "Site Settings", to: "/admin/settings" },
          ].map((a) => (
            <Link key={a.label} to={a.to} className="ios-btn ios-btn-secondary !no-underline text-[13px]">{a.label}</Link>
          ))}
        </div>
      </div>

      {/* Recent messages */}
      {recent.length > 0 && (
        <div className="ios-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="!text-[16px] !font-bold !m-0">Recent Messages</h2>
            <Link to="/admin/messages" className="text-[13px] !no-underline" style={{ color: "var(--blue)" }}>View all</Link>
          </div>
          <div className="flex flex-col gap-3">
            {recent.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: msg.read ? "transparent" : "rgba(0,122,255,0.05)", border: "1px solid var(--separator)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: "var(--fill)", color: "var(--label)" }}>
                  {msg.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold !m-0 truncate" style={{ color: "var(--label)" }}>{msg.name}</p>
                    {!msg.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--blue)" }} />}
                  </div>
                  <p className="text-[12px] !m-0 truncate" style={{ color: "var(--label-secondary)" }}>{msg.subject || msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
