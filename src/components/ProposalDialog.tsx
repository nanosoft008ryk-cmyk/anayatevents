import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";

import { site } from "@/content/site";
import { services } from "@/content/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Concierge proposal request.
 *
 * Static site, no backend: the form composes a formatted enquiry and hands it
 * to the guest's own mail client (mailto:) or WhatsApp. Both routes carry the
 * identical body so the studio receives the same brief either way.
 */

interface Fields {
  name: string;
  phone: string;
  occasion: string;
  date: string;
  guests: string;
  notes: string;
}

const EMPTY: Fields = {
  name: "",
  phone: "",
  occasion: "",
  date: "",
  guests: "",
  notes: "",
};

const MAX = { name: 100, phone: 30, date: 40, guests: 10, notes: 1000 };

function clean(value: string, max: number) {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, max);
}

function composeBody(f: Fields) {
  return [
    `Name: ${clean(f.name, MAX.name)}`,
    `Phone: ${clean(f.phone, MAX.phone)}`,
    `Occasion: ${clean(f.occasion, 120)}`,
    `Preferred date: ${clean(f.date, MAX.date) || "Not decided"}`,
    `Guests: ${clean(f.guests, MAX.guests) || "Not decided"}`,
    "",
    "Notes:",
    clean(f.notes, MAX.notes) || "—",
    "",
    `Sent from ${site.name} — ${site.tagline}`,
  ].join("\n");
}

const field =
  "w-full border-0 border-b border-border-strong/70 bg-transparent px-0 py-3 font-sans text-sm text-ivory placeholder:text-muted-foreground/70 transition-colors focus:border-gold focus:outline-none";
const label = "font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground";

export function ProposalDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<Fields>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));

  const valid = useMemo(
    () => clean(f.name, MAX.name).length > 1 && clean(f.phone, MAX.phone).length > 5,
    [f.name, f.phone],
  );

  const submit = (channel: "email" | "whatsapp") => (e: FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setError("Please add your name and a number we can reach you on.");
      return;
    }
    setError(null);
    const subject = `Proposal request — ${clean(f.occasion, 120) || "Celebration"}`;
    const body = composeBody(f);

    if (channel === "email" && site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(
        `${site.whatsappHref}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    setOpen(false);
    setF(EMPTY);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-h-[88vh] max-w-xl overflow-y-auto rounded-none border-[0.5px] border-gold/30 bg-[color-mix(in_oklab,var(--background)_94%,transparent)] p-8 backdrop-blur-xl md:p-10"
      >
        <DialogHeader className="space-y-3 text-left">
          <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
            Concierge
          </p>
          <DialogTitle className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
            Request a proposal
          </DialogTitle>
          <DialogDescription className="font-display text-base leading-relaxed font-light italic text-muted-foreground">
            Six lines is all we need to begin. A named planner replies {site.responseTime.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-8 space-y-6" onSubmit={submit(site.email ? "email" : "whatsapp")}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="pr-name">
                Name
              </label>
              <input
                id="pr-name"
                required
                maxLength={MAX.name}
                value={f.name}
                onChange={set("name")}
                className={field}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className={label} htmlFor="pr-phone">
                Phone
              </label>
              <input
                id="pr-phone"
                required
                type="tel"
                maxLength={MAX.phone}
                value={f.phone}
                onChange={set("phone")}
                className={field}
                placeholder="03xx xxxxxxx"
              />
            </div>
            <div>
              <label className={label} htmlFor="pr-occasion">
                Occasion
              </label>
              <select
                id="pr-occasion"
                value={f.occasion}
                onChange={set("occasion")}
                className={`${field} [&>option]:bg-background`}
              >
                <option value="">Select</option>
                {services.slice(0, 12).map((s) => (
                  <option key={s.slug} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Something else">Something else</option>
              </select>
            </div>
            <div>
              <label className={label} htmlFor="pr-date">
                Preferred date
              </label>
              <input
                id="pr-date"
                maxLength={MAX.date}
                value={f.date}
                onChange={set("date")}
                className={field}
                placeholder="December 2026"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="pr-guests">
                Guests
              </label>
              <input
                id="pr-guests"
                inputMode="numeric"
                maxLength={MAX.guests}
                value={f.guests}
                onChange={set("guests")}
                className={field}
                placeholder="400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="pr-notes">
                What are you imagining?
              </label>
              <textarea
                id="pr-notes"
                rows={3}
                maxLength={MAX.notes}
                value={f.notes}
                onChange={set("notes")}
                className={`${field} resize-none`}
                placeholder="Venue, functions, the feeling you want the evening to leave behind."
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="font-sans text-xs text-destructive">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            {site.email && (
              <button
                type="submit"
                className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 border-[0.5px] border-gold/50 bg-gold/10 px-6 py-3.5 font-sans text-[10px] tracking-[0.28em] uppercase text-gold transition-colors duration-500 hover:bg-gold/20"
              >
                <Mail className="size-4" strokeWidth={1.25} aria-hidden="true" />
                Send by email
              </button>
            )}
            <button
              type="button"
              onClick={submit("whatsapp")}
              className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 border-[0.5px] border-border-strong px-6 py-3.5 font-sans text-[10px] tracking-[0.28em] uppercase text-ivory/80 transition-colors duration-500 hover:border-gold/50 hover:text-gold"
            >
              <MessageCircle className="size-4" strokeWidth={1.25} aria-hidden="true" />
              Send on WhatsApp
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
