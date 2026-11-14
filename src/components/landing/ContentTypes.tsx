import { SectionHeading } from "./SectionHeading";

const types = [
  "Podcasts", "Interviews", "Livestreams", "Gaming", "Tutorials", "Lectures",
  "Webinars", "Vlogs", "Coaching calls", "Talks & keynotes", "Product demos", "Commentary",
];

export function ContentTypes() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <SectionHeading eyebrow="Supported content" title="Built for talking, teaching and playing." />
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {types.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
