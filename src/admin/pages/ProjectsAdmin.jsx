import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { getProjects, createProject, updateProject, deleteProject } from "../../lib/storage";
import { defaultProjects } from "../../data/defaultContent";

const EMPTY = { title: "", description: "", longDescription: "", image: "", liveUrl: "", githubUrl: "", techStack: "", highlights: "", category: "", featured: false, order: 0 };

function Modal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    ...EMPTY, ...item,
    techStack: Array.isArray(item.techStack) ? item.techStack.join(", ") : item.techStack ?? "",
    highlights: Array.isArray(item.highlights) ? item.highlights.join("\n") : item.highlights ?? "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    onSave({
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: form.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="ios-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="!text-[18px] !font-bold !m-0">{item.id ? "Edit" : "Add"} Project</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--label-secondary)" }}>✕</button>
        </div>
        {[["Title", "title"], ["Category", "category"], ["Image URL", "image"], ["Live URL", "liveUrl"], ["GitHub URL", "githubUrl"], ["Order", "order"]].map(([label, key]) => (
          <div key={key}>
            <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>{label}</label>
            <input className="ios-input" value={form[key]} onChange={(e) => set(key, e.target.value)} />
          </div>
        ))}
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Short Description</label>
          <textarea className="ios-input resize-none" rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Tech Stack (comma-separated)</label>
          <input className="ios-input" value={form.techStack} onChange={(e) => set("techStack", e.target.value)} placeholder="React, Tailwind, Firebase" />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Highlights (one per line)</label>
          <textarea className="ios-input resize-none" rows={3} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          <span className="text-[13px] font-medium" style={{ color: "var(--label)" }}>Featured project</span>
        </label>
        <div className="flex gap-3 justify-end pt-2">
          <button className="ios-btn ios-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="ios-btn ios-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsAdmin() {
  const { data: projects, reload } = useFirestore(getProjects, defaultProjects);
  const [editing, setEditing] = useState(null);

  const handleSave = async (data) => {
    if (data.id) await updateProject(data.id, data);
    else await createProject(data);
    setEditing(null);
    reload();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    reload();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="!text-[24px] !font-bold !m-0">Projects</h1>
        <button className="ios-btn ios-btn-primary" onClick={() => setEditing(EMPTY)}>
          + Add Project
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((p) => (
          <div key={p.id} className="ios-card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--fill)" }}>
              {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : (
                <div className="w-full h-full flex items-center justify-center text-[20px]">📁</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold !m-0 truncate" style={{ color: "var(--label)" }}>{p.title}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.techStack?.slice(0, 3).map((t) => <span key={t} className="ios-badge text-[10px]">{t}</span>)}
              </div>
            </div>
            {p.featured && <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(255,149,0,0.1)", color: "var(--orange)" }}>Featured</span>}
            <div className="flex gap-2">
              <button className="ios-btn ios-btn-secondary text-[13px] !py-1" onClick={() => setEditing(p)}>Edit</button>
              <button className="ios-btn text-[13px] !py-1" style={{ background: "rgba(255,59,48,0.1)", color: "var(--red)" }} onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && <Modal item={editing} onSave={handleSave} onClose={() => setEditing(null)} />}
    </div>
  );
}
