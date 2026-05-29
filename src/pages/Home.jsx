import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SocialMedia, Cards, TabCom, ContactForm, CardSkeleton } from "../components";
import { useFirestore } from "../hooks/useFirestore";
import { getProjects } from "../lib/storage";
import { defaultProjects, defaultSettings } from "../data/defaultContent";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "",  label: "Companies" },
  { value: 2, suffix: "+", label: "Devs Mentored" },
];

// ── Animated counter ─────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }) {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 88%",
      onEnter: () => {
        if (fired.current) return;
        fired.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate() {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ── Photo with 3-D tilt on hover ──────────────────────────────────────────────
function TiltPhoto({ src }) {
  const wrapRef = useRef(null);

  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 18;
    const y = ((e.clientY - top) / height - 0.5) * -18;
    gsap.to(el, { rotateY: x, rotateX: y, scale: 1.04, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
  };

  const onLeave = () => {
    gsap.to(wrapRef.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: "elastic.out(1,0.5)" });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative cursor-pointer"
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {/* glow ring that pulses */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(0,122,255,0.25) 0%, transparent 70%)", transform: "scale(1.15)", zIndex: 0 }}
      />
      {/* photo */}
      <div
        className="relative z-10 w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden"
        style={{ border: "4px solid var(--separator)", boxShadow: "var(--shadow-xl)" }}
      >
        <img src={src} alt="Tanmay Devrani" className="w-full h-full object-cover" />
      </div>
      {/* floating badge */}
      <div
        className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--separator)", boxShadow: "var(--shadow-md)", color: "var(--green)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Available
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const photoRef  = useRef(null);
  const statsRef  = useRef(null);
  const projRef   = useRef(null);
  const skillsRef = useRef(null);
  const ctaRef    = useRef(null);

  const { data: projects, loading } = useFirestore(getProjects, defaultProjects);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero stagger entrance ──
      gsap.fromTo(
        ".hero-item",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.11, duration: 0.65, ease: "power3.out", delay: 0.1 }
      );

      // ── Photo parallax: moves up 40px slower than scroll ──
      gsap.to(photoRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });

      // ── Hero text subtle parallax ──
      gsap.to(".hero-text-wrap", {
        y: -25,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      // ── Stats cards stagger ──
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 24, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5, ease: "back.out(1.4)",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );

      // ── Project cards parallax stagger ──
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: projRef.current, start: "top 80%" },
        }
      );

      // ── Skills section slide in ──
      gsap.fromTo(
        skillsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 85%" },
        }
      );

      // ── CTA section fade ──
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
        }
      );

      // ── Floating parallax blobs in hero background ──
      gsap.to(".hero-blob", {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="hero-gradient relative overflow-hidden min-h-[88vh] flex items-center">
        {/* decorative blobs */}
        <div className="hero-blob absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)" }} />
        <div className="hero-blob absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--purple) 0%, transparent 70%)" }} />

        <div className="page-container w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className="hero-text-wrap flex flex-col gap-5">
              <div className="hero-item">
                <span className="inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(52,199,89,0.1)", color: "var(--green)", border: "1px solid rgba(52,199,89,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {t("hero.available")}
                </span>
              </div>

              <h1 className="hero-item !text-[clamp(34px,4.5vw,52px)] !font-black !m-0 leading-[1.1] tracking-tight">
                {t("hero.greeting")}
              </h1>

              <div className="hero-item" style={{ minHeight: 38 }}>
                <TypeAnimation
                  sequence={t("hero.roles", { returnObjects: true }).flatMap((r) => [r, 1200])}
                  wrapper="span"
                  speed={55}
                  deletionSpeed={70}
                  repeat={Infinity}
                  className="gradient-text font-bold text-[clamp(18px,2.5vw,26px)]"
                />
              </div>

              <p className="hero-item text-[15px] leading-relaxed !m-0 max-w-lg" style={{ color: "var(--label-secondary)" }}>
                {t("hero.description")}
              </p>

              <div className="hero-item flex flex-wrap gap-3">
                <Link to="/projects" className="ios-btn ios-btn-primary !no-underline">
                  {t("hero.cta_work")}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
                <a href={defaultSettings.resumeUrl} className="ios-btn ios-btn-secondary !no-underline" download>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {t("hero.cta_resume")}
                </a>
              </div>

              <div className="hero-item"><SocialMedia /></div>
            </div>

            {/* Photo with tilt */}
            <div ref={photoRef} className="hero-item flex justify-center md:justify-end">
              <TiltPhoto src="/img/tanmay.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats with counter ───────────────────────────────────────────── */}
      <section ref={statsRef} style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--separator)", borderBottom: "1px solid var(--separator)" }}>
        <div className="page-container !py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card ios-card text-center py-6 px-4">
                <p className="!text-[32px] !font-black !m-0 gradient-text">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[13px] !m-0 mt-1" style={{ color: "var(--label-secondary)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ───────────────────────────────────────────── */}
      <section ref={projRef} className="page-container">
        <div className="text-center mb-10">
          <h2 className="section-title">{t("projects_section.title")}</h2>
          <p className="section-subtitle mt-2">{t("projects_section.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : featured.length > 0
            ? featured.map((p) => (
                <div key={p.id} className="project-card h-full">
                  <Cards title={p.title} description={p.description} image={p.image}
                    liveUrl={p.liveUrl} githubUrl={p.githubUrl} techStack={p.techStack} category={p.category} />
                </div>
              ))
            : <p className="col-span-3 text-center" style={{ color: "var(--label-secondary)" }}>{t("projects_section.no_projects")}</p>
          }
        </div>
        <div className="flex justify-center">
          <Link to="/projects" className="ios-btn ios-btn-secondary !no-underline">
            {t("projects_section.view_all")}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Technical Skills ────────────────────────────────────────────── */}
      <section ref={skillsRef} style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--separator)", borderBottom: "1px solid var(--separator)" }}>
        <div className="page-container">
          <div className="text-center mb-8">
            <h2 className="section-title">{t("skills_section.title")}</h2>
            <p className="section-subtitle mt-2">{t("skills_section.subtitle")}</p>
          </div>
          <TabCom />
        </div>
      </section>

      {/* ── Get In Touch ─────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="page-container">
        <div className="text-center mb-8">
          <h2 className="section-title">{t("contact_section.title")}</h2>
          <p className="section-subtitle mt-2">{t("contact_section.subtitle")}</p>
        </div>
        <div className="max-w-xl mx-auto">
          <ContactForm fullWidth />
        </div>
      </section>
    </div>
  );
}
