import { Link } from "react-router-dom";
import type { Article } from "@/lib/cms";

const tagLabel: Record<Article["tag"], string> = {
  regulation: "Regulation",
  health: "Health",
  industry: "Industry",
  guides: "Guides",
};

const ArticleCard = ({ a }: { a: Article }) => {
  const date = new Date(a.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Link
      to={`/insights/${a.slug}`}
      className="surface-glass group flex flex-col rounded-lg p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em]">
        <span className="text-primary">{tagLabel[a.tag]}</span>
        <span className="text-muted-foreground">{a.reading_minutes} min</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-light leading-tight text-chrome transition-colors group-hover:text-primary">
        {a.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{a.excerpt}</p>
      <div className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {date} · Read →
      </div>
    </Link>
  );
};

export default ArticleCard;
