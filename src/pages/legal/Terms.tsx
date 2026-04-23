import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Terms = () => {
  useDocumentMeta("Terms of Use", "Terms governing use of the Water Purification Limited website and services.");
  return (
    <article className="container mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Legal</span>
      <h1 className="mt-4 font-display text-4xl font-light text-chrome sm:text-5xl">Terms of Use</h1>
      <p className="mt-6 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

      <div className="mt-10 space-y-6 text-base text-muted-foreground sm:text-lg">
        <p>By using this website you agree to use it lawfully, not to attempt to compromise its security, and to respect intellectual property displayed on it.</p>
        <h2 className="mt-8 font-display text-2xl text-chrome">Content</h2>
        <p>All copy, imagery, and product references are © Water Purification Limited unless otherwise noted. Editorial content in the Insights section is provided for information and is not professional advice.</p>
        <h2 className="mt-8 font-display text-2xl text-chrome">Warranty &amp; service</h2>
        <p>Specific product warranty terms are issued with each system at the point of sale and supersede any general statements on this site.</p>
        <h2 className="mt-8 font-display text-2xl text-chrome">Contact</h2>
        <p>Questions about these terms: legal@wpl.com.</p>
      </div>
    </article>
  );
};
export default Terms;
