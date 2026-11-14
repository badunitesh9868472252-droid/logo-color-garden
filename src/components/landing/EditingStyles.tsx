import { SectionHeading } from "./SectionHeading";

const styles = [
  { name: "Minimal", sample: <span className="text-sm font-medium">simple and clean</span> },
  {
    name: "Modern Captions",
    sample: (
      <span className="text-base font-extrabold uppercase">
        make it <span className="text-brand-gold">pop</span>
      </span>
    ),
  },
  {
    name: "Dynamic Highlight",
    sample: (
      <span className="text-base font-extrabold uppercase">
        every <span className="rounded bg-gradient-brand px-1.5">word</span> lands
      </span>
    ),
  },
  {
    name: "Podcast Style",
    sample: (
      <span className="rounded-lg bg-background/80 px-3 py-1.5 text-sm font-semibold">
        “That's the whole point.”
      </span>
    ),
  },
  {
    name: "Gaming Style",
    sample: (
      <span className="text-lg font-black uppercase italic text-brand-gold [text-shadow:0_0_14px_var(--brand-red)]">
        clutch!!
      </span>
    ),
  },
  {
    name: "Educational Style",
    sample: (
      <span className="text-sm font-semibold">
        Step 1: <span className="text-electric">define the problem</span>
      </span>
    ),
  },
];

export function EditingStyles() {
  return (
    <section id="styles" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Editing styles"
          title="A caption style for every kind of channel."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {styles.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="flex h-32 items-center justify-center bg-gradient-night/60 bg-aura px-4 text-center text-foreground">
                {s.sample}
              </div>
              <p className="border-t border-border px-4 py-3 text-sm font-medium">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
