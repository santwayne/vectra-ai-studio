import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { FLAGSHIP_SERVICES } from "@/data/flagshipServices";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "AI Solutions — NeuronX" },
      {
        name: "description",
        content:
          "Custom GPT assistants, internal search AI, proposal engines, workflow automation, predictive analytics, and voice AI — engineered for your stack.",
      },
      { property: "og:title", content: "AI Solutions — NeuronX" },
      {
        property: "og:description",
        content:
          "Custom AI infrastructure: assistants, automation, knowledge systems, predictive analytics, and voice AI.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="AI Solutions"
        title="Custom machine intelligence, engineered to deploy."
        description="Six flagship capabilities. Composable. Production-grade. Each one is its own deep-dive — click through for outcomes, capabilities, and the stack we ship."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/book" className="btn-primary">
            Book a 30-min ROI audit <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/case-studies" className="btn-ghost">
            See it in production
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2">
            {FLAGSHIP_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="group glass-card p-8 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-primary/80">
                      {s.outcome.metric}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                    {s.shortTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.tagline}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.capabilities.slice(0, 3).map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Explore {s.shortTitle} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="glass-card p-10 md:p-14">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">
                Not sure where to start? We map your highest-ROI AI opportunities for free.
              </span>
            </h2>
            <Link to="/book" className="btn-primary mt-8 inline-flex">
              Start AI Strategy <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
