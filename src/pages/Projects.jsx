import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFirestore } from "../hooks/useFirestore";
import { getProjects } from "../lib/storage";
import { defaultProjects } from "../data/defaultContent";
import { CardSkeleton } from "../components";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ios-card overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 220, background: "var(--bg-secondary)" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ color: "var(--label-tertiary)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            <span className="text-[13px] font-medium">{project.category}</span>
          </div>
        )}
        {project.category && (
          <span className="absolute top-3 left-3 blog-card-tag">{project.category}</span>
        )}
        {project.featured && (
          <span
            className="absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,149,0,0.15)", color: "var(--orange)", border: "1px solid rgba(255,149,0,0.3)" }}
          >
            ★ Featured
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="!text-[18px] !font-bold !m-0 mb-1">{project.title}</h3>
          <p className="text-[14px] leading-relaxed !m-0" style={{ color: "var(--label-secondary)" }}>
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        {project.techStack?.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--label-tertiary)" }}>
              {t("projects_section.tech_stack")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="ios-badge text-[11px]">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {/* Highlights (collapsible) */}
        {project.highlights?.length > 0 && (
          <div>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150"
              style={{ color: "var(--blue)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
              {t("projects_section.highlights")}
            </button>

            {expanded && (
              <ul className="mt-3 flex flex-col gap-2 list-none pl-0">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed" style={{ color: "var(--label-secondary)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex gap-2 flex-wrap mt-auto pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-btn ios-btn-primary text-[13px] !py-1.5 !px-3 !rounded-xl !no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {t("projects_page.view_live")}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-btn ios-btn-secondary text-[13px] !py-1.5 !px-3 !rounded-xl !no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"/>
              </svg>
              {t("projects_page.view_code")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const [filter, setFilter] = useState("all");

  const { data: projects, loading } = useFirestore(getProjects, defaultProjects);

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power2.out" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [filter, loading]);

  return (
    <div ref={pageRef} className="page-container">
      <div className="text-center mb-10">
        <h1 className="section-title">{t("projects_page.title")}</h1>
        <p className="section-subtitle mt-2">{t("projects_page.subtitle")}</p>
      </div>

      {/* Filter pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 capitalize"
              style={
                filter === cat
                  ? { background: "var(--label)", color: "var(--bg)" }
                  : { background: "var(--fill-tertiary)", color: "var(--label-secondary)", border: "1px solid var(--separator)" }
              }
            >
              {cat === "all" ? t("projects_page.all") : cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p style={{ color: "var(--label-secondary)" }}>{t("projects_page.no_projects")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="proj-card h-full">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
