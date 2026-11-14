import { Clapperboard, Download, Link2, ScanSearch } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { icon: Link2, title: "Add your video", body: "Paste a YouTube link or upload a file from your computer." },
  { icon: ScanSearch, title: "AI finds the moments", body: "The transcript is analysed to rank the strongest, self-contained segments." },
  { icon: Clapperboard, title: "Clips are edited", body: "Each moment is cropped to vertical, trimmed cleanly and captioned." },
  { icon: Download, title: "Review & export", body: "Fine-tune any clip in the editor, then download it ready to post." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="How it works" title="Four steps, one click." />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="font-mono text-xs text-subtle-foreground">0{i + 1}</span>
              <s.icon className="mt-4 size-6 text-brand-orange" />
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
