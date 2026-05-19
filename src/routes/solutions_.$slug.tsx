import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FLAGSHIP_SERVICES, getFlagshipService, type FlagshipService } from "@/data/flagshipServices";

export const Route = createFileRoute("/solutions_/$slug")({
  loader: ({ params }): FlagshipService => {
    const svc = getFlagshipService(params.slug);
    if (!svc) throw notFound();
    return svc;
  },
  head: ({ loaderData }: { loaderData?: FlagshipService }) => {
    const svc = loaderData;
    if (!svc) {
      return { meta: [{ title: "AI Solution — NeuronX" }] };
    }
    const title = `${svc.shortTitle} — NeuronX`;
    const url = `https://vectra-ai-engine.lovable.app/solutions/${svc.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: svc.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: svc.tagline },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: svc.shortTitle,
            description: svc.tagline,
            provider: { "@type": "Organization", name: "NeuronX" },
            areaServed: "Global",
            serviceType: "AI consulting and engineering",
            url,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-wide py-32 text-center">
        <h1 className="text-3xl font-semibold">Solution not found</h1>
        <Link to="/solutions" className="btn-primary mt-6 inline-flex">
          Back to Solutions
        </Link>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <div className="container-wide py-32 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </SiteShell>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const svc = Route.useLoaderData() as FlagshipService;
  const Icon = svc.icon;
  const others = FLAGSHIP_SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 3);

  return (
    <SiteShell>
      <PageHero
        eyebrow={svc.shortTitle}
        title={svc.title}
        description={svc.tagline}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/book" className="btn-primary">
            Book a 30-min ROI audit <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/solutions" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> All solutions
          </Link>
        </div>
      </PageHero>

      {/* OUTCOME STAT */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Icon className="h-7 w-7" />
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
              <span className="text-5xl font-semibold tracking-tight text-gradient md:text-6xl">
                {svc.outcome.metric}
              </span>
              <span className="text-base text-muted-foreground md:text-lg">
                {svc.outcome.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION + CAPABILITIES */}
      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow">What it is</span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              <span className="text-gradient">Built to ship, not to demo.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">{svc.description}</p>
            <div className="mt-8">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                Stack we typically use
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {svc.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="glass-card p-8">
            <span className="eyebrow">Capabilities</span>
            <ul className="mt-5 space-y-3">
              {svc.capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <span className="eyebrow">Where it's deployed</span>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient">Patterns we've shipped to production.</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {svc.useCases.map((u) => (
              <div key={u.industry} className="glass-card p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                  {u.industry}
                </p>
                <p className="mt-3 text-base text-foreground/90">{u.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SOLUTIONS */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Other solutions
            </h2>
            <Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <Link
                  key={o.slug}
                  to="/solutions/$slug"
                  params={{ slug: o.slug }}
                  className="group glass-card p-6 transition-colors hover:border-primary/40"
                >
                  <OIcon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-base font-semibold">{o.shortTitle}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-wide">
          <div className="glass-card p-10 md:p-14">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">
                Want to see {svc.shortTitle} running on your data?
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              30-minute call. No sales pitch. We'll map a 4–6 week pilot scoped to one workflow,
              one KPI, and one team.
            </p>
            <Link to="/book" className="btn-primary mt-8 inline-flex">
              Book a 30-min ROI audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
