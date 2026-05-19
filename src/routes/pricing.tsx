import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Engagement Models — NeuronX" },
      {
        name: "description",
        content:
          "Transparent engagement models for AI pilots, production builds, and ongoing engineering retainers. Fixed-scope and ROI-accountable.",
      },
      { property: "og:title", content: "Pricing & Engagement Models — NeuronX" },
      {
        property: "og:description",
        content:
          "Pilots, production builds, and retainers — all fixed-scope and ROI-accountable.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/pricing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "NeuronX Engagement Models",
          itemListElement: [
            { "@type": "Offer", name: "AI Pilot" },
            { "@type": "Offer", name: "Production Build" },
            { "@type": "Offer", name: "AI Engineering Retainer" },
          ],
        }),
      },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "AI Pilot",
    anchor: "Fixed-scope pilot",
    duration: "4–6 weeks",
    summary:
      "Prove a single, high-value use case against a measurable baseline. Ship a working system, not a deck.",
    features: [
      "Discovery, baseline, and success metric defined in week 1",
      "Production-grade prototype with real data",
      "Eval harness and ROI report on day 30",
      "Path to production with cost & timeline",
    ],
    cta: { label: "Scope a pilot", to: "/book" as const },
  },
  {
    name: "Production Build",
    anchor: "End-to-end delivery",
    duration: "8–14 weeks",
    summary:
      "Ship the full system into your stack — auth, audit, evals, observability, and the runbook your team will own.",
    features: [
      "Architecture review and security hardening (SOC 2-aligned)",
      "Integrations into your data, identity, and tooling",
      "Eval suite with regression detection on every model bump",
      "Handover docs, runbooks, and team enablement",
    ],
    featured: true,
    cta: { label: "Book a 30-min ROI audit", to: "/book" as const },
  },
  {
    name: "AI Engineering Retainer",
    anchor: "Embedded AI pod",
    duration: "Rolling, 90-day minimum",
    summary:
      "A senior AI pod that ships, tunes, and operates your systems alongside your team. Fractional, but accountable.",
    features: [
      "Embedded AI engineer + ML lead, fractional",
      "Monthly evals, model upgrades, and cost optimization",
      "Incident response and on-call coverage",
      "Quarterly roadmap and ROI review",
    ],
    cta: { label: "Talk to us", to: "/contact" as const },
  },
];

const faqs = [
  {
    q: "Why fixed-scope, not time & materials?",
    a: "Because the buyer should own the risk of scope, not the outcome. We commit to deliverables tied to your KPIs.",
  },
  {
    q: "What's included in the pilot price?",
    a: "Discovery, prototyping, evals, ROI report, and a production proposal. No surprise change orders during the pilot window.",
  },
  {
    q: "Do you work with our existing data team?",
    a: "Yes — most engagements augment an internal team. We pair with your engineers, share the codebase, and hand over cleanly.",
  },
  {
    q: "Where do you deploy?",
    a: "Your VPC, on-prem, or our managed environment. SOC 2-aligned controls, SSO/SAML, and audit logs throughout.",
  },
];

function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title="Engagement models built around outcomes."
        description="Three ways to work with us. Each one is fixed-scope, ROI-accountable, and starts with a measurable baseline — not a discovery retainer that never ends."
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
          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`glass-card flex flex-col p-8 ${
                  t.featured ? "ring-1 ring-primary/40" : ""
                }`}
              >
                {t.featured && (
                  <span className="eyebrow mb-4 inline-block text-primary">Most engagements</span>
                )}
                <h2 className="text-xl font-semibold">{t.name}</h2>
                <div className="mt-3 text-3xl font-semibold tracking-tight">{t.anchor}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.duration}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.summary}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={t.cta.to}
                  className={`mt-8 ${t.featured ? "btn-primary" : "btn-ghost"} justify-center`}
                >
                  {t.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Final scope is sized off your data volume, integrations, and compliance requirements.
          </p>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container-wide max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border pb-6">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/assessment" className="btn-ghost">
              Take the AI Readiness Assessment
            </Link>
            <Link to="/book" className="btn-primary">
              Book a 30-min ROI audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
