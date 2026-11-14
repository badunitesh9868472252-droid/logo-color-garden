import { ArrowRight } from "lucide-react";
import logoAsset from "@/assets/clipforge-logo.png.asset.json";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-10 rounded-3xl border-gradient-brand p-8 sm:p-12 md:grid-cols-[auto_1fr]">
          <img
            src={logoAsset.url}
            alt="ClipForge AI logo"
            width={1254}
            height={1254}
            loading="lazy"
            className="mx-auto w-48 rounded-[2rem] shadow-electric sm:w-56"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Turn any video into multiple shorts — <span className="text-gradient-brand">in one click.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Stop scrubbing timelines. Let ClipForge find the moments worth sharing.
            </p>
            <Button asChild variant="brand" size="xl" className="mt-8">
              <a href="#workspace">
                Start Creating <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
