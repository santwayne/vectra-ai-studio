import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { Cloud, ShieldCheck, Wallet, Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Cloud Marketplace — Buy NeuronX with AWS, GCP & Azure Committed Spend" },
      {
        name: "description",
        content:
          "Procure NeuronX through AWS, Google Cloud, or Azure Marketplace. Apply your committed cloud spend, single-PO billing, and pre-negotiated EULA.",
      },
      { property: "og:title", content: "Cloud Marketplace — NeuronX" },
      {
        property: "og:description",
        content:
          "Buy NeuronX with your committed AWS, GCP, or Azure spend. Pre-negotiated EULA, single-PO procurement.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/marketplace" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/marketplace" }],
  }),
  component: MarketplacePage,
});

const benefits = [
  {
    icon: Wallet,
    title: "Drawdown committed spend",
    desc: "Apply your existing AWS EDP, GCP CUD, or Azure MACC commitments toward NeuronX. No new budget approval cycle required.",
  },
  {
    icon: Zap,
    title: "Single-PO procurement",
    desc: "One purchase order through your existing cloud vendor. Skip net-new vendor onboarding (avg. 8-week saving).",
  },
  {
    icon: ShieldCheck,
    title: "Pre-negotiated EULA",
    desc: "Standard cloud-marketplace terms — no separate MSA/DPA negotiation cycle. Legal review under 5 days.",
  },
  {
    icon: Cloud,
    title: "Native cloud billing",
    desc: "Charges roll into your existing cloud invoice. Cost-allocation tags and chargeback work out of the box.",
  },
];

const listings = [
  {
    cloud: "AWS Marketplace",
    status: "Listed",
    sku: "NeuronX AI Platform — Private Offer",
    region: "us-east-1, us-west-2, eu-west-1, ap-southeast-1",
    available: true,
  },
  {
    cloud: "Google Cloud Marketplace",
    status: "Listed",
    sku: "NeuronX Enterprise — BYOL",
    region: "us-central1, europe-west4",
    available: true,
  },
  {
    cloud: "Microsoft Azure Marketplace",
    status: "Q3 2026",
    sku: "NeuronX Enterprise (preview waitlist open)",
    region: "East US, West Europe (planned)",
    available: false,
  },
];

const offers = [
  { name: "Pilot", desc: "4–6 week fixed-scope pilot", commitment: "One-time PO" },
  { name: "Annual", desc: "Production deployment + support", commitment: "1-year commit" },
  { name: "Multi-year", desc: "Enterprise rollout with volume discount", commitment: "3-year commit · max savings" },
];

function MarketplacePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Cloud Marketplace"
        title="Buy NeuronX with your cloud spend"
        description="Procure through AWS, Google Cloud, or Azure Marketplace. Apply committed spend, skip vendor onboarding, and ship in weeks instead of quarters."
      />

      {/* Benefits */}
      <section className="container-wide py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="h-5 w-5 text-foreground" />
                <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Listings */}
      <section className="container-wide py-16">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Active listings</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Available marketplaces</h2>
        </div>
        <div className="space-y-3">
          {listings.map((l) => (
            <div key={l.cloud} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <Cloud className="h-4 w-4 text-foreground" />
                  <h3 className="font-semibold">{l.cloud}</h3>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                      l.available
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">{l.sku}</div>
                <div className="mt-1 text-xs text-muted-foreground">Regions: {l.region}</div>
              </div>
              <a
                href={`mailto:marketplace@neuronx.ai?subject=${encodeURIComponent(`Private offer request — ${l.cloud}`)}`}
                className={l.available ? "btn-primary h-10 px-4 text-sm" : "btn-ghost h-10 px-4 text-sm"}
              >
                {l.available ? "Request private offer" : "Join waitlist"}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Offer types */}
      <section className="container-wide py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Private-offer structures</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            We work with your cloud rep to structure the offer that fits your procurement cycle and consumption profile.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {offers.map((o) => (
              <div key={o.name} className="rounded-2xl border border-border bg-background/40 p-6">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{o.commitment}</div>
                <h3 className="mt-2 text-lg font-semibold">{o.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-10 text-center md:p-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Get a private offer in 48 hours</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Send your AWS account ID, GCP billing account, or Azure tenant to <span className="font-mono text-foreground">marketplace@neuronx.ai</span> and we'll publish a private offer within 2 business days.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:marketplace@neuronx.ai" className="btn-primary h-11 px-6 text-sm">
              Request private offer <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
