import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPost } from "../lib/storage";
import { defaultBlogPosts } from "../data/defaultContent";
import { Skeleton } from "../components";

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let found = await getBlogPost(slug);
        // fallback: look in static data by slug
        if (!found) found = defaultBlogPosts.find((p) => p.slug === slug || p.id === slug) ?? null;
        setPost(found);
      } catch {
        setPost(defaultBlogPosts.find((p) => p.slug === slug || p.id === slug) ?? null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="page-container max-w-3xl">
        <Skeleton height={14} width={80} className="mb-6" />
        <Skeleton height={44} className="mb-4" />
        <Skeleton height={14} width="60%" className="mb-8" />
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} height={14} width={i % 3 === 0 ? "80%" : "100%"} className="mb-3" />)}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-container max-w-3xl text-center">
        <h2 className="section-title">Post not found</h2>
        <Link to="/blog" className="ios-btn ios-btn-secondary !no-underline mt-4 inline-flex">{t("blog.back")}</Link>
      </div>
    );
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt?.seconds ? post.publishedAt.seconds * 1000 : post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="page-container max-w-3xl">
      {/* Back */}
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-[14px] font-medium !no-underline mb-8 transition-opacity duration-150 hover:opacity-70" style={{ color: "var(--label-secondary)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
        </svg>
        {t("blog.back")}
      </Link>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="blog-card-tag">{tag}</span>
          ))}
        </div>
      )}

      <h1 className="!text-[clamp(26px,4vw,38px)] !font-black !m-0 mb-4 leading-tight">{post.title}</h1>

      <div className="flex items-center gap-4 mb-8 pb-6" style={{ borderBottom: "1px solid var(--separator)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ background: "var(--fill)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color: "var(--label-tertiary)" }}>
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold !m-0" style={{ color: "var(--label)" }}>Tanmay Devrani</p>
            <p className="text-[12px] !m-0" style={{ color: "var(--label-tertiary)" }}>Senior Frontend Engineer</p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto text-[12px]" style={{ color: "var(--label-tertiary)" }}>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.readTime} {t("blog.min_read")}
          </span>
          {date && <span>{date}</span>}
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="rounded-2xl overflow-hidden mb-8" style={{ maxHeight: 400 }}>
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose-blog">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: "1px solid var(--separator)" }}>
        <Link to="/blog" className="ios-btn ios-btn-secondary !no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
          </svg>
          {t("blog.back")}
        </Link>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => <span key={tag} className="blog-card-tag">{tag}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
