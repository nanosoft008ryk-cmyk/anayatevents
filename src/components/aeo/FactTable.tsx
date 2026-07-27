import { Reveal } from "@/components/motion/Reveal";

/**
 * A genuine data table — used only where a label/value comparison is the
 * clearest way to state facts. Row headers are marked with scope="row" so the
 * relationship survives being read by a screen reader or a language model.
 */
export function FactTable({
  caption,
  rows,
  className = "",
}: {
  caption: string;
  rows: { label: string; value: string }[];
  className?: string;
}) {
  if (rows.length === 0) return null;

  return (
    <section className={`relative py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <Reveal variant="fade">
          <table className="w-full border-collapse text-left">
            <caption className="mb-8 text-left font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              {caption}
            </caption>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-ivory/10 align-top">
                  <th
                    scope="row"
                    className="w-full max-w-xs py-5 pr-8 font-sans text-[11px] font-normal tracking-[0.24em] uppercase text-ivory/50 sm:w-1/3"
                  >
                    {row.label}
                  </th>
                  <td className="py-5 font-sans text-[15px] leading-[1.9] font-light text-ivory/80">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
