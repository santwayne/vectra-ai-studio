import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICE_PILLARS, PROCESS_STEPS } from "@/data/services";
import {
  AIDevelopmentArt,
  GenerativeAIArt,
  AgenticAIArt,
} from "@/components/illustrations/PillarArt";

const PILLAR_ART: Record<string, React.FC<{ accent?: string; className?: string }>> = {
  "ai-development": AIDevelopmentArt,
  "generative-ai": GenerativeAIArt,
  "agentic-ai": AgenticAIArt,
};

/**
 * Three-pillar services showcase for the homepage:
 * AI Development · Generative AI · Agentic AI
 *
 * Each pillar renders as a glass-card column with sub-service rows.
 * Mirrors the pattern used by leading AI-dev agencies (LeewayHertz, Markovate).
 */
export function ServicesShowcase() {
  return (
    <section id="services" className="section relative overflow-hidden">
      {/* Background ambience */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.72 0.18 250 / 0.25), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container-wide relative">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="eyebrow">What we build</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">
              Three pillars. One AI engineering partner.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From applied ML to autonomous agents, NeuronX designs and ships the
            full AI stack your business needs.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {SERVICE_PILLARS.map((pillar, i) => (
            <div
              key={pillar.id}
              className={`glass-card glow-card hover-lift reveal reveal-delay-${(i % 4) + 1} relative flex flex-col overflow-hidden p-7`}
            >
              {/* Accent glow */}
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30"
                style={{
                  background: `radial-gradient(circle, ${pillar.accent} 0%, transparent 70%)`,
                  filter: "blur(50px)",
                }}
                aria-hidden
              />

              <div className="relative">
                {(() => {
                  const Art = PILLAR_ART[pillar.id];
                  return Art ? (
                    <div className="mb-5 overflow-hidden rounded-xl border border-border bg-surface/40">
                      <Art accent={pillar.accent} className="h-32 w-full" />
                    </div>
                  ) : null;
                })()}
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.intro}
                </p>

                <ul className="mt-6 space-y-1">
                  {pillar.services.map((s) => (
                    <li
                      key={s.title}
                      className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-border hover:bg-surface/60"
                    >
                      <div
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-border"
                        style={{
                          background: `${pillar.accent.replace(")", " / 0.12)")}`,
                          color: pillar.accent,
                        }}
                      >
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-tight">
                          {s.title}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-7 border-t border-border pt-5">
                <Link
                  to="/solutions"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  Explore {pillar.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Process band */}
        <div className="mt-24">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow">How we work</span>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">From idea to running system.</span>
            </h3>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`glass-card hover-lift reveal reveal-delay-${(i % 4) + 1} relative p-6`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-shimmer text-3xl font-semibold">
                    {step.n}
                  </span>
                  <span className="h-px w-10 bg-border" />
                </div>
                <h4 className="mt-4 text-lg font-semibold tracking-tight">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
