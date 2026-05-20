import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICE_PILLARS, PROCESS_STEPS } from "@/data/services";
import aiDevelopmentImg from "@/assets/images/strategy/ai-development.png";
import generativeAiImg from "@/assets/images/strategy/generative-ai.png";
import agenticAiImg from "@/assets/images/strategy/agentic-ai.png";

const PILLAR_PHOTO: Record<string, string> = {
  "ai-development": aiDevelopmentImg,
  "generative-ai": generativeAiImg,
  "agentic-ai": agenticAiImg,
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
            <TiltCard
              key={pillar.id}
              className={`glass-card glow-card reveal reveal-delay-${(i % 4) + 1} relative flex flex-col overflow-hidden p-7`}
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
                {PILLAR_PHOTO[pillar.id] && (
                  <TiltImage
                    src={PILLAR_PHOTO[pillar.id]}
                    alt={pillar.title}
                  />
                )}
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
            </TiltCard>
          ))}
        </div>

        {/* Process band */}
        <div className="mt-24">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow">How we work</span>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">From idea to running system.</span>
            </h3>
            <p className="mt-4 text-base text-muted-foreground">
              Four phases. No detours. Production on schedule.
            </p>
          </div>

          {/* Desktop: connected flow */}
          <div className="relative mt-16 hidden lg:block">
            {/* Spine line */}
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[27px] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.72 0.18 250 / 0.7) 8%, oklch(0.72 0.18 250 / 0.7) 92%, transparent)",
              }}
              aria-hidden
            />
            {/* Chevron arrows between nodes */}
            {[25, 50, 75].map((pct) => (
              <div
                key={pct}
                className="pointer-events-none absolute top-[17px] z-20 -translate-x-1/2"
                style={{ left: `${pct}%` }}
                aria-hidden
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 6l6 4-6 4"
                    stroke="oklch(0.72 0.18 250 / 0.9)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}

            <div className="grid grid-cols-4">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className={`reveal reveal-delay-${i + 1} group flex flex-col items-center px-5`}
                >
                  {/* Step node */}
                  <div className="relative z-10 mb-5">
                    <div
                      className="flex h-[54px] w-[54px] items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "oklch(0.13 0.02 250)",
                        border: "1.5px solid oklch(0.72 0.18 250 / 0.6)",
                        boxShadow:
                          "0 0 0 5px oklch(0.72 0.18 250 / 0.07), inset 0 1px 0 oklch(1 0 0 / 0.06)",
                      }}
                    >
                      <span className="text-shimmer font-mono text-sm font-bold tracking-wide">
                        {step.n}
                      </span>
                    </div>
                    {/* Hover glow ring */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ boxShadow: "0 0 22px oklch(0.72 0.18 250 / 0.5)" }}
                      aria-hidden
                    />
                  </div>

                  {/* Vertical connector */}
                  <div
                    className="mb-4 w-px"
                    style={{
                      height: "28px",
                      background:
                        "linear-gradient(to bottom, oklch(0.72 0.18 250 / 0.55), transparent)",
                    }}
                    aria-hidden
                  />

                  {/* Card */}
                  <div className="glass-card w-full p-5 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_8px_28px_oklch(0.72_0.18_250_/_0.14)]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
                      Phase {step.n}
                    </span>
                    <h4 className="mt-1.5 text-base font-semibold tracking-tight">
                      {step.title}
                    </h4>
                    <div
                      className="mx-auto mt-2.5 h-px w-6 transition-all duration-300 group-hover:w-10"
                      style={{ background: "oklch(0.72 0.18 250 / 0.45)" }}
                      aria-hidden
                    />
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet grid */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`glass-card hover-lift reveal reveal-delay-${(i % 4) + 1} flex gap-4 p-5`}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "oklch(0.72 0.18 250 / 0.08)",
                    border: "1.5px solid oklch(0.72 0.18 250 / 0.5)",
                  }}
                >
                  <span className="text-shimmer font-mono text-xs font-bold">{step.n}</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold tracking-tight">{step.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const dx = (e.clientX - left - width / 2) / (width / 2);
    const dy = (e.clientY - top - height / 2) / (height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  const isResting = tilt.x === 0 && tilt.y === 0;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isResting ? "transform 0.7s cubic-bezier(0.22,1,0.36,1)" : "transform 0.12s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current?.closest("[style*='perspective']") as HTMLElement | null;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const dx = (e.clientX - left - width / 2) / (width / 2);
    const dy = (e.clientY - top - height / 2) / (height / 2);
    setOffset({ x: dx * -8, y: dy * -8 });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });
  const isResting = offset.x === 0 && offset.y === 0;

  return (
    <div
      ref={ref}
      className="mb-5 overflow-hidden rounded-xl border border-border"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-36 w-full object-cover"
        style={{
          transform: `scale(1.08) translate(${offset.x}px, ${offset.y}px)`,
          transition: isResting
            ? "transform 0.7s cubic-bezier(0.22,1,0.36,1)"
            : "transform 0.12s ease-out",
          willChange: "transform",
        }}
      />
    </div>
  );
}
