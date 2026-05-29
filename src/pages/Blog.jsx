import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFirestore } from "../hooks/useFirestore";
import { getBlogPosts } from "../lib/storage";
import { defaultBlogPosts } from "../data/defaultContent";
import { BlogCardSkeleton } from "../components";

gsap.registerPlugin(ScrollTrigger);

function BlogCard({ post }) {
  const { t } = useTranslation();
  const date = post.publishedAt
    ? new Date(post.publishedAt?.seconds ? post.publishedAt.seconds * 1000 : post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "";

  return (
    <Link
      to={`/blog/${post.slug || post.id}`}
      className="ios-card flex flex-col overflow-hidden group !no-underline h-full"
    >
      {/* Cover */}
      <div className="relative overflow-hidden" style={{ height: 180, background: "var(--bg-secondary)" }}>
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--label-tertiary)" }}>
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="blog-card-tag">{tag}</span>
            ))}
          </div>
        )}

        <h3 className="!text-[16px] !font-bold !m-0 leading-snug line-clamp-2" style={{ color: "var(--label)" }}>
          {post.title}
        </h3>

        <p className="text-[13px] leading-relaxed !m-0 line-clamp-2" style={{ color: "var(--label-secondary)" }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid var(--separator)" }}>
          <div className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--label-tertiary)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.readTime} {t("blog.min_read")}
          </div>
          {date && <span className="text-[12px]" style={{ color: "var(--label-tertiary)" }}>{date}</span>}
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const [activeTag, setActiveTag] = useState("all");

  const { data: posts, loading } = useFirestore(() => getBlogPosts(true), defaultBlogPosts);

  const allTags = ["all", ...new Set(posts.flatMap((p) => p.tags ?? []))];
  const filtered = activeTag === "all" ? posts : posts.filter((p) => p.tags?.includes(activeTag));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: "power2.out" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [activeTag, loading]);

  return (
    <div ref={pageRef} className="page-container">
      <div className="text-center mb-10">
        <h1 className="section-title">{t("blog.title")}</h1>
        <p className="section-subtitle mt-2">{t("blog.subtitle")}</p>
      </div>

      {/* Tag filters */}
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 capitalize"
              style={
                activeTag === tag
                  ? { background: "var(--blue)", color: "#fff" }
                  : { background: "var(--fill-tertiary)", color: "var(--label-secondary)", border: "1px solid var(--separator)" }
              }
            >
              {tag === "all" ? t("blog.all_tags") : tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p style={{ color: "var(--label-secondary)" }}>{t("blog.no_posts")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <div key={post.id} className="blog-card h-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
