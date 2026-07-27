import { useState, type FormEvent } from "react";

import { site } from "@/content/site";

/**
 * Newsletter invitation. There is no mailing backend on this site, so the
 * subscription is honest: the reader's address is handed to WhatsApp (or a
 * mail client once an address is published) and a planner adds them by hand.
 */
export function NewsletterInvite() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim().slice(0, 120);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("That address does not look complete.");
      return;
    }
    setError(null);
    const message = `Please add me to The Anayat Journal — ${value}`;
    if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Journal subscription",
      )}&body=${encodeURIComponent(message)}`;
    } else {
      window.open(
        `${site.whatsappHref}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    setDone(true);
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="max-w-xl">
      <label
        htmlFor="journal-email"
        className="font-sans text-[10px] tracking-[0.32em] uppercase text-muted-foreground"
      >
        Your email
      </label>
      <div className="mt-3 flex items-end gap-6 border-b border-border-strong/70 pb-3 transition-colors focus-within:border-gold">
        <input
          id="journal-email"
          type="email"
          value={email}
          maxLength={120}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="w-full bg-transparent font-display text-xl font-light text-ivory placeholder:text-muted-foreground/60 focus:outline-none md:text-2xl"
        />
        <button
          type="submit"
          className="btn-shape shrink-0 font-sans text-[10px] tracking-[0.3em] uppercase text-gold transition-colors hover:text-gold-light"
        >
          Subscribe &#8594;
        </button>
      </div>
      <p
        role="status"
        className="mt-4 font-sans text-xs leading-relaxed font-light text-muted-foreground"
      >
        {error ? (
          <span className="text-destructive">{error}</span>
        ) : done ? (
          "Thank you — a planner will add you personally."
        ) : (
          "Four or five letters a year. Written by hand, never sold, never shared."
        )}
      </p>
    </form>
  );
}
