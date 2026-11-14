import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  { q: "What videos can I use?", a: "Your own uploads in MP4, MOV or WebM, or public YouTube videos you have the right to download and reuse." },
  { q: "Will my clips go viral?", a: "No tool can promise that. ClipForge finds strong, self-contained moments and edits them well — the rest is up to your content and audience." },
  { q: "How long does processing take?", a: "It depends on the video length and your computer. You can follow every step live in the processing monitor." },
  { q: "Can I edit clips afterwards?", a: "Yes. Adjust the start and end, captions, styling and crop before exporting." },
  { q: "Which AI do I need?", a: "Connect any supported provider, or run a local model with Ollama." },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
