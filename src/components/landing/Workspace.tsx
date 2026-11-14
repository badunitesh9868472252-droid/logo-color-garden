import { useEffect, useId, useRef, useState, type DragEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Film, Link2, Loader2, Upload, Wand2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  ASPECT_RATIOS,
  CLIP_COUNT_PRESETS,
  CUSTOM_CLIPS_MAX,
  CUSTOM_CLIPS_MIN,
  CUSTOM_DURATION_MAX,
  CUSTOM_DURATION_MIN,
  DURATION_PRESETS,
  formatBytes,
  formatDuration,
  parseYouTubeId,
  validateClipCount,
  validateCustomDuration,
  validateVideoFile,
  type AspectRatio,
} from "@/lib/clip-config";
import { getYouTubeMetadata, type YouTubeMetadata } from "@/lib/youtube.functions";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

type YtState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; meta: Extract<YouTubeMetadata, { ok: true }> };

type LocalVideo = { file: File; url: string; duration: number | null; width: number; height: number };

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-gradient-brand font-semibold text-foreground"
          : "border border-border bg-background/60 text-muted-foreground hover:border-subtle-foreground/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function Workspace() {
  const fetchMeta = useServerFn(getYouTubeMetadata);
  const fileInput = useRef<HTMLInputElement>(null);
  const ids = { url: useId(), dur: useId(), clips: useId(), subs: useId() };

  const [url, setUrl] = useState("");
  const [yt, setYt] = useState<YtState>({ status: "idle" });
  const [video, setVideo] = useState<LocalVideo | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const [duration, setDuration] = useState<string>("30-45");
  const [customDuration, setCustomDuration] = useState("75");
  const [clipCount, setClipCount] = useState<number | "custom">(5);
  const [customClips, setCustomClips] = useState("8");
  const [aspect, setAspect] = useState<AspectRatio>("9:16");
  const [subtitles, setSubtitles] = useState(true);

  // Release the local preview URL when the file changes or the section unmounts.
  useEffect(() => () => { if (video) URL.revokeObjectURL(video.url); }, [video]);

  // Look up YouTube details shortly after the user stops typing.
  useEffect(() => {
    if (!url.trim()) return setYt({ status: "idle" });
    if (!parseYouTubeId(url)) return setYt({ status: "error", error: "Paste a full YouTube video link." });
    let cancelled = false;
    setYt({ status: "loading" });
    const t = setTimeout(async () => {
      try {
        const res = await fetchMeta({ data: { url } });
        if (cancelled) return;
        setYt(res.ok ? { status: "ready", meta: res } : { status: "error", error: res.error });
      } catch {
        if (!cancelled) setYt({ status: "error", error: "We couldn't reach YouTube. Try again." });
      }
    }, 450);
    return () => { cancelled = true; clearTimeout(t); };
  }, [url, fetchMeta]);

  function pickFile(file: File | undefined) {
    if (!file) return;
    const err = validateVideoFile(file);
    if (err) { setFileError(err); return; }
    setFileError(null);
    setUrl("");
    setVideo({ file, url: URL.createObjectURL(file), duration: null, width: 0, height: 0 });
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  }

  const durationError = duration === "custom" ? validateCustomDuration(Number(customDuration)) : null;
  const clipsError = clipCount === "custom" ? validateClipCount(Number(customClips)) : null;
  const hasSource = yt.status === "ready" || !!video;

  function generate() {
    if (!hasSource) return toast.error("Add a YouTube link or upload a video first.");
    if (durationError || clipsError) return toast.error("Fix the highlighted settings first.");
    const durLabel =
      duration === "custom" ? `${customDuration}s` : DURATION_PRESETS.find((d) => d.id === duration)?.label;
    const count = clipCount === "custom" ? customClips : clipCount;
    toast.success("Settings ready", {
      description: `${count} clips · ${durLabel} · ${aspect}${subtitles ? " · subtitles" : ""}. The clip-making engine isn't connected yet, so nothing will be processed.`,
    });
  }

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
            {/* YouTube URL */}
            <div className={cn("rounded-2xl border bg-background/60 p-5", yt.status === "ready" ? "border-electric/60" : "border-border")}>
              <label htmlFor={ids.url} className="flex items-center gap-2 text-sm font-medium">
                <Link2 className="size-4 text-electric" /> YouTube URL
              </label>
              <div className="relative mt-3">
                <input
                  id={ids.url}
                  type="url"
                  inputMode="url"
                  value={url}
                  maxLength={2048}
                  disabled={!!video}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=…"
                  aria-invalid={yt.status === "error"}
                  className="h-11 w-full rounded-xl border border-input bg-card px-3 pr-9 font-mono text-sm text-foreground placeholder:text-subtle-foreground focus:border-electric focus:outline-none disabled:opacity-50"
                />
                {url && (
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    aria-label="Clear link"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-subtle-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              {yt.status === "loading" && (
                <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" /> Looking up video…
                </p>
              )}
              {yt.status === "error" && <p className="mt-3 text-xs text-destructive">{yt.error}</p>}
              {yt.status === "ready" && (
                <div className="mt-3 flex gap-3">
                  <img
                    src={yt.meta.thumbnail}
                    alt=""
                    width={96}
                    height={54}
                    className="aspect-video w-24 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 text-xs">
                    <p className="line-clamp-2 font-medium text-foreground">{yt.meta.title}</p>
                    <p className="mt-1 truncate text-muted-foreground">{yt.meta.channel}</p>
                    {yt.meta.durationSeconds != null && (
                      <p className="mt-0.5 font-mono text-subtle-foreground">{formatDuration(yt.meta.durationSeconds)}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-subtle-foreground">
              or
            </div>

            {/* Local upload */}
            {video ? (
              <div className="rounded-2xl border border-electric/60 bg-background/60 p-4">
                <video
                  src={video.url}
                  controls
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    setVideo((cur) =>
                      cur && { ...cur, duration: Number.isFinite(v.duration) ? v.duration : null, width: v.videoWidth, height: v.videoHeight },
                    );
                  }}
                  onError={() => setFileError("This video can't be played in your browser — it may be damaged or use an unsupported codec.")}
                  className="aspect-video w-full rounded-lg bg-background object-contain"
                />
                <div className="mt-3 flex items-start justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate font-medium text-foreground">
                      <Film className="size-3.5 shrink-0 text-brand-orange" /> {video.file.name}
                    </p>
                    <p className="mt-1 font-mono text-subtle-foreground">
                      {formatBytes(video.file.size)}
                      {video.duration != null && ` · ${formatDuration(video.duration)}`}
                      {video.width > 0 && ` · ${video.width}×${video.height}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setVideo(null); setFileError(null); }}
                    aria-label="Remove video"
                    className="rounded p-1 text-subtle-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                {fileError && <p className="mt-2 text-xs text-destructive">{fileError}</p>}
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInput.current?.click()}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), fileInput.current?.click())}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed bg-background/60 p-5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  dragging ? "border-brand-orange bg-elevated" : "border-subtle-foreground/40 hover:border-brand-orange/70 hover:bg-elevated/60",
                )}
              >
                <Upload className="size-5 text-brand-orange" />
                <p className="mt-2 text-sm font-medium">Drop a video here or <span className="text-brand-orange underline underline-offset-2">browse</span></p>
                <p className="text-xs text-subtle-foreground">MP4, MOV or WebM · up to 2 GB</p>
                {fileError && <p className="mt-2 text-xs text-destructive">{fileError}</p>}
                <input
                  ref={fileInput}
                  type="file"
                  accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
                  className="hidden"
                  onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ""; }}
                />
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <p id={ids.dur} className="text-xs font-medium text-muted-foreground">Clip duration</p>
              <div role="radiogroup" aria-labelledby={ids.dur} className="mt-2 flex flex-wrap gap-1.5">
                {DURATION_PRESETS.map((d) => (
                  <Chip key={d.id} active={duration === d.id} onClick={() => setDuration(d.id)}>{d.label}</Chip>
                ))}
                <Chip active={duration === "custom"} onClick={() => setDuration("custom")}>Custom</Chip>
              </div>
              {duration === "custom" && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={CUSTOM_DURATION_MIN}
                      max={CUSTOM_DURATION_MAX}
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      aria-label="Custom clip duration in seconds"
                      aria-invalid={!!durationError}
                      className="h-8 w-20 rounded-lg border border-input bg-background/60 px-2 text-xs text-foreground focus:border-electric focus:outline-none"
                    />
                    <span className="text-xs text-subtle-foreground">seconds</span>
                  </div>
                  {durationError && <p className="mt-1 text-xs text-destructive">{durationError}</p>}
                </div>
              )}
            </div>

            <div>
              <p id={ids.clips} className="text-xs font-medium text-muted-foreground">Number of clips</p>
              <div role="radiogroup" aria-labelledby={ids.clips} className="mt-2 flex flex-wrap gap-1.5">
                {CLIP_COUNT_PRESETS.map((n) => (
                  <Chip key={n} active={clipCount === n} onClick={() => setClipCount(n)}>{n}</Chip>
                ))}
                <Chip active={clipCount === "custom"} onClick={() => setClipCount("custom")}>Custom</Chip>
              </div>
              {clipCount === "custom" && (
                <div className="mt-2">
                  <input
                    type="number"
                    min={CUSTOM_CLIPS_MIN}
                    max={CUSTOM_CLIPS_MAX}
                    value={customClips}
                    onChange={(e) => setCustomClips(e.target.value)}
                    aria-label="Custom number of clips"
                    aria-invalid={!!clipsError}
                    className="h-8 w-20 rounded-lg border border-input bg-background/60 px-2 text-xs text-foreground focus:border-electric focus:outline-none"
                  />
                  {clipsError && <p className="mt-1 text-xs text-destructive">{clipsError}</p>}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">Aspect ratio</p>
              <div role="radiogroup" aria-label="Aspect ratio" className="mt-2 flex flex-wrap gap-1.5">
                {ASPECT_RATIOS.map((a) => (
                  <Chip key={a} active={aspect === a} onClick={() => setAspect(a)}>{a}</Chip>
                ))}
              </div>
              <div className="mt-3 flex h-12 items-end gap-2" aria-hidden="true">
                <span
                  className="rounded-md border-gradient-brand transition-all"
                  style={{ height: aspect === "16:9" ? 27 : 48, width: aspect === "9:16" ? 27 : 48 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <label htmlFor={ids.subs} className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
              <Switch id={ids.subs} checked={subtitles} onCheckedChange={setSubtitles} />
              Automatic subtitles
            </label>
            <div className="flex items-center gap-3">
              {hasSource && (
                <span className="flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 className="size-4" /> Video added
                </span>
              )}
              <Button variant="brand" size="lg" className="rounded-xl" onClick={generate}>
                <Wand2 /> Generate Clips
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
