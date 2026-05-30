import { useState, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { getProjects, createProject, updateProject, deleteProject } from "../../lib/storage";
import { defaultProjects } from "../../data/defaultContent";

const EMPTY = { title: "", description: "", image: "", liveUrl: "", githubUrl: "", techStack: "", highlights: "", category: "", featured: false, order: 0 };

// Convert uploaded file → base64 string
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function ImagePicker({ value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const b64 = await toBase64(file);
    onChange(b64);
    setUploading(false);
  };

  const handleUrlChange = (e) => {
    onChange(e.target.value);
  };

  const isBase64 = value?.startsWith("data:");

  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      {value && (
        <div className="relative w-full h-36 rounded-xl overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold"
            style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", cursor: "pointer" }}
          >✕</button>
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="ios-btn ios-btn-secondary w-full justify-center text-[13px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        {uploading ? "Uploading…" : isBase64 ? "Replace Image" : "Upload Image"}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {/* OR paste URL */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px" style={{ background: "var(--separator)" }} />
        <span className="text-[11px]" style={{ color: "var(--label-tertiary)" }}>or paste URL</span>
        <div className="flex-1 h-px" style={{ background: "var(--separator)" }} />
      </div>
      <input
        className="ios-input text-[13px]"
        placeholder="https://..."
        value={isBase64 ? "" : value}
        onChange={handleUrlChange}
      />
    </div>
  );
}

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
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--label-secondary)", fontSize: 18 }}>✕</button>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-[13px] font-medium mb-2" style={{ color: "var(--label)" }}>Project Image</label>
          <ImagePicker value={form.image} onChange={(v) => set("image", v)} />
        </div>

        {/* Text fields */}
        {[["Title *", "title"], ["Category", "category"], ["Live URL", "liveUrl"], ["GitHub URL", "githubUrl"], ["Display Order", "order"]].map(([label, key]) => (
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
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Tech Stack <span style={{ color: "var(--label-tertiary)" }}>(comma-separated)</span></label>
          <input className="ios-input" value={form.techStack} onChange={(e) => set("techStack", e.target.value)} placeholder="React, Tailwind, Firebase" />
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Highlights <span style={{ color: "var(--label-tertiary)" }}>(one per line)</span></label>
          <textarea className="ios-input resize-none" rows={3} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          <span className="text-[13px] font-medium" style={{ color: "var(--label)" }}>Featured project (shown on home page)</span>
        </label>

        <div className="flex gap-3 justify-end pt-2">
          <button className="ios-btn ios-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="ios-btn ios-btn-primary" onClick={handleSave} disabled={!form.title.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsAdmin() {
  const { data: projects, reload } = useFirestore(getProjects, defaultProjects);
  const [editing, setEditing] = useState(null);

  const handleSave = (data) => {
    if (data.id) updateProject(data.id, data);
    else createProject(data);
    setEditing(null);
    reload();
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this project?")) return;
    deleteProject(id);
    reload();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="!text-[24px] !font-bold !m-0">Projects</h1>
        <button className="ios-btn ios-btn-primary" onClick={() => setEditing(EMPTY)}>+ Add Project</button>
      </div>

      <div className="flex flex-col gap-3">
        {projects.length === 0 && (
          <p className="text-[14px]" style={{ color: "var(--label-secondary)" }}>No projects yet. Click "Add Project" to get started.</p>
        )}
        {projects.map((p) => (
          <div key={p.id} className="ios-card p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--fill)" }}>
              {p.image
                ? <img src={p.image} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[22px]">📁</div>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold !m-0 truncate" style={{ color: "var(--label)" }}>{p.title}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.techStack?.slice(0, 4).map((t) => (
                  <span key={t} className="ios-badge text-[10px]">{t}</span>
                ))}
              </div>
            </div>
            {p.featured && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(255,149,0,0.1)", color: "var(--orange)" }}>★ Featured</span>
            )}
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
