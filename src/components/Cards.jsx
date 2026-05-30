import { useTranslation } from "react-i18next";

export default function Cards({ title, description, image, liveUrl, githubUrl, techStack = [], highlights = [], category }) {
  const { t } = useTranslation();

  return (
    <div className="ios-card flex flex-col overflow-hidden group h-full">
      <div className="relative overflow-hidden" style={{ borderRadius: "var(--radius-lg) var(--radius-lg) 0 0", background: "var(--bg-secondary)", height: 200 }}>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--label-tertiary)" }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 blog-card-tag">{category}</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="!text-[17px] !font-bold !m-0 leading-snug" style={{ color: "var(--label)" }}>
          {title}
        </h3>
        {description && (
          <p className="text-[14px] leading-relaxed !m-0" style={{ color: "var(--label-secondary)" }}>
            {description}
          </p>
        )}

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span key={tech} className="ios-badge text-[11px]">{tech}</span>
            ))}
          </div>
        )}

        {(liveUrl || githubUrl) && (
          <div className="flex gap-2 mt-auto pt-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center ios-btn ios-btn-primary text-[13px] !py-1.5 !px-3 !rounded-xl !no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {t("projects_section.live_preview")}
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ios-btn ios-btn-secondary text-[13px] !py-1.5 !px-3 !rounded-xl !no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"/>
                </svg>
                {t("projects_section.github")}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
