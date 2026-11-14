import { Cpu, ShieldCheck, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const providers = ["OpenAI", "Google Gemini", "DeepSeek", "OpenRouter", "AgentRouter", "Hugging Face", "Ollama"];

const points = [
  { icon: Workflow, title: "Bring your own model", body: "Switch AI providers without changing how you work." },
  { icon: Cpu, title: "Local transcription", body: "Speech-to-text can run on your own machine." },
  { icon: ShieldCheck, title: "Keys stay private", body: "Provider credentials are stored securely, never shown in the browser." },
];

export function AiCapabilities() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-night p-8 sm:p-12">
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-electric-purple/40 blur-3xl" />
          <SectionHeading
            eyebrow="AI capabilities"
            title="Works with the AI you already use."
            className="relative mx-0 text-left"
          />
          <div className="relative mt-8 flex flex-wrap gap-2">
            {providers.map((p) => (
              <span key={p} className="rounded-full border border-foreground/15 bg-background/40 px-3.5 py-1.5 text-sm backdrop-blur">
                {p}
              </span>
            ))}
          </div>
          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title}>
                <p.icon className="size-5 text-brand-gold" />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
