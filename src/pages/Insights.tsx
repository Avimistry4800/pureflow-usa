import { useEffect, useMemo, useState } from "react";
import { listArticles, type Article, type ArticleTag } from "@/lib/cms";
import ArticleCard from "@/components/insights/ArticleCard";
import TagFilter from "@/components/insights/TagFilter";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Insights = () => {
  useDocumentMeta(
    "Insights — water research, regulation, and guides",
    "Independent reporting on US water quality, EPA regulation, PFAS, lead, and microplastics — with practical guides to home filtration.",
  );

  const [items, setItems] = useState<Article[]>([]);
  const [tag, setTag] = useState<ArticleTag | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listArticles()
      .then((d) => {
        if (alive) {
          setItems(d);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (alive) {
          setError(e instanceof Error ? e.message : "Failed to load");
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(
    () => (tag === "all" ? items : items.filter((a) => a.tag === tag)),
    [items, tag],
  );

  return (
    <article className="bg-background">
      <header className="container mx-auto px-6 py-20 sm:px-10 sm:py-28">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Insights
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
          What's actually in<br />
          <span className="italic text-liquid">your water.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Reporting on US drinking water — regulation, research, the occasional
          scandal — alongside practical guides to home and commercial filtration.
        </p>
        <div className="mt-10">
          <TagFilter active={tag} onChange={setTag} />
        </div>
      </header>

      <section className="container mx-auto px-6 pb-32 sm:px-10">
        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="surface-glass h-64 animate-pulse rounded-lg" />
            ))}
          </div>
        )}
        {error && (
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-destructive">
            {error}
          </p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            No articles in this category yet.
          </p>
        )}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
};

export default Insights;
