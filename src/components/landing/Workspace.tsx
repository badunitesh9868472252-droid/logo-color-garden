import { Link2, Upload, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const settings = [
  { label: "Clip duration", options: ["15–30s", "30–45s", "45–60s", "60–90s"], active: 1 },
  { label: "Number of clips", options: ["3", "5", "10", "15"], active: 1 },
  { label: "Aspect ratio", options: ["9:16", "1:1", "16:9"], active: 0 },
];

export function Workspace() {
  return (
    <section id="workspace" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The workspace"
          title="Paste a link or drop a file. That's the whole setup."
          description="Choose how long your clips should be, how many you want and where they're going — ClipForge handles the rest."
        />
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            <div className="rounded-2xl border border-border bg-background/60 p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Link2 className="size-4 text-electric" /> YouTube URL
              </div>
              <div className="mt-3 flex h-11 items-center rounded-xl border border-input bg-card px-3 font-mono text-sm text-subtle-foreground">
                https://youtube.com/watch?v=…
              </div>
            </div>
            <div className="flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-subtle-foreground">
              or
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-subtle-foreground/40 bg-background/60 p-5 text-center">
              <Upload className="size-5 text-brand-orange" />
              <p className="mt-2 text-sm font-medium">Drop a video here</p>
              <p className="text-xs text-subtle-foreground">MP4, MOV or WebM</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {settings.map((s) => (
              <div key={s.label}>
                <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.options.map((o, i) => (
                    <span
                      key={o}
                      className={
                        i === s.active
                          ? "rounded-lg border-gradient-brand px-2.5 py-1 text-xs font-semibold text-foreground"
                          : "rounded-lg border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground"
                      }
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-sm text-subtle-foreground">
              Subtitles on · Modern Captions · Smart cropping
            </p>
            <Button variant="brand" size="lg" className="rounded-xl" disabled aria-disabled="true">
              <Wand2 /> Generate Clips
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
