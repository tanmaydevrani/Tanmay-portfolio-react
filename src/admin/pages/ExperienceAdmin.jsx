import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { getExperience, createExperience, updateExperience, deleteExperience } from "../../lib/storage";
import { defaultExperience } from "../../data/defaultContent";

const EMPTY = { title: "", company: "", duration: "", isCurrent: false, description: "", techStack: "", order: 0 };

function Modal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    ...EMPTY, ...item,
    description: Array.isArray(item.description) ? item.description.join("\n") : item.description ?? "",
    techStack: Array.isArray(item.techStack) ? item.techStack.join(", ") : item.techStack ?? "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    onSave({
      ...form,
      description: form.description.split("\n").map((s) => s.trim()).filter(Boolean),
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="ios-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="!text-[18px] !font-bold !m-0">{item.id ? "Edit" : "Add"} Experience</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--label-secondary)" }}>✕</button>
        </div>
        {[["Job Title", "title"], ["Company", "company"], ["Duration", "duration", "e.g. February 2023 – Present"], ["Order", "order"]].map(([label, key, ph]) => (
          <div key={key}>
            <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>{label}</label>
            <input className="ios-input" value={form[key]} placeholder={ph} onChange={(e) => set(key, e.target.value)} />
          </div>
        ))}
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Description (one bullet per line)</label>
          <textarea className="ios-input resize-none" rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Tech Stack (comma-separated)</label>
          <input className="ios-input" value={form.techStack} onChange={(e) => set("techStack", e.target.value)} />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isCurrent} onChange={(e) => set("isCurrent", e.target.checked)} />
          <span className="text-[13px] font-medium" style={{ color: "var(--label)" }}>Current position</span>
        </label>
        <div className="flex gap-3 justify-end pt-2">
          <button className="ios-btn ios-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="ios-btn ios-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceAdmin() {
  const { data: experience, reload } = useFirestore(getExperience, defaultExperience);
  const [editing, setEditing] = useState(null);

  const handleSave = async (data) => {
    if (data.id) await updateExperience(data.id, data);
    else await createExperience(data);
    setEditing(null);
    reload();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    await deleteExperience(id);
    reload();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="!text-[24px] !font-bold !m-0">Experience</h1>
        <button className="ios-btn ios-btn-primary" onClick={() => setEditing(EMPTY)}>+ Add Entry</button>
      </div>
      <div className="flex flex-col gap-3">
        {experience.map((e) => (
          <div key={e.id} className="ios-card p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-semibold !m-0" style={{ color: "var(--label)" }}>{e.title}</p>
                {e.isCurrent && <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(0,122,255,0.1)", color: "var(--blue)" }}>Current</span>}
              </div>
              <p className="text-[13px] !m-0" style={{ color: "var(--label-secondary)" }}>{e.company} · {e.duration}</p>
            </div>
            <div className="flex gap-2">
              <button className="ios-btn ios-btn-secondary text-[13px] !py-1" onClick={() => setEditing(e)}>Edit</button>
              <button className="ios-btn text-[13px] !py-1" style={{ background: "rgba(255,59,48,0.1)", color: "var(--red)" }} onClick={() => handleDelete(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {editing && <Modal item={editing} onSave={handleSave} onClose={() => setEditing(null)} />}
    </div>
  );
}
