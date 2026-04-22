import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useMagnetic } from "@/lib/useMagnetic";

const sectors = [
  { value: "home", label: "Residence" },
  { value: "medical", label: "Medical" },
  { value: "hospitality", label: "Hospitality" },
  { value: "office", label: "Office" },
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional(),
  sector: z.enum(["home", "medical", "hospitality", "office"]),
  location: z.string().trim().max(240).optional(),
  message: z.string().trim().max(2000).optional(),
});

type FormState = z.infer<typeof schema>;

const ConsultationForm = () => {
  const submitRef = useMagnetic<HTMLButtonElement>(0.25);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    sector: "home",
    location: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => {
        if (v && v[0]) next[k] = v[0];
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const { error } = await supabase.functions.invoke("submit-lead", { body: parsed.data });
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", phone: "", sector: "home", location: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="consult" className="relative bg-background py-32 sm:py-40">
      <div className="absolute inset-0 grid-noise opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-caustic" />

      <div className="container relative mx-auto grid grid-cols-1 gap-16 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">
            Act 05 — Consultation
          </span>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-chrome sm:text-6xl">
            Begin your<br />
            <span className="italic text-liquid">commission.</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Every WPL system is specified by a senior engineer. Share your
            context — we'll respond within one business day with a tailored
            proposal.
          </p>

          <div className="mt-10 space-y-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              <div>
                <div className="text-chrome">London HQ</div>
                <div className="mt-1">+44 20 0000 0000</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              <div>
                <div className="text-chrome">USA Service</div>
                <div className="mt-1">+1 212 000 0000</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="surface-glass relative rounded-lg p-6 sm:p-10 md:col-span-7" noValidate>
          {status === "success" ? (
            <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/10">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
              </span>
              <h3 className="font-display text-3xl font-light text-chrome">Received.</h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Your commission is being routed to a senior engineer. Expect a
                response within one business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-primary underline-offset-4 hover:underline"
              >
                Submit another
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputCls}
                    autoComplete="name"
                    required
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputCls}
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputCls}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Location (City / State)" error={errors.location}>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="mt-6">
                <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Sector
                </span>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {sectors.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => update("sector", s.value)}
                      className={`rounded border px-3 py-3 text-left font-mono text-[11px] uppercase tracking-[0.2em] transition-all ${
                        form.sector === s.value
                          ? "border-primary bg-primary/10 text-chrome"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Field label="Project context" error={errors.message}>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  Encrypted in transit · Never resold
                </p>
                <button
                  ref={submitRef}
                  type="submit"
                  data-magnetic
                  disabled={status === "submitting"}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-chrome px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-background transition-shadow hover:shadow-glow disabled:opacity-60"
                >
                  {status === "submitting" ? "Transmitting…" : "Request consultation"}
                  <span className="h-1 w-1 rounded-full bg-background" />
                </button>
              </div>

              {status === "error" && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-destructive">
                  Transmission failed. Please retry or email contact@wpl.us
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
};

const inputCls =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-sm text-chrome placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary";

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
      {label}
    </span>
    <div className="mt-1.5">{children}</div>
    {error && <span className="mt-1 block font-mono text-[10px] text-destructive">{error}</span>}
  </label>
);

export default ConsultationForm;
