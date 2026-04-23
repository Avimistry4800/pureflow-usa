import type { ArticleTag } from "@/lib/cms";

const tags: { value: ArticleTag | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "health", label: "Health" },
  { value: "regulation", label: "Regulation" },
  { value: "industry", label: "Industry" },
  { value: "guides", label: "Guides" },
];

const TagFilter = ({
  active,
  onChange,
}: {
  active: ArticleTag | "all";
  onChange: (t: ArticleTag | "all") => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t) => (
      <button
        key={t.value}
        type="button"
        onClick={() => onChange(t.value)}
        className={`rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
          active === t.value
            ? "border-primary bg-primary/10 text-chrome"
            : "border-border text-muted-foreground hover:border-primary/50 hover:text-chrome"
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

export default TagFilter;
