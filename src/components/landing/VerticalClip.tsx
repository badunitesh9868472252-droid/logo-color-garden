import studio from "@/assets/podcast-studio.jpg";
import { cn } from "@/lib/utils";

/** A 9:16 crop of the source frame with burned-in style captions. */
export function VerticalClip({
  focus,
  caption,
  highlight,
  score,
  duration,
  className,
}: {
  focus: string;
  caption: string;
  highlight: string;
  score?: number;
  duration?: string;
  className?: string;
}) {
  const [before, after] = caption.split(highlight);
  return (
    <div
      className={cn(
        "relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-card shadow-card",
        className,
      )}
    >
      <img
        src={studio}
        alt=""
        aria-hidden="true"
        width={1600}
        height={912}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: focus }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30" />
      {(score || duration) && (
        <div className="absolute inset-x-2 top-2 flex items-center justify-between text-[10px] font-semibold">
          {score ? (
            <span className="rounded-full bg-gradient-brand px-2 py-0.5 text-foreground">{score}</span>
          ) : (
            <span />
          )}
          {duration && (
            <span className="rounded-full bg-background/70 px-2 py-0.5 font-mono text-foreground backdrop-blur">
              {duration}
            </span>
          )}
        </div>
      )}
      <p className="absolute inset-x-3 bottom-[18%] text-center text-[13px] font-extrabold uppercase leading-tight tracking-tight text-foreground [text-shadow:0_2px_8px_oklch(0_0_0/80%)] sm:text-sm">
        {before}
        <span className="text-brand-gold">{highlight}</span>
        {after}
      </p>
    </div>
  );
}
