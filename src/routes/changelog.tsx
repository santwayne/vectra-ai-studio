import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { Sparkles, Wrench, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — NeuronX" },
      { name: "description", content: "What's new at NeuronX. Platform releases, new solutions, security updates, and customer wins — shipped quarterly." },
      { property: "og:title", content: "Changelog — NeuronX" },
      { property: "og:description", content: "Quarterly releases, security updates, and platform improvements." },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/changelog" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/changelog" }],
  }),
  component: ChangelogPage,
});

const releases = [
  {
    date: "May 2026",
    version: "v4.2",
    tag: "Platform",
    icon: Sparkles,
    title: "Multi-region inference + EU data residency",
    items: [
      "EU-West inference region launched (Frankfurt) with full data residency guarantees.",
      "New routing layer keeps customer data within selected region for the entire request lifecycle.",
      "SOC 2 Type II report extended to cover EU operations.",
    ],
  },
  {
    date: "Apr 2026",
    version: "v4.1",
    tag: "Governance",
    icon: ShieldCheck,
    title: "EU AI Act conformity tooling",
    items: [
      "Automated risk classification per deployment (Annex III mapping).",
      "Auto-generated technical documentation packs for high-risk systems.",
      "Human oversight dashboards with escalation routing.",
    ],
  },
  {
    date: "Mar 2026",
    version: "v4.0",
    tag: "Major",
    icon: Zap,
    title: "Agent runtime 2.0",
    items: [
      "New agent runtime: 4x faster planning, 60% lower token cost on multi-step workflows.",
      "Built-in evaluation harness with regression detection on every deploy.",
      "Native MCP (Model Context Protocol) support for connecting customer tools.",
    ],
  },
  {
    date: "Feb 2026",
    version: "v3.8",
    tag: "Security",
    icon: ShieldCheck,
    title: "Zero-retention mode + customer KMS",
    items: [
      "Bring-your-own-KMS for envelope encryption of all data at rest.",
      "Zero-retention mode: prompts and outputs purged within 60 seconds of response.",
      "Field-level encryption for PII columns (HIPAA / PCI workloads).",
    ],
  },
  {
    date: "Jan 2026",
    version: "v3.7",
    tag: "Solutions",
    icon: Wrench,
    title: "New solution: Document Intelligence Pro",
    items: [
      "End-to-end pipeline for financial filings, contracts, and clinical documents.",
      "97.4% F1 on financial-statement extraction (vs SME labels, n=2,400).",
      "Native Salesforce, NetSuite, and Epic connectors.",
    ],
  },
  {
    date: "Dec 2025",
    version: "v3.6",
    tag: "Platform",
    icon: Sparkles,
    title: "Self-hosted deployment GA",
    items: [
      "Air-gapped deployment available for customer VPCs (AWS, GCP, Azure).",
      "Llama 3.3 70B + Qwen 2.5 32B as default self-hosted models.",
      "Customer-managed control plane with Terraform modules.",
    ],
  },
];

function ChangelogPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Changelog"
        title="What we shipped"
        description="Platform releases, new solutions, security and governance updates. We ship quarterly with named customer-impact notes."
      />

      <section className="container-wide py-16">
        <div className="space-y-8">
          {releases.map((r) => {
            const Icon = r.icon;
            return (
              <article key={r.version} className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:grid-cols-[200px_1fr] md:p-10">
                <div className="flex flex-col gap-3">
                  <div className="font-mono text-sm text-muted-foreground">{r.date}</div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-foreground" />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{r.tag}</span>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground/70">{r.version}</div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{r.title}</h2>
                  <ul className="mt-4 space-y-2">
                    {r.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <div className="text-sm font-medium">Get release notes by email</div>
            <div className="text-xs text-muted-foreground">Quarterly. No marketing — just what shipped.</div>
          </div>
          <a href="mailto:changelog-subscribe@neuronx.ai" className="btn-primary h-10 px-4 text-sm">
            Subscribe <ArrowRight className="ml-1.5 h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Looking for breaking changes only? <Link to="/changelog" className="underline hover:text-foreground">View migration guides</Link>
        </div>
      </section>
    </SiteShell>
  );
}
