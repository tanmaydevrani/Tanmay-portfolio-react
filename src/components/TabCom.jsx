import { useState } from "react";
import { useTranslation } from "react-i18next";

const TABS = [
  {
    key: "languages",
    labelKey: "skills_section.dev",
    items: [
      { name: "HTML5", icon: <i className="devicon-html5-plain text-orange-400" /> },
      { name: "CSS3", icon: <i className="devicon-css3-plain text-blue-500" /> },
      { name: "JavaScript", icon: <i className="devicon-javascript-plain text-yellow-400" /> },
      { name: "TypeScript", icon: <i className="devicon-typescript-plain text-blue-600" /> },
      { name: "React", icon: <i className="devicon-react-original text-sky-400" /> },
      { name: "Next.js", icon: <i className="devicon-nextjs-original-wordmark" style={{ fontSize: 17 }} /> },
      { name: "Redux Toolkit", icon: <i className="devicon-redux-original text-purple-600" /> },
      { name: "jQuery", icon: <i className="devicon-jquery-plain text-blue-800" /> },
      { name: "Tailwind CSS", icon: <i className="devicon-tailwindcss-original text-cyan-500" /> },
      { name: "Bootstrap", icon: <i className="devicon-bootstrap-plain text-purple-700" /> },
    ],
  },
  {
    key: "tools",
    labelKey: "skills_section.tools",
    items: [
      { name: "Git", icon: <i className="devicon-git-plain text-orange-600" /> },
      { name: "GitHub", icon: <i className="devicon-github-original" style={{ color: "var(--label)" }} /> },
      { name: "Bitbucket", icon: <i className="devicon-bitbucket-original text-blue-700" /> },
      { name: "Jira", icon: <i className="devicon-jira-plain text-blue-700" /> },
      { name: "VS Code", icon: <i className="devicon-vscode-plain text-blue-500" /> },
      { name: "Vite", icon: <i className="devicon-vitejs-plain text-purple-500" /> },
    ],
  },
  {
    key: "design",
    labelKey: "skills_section.design",
    items: [
      { name: "Figma", icon: <i className="devicon-figma-plain text-orange-500" /> },
      { name: "Adobe XD", icon: <i className="devicon-xd-plain text-pink-700" /> },
    ],
  },
];

export default function TabCom() {
  const [active, setActive] = useState("languages");
  const { t } = useTranslation();
  const current = TABS.find((tab) => tab.key === active);

  return (
    <div>
      <div className="flex gap-2 justify-center mb-5 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200"
            style={
              active === tab.key
                ? { background: "var(--label)", color: "var(--bg)" }
                : { background: "var(--fill-tertiary)", color: "var(--label-secondary)", border: "1px solid var(--separator)" }
            }
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--separator)" }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {current?.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 hover:scale-105 cursor-default"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--separator)", color: "var(--label)" }}
            >
              <span className="text-[16px] leading-none">{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
