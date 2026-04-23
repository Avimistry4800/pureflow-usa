import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const NewsletterInline = ({ source = "footer" }: { source?: string }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [err, setErr] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("err");
      setErr("Enter a valid email");
      return;
    }
    setStatus("loading");
    setErr("");
    try {
      const { error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email, source_page: source },
      });
      if (error) throw error;
      setStatus("ok");
      setEmail("");
    } catch (e: unknown) {
      setStatus("err");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  if (status === "ok") {
    return (
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
        Subscribed · Watch your inbox
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-sm items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        className="flex-1 border-b border-border bg-transparent px-0 py-2 text-sm text-chrome placeholder:text-muted-foreground/50 outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full border border-primary/50 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-chrome transition-colors hover:bg-primary/20 disabled:opacity-60"
      >
        {status === "loading" ? "…" : "Join"}
      </button>
      {status === "err" && (
        <span className="font-mono text-[10px] text-destructive">{err}</span>
      )}
    </form>
  );
};

export default NewsletterInline;
