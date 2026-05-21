import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Cpu, MessageSquare, TrendingUp, Database, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import {
  ALL_CAPABILITIES,
  deriveCapabilities,
  uniqueIndustries,
  type Capability,
} from "@/lib/case-capabilities";
import { CaseStudyArt } from "@/components/illustrations/CaseStudyArt";

const CARD_WIDTH = 360; // px per card
const CARD_GAP   = 20;  // px gap between cards

export function CaseStudiesCarousel() {
  const [industry,   setIndustry]   = useState<string | null>(null);
  const [capability, setCapability] = useState<Capability | null>(null);
  const [canPrev,    setCanPrev]    = useState(false);
  const [canNext,    setCanNext]    = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const industries = useMemo(() => uniqueIndustries(caseStudies), []);

  const enriched = useMemo(
    () => caseStudies.map((s) => ({ ...s, capabilities: deriveCapabilities(s) })),
    []
  );

  const filtered = useMemo(() => {
    return enriched.filter((s) => {
      if (industry   && s.industry !== industry) return false;
      if (capability && !s.capabilities.includes(capability)) return false;
      return true;
    });
  }, [enriched, industry, capability]);

  // Reset scroll when filter changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "instant" });
    updateArrows();
  }, [filtered]);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const slide = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP), behavior: "smooth" });
  };

  const countFor = (ind: string | null) =>
    ind === null ? enriched.length : enriched.filter((s) => s.industry === ind).length;

  return (
    <section className="section relative overflow-hidden">
      <div className="container-wide">

        {/* Header row */}
        <div className="flex items-end justify-between gap-4 reveal">
          <div className="max-w-2xl">
            <span className="eyebrow">Case studies</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="text-gradient">Production AI, shipping outcomes.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse by industry or filter by AI capability to find work that mirrors your roadmap.
            </p>
          </div>

          {/* Prev / Next arrows */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              onClick={() => slide("left")}
              disabled={!canPrev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-all hover:border-primary/50 hover:bg-surface-elevated disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => slide("right")}
              disabled={!canNext}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-all hover:border-primary/50 hover:bg-surface-elevated disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Industry tab bar */}
        <div className="reveal mt-10">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" aria-hidden />
            <div className="flex overflow-x-auto border-b border-border" style={{ scrollbarWidth: "none" }}>
              {[null, ...industries].map((ind) => {
                const active = industry === ind;
                return (
                  <button
                    key={ind ?? "__all__"}
                    type="button"
                    onClick={() => setIndustry(ind)}
                    className={`relative shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                    }`}
                  >
                    {ind ?? "All"}
                    <span className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] tabular-nums ${
                      active ? "bg-primary/15 text-primary" : "bg-surface text-muted-foreground/50"
                    }`}>
                      {countFor(ind)}
                    </span>
                    {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capability chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
              <Cpu className="h-3 w-3" /> Capability
            </span>
            <CapChip active={capability === null} onClick={() => setCapability(null)}>All</CapChip>
            {(ALL_CAPABILITIES as readonly string[]).map((opt) => {
              const Icon = CAPABILITY_ICONS[opt as Capability];
              return (
                <CapChip
                  key={opt}
                  active={capability === opt}
                  onClick={() => setCapability(capability === opt ? null : (opt as Capability))}
                  icon={Icon}
                >
                  {opt}
                </CapChip>
              );
            })}
            <span className="ml-auto shrink-0 font-mono text-xs tabular-nums text-muted-foreground/40">
              {filtered.length} {filtered.length === 1 ? "study" : "studies"}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative mt-8">
          {/* left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" aria-hidden />
          {/* right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" aria-hidden />

          {filtered.length === 0 ? (
            <div className="glass-card flex min-h-[200px] items-center justify-center p-10 text-center text-muted-foreground">
              No case studies match these filters — try a different combination.
            </div>
          ) : (
            <div
              ref={scrollRef}
              onScroll={updateArrows}
              className="flex gap-5 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filtered.map((s, i) => (
                <Link
                  key={s.slug}
                  to="/case-studies/$slug"
                  params={{ slug: s.slug }}
                  className="glass-card glow-card hover-lift group relative flex flex-col overflow-hidden p-0 animate-fade-up shrink-0"
                  style={{
                    width: CARD_WIDTH,
                    scrollSnapAlign: "start",
                    animationDelay: `${i * 45}ms`,
                    animationDuration: "0.45s",
                  }}
                >
                  {/* Art banner */}
                  <div className="relative h-44 w-full overflow-hidden border-b border-border">
                    <CaseStudyArt industry={s.industry} slug={s.slug} className="h-full w-full" />
                    <span className="absolute left-4 top-4 rounded-full border border-border/50 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary/90 backdrop-blur-sm">
                      {s.industry}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {s.tagline}
                    </p>

                    {s.metrics[0] && (
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-shimmer text-2xl font-semibold leading-none">
                          {s.metrics[0].value}
                        </span>
                        <span className="text-xs text-muted-foreground">{s.metrics[0].label}</span>
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.capabilities.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm text-foreground/80 transition-all group-hover:gap-3 group-hover:text-foreground">
                      Read case study <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile arrows */}
        <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
          <button
            onClick={() => slide("left")}
            disabled={!canPrev}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => slide("right")}
            disabled={!canNext}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

const CAPABILITY_ICONS: Record<Capability, LucideIcon> = {
  "Conversational AI":   MessageSquare,
  "Predictive ML":       TrendingUp,
  "Knowledge / RAG":     Database,
  "Workflow Automation": GitBranch,
  "IoT / Edge":          Cpu,
};

function CapChip({
  active, onClick, icon: Icon, children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-1 text-xs font-medium transition-all duration-150 " +
        (active
          ? "border-primary/40 bg-primary/15 text-foreground"
          : "border-transparent bg-transparent text-muted-foreground hover:border-border/60 hover:bg-surface hover:text-foreground")
      }
    >
      {Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={1.75} />}
      {children}
    </button>
  );
}
