import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { INDUSTRY_IMAGES } from "@/components/illustrations/CaseStudyArt";

/**
 * Compact case-study preview strip for the hero / first-screen area.
 *
 * Shows three signature outcomes (industry • headline metric • short label)
 * with deep-links to each case study and a CTA to the full index.
 */
export function HeroCaseStrip() {
  const featured = caseStudies.slice(0, 3);

  return (
    <div className="reveal mt-14">
      <div className="flex items-end justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Proof — measurable outcomes
        </span>
        <Link
          to="/case-studies"
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground"
        >
          All case studies
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {featured.map((s) => {
          const top = s.metrics[0];
          return (
            <Link
              key={s.slug}
              to="/case-studies/$slug"
              params={{ slug: s.slug }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-surface"
            >
              {/* top row: industry label left, icon right */}
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  {s.industry}
                </span>

                {INDUSTRY_IMAGES[s.industry] ? (
                  <div className="relative shrink-0">
                    <span className="absolute inset-0 rounded-xl bg-primary/8 blur-md transition-all duration-300 group-hover:bg-primary/15 group-hover:blur-lg" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl">
                      <img
                        src={INDUSTRY_IMAGES[s.industry]}
                        alt={s.industry}
                        className="h-12 w-12 object-contain drop-shadow-[0_0_4px_rgba(99,179,237,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(99,179,237,0.45)]"
                      />
                    </div>
                  </div>
                ) : (
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
                )}
              </div>

              {/* metric */}
              {top && (
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-shimmer text-3xl font-semibold leading-none">
                    {top.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {top.label}
                  </span>
                </div>
              )}

              {/* tagline + arrow */}
              <div className="mt-3 flex items-end justify-between gap-2">
                <p className="line-clamp-2 text-sm text-foreground/80">
                  {s.name} — {s.tagline}
                </p>
                <ArrowRight className="mb-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
