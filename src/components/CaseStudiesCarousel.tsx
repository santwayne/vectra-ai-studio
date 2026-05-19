import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import {
  ALL_CAPABILITIES,
  deriveCapabilities,
  uniqueIndustries,
  type Capability,
} from "@/lib/case-capabilities";
import { CaseStudyArt } from "@/components/illustrations/CaseStudyArt";

/**
 * Filterable, horizontally-scrolling case-studies carousel.
 *
 * - Filter chips for Industry and AI Capability (multi-toggle, OR within a group, AND across groups).
 * - Snap-scrolling track with prev/next controls.
 * - Each card links to the case study detail page.
 */
export function CaseStudiesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [capability, setCapability] = useState<Capability | null>(null);

  const industries = useMemo(() => uniqueIndustries(caseStudies), []);

  const enriched = useMemo(
    () => caseStudies.map((s) => ({ ...s, capabilities: deriveCapabilities(s) })),
    []
  );

  const filtered = useMemo(() => {
    return enriched.filter((s) => {
      if (industry && s.industry !== industry) return false;
      if (capability && !s.capabilities.includes(capability)) return false;
      return true;
    });
  }, [enriched, industry, capability]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="section relative overflow-hidden">
      <div className="container-wide">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Case studies</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="text-gradient">
                Production AI, shipping outcomes.
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Filter by industry or AI capability to find work that mirrors
              your roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-elevated"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-elevated"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="reveal mt-10 space-y-4">
          <FilterRow
            icon={<Filter className="h-3.5 w-3.5" />}
            label="Industry"
            options={industries}
            value={industry}
            onChange={setIndustry}
          />
          <FilterRow
            icon={<Filter className="h-3.5 w-3.5" />}
            label="Capability"
            options={ALL_CAPABILITIES as readonly string[]}
            value={capability}
            onChange={(v) => setCapability(v as Capability | null)}
          />
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "study" : "studies"}
          </p>
        </div>

        {/* Carousel track */}
        <div className="relative mt-8">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"
            aria-hidden
          />

          {filtered.length === 0 ? (
            <div className="glass-card flex min-h-[200px] items-center justify-center p-10 text-center text-muted-foreground">
              No case studies match these filters yet — try a different
              combination.
            </div>
          ) : (
            <div
              ref={trackRef}
              className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {filtered.map((s) => (
                <Link
                  key={s.slug}
                  to="/case-studies/$slug"
                  params={{ slug: s.slug }}
                  data-card
                  className="glass-card glow-card hover-lift group relative flex w-[320px] shrink-0 snap-start flex-col justify-between overflow-hidden p-0 sm:w-[380px]"
                >
                  <div className="relative h-32 w-full overflow-hidden border-b border-border">
                    <CaseStudyArt industry={s.industry} slug={s.slug} className="h-full w-full" />
                  </div>
                  <div className="relative p-7">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                      {s.industry}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {s.tagline}
                    </p>

                    {/* Top metric */}
                    {s.metrics[0] && (
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="text-shimmer text-2xl font-semibold">
                          {s.metrics[0].value}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {s.metrics[0].label}
                        </span>
                      </div>
                    )}

                    {/* Capability tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.capabilities.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-2 text-sm text-foreground/80 transition-all group-hover:gap-3 group-hover:text-foreground">
                      Read case study <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterRow({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  options: readonly string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 pr-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </span>
      <Chip active={value === null} onClick={() => onChange(null)}>
        All
      </Chip>
      {options.map((opt) => (
        <Chip
          key={opt}
          active={value === opt}
          onClick={() => onChange(value === opt ? null : opt)}
        >
          {opt}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
        (active
          ? "border-primary/50 bg-primary/15 text-foreground"
          : "border-border bg-surface text-muted-foreground hover:border-border/80 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
