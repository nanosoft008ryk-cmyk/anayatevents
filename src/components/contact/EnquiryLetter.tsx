import { useMemo, useState, type FormEvent } from "react";

import { site } from "@/content/site";
import { services } from "@/content/services";

const occasions = [
  "Wedding week",
  "Mehndi / Mayoun",
  "Barat or Walima",
  "Nikah at home",
  "Corporate evening",
  "Private celebration",
];

/**
 * The enquiry letter. Not a form: a written note with underlined fields, sent
 * to a planner by WhatsApp (or email once an address is published).
 */
export function EnquiryLetter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(occasions[0]);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const serviceOptions = useMemo(() => services.map((s) => s.name), []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.trim().length < 7) {
      setError("A name and a number we can reach you on, please.");
      return;
    }
    setError(null);
    const body = [
      `Enquiry from ${name.trim()}`,
      `Contact: ${phone.trim()}`,
      `Occasion: ${occasion}`,
      date && `Date: ${date}`,
      guests && `Guests: ${guests}`,
      service && `Interested in: ${service}`,
      note.trim() && `Note: ${note.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Enquiry — ${occasion}`,
      )}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(
        `${site.whatsappHref}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    setSent(true);
  };

  const field =
    "w-full border-0 border-b border-border-strong/70 bg-transparent pb-3 font-display text-xl font-light text-ivory transition-colors placeholder:text-muted-foreground/55 focus:border-gold focus:outline-none md:text-2xl";
  const label = "font-sans text-[10px] tracking-[0.32em] uppercase text-muted-foreground";

  return (
    <form onSubmit={submit} className="space-y-12">
      <div className="grid gap-12 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className={label}>
            Your name
          </label>
          <input
            id="enq-name"
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ayesha Khan"
            className={`mt-4 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className={label}>
            Phone or WhatsApp
          </label>
          <input
            id="enq-phone"
            value={phone}
            maxLength={40}
            inputMode="tel"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0300 000 0000"
            className={`mt-4 ${field}`}
          />
        </div>
      </div>

      <div>
        <span className={label}>The occasion</span>
        <div className="mt-5 flex flex-wrap gap-3">
          {occasions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOccasion(o)}
              aria-pressed={occasion === o}
              className={`btn-shape border px-5 py-2.5 font-sans text-[10px] tracking-[0.22em] uppercase transition-colors ${
                occasion === o
                  ? "border-gold text-gold"
                  : "border-border-strong text-muted-foreground hover:border-gold/60 hover:text-ivory"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-date" className={label}>
            Date (or season)
          </label>
          <input
            id="enq-date"
            value={date}
            maxLength={60}
            onChange={(e) => setDate(e.target.value)}
            placeholder="December 2026"
            className={`mt-4 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="enq-guests" className={label}>
            Guests, roughly
          </label>
          <input
            id="enq-guests"
            value={guests}
            maxLength={20}
            inputMode="numeric"
            onChange={(e) => setGuests(e.target.value)}
            placeholder="400"
            className={`mt-4 ${field}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="enq-service" className={label}>
          What you have in mind
        </label>
        <select
          id="enq-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={`mt-4 ${field} appearance-none`}
        >
          <option value="">Not sure yet — advise us</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enq-note" className={label}>
          Anything else
        </label>
        <textarea
          id="enq-note"
          value={note}
          maxLength={800}
          rows={3}
          onChange={(e) => setNote(e.target.value)}
          placeholder="The feeling you want the evening to leave behind."
          className={`mt-4 ${field} resize-none leading-relaxed`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="btn-shape border border-gold bg-gold px-8 py-4 font-sans text-[11px] tracking-[0.26em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
        >
          Send the letter
        </button>
        <p role="status" className="font-sans text-xs font-light text-muted-foreground">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : sent ? (
            "Opening your message — a planner will reply personally."
          ) : (
            `A planner replies ${site.responseTime.toLowerCase()}.`
          )}
        </p>
      </div>
    </form>
  );
}
