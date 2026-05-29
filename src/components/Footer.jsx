import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--separator)", background: "var(--bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: "var(--label)", color: "var(--bg)" }}
              >
                TD
              </div>
              <span className="font-bold text-[15px]" style={{ color: "var(--label)" }}>
                Tanmay Devrani
              </span>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--label-secondary)" }}>
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h6 className="font-semibold text-[13px] uppercase tracking-wider mb-3" style={{ color: "var(--label-tertiary)" }}>
              {t("footer.quick_links")}
            </h6>
            <div className="flex flex-col gap-2">
              {["about", "experience", "projects", "blog", "contact"].map((page) => (
                <Link
                  key={page}
                  to={`/${page}`}
                  className="text-[14px] !no-underline transition-colors duration-150 hover:!text-[var(--label)]"
                  style={{ color: "var(--label-secondary)" }}
                >
                  {t(`nav.${page}`)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h6 className="font-semibold text-[13px] uppercase tracking-wider mb-3" style={{ color: "var(--label-tertiary)" }}>
              {t("footer.connect")}
            </h6>
            <SocialMedia className="footer-svg !mt-0" />
            <div className="mt-4 flex flex-col gap-1.5">
              <a
                href="mailto:tanmaydevrani2@gmail.com"
                className="text-[13px] !no-underline"
                style={{ color: "var(--label-secondary)" }}
              >
                tanmaydevrani2@gmail.com
              </a>
              <span className="text-[13px]" style={{ color: "var(--label-secondary)" }}>
                New Delhi, India
              </span>
            </div>
          </div>

          <div>
            <h6 className="font-semibold text-[13px] uppercase tracking-wider mb-3" style={{ color: "var(--label-tertiary)" }}>
              Open To
            </h6>
            <div className="flex flex-col gap-2">
              {["React / Next.js Roles", "Frontend Lead", "Remote · Europe · India"].map((item) => (
                <span key={item} className="text-[13px]" style={{ color: "var(--label-secondary)" }}>
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <span
                className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: "rgba(52,199,89,0.12)", color: "var(--green)", border: "1px solid rgba(52,199,89,0.2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available for hire
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-5"
          style={{ borderTop: "1px solid var(--separator)" }}
        >
          <p className="text-[13px] m-0" style={{ color: "var(--label-tertiary)" }}>
            © {year} Tanmay Devrani. {t("footer.rights")}
          </p>
          <p className="text-[13px] m-0" style={{ color: "var(--label-tertiary)" }}>
            {t("footer.built_with")}
          </p>
        </div>
      </div>
    </footer>
  );
}
