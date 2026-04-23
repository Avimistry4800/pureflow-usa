/**
 * Tiny markdown-ish renderer. Supports: ## H2, **bold**, - bullets, paragraphs.
 * Intentionally minimal — no external deps. Replace with a real MD lib if needs grow.
 */
const renderInline = (s: string) => {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-chrome">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
};

const ArticleBody = ({ md }: { md: string }) => {
  const lines = md.split("\n");
  const blocks: React.ReactNode[] = [];
  let bulletBuf: string[] = [];
  let paraBuf: string[] = [];

  const flushBullets = () => {
    if (bulletBuf.length) {
      blocks.push(
        <ul key={`b${blocks.length}`} className="my-6 space-y-2 pl-5 text-muted-foreground">
          {bulletBuf.map((b, i) => (
            <li key={i} className="list-disc marker:text-primary">
              {renderInline(b)}
            </li>
          ))}
        </ul>,
      );
      bulletBuf = [];
    }
  };
  const flushPara = () => {
    if (paraBuf.length) {
      blocks.push(
        <p key={`p${blocks.length}`} className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {renderInline(paraBuf.join(" "))}
        </p>,
      );
      paraBuf = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flushBullets();
      flushPara();
      blocks.push(
        <h2
          key={`h${blocks.length}`}
          className="mt-12 font-display text-2xl font-light text-chrome sm:text-3xl"
        >
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("- ")) {
      flushPara();
      bulletBuf.push(line.slice(2));
    } else if (!line) {
      flushBullets();
      flushPara();
    } else {
      flushBullets();
      paraBuf.push(line);
    }
  });
  flushBullets();
  flushPara();

  return <div>{blocks}</div>;
};

export default ArticleBody;
