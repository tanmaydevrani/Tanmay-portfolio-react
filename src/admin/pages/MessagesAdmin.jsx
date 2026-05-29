import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { getMessages, updateMessage, deleteMessage } from "../../lib/storage";

export default function MessagesAdmin() {
  const { data: messages, reload } = useFirestore(getMessages, []);
  const [selected, setSelected] = useState(null);

  const markRead = async (msg) => {
    if (!msg.read) { await updateMessage(msg.id, { read: true }); reload(); }
    setSelected(msg);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(id);
    if (selected?.id === id) setSelected(null);
    reload();
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="!text-[24px] !font-bold !m-0">Messages</h1>
          {unread > 0 && <p className="text-[13px] !m-0" style={{ color: "var(--blue)" }}>{unread} unread</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* List */}
        <div className="flex flex-col gap-2">
          {messages.length === 0 && <p style={{ color: "var(--label-secondary)", fontSize: 14 }}>No messages yet.</p>}
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => markRead(msg)}
              className="ios-card p-4 text-left transition-all duration-150 w-full"
              style={{ background: selected?.id === msg.id ? "var(--fill-tertiary)" : undefined, outline: selected?.id === msg.id ? "2px solid var(--blue)" : undefined }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold" style={{ color: "var(--label)" }}>{msg.name}</span>
                  {!msg.read && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--blue)" }} />}
                </div>
                <span className="text-[11px]" style={{ color: "var(--label-tertiary)" }}>
                  {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : ""}
                </span>
              </div>
              <p className="text-[12px] !m-0 truncate" style={{ color: "var(--label-secondary)" }}>{msg.subject || msg.message}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="ios-card p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="!text-[17px] !font-bold !m-0">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-[13px] !no-underline" style={{ color: "var(--blue)" }}>{selected.email}</a>
              </div>
              <button onClick={() => handleDelete(selected.id)} className="ios-btn text-[13px] !py-1" style={{ background: "rgba(255,59,48,0.1)", color: "var(--red)" }}>Delete</button>
            </div>
            {selected.subject && <p className="text-[13px] font-semibold !m-0" style={{ color: "var(--label)" }}>Re: {selected.subject}</p>}
            <div className="p-4 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--separator)" }}>
              <p className="text-[14px] leading-relaxed !m-0" style={{ color: "var(--label)" }}>{selected.message}</p>
            </div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your message"}`} className="ios-btn ios-btn-primary !no-underline self-start">
              Reply via Email
            </a>
          </div>
        ) : (
          <div className="ios-card p-8 flex items-center justify-center" style={{ color: "var(--label-tertiary)" }}>
            <p className="text-[14px] !m-0">Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
