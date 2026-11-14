import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sidebar">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
        <Logo />
        <p className="text-sm text-subtle-foreground">
          Your videos. Your best moments. Automatically clipped by AI.
        </p>
        <p className="text-xs text-subtle-foreground">© {new Date().getFullYear()} ClipForge AI</p>
      </div>
    </footer>
  );
}
