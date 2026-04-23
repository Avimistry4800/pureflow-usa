import ConsultationForm from "@/components/form/ConsultationForm";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

const Contact = () => {
  useDocumentMeta(
    "Contact — book a water purification consultation",
    "Speak with a senior water engineer. NYC and London offices. We respond within one business day.",
  );

  return (
    <article className="bg-background">
      <header className="container mx-auto px-6 py-20 sm:px-10 sm:py-28">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
          Contact
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] text-chrome sm:text-7xl">
          A senior engineer,<br />
          <span className="italic text-liquid">within one business day.</span>
        </h1>
      </header>

      <ConsultationForm embedded />

      <section className="container mx-auto grid grid-cols-1 gap-6 px-6 py-24 md:grid-cols-2 sm:px-10">
        <div className="surface-glass rounded-lg p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            New York
          </span>
          <h3 className="mt-3 font-display text-2xl text-chrome">USA Operations</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            By appointment only.<br />
            Mon–Fri · 9:00–18:00 ET<br />
            +1 212 000 0000<br />
            usa@wpl.com
          </p>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            40.7128° N · 74.0060° W
          </div>
        </div>
        <div className="surface-glass rounded-lg p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            London
          </span>
          <h3 className="mt-3 font-display text-2xl text-chrome">UK Headquarters</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Manufacturing · service · R&D.<br />
            Mon–Fri · 9:00–17:30 GMT<br />
            +44 20 0000 0000<br />
            hq@wpl.com
          </p>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            51.5074° N · 0.1278° W
          </div>
        </div>
      </section>
    </article>
  );
};

export default Contact;
