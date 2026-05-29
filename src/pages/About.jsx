import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFirestore } from "../hooks/useFirestore";
import { getAbout } from "../lib/storage";
import { defaultAbout } from "../data/defaultContent";

gsap.registerPlugin(ScrollTrigger);

const SKILL_COLORS = {
  development: "var(--blue)",
  tools: "var(--purple)",
  design: "var(--orange)",
};

function SkillGroup({ title, items, color }) {
  return (
    <div>
      <h3
        className="text-[12px] font-semibold uppercase tracking-widest mb-3"
        style={{ color }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="ios-badge text-[12px] transition-all duration-150 hover:scale-105 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const { data: about } = useFirestore(getAbout, defaultAbout);

  const bio = about?.bio ?? defaultAbout.bio;
  const skills = about?.skills ?? defaultAbout.skills;
  const education = about?.education ?? defaultAbout.education;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: pageRef.current, start: "top 80%" } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: t("about.stats.experience"), label: t("about.stats.exp_label") },
    { value: t("about.stats.projects"), label: t("about.stats.proj_label") },
    { value: t("about.stats.companies"), label: t("about.stats.comp_label") },
    { value: t("about.stats.mentored"), label: t("about.stats.ment_label") },
  ];

  return (
    <div ref={pageRef} className="page-container">
      {/* Header */}
      <div className="about-fade text-center mb-12">
        <h1 className="section-title">{t("about.title")}</h1>
        <p className="section-subtitle mt-2">{t("about.subtitle")}</p>
      </div>

      {/* Stats row */}
      <div className="about-fade grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="ios-card text-center py-5 px-3">
            <p className="!text-[26px] !font-black !m-0 gradient-text">{s.value}</p>
            <p className="text-[12px] !m-0 mt-1" style={{ color: "var(--label-secondary)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Who I Am + Skills */}
      <div className="about-fade grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="!text-[22px] !font-bold mb-4">{t("about.who_title")}</h2>
          <div className="flex flex-col gap-4">
            {bio.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed !m-0" style={{ color: "var(--label-secondary)" }}>
                {para}
              </p>
            ))}
          </div>

          {/* Location + availability */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span
              className="inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: "rgba(52,199,89,0.1)", color: "var(--green)", border: "1px solid rgba(52,199,89,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </span>
            <span
              className="inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: "var(--fill-tertiary)", color: "var(--label-secondary)", border: "1px solid var(--separator)" }}
            >
              📍 New Delhi, India
            </span>
            <span
              className="inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: "var(--fill-tertiary)", color: "var(--label-secondary)", border: "1px solid var(--separator)" }}
            >
              🌍 Remote · Europe · India
            </span>
          </div>
        </div>

        <div className="ios-card p-6 flex flex-col gap-6">
          <h2 className="!text-[22px] !font-bold !m-0">{t("about.skills_title")}</h2>
          <SkillGroup
            title={t("about.dev_skills")}
            items={skills.development}
            color={SKILL_COLORS.development}
          />
          <SkillGroup
            title={t("about.tools_title")}
            items={skills.tools}
            color={SKILL_COLORS.tools}
          />
          <SkillGroup
            title={t("about.design_title")}
            items={skills.design}
            color={SKILL_COLORS.design}
          />
        </div>
      </div>

      {/* Education */}
      <div className="about-fade">
        <h2 className="!text-[22px] !font-bold mb-5">{t("about.education_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <div key={i} className="ios-card p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(0,122,255,0.1)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="!text-[16px] !font-bold !m-0">{edu.degree}</h3>
                  <p className="text-[14px] !m-0 mt-0.5 font-medium" style={{ color: "var(--blue)" }}>{edu.institution}</p>
                </div>
              </div>
              <div className="flex justify-between text-[13px]" style={{ color: "var(--label-secondary)" }}>
                <span>{edu.year}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
