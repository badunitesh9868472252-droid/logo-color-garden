import markAsset from "@/assets/clipforge-mark.png.asset.json";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={markAsset.url}
      alt=""
      aria-hidden="true"
      width={400}
      height={295}
      className={cn("h-7 w-auto select-none", className)}
    />
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="text-lg font-bold tracking-tight text-foreground">
        ClipForge <span className="text-gradient-brand">AI</span>
      </span>
    </span>
  );
}
