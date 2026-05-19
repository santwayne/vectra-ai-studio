import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

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
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  {s.industry}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>

              {top && (
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-shimmer text-3xl font-semibold leading-none">
                    {top.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {top.label}
                  </span>
                </div>
              )}

              <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
                {s.name} — {s.tagline}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
