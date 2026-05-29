import { useState, useEffect } from "react";
import { getAbout, saveAbout } from "../../lib/storage";
import { defaultAbout } from "../../data/defaultContent";

export default function AboutAdmin() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAbout().then((data) => {
      const d = data ?? defaultAbout;
      setForm({
        bio: d.bio?.join("\n\n") ?? "",
        devSkills: d.skills?.development?.join(", ") ?? "",
        toolSkills: d.skills?.tools?.join(", ") ?? "",
        designSkills: d.skills?.design?.join(", ") ?? "",
        educationDegree: d.education?.[0]?.degree ?? "",
        educationInstitution: d.education?.[0]?.institution ?? "",
        educationYear: d.education?.[0]?.year ?? "",
        educationLocation: d.education?.[0]?.location ?? "",
      });
    });
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveAbout({
        bio: form.bio.split("\n\n").map((s) => s.trim()).filter(Boolean),
        skills: {
          development: form.devSkills.split(",").map((s) => s.trim()).filter(Boolean),
          tools: form.toolSkills.split(",").map((s) => s.trim()).filter(Boolean),
          design: form.designSkills.split(",").map((s) => s.trim()).filter(Boolean),
        },
        education: [{
          degree: form.educationDegree,
          institution: form.educationInstitution,
          year: form.educationYear,
          location: form.educationLocation,
        }],
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div style={{ color: "var(--label-secondary)" }}>Loading...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="!text-[24px] !font-bold !m-0">About Content</h1>
        <button className="ios-btn ios-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      <div className="ios-card p-5 flex flex-col gap-4">
        <h2 className="!text-[16px] !font-bold !m-0">Bio</h2>
        <p className="text-[13px] !m-0" style={{ color: "var(--label-secondary)" }}>Each paragraph separated by a blank line.</p>
        <textarea className="ios-input resize-none font-mono text-[13px]" rows={8} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
      </div>

      <div className="ios-card p-5 flex flex-col gap-4">
        <h2 className="!text-[16px] !font-bold !m-0">Skills</h2>
        {[["Development Skills", "devSkills"], ["Tools & Platforms", "toolSkills"], ["Design & UI", "designSkills"]].map(([label, key]) => (
          <div key={key}>
            <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>{label}</label>
            <input className="ios-input" value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder="Comma-separated list" />
          </div>
        ))}
      </div>

      <div className="ios-card p-5 flex flex-col gap-4">
        <h2 className="!text-[16px] !font-bold !m-0">Education</h2>
        {[["Degree", "educationDegree"], ["Institution", "educationInstitution"], ["Year", "educationYear"], ["Location", "educationLocation"]].map(([label, key]) => (
          <div key={key}>
            <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>{label}</label>
            <input className="ios-input" value={form[key]} onChange={(e) => set(key, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}
