import { ArrowRight, Scissors, Sparkles } from "lucide-react";
import studio from "@/assets/podcast-studio.jpg";
import { Button } from "@/components/ui/button";
import { VerticalClip } from "./VerticalClip";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-aura" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-brand-gold" />
            Your videos. Your best moments. Automatically clipped by AI.
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Turn Long Videos Into <span className="text-gradient-brand">Viral-Ready Shorts.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
            Let AI discover your best moments, automatically create short-form videos, add
            beautiful subtitles, and prepare content for your social channels.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="brand" size="xl">
              <a href="#workspace">
                Start Creating <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </div>

        {/* Product demonstration: landscape source → vertical clips */}
        <div className="relative mx-auto mt-16 grid max-w-5xl items-center gap-6 lg:grid-cols-[1.35fr_auto_1fr]">
          <div className="relative rounded-3xl border border-border bg-card p-2 shadow-electric">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <img
                src={studio}
                alt="Two podcast hosts talking in a studio, the original landscape video"
                width={1600}
                height={912}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-y-0 w-0.5 bg-gradient-brand shadow-brand animate-scan" />
              <span className="absolute top-3 left-3 rounded-md bg-background/75 px-2 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
                Original · 16:9 · 58:12
              </span>
            </div>
            <div className="mt-2 flex h-8 items-end gap-[3px] px-1" aria-hidden="true">
              {Array.from({ length: 64 }).map((_, i) => {
                const h = 20 + ((i * 37) % 70);
                const hot = (i > 10 && i < 16) || (i > 30 && i < 36) || (i > 48 && i < 53);
                return (
                  <span
                    key={i}
                    className={hot ? "flex-1 rounded-sm bg-gradient-brand" : "flex-1 rounded-sm bg-elevated"}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <span className="flex size-12 items-center justify-center rounded-full bg-gradient-brand shadow-brand">
              <Scissors className="size-5 text-foreground" />
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <VerticalClip
              focus="24% 40%"
              caption="This changed everything for us"
              highlight="everything"
              score={96}
              duration="0:42"
              className="animate-float"
            />
            <VerticalClip
              focus="76% 40%"
              caption="Nobody talks about this part"
              highlight="this part"
              score={91}
              duration="0:31"
              className="mt-8 animate-float [animation-delay:-2s]"
            />
            <VerticalClip
              focus="50% 40%"
              caption="Here's the real secret"
              highlight="real secret"
              score={88}
              duration="0:55"
              className="animate-float [animation-delay:-4s]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
