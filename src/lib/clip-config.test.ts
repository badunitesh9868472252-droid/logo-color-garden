import { describe, expect, it } from "vitest";
import {
  parseYouTubeId,
  validateClipCount,
  validateCustomDuration,
  validateVideoFile,
} from "./clip-config";

describe("parseYouTubeId", () => {
  it("reads watch, short-link, shorts and mobile URLs", () => {
    expect(parseYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("https://youtu.be/dQw4w9WgXcQ?t=10")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("https://m.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });
  it("rejects non-YouTube links and malformed ids", () => {
    expect(parseYouTubeId("https://vimeo.com/123456")).toBeNull();
    expect(parseYouTubeId("https://youtube.com/watch?v=short")).toBeNull();
    expect(parseYouTubeId("not a url")).toBeNull();
  });
});

describe("validateVideoFile", () => {
  const mb = 1024 * 1024;
  it("accepts MP4, MOV and WebM", () => {
    expect(validateVideoFile({ name: "a.mp4", size: mb, type: "video/mp4" })).toBeNull();
    expect(validateVideoFile({ name: "a.MOV", size: mb, type: "video/quicktime" })).toBeNull();
    expect(validateVideoFile({ name: "a.webm", size: mb, type: "video/webm" })).toBeNull();
  });
  it("rejects other formats", () => {
    expect(validateVideoFile({ name: "a.avi", size: mb, type: "video/x-msvideo" })).not.toBeNull();
  });
  it("allows up to 2048 MB and rejects larger files", () => {
    expect(validateVideoFile({ name: "a.mp4", size: 2048 * mb, type: "video/mp4" })).toBeNull();
    expect(validateVideoFile({ name: "a.mp4", size: 2048 * mb + 1, type: "video/mp4" })).not.toBeNull();
  });
});

describe("custom values", () => {
  it("custom duration must be 10–180 seconds", () => {
    expect(validateCustomDuration(10)).toBeNull();
    expect(validateCustomDuration(180)).toBeNull();
    expect(validateCustomDuration(9)).not.toBeNull();
    expect(validateCustomDuration(181)).not.toBeNull();
  });
  it("custom clip count must be 1–30", () => {
    expect(validateClipCount(1)).toBeNull();
    expect(validateClipCount(30)).toBeNull();
    expect(validateClipCount(0)).not.toBeNull();
    expect(validateClipCount(31)).not.toBeNull();
  });
});
