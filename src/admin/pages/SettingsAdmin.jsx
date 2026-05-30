import { useState, useEffect } from "react";
import { getSettings, saveSettings } from "../../lib/storage";
import { defaultSettings } from "../../data/defaultContent";

export default function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getSettings() ?? defaultSettings);
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    saveSettings(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!form) return <div style={{ color: "var(--label-secondary)" }}>Loading...</div>;

  const fields = [
    { section: "Identity", items: [["Full Name", "name"], ["Tagline", "tagline"], ["Hero Description", "heroDescription", true]] },
    { section: "Contact Info", items: [["Email", "email"], ["Phone", "phone"], ["Location", "location"]] },
    { section: "Social Links", items: [["GitHub URL", "github"], ["LinkedIn URL", "linkedin"], ["Resume URL", "resumeUrl"]] },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="!text-[24px] !font-bold !m-0">Site Settings</h1>
        <button className="ios-btn ios-btn-primary" onClick={handleSave} disabled={saving}>
          {saved ? "✓ Saved" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {fields.map(({ section, items }) => (
        <div key={section} className="ios-card p-5 flex flex-col gap-4">
          <h2 className="!text-[16px] !font-bold !m-0">{section}</h2>
          {items.map(([label, key, isTextarea]) => (
            <div key={key}>
              <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>{label}</label>
              {isTextarea ? (
                <textarea className="ios-input resize-none" rows={3} value={form[key] ?? ""} onChange={(e) => set(key, e.target.value)} />
              ) : (
                <input className="ios-input" value={form[key] ?? ""} onChange={(e) => set(key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
