import { Crop, Image, Mic, Subtitles, TrendingUp, Users, VolumeX, FileText } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  { icon: TrendingUp, title: "Highlight detection", body: "AI scores every segment for hook, clarity and payoff, then ranks the best." },
  { icon: Crop, title: "Smart cropping", body: "Reframes landscape footage to 9:16 or 1:1 while keeping faces in view." },
  { icon: Subtitles, title: "Automatic subtitles", body: "Accurate word-timed captions with keyword highlighting and templates." },
  { icon: Users, title: "Speaker tracking", body: "Follows whoever is talking so multi-person shows stay watchable." },
  { icon: VolumeX, title: "Silence removal", body: "Trims dead air and long pauses for tighter pacing." },
  { icon: Mic, title: "Complete sentences", body: "Clips start and end on natural boundaries — no cut-off thoughts." },
  { icon: Image, title: "Thumbnails", body: "Picks a strong frame from each clip to use as its cover." },
  { icon: FileText, title: "Clip descriptions", body: "Drafts titles and descriptions you can edit before posting." },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Core features"
          title="Everything an editor does, done for you."
          description="Each step of the short-form workflow, automated and adjustable."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group bg-card p-6 transition-colors hover:bg-elevated">
              <span className="flex size-10 items-center justify-center rounded-xl bg-elevated transition-colors group-hover:bg-gradient-brand">
                <f.icon className="size-5 text-brand-orange transition-colors group-hover:text-foreground" />
              </span>
              <h3 className="mt-5 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
