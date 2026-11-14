import { createFileRoute } from "@tanstack/react-router";
import { AiCapabilities } from "@/components/landing/AiCapabilities";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { ContentTypes } from "@/components/landing/ContentTypes";
import { EditingStyles } from "@/components/landing/EditingStyles";
import { Faq } from "@/components/landing/Faq";
import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Workspace } from "@/components/landing/Workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClipForge AI — Turn Long Videos Into Shorts" },
      {
        name: "description",
        content:
          "ClipForge AI finds your best moments, crops them to vertical, adds subtitles and turns one long video into multiple shorts.",
      },
      { property: "og:title", content: "ClipForge AI — Turn Long Videos Into Shorts" },
      {
        property: "og:description",
        content: "Your videos. Your best moments. Automatically clipped by AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      <main>
        <Hero />
        <Workspace />
        <BeforeAfter />
        <HowItWorks />
        <Features />
        <AiCapabilities />
        <EditingStyles />
        <ContentTypes />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
