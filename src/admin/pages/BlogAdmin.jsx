import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../lib/storage";
import { defaultBlogPosts } from "../../data/defaultContent";

const EMPTY = { title: "", slug: "", excerpt: "", content: "", coverImage: "", tags: "", readTime: 5, published: false };

function Modal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    ...EMPTY, ...item,
    tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags ?? "",
  });
  const [tab, setTab] = useState("write");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    onSave({
      ...form,
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      readTime: Number(form.readTime) || 5,
      publishedAt: form.published ? new Date().toISOString() : form.publishedAt,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="ios-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="!text-[18px] !font-bold !m-0">{item.id ? "Edit" : "New"} Blog Post</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--label-secondary)" }}>✕</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[["Title", "title"], ["Slug (auto)", "slug"], ["Cover Image URL", "coverImage"], ["Read Time (min)", "readTime"]].map(([label, key]) => (
            <div key={key}>
              <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>{label}</label>
              <input className="ios-input" value={form[key]} onChange={(e) => set(key, e.target.value)} />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Tags (comma-separated)</label>
          <input className="ios-input" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="React, Performance, Architecture" />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1" style={{ color: "var(--label)" }}>Excerpt</label>
          <textarea className="ios-input resize-none" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </div>
        {/* Content with write/preview tabs */}
        <div>
          <div className="flex gap-2 mb-2">
            {["write", "preview"].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="px-3 py-1 text-[13px] font-medium rounded-full capitalize transition-all duration-150"
                style={tab === t ? { background: "var(--label)", color: "var(--bg)" } : { background: "var(--fill-tertiary)", color: "var(--label-secondary)" }}
              >{t}</button>
            ))}
          </div>
          {tab === "write" ? (
            <textarea
              className="ios-input resize-none font-mono text-[13px]"
              rows={12}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Write in Markdown..."
            />
          ) : (
            <div className="prose-blog p-4 rounded-xl min-h-[200px]" style={{ background: "var(--bg-secondary)", border: "1px solid var(--separator)" }}>
              <p style={{ color: "var(--label-tertiary)", fontSize: 13 }}>Preview renders on the blog page.</p>
            </div>
          )}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          <span className="text-[13px] font-medium" style={{ color: "var(--label)" }}>Published</span>
        </label>
        <div className="flex gap-3 justify-end pt-2">
          <button className="ios-btn ios-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="ios-btn ios-btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function BlogAdmin() {
  const { data: posts, reload } = useFirestore(() => getBlogPosts(false), defaultBlogPosts);
  const [editing, setEditing] = useState(null);

  const handleSave = async (data) => {
    if (data.id) await updateBlogPost(data.id, data);
    else await createBlogPost(data);
    setEditing(null);
    reload();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    reload();
  };

  const togglePublish = async (post) => {
    await updateBlogPost(post.id, { published: !post.published });
    reload();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="!text-[24px] !font-bold !m-0">Blog Posts</h1>
        <button className="ios-btn ios-btn-primary" onClick={() => setEditing(EMPTY)}>+ New Post</button>
      </div>

      <div className="flex flex-col gap-3">
        {posts.map((p) => (
          <div key={p.id} className="ios-card p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold !m-0 truncate" style={{ color: "var(--label)" }}>{p.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={p.published
                    ? { background: "rgba(52,199,89,0.1)", color: "var(--green)" }
                    : { background: "var(--fill-tertiary)", color: "var(--label-tertiary)" }
                  }
                >
                  {p.published ? "Published" : "Draft"}
                </span>
                <span className="text-[12px]" style={{ color: "var(--label-tertiary)" }}>{p.readTime} min</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="ios-btn ios-btn-secondary text-[13px] !py-1" onClick={() => togglePublish(p)}>
                {p.published ? "Unpublish" : "Publish"}
              </button>
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
