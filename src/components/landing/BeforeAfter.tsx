import { ArrowRight } from "lucide-react";
import studio from "@/assets/podcast-studio.jpg";
import { SectionHeading } from "./SectionHeading";
import { VerticalClip } from "./VerticalClip";

export function BeforeAfter() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-night opacity-25" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Before & after"
          title="From an hour-long episode to a clip people finish."
          description="Smart cropping keeps the speaker in frame, and word-by-word captions highlight what matters."
        />
        <div className="mt-14 grid items-center gap-8 md:grid-cols-[1.6fr_auto_0.7fr]">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={studio}
                alt="Original widescreen podcast recording"
                width={1600}
                height={912}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-subtle-foreground">
              Before — 16:9, 58 minutes, no captions
            </figcaption>
          </figure>
          <ArrowRight className="mx-auto size-8 rotate-90 text-brand-orange md:rotate-0" />
          <figure className="mx-auto w-full max-w-[240px]">
            <VerticalClip
              focus="24% 40%"
              caption="The best advice I ever got"
              highlight="best advice"
              className="border-gradient-brand"
            />
            <figcaption className="mt-3 text-sm text-subtle-foreground">
              After — 9:16, 38 seconds, captioned
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
