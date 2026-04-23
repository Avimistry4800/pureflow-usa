import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Privacy = () => {
  useDocumentMeta("Privacy Policy", "How Water Purification Limited collects and uses personal information.");
  return (
    <article className="container mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Legal</span>
      <h1 className="mt-4 font-display text-4xl font-light text-chrome sm:text-5xl">Privacy Policy</h1>
      <p className="mt-6 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

      <div className="mt-10 space-y-6 text-base text-muted-foreground sm:text-lg">
        <p>We collect only the information you provide through our consultation and newsletter forms — name, email, phone, location, and the context you share with us — and use it solely to respond to your enquiry or send you the dispatches you opted into.</p>
        <h2 className="mt-8 font-display text-2xl text-chrome">What we collect</h2>
        <p>Form submissions, basic device and analytics data (page views, referrer), and cookies strictly necessary for the site to function. We do not run ad-tech trackers.</p>
        <h2 className="mt-8 font-display text-2xl text-chrome">Who sees it</h2>
        <p>Your information is visible only to our internal team. We never sell, share, or resell personal data. Subprocessors (hosting, email delivery) are bound by data-processing agreements.</p>
        <h2 className="mt-8 font-display text-2xl text-chrome">Your rights</h2>
        <p>You may request access, correction, or deletion of your data at any time by emailing privacy@wpl.com.</p>
      </div>
    </article>
  );
};
export default Privacy;
