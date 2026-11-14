/** Rules for the Create Clips workspace. Pure functions — shared by UI and server. */

export const MAX_UPLOAD_MB = 2048;
export const ACCEPTED_EXTENSIONS = ["mp4", "mov", "webm"] as const;
export const ACCEPTED_MIME = ["video/mp4", "video/quicktime", "video/webm"] as const;

export const CUSTOM_DURATION_MIN = 10;
export const CUSTOM_DURATION_MAX = 180;
export const CUSTOM_CLIPS_MIN = 1;
export const CUSTOM_CLIPS_MAX = 30;

export const DURATION_PRESETS = [
  { id: "15-30", label: "15–30s", min: 15, max: 30 },
  { id: "30-45", label: "30–45s", min: 30, max: 45 },
  { id: "45-60", label: "45–60s", min: 45, max: 60 },
  { id: "60-90", label: "60–90s", min: 60, max: 90 },
] as const;

export const CLIP_COUNT_PRESETS = [3, 5, 10, 15] as const;
export const ASPECT_RATIOS = ["9:16", "1:1", "16:9"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

/** Returns the 11-character video id for a YouTube URL, or null if it isn't one. */
export function parseYouTubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw || raw.length > 2048) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.replace(/^(www\.|m\.|music\.)/, "");
  let id: string | null = null;
  if (host === "youtu.be") {
    id = url.pathname.split("/")[1] ?? null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") id = url.searchParams.get("v");
    else {
      const m = url.pathname.match(/^\/(shorts|embed|live|v)\/([^/?#]+)/);
      id = m?.[2] ?? null;
    }
  }
  return id && YT_ID.test(id) ? id : null;
}

export function validateVideoFile(file: { name: string; size: number; type: string }): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const extOk = (ACCEPTED_EXTENSIONS as readonly string[]).includes(ext);
  const mimeOk = !file.type || (ACCEPTED_MIME as readonly string[]).includes(file.type);
  if (!extOk || !mimeOk) return "Only MP4, MOV or WebM videos are supported.";
  if (file.size <= 0) return "This file is empty.";
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) return `Files must be ${MAX_UPLOAD_MB / 1024} GB or smaller.`;
  return null;
}

export function validateCustomDuration(seconds: number): string | null {
  if (!Number.isInteger(seconds) || seconds < CUSTOM_DURATION_MIN || seconds > CUSTOM_DURATION_MAX)
    return `Enter a whole number between ${CUSTOM_DURATION_MIN} and ${CUSTOM_DURATION_MAX} seconds.`;
  return null;
}

export function validateClipCount(count: number): string | null {
  if (!Number.isInteger(count) || count < CUSTOM_CLIPS_MIN || count > CUSTOM_CLIPS_MAX)
    return `Enter a whole number between ${CUSTOM_CLIPS_MIN} and ${CUSTOM_CLIPS_MAX}.`;
  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}
