import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  Layers,
  Workflow,
  Database,
  Cpu,
  ShieldCheck,
  Plug,
  GitBranch,
  Eye,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — The NeuronX Agent Platform" },
      {
        name: "description",
        content:
          "How NeuronX builds production AI agents: a modular platform for retrieval, reasoning, action, and observability — deployed inside your VPC against the workflows you already run.",
      },
      { property: "og:title", content: "Product — The NeuronX Agent Platform" },
      {
        property: "og:description",
        content:
          "Modular agent platform: retrieval, reasoning, action, and observability — shipped in 6 weeks against KPIs you already track.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/product" },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: "https://vectra-ai-engine.lovable.app/product" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "NeuronX Agent Platform",
          applicationCategory: "BusinessApplication",
          applicationSubCategory: "AI Agent Platform",
          operatingSystem: "Cloud (AWS, GCP, Azure), On-Premise, VPC",
          url: "https://vectra-ai-engine.lovable.app/product",
          description:
            "Production AI agent platform with grounded retrieval, multi-model reasoning, tool-calling actions, and full observability. Deployed inside your VPC and shipped in 6 weeks.",
          featureList: [
            "Hybrid retrieval (BM25 + vector) with row-level ACL inheritance",
            "Per-step model routing across GPT-5, Claude 4.5, Llama 3.3",
            "Typed tool calls with human-in-the-loop checkpoints",
            "OpenTelemetry traces, per-run replay, drift and cost dashboards",
            "SSO/SAML, SOC 2 Type II, region pinning (US, EU, UK)",
          ],
          provider: {
            "@type": "Organization",
            name: "NeuronX Intelligence Inc.",
            url: "https://vectra-ai-engine.lovable.app",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            url: "https://vectra-ai-engine.lovable.app/pricing",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "40",
          },
        }),
      },
    ],
  }),
  component: ProductPage,
});

const pillars = [
  {
    icon: Database,
    title: "Grounded retrieval",
    body: "Index your unstructured and structured sources — docs, tickets, CRM, data warehouse — with row-level access controls. No more hallucinated answers from generic models.",
    bullets: ["Hybrid BM25 + vector", "Row-level ACL inheritance", "Live re-indexing"],
  },
  {
    icon: Cpu,
    title: "Reasoning that fits the task",
    body: "Route between GPT-5, Claude 4.5, Llama 3.3, and open-weight specialists per step. Cost and latency tuned per workflow, not per app.",
    bullets: ["Per-step model routing", "Structured output enforcement", "Eval suite per release"],
  },
  {
    icon: Workflow,
    title: "Action, not just chat",
    body: "Agents call your APIs, write to systems of record, and trigger human review at the steps that matter. Every action is logged and reversible.",
    bullets: ["Typed tool definitions", "Human-in-the-loop checkpoints", "Reversible writebacks"],
  },
  {
    icon: Eye,
    title: "Observability built-in",
    body: "Trace every prompt, retrieval, tool call, and decision. Ship to Datadog, Grafana, or your SIEM. Replay any run, any time.",
    bullets: ["OpenTelemetry traces", "Per-run replay", "Drift + cost dashboards"],
  },
];

const integrations = [
  "Salesforce",
  "HubSpot",
  "Snowflake",
  "Databricks",
  "Postgres",
  "BigQuery",
  "Slack",
  "Microsoft Teams",
  "ServiceNow",
  "Jira",
  "Zendesk",
  "SharePoint",
  "S3",
  "GCS",
  "Okta",
  "Azure AD",
];

const objections = [
  {
    q: "How long until something is live?",
    a: "First production workflow ships in 4–6 weeks against a measured baseline. We do not run open-ended retainers.",
  },
  {
    q: "What about our data?",
    a: "Deployed inside your VPC or on-prem. Zero data retention with model providers. BYOK and region pinning (US, EU, UK) available.",
  },
  {
    q: "What if the model is wrong?",
    a: "Every workflow has an eval set, a confidence threshold, and a human-in-the-loop fallback. We track accuracy weekly, not at launch.",
  },
  {
    q: "Does it replace our existing tools?",
    a: "No. NeuronX agents sit between your systems of record. We extend Salesforce, ServiceNow, and your data warehouse — we do not replace them.",
  },
];

function ProductPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="The NeuronX Platform"
        title="One agent platform. Every production workflow."
        description="Retrieval, reasoning, action, and observability — composed into agents that ship in weeks and operate against the KPIs your team already reports on."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/demo" className="btn-primary">
            See a live demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/case-studies" className="btn-ghost">
            View production case studies
          </Link>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Deployed in your VPC · SOC 2 Type II · SSO/SAML · Region pinning
        </p>
      </PageHero>

      {/* Proof rail */}
      <section className="border-b border-border bg-surface/40 py-6">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "6 wk", l: "Median time to first production workflow" },
            { v: "95%", l: "Avg. handle-time reduction across deployments" },
            { v: "40+", l: "Production agents operated for customers" },
            { v: "99.95%", l: "Platform availability — trailing 90 days" },
          ].map((p) => (
            <div key={p.l} className="rounded-xl border border-border bg-background/40 p-5">
              <p className="text-2xl font-semibold tracking-tight text-foreground">{p.v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="container-wide">
          <span className="eyebrow">Platform pillars</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">Four layers. Composed per workflow.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every NeuronX agent is built from the same four primitives — so the platform looks the
            same whether you're automating claims triage or summarizing 10-Ks.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="group rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/40">
                    <p.icon className="h-4 w-4 text-primary" />
                  </span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.body}</p>
                <ul className="mt-5 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram (UI artifact) */}
      <section className="section-tight border-y border-border bg-surface/40">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span className="eyebrow">Reference architecture</span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="text-gradient">From your data to a reversible action.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                A single request flows through retrieval, reasoning, and tool calls — with traces,
                evals, and HITL checkpoints at every step. No black boxes.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                <li className="flex gap-2">
                  <Layers className="mt-0.5 h-4 w-4 text-primary" />
                  Composable per workflow — swap retrievers, models, and tools without re-platforming.
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                  Inherits identity from Okta / Azure AD. Row-level ACLs follow the user.
                </li>
                <li className="flex gap-2">
                  <GitBranch className="mt-0.5 h-4 w-4 text-primary" />
                  Versioned: prompts, evals, and tool schemas are checked into your repo.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background/60 p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-destructive/70" />
                  <span className="h-2 w-2 rounded-full bg-primary/60" />
                  <span className="h-2 w-2 rounded-full bg-foreground/30" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  trace · run_38f2c1
                </p>
              </div>
              <pre className="mt-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-foreground/85">
{`├─ retrieve("policy_id=A-42819")          120ms · 8 docs
├─ reason(gpt-5, plan="claims_triage_v3") 840ms · ok
├─ tool: pricing.lookup(sku="B-204")       54ms · ok
├─ hitl: senior_adjuster_review            ⏸  pending
├─ tool: salesforce.case.update(...)      210ms · ok
└─ emit: audit_log + replay_ready         8ms`}
              </pre>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-md border border-border bg-surface/60 p-2">
                  <p className="text-muted-foreground">Latency</p>
                  <p className="mt-1 font-mono text-foreground">1.23s</p>
                </div>
                <div className="rounded-md border border-border bg-surface/60 p-2">
                  <p className="text-muted-foreground">Cost</p>
                  <p className="mt-1 font-mono text-foreground">$0.018</p>
                </div>
                <div className="rounded-md border border-border bg-surface/60 p-2">
                  <p className="text-muted-foreground">Eval pass</p>
                  <p className="mt-1 font-mono text-foreground">97.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section">
        <div className="container-wide">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Ecosystem</span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="text-gradient">Plugs into the stack you already run.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Pre-built connectors for the systems that matter. Anything else — a 1-day SDK build.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {integrations.map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-3 text-xs text-foreground/85"
              >
                <Plug className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objection handling */}
      <section className="section-tight border-y border-border bg-surface/40">
        <div className="container-wide">
          <span className="eyebrow">Common questions from buyer teams</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient">The honest answers, before you ask.</span>
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {objections.map((o) => (
              <div key={o.q} className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="flex items-start gap-2 text-sm font-semibold text-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {o.q}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{o.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-14">
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  <span className="text-gradient">See the platform on your data.</span>
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  30 minutes. We'll run one of your workflows through a live agent and walk through
                  the trace, evals, and cost together.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link to="/demo" className="btn-primary">
                  Book a live demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/case-studies" className="btn-ghost">
                  See customer outcomes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
