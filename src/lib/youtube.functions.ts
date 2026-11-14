import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { parseYouTubeId } from "./clip-config";

export type YouTubeMetadata =
  | {
      ok: true;
      id: string;
      title: string;
      channel: string;
      thumbnail: string;
      durationSeconds: number | null;
    }
  | { ok: false; error: string };

export const getYouTubeMetadata = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ url: z.string().trim().min(1).max(2048) }).parse(input))
  .handler(async ({ data }): Promise<YouTubeMetadata> => {
    const id = parseYouTubeId(data.url);
    if (!id) return { ok: false, error: "That doesn't look like a YouTube video link." };
    const watchUrl = `https://www.youtube.com/watch?v=${id}`;

    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`,
      );
      if (res.status === 401 || res.status === 403)
        return { ok: false, error: "This video is private or can't be embedded." };
      if (res.status === 404 || res.status === 400)
        return { ok: false, error: "We couldn't find that video. Check the link." };
      if (!res.ok) {
        console.error(`YouTube oEmbed failed [${res.status}]: ${await res.text()}`);
        return { ok: false, error: "YouTube didn't respond. Try again in a moment." };
      }
      const meta = (await res.json()) as { title?: string; author_name?: string };

      // Duration isn't part of oEmbed; read it from the public watch page when available.
      let durationSeconds: number | null = null;
      try {
        const page = await fetch(watchUrl, {
          headers: { "accept-language": "en-US,en;q=0.9" },
        });
        if (page.ok) {
          const m = (await page.text()).match(/"lengthSeconds":"(\d+)"/);
          if (m?.[1]) durationSeconds = Number(m[1]);
        }
      } catch (err) {
        console.error("YouTube duration lookup failed", err);
      }

      return {
        ok: true,
        id,
        title: meta.title ?? "Untitled video",
        channel: meta.author_name ?? "Unknown channel",
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        durationSeconds,
      };
    } catch (err) {
      console.error("YouTube metadata lookup failed", err);
      return { ok: false, error: "We couldn't reach YouTube. Try again in a moment." };
    }
  });
