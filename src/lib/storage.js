import {
  defaultProjects,
  defaultExperience,
  defaultAbout,
  defaultSettings,
} from "../data/defaultContent";

// ─── Keys ─────────────────────────────────────────────────────────────────────

const K = {
  projects:   "td_projects",
  experience: "td_experience",
  about:      "td_about",
  settings:   "td_settings",
  messages:   "td_messages",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ─── Projects ─────────────────────────────────────────────────────────────────

export const getProjects = () =>
  read(K.projects, defaultProjects).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const createProject = (data) => {
  const item = { ...data, id: uid(), createdAt: new Date().toISOString() };
  write(K.projects, [...getProjects(), item]);
  return item.id;
};

export const updateProject = (id, data) => {
  write(K.projects, getProjects().map((p) => (p.id === id ? { ...p, ...data } : p)));
};

export const deleteProject = (id) => {
  write(K.projects, getProjects().filter((p) => p.id !== id));
};

// ─── Experience ───────────────────────────────────────────────────────────────

export const getExperience = () =>
  read(K.experience, defaultExperience).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const createExperience = (data) => {
  const item = { ...data, id: uid() };
  write(K.experience, [...getExperience(), item]);
  return item.id;
};

export const updateExperience = (id, data) => {
  write(K.experience, getExperience().map((e) => (e.id === id ? { ...e, ...data } : e)));
};

export const deleteExperience = (id) => {
  write(K.experience, getExperience().filter((e) => e.id !== id));
};

// ─── About (single object) ────────────────────────────────────────────────────

export const getAbout = () => read(K.about, defaultAbout);
export const saveAbout = (data) => write(K.about, data);

// ─── Settings (single object) ─────────────────────────────────────────────────

export const getSettings = () => read(K.settings, defaultSettings);
export const saveSettings = (data) => write(K.settings, data);

// ─── Messages ─────────────────────────────────────────────────────────────────

export const getMessages = () =>
  read(K.messages, []).sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0));

export const createMessage = (data) => {
  const item = { ...data, id: uid(), read: false, createdAt: new Date().toISOString() };
  write(K.messages, [item, ...getMessages()]);
  return item.id;
};

export const updateMessage = (id, data) => {
  write(K.messages, getMessages().map((m) => (m.id === id ? { ...m, ...data } : m)));
};

export const deleteMessage = (id) => {
  write(K.messages, getMessages().filter((m) => m.id !== id));
};
