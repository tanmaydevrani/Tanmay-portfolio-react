import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFirestore } from "../hooks/useFirestore";
import { getExperience } from "../lib/storage";
import { defaultExperience } from "../data/defaultContent";

gsap.registerPlugin(ScrollTrigger);

function ExperienceCard({ item, index }) {
  const { t } = useTranslation();
  return (
    <div className="exp-card relative pl-10 pb-10 last:pb-0">
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center z-10"
        style={{ background: item.isCurrent ? "var(--blue)" : "var(--fill)", border: "2px solid var(--separator)" }}
      >
        {item.isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
      </div>

      {/* Vertical line (not on last) */}
      {index !== undefined && (
        <div
          className="absolute left-[9px] top-6 bottom-0 w-px"
          style={{ background: "var(--separator)" }}
        />
      )}

      <div className="ios-card p-5 ml-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="!text-[18px] !font-bold !m-0">{item.title}</h3>
              {item.isCurrent && (
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,122,255,0.1)", color: "var(--blue)", border: "1px solid rgba(0,122,255,0.2)" }}
                >
                  {t("experience.present")}
                </span>
              )}
            </div>
            <p className="text-[14px] font-semibold !m-0 mt-0.5" style={{ color: "var(--blue)" }}>
              {item.company}
            </p>
          </div>
          <span
            className="text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ background: "var(--fill-tertiary)", color: "var(--label-secondary)", border: "1px solid var(--separator)" }}
          >
            {item.duration}
          </span>
        </div>

        <ul className="flex flex-col gap-2 mb-4 pl-0 list-none">
          {item.description.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed" style={{ color: "var(--label-secondary)" }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--blue)" }} />
              {point}
            </li>
          ))}
        </ul>

        {item.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.techStack.map((tech) => (
              <span key={tech} className="ios-badge text-[11px]">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const { data: experience } = useFirestore(getExperience, defaultExperience);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-card",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: pageRef.current, start: "top 75%" },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="page-container max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="section-title">{t("experience.title")}</h1>
        <p className="section-subtitle mt-2">{t("experience.subtitle")}</p>
      </div>

      <div className="relative">
        {experience.map((item, i) => (
          <ExperienceCard key={item.id ?? i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
