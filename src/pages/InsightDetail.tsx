import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, type Article } from "@/lib/cms";
import ArticleBody from "@/components/insights/ArticleBody";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const tagLabel: Record<Article["tag"], string> = {
  regulation: "Regulation",
  health: "Health",
  industry: "Industry",
  guides: "Guides",
};

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "missing" | "error">("loading");

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    setStatus("loading");
    getArticle(slug)
      .then((a) => {
        if (!alive) return;
        if (!a) setStatus("missing");
        else {
          setArticle(a);
          setStatus("ok");
        }
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, [slug]);

  useDocumentMeta(
    article?.title ?? "Insights",
    article?.excerpt,
  );

  if (status === "loading") {
    return (
      <div className="container mx-auto px-6 py-32 sm:px-10">
        <div className="surface-glass h-96 animate-pulse rounded-lg" />
      </div>
    );
  }
  if (status === "missing" || !article) {
    return (
      <div className="container mx-auto px-6 py-32 text-center sm:px-10">
        <h1 className="font-display text-3xl text-chrome">Article not found</h1>
        <Link
          to="/insights"
          className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.28em] text-primary underline-offset-4 hover:underline"
        >
          ← Back to Insights
        </Link>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="container mx-auto px-6 py-32 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-destructive">
          Could not load this article. Please retry.
        </p>
      </div>
    );
  }

  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="bg-background">
      <header className="container mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="text-primary">{tagLabel[article.tag]}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{date}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{article.reading_minutes} min read</span>
        </div>
        <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl">{article.excerpt}</p>
      </header>

      <section className="container mx-auto max-w-3xl px-6 pb-24 sm:px-10">
        <ArticleBody md={article.body_md} />
      </section>

      <section className="border-t border-border bg-surface/40 py-16">
        <div className="container mx-auto max-w-3xl px-6 text-center sm:px-10">
          <h2 className="font-display text-2xl font-light text-chrome sm:text-3xl">
            Want this water out of your tap?
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-chrome px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-background"
          >
            Book a consultation
            <span className="h-1 w-1 rounded-full bg-background" />
          </Link>
        </div>
      </section>
    </article>
  );
};

export default InsightDetail;
