import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ContactForm } from "../components";

const CONNECT = [
  {
    label: "GitHub",
    href: "https://github.com/tanmaydevrani",
    display: "github.com/tanmaydevrani",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"/>
      </svg> 
    ),
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/in/tanmaydevrani",
    display: "linkedin.com/in/tanmaydevrani",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" fill="currentColor">
        <path d="M17.04,1.01H2.96C1.88,1.01,1,1.89,1,2.97v14.06C1,18.11,1.88,19,2.96,19h14.08C18.12,19,19,18.11,19,17.03V2.97C19,1.89,18.12,1.01,17.04,1.01z M7.01,15.99H4.52V7.99h2.49V15.99z M5.76,6.93c-0.8,0-1.44-0.65-1.44-1.44c0-0.8,0.65-1.44,1.44-1.44s1.44,0.65,1.44,1.44C7.2,6.28,6.56,6.93,5.76,6.93z M16.49,15.99h-2.49v-3.9c0-0.93-0.02-2.12-1.3-2.12c-1.3,0-1.49,1.01-1.49,2.06v3.96H8.72V7.99h2.39v1.09h0.03c0.49-0.82,1.39-1.3,2.36-1.27c2.52,0,2.99,1.66,2.99,3.82V15.99z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:tanmaydevrani2@gmail.com",
    display: "tanmaydevrani2@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" fill="currentColor">
        <path d="M23.954,5.542,15.536,13.96a5.007,5.007,0,0,1-7.072,0L.046,5.542C.032,5.7,0,5.843,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6C24,5.843,23.968,5.7,23.954,5.542Z"/>
        <path d="M14.122,12.546l9.134-9.135A4.986,4.986,0,0,0,19,1H5A4.986,4.986,0,0,0,.744,3.411l9.134,9.135A3.007,3.007,0,0,0,14.122,12.546Z"/>
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+917011372156",
    display: "+91 7011372156",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" fill="currentColor">
        <path d="M24,6.24c0,7.64-10.13,17.76-17.76,17.76-1.67,0-3.23-.63-4.38-1.78l-1-1.15c-1.16-1.16-1.16-3.12,.05-4.33,.03-.03,2.44-1.88,2.44-1.88,1.2-1.14,3.09-1.14,4.28,0l1.46,1.17c3.2-1.36,5.47-3.64,6.93-6.95l-1.16-1.46c-1.15-1.19-1.15-3.09,0-4.28,0,0,1.85-2.41,1.88-2.44,1.21-1.21,3.17-1.21,4.38,0l1.05,.91c1.2,1.19,1.83,2.75,1.83,4.42Z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const { t } = useTranslation();
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power2.out" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="page-container max-w-5xl">
      <div className="contact-item text-center mb-10">
        <h1 className="section-title">{t("contact.title")}</h1>
        <p className="section-subtitle mt-2">{t("contact.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="contact-item">
          <ContactForm fullWidth />
        </div>

        <div className="contact-item flex flex-col gap-4">
          <div className="ios-card p-5">
            <h3 className="!text-[16px] !font-bold !m-0 mb-1">{t("contact.connect_title")}</h3>
            <p className="text-[13px] !m-0 mb-4" style={{ color: "var(--label-secondary)" }}>{t("contact.connect_subtitle")}</p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {CONNECT.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 !no-underline group"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--separator)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 group-hover:scale-105"
                      style={{ background: "var(--fill-tertiary)", color: "var(--label-secondary)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold !m-0" style={{ color: "var(--label)" }}>{item.label}</p>
                      <p className="text-[12px] !m-0" style={{ color: "var(--label-secondary)" }}>{item.display}</p>
                    </div>
                    <svg className="ml-auto opacity-40" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--label)" }}>
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ios-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,122,255,0.1)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold !m-0" style={{ color: "var(--label)" }}>{t("contact.location")}</p>
                <p className="text-[13px] !m-0" style={{ color: "var(--label-secondary)" }}>{t("contact.location_value")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(52,199,89,0.1)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold !m-0" style={{ color: "var(--label)" }}>{t("contact.available_label")}</p>
                <p className="text-[13px] !m-0" style={{ color: "var(--label-secondary)" }}>{t("contact.available_value")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
