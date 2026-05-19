import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  Brain,
  ShieldCheck,
  Eye,
  AlertTriangle,
  Scale,
  Users,
  Database,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/ai-governance")({
  head: () => ({
    meta: [
      { title: "AI Model Governance & EU AI Act Compliance — NeuronX" },
      {
        name: "description",
        content:
          "How NeuronX governs AI models in production: model cards, accuracy benchmarks, human-in-the-loop, EU AI Act conformity, NIST AI RMF alignment, and incident disclosure.",
      },
      { property: "og:title", content: "AI Model Governance — NeuronX" },
      {
        property: "og:description",
        content:
          "Model cards, hallucination benchmarks, EU AI Act conformity, and human-in-the-loop documentation for every NeuronX deployment.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/ai-governance" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/ai-governance" }],
  }),
  component: AIGovernancePage,
});

const principles = [
  {
    icon: Eye,
    title: "Transparency",
    desc: "Every production model has a published model card: provider, version, training cutoff, intended use, known limitations.",
  },
  {
    icon: Users,
    title: "Human-in-the-loop",
    desc: "All high-impact actions (financial, medical, legal, customer-facing) require human approval by default. Autonomy is opt-in per workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Data minimization",
    desc: "PII is redacted before reaching third-party model APIs. Customer data is never used to train base models without explicit written consent.",
  },
  {
    icon: AlertTriangle,
    title: "Incident disclosure",
    desc: "Material AI incidents (hallucinations causing harm, bias events, security) reported to affected customers within 72 hours per NIST AI RMF.",
  },
  {
    icon: Scale,
    title: "Regulatory conformity",
    desc: "Aligned to EU AI Act risk classification, NIST AI RMF 1.0, ISO/IEC 42001, and US Executive Order 14110.",
  },
  {
    icon: Database,
    title: "Provenance & audit",
    desc: "Every model output is logged with prompt, model version, and decision context. Audit trails retained for 7 years.",
  },
];

const modelInventory = [
  {
    provider: "OpenAI",
    model: "GPT-5 / GPT-5-mini",
    use: "Reasoning, complex agents",
    region: "US (no training)",
    rating: "Approved",
  },
  {
    provider: "Anthropic",
    model: "Claude Sonnet 4.5",
    use: "Long-context analysis, code",
    region: "US/EU (no training)",
    rating: "Approved",
  },
  {
    provider: "Google",
    model: "Gemini 2.5 Pro",
    use: "Multimodal, document understanding",
    region: "US/EU (no training)",
    rating: "Approved",
  },
  {
    provider: "Self-hosted",
    model: "Llama 3.3 70B (vLLM)",
    use: "Air-gapped / regulated workloads",
    region: "Customer cloud",
    rating: "Approved",
  },
  {
    provider: "Self-hosted",
    model: "Qwen 2.5 32B (embeddings + rerank)",
    use: "Retrieval, semantic search",
    region: "Customer cloud",
    rating: "Approved",
  },
];

const benchmarks = [
  { metric: "Document extraction (financial filings)", baseline: "Human SME", neuronx: "97.4%", note: "F1 vs SME label, n=2,400" },
  { metric: "Customer-intent classification", baseline: "Prior vendor", neuronx: "+12.3 pts", note: "Macro-F1 lift" },
  { metric: "Hallucination rate (RAG, grounded)", baseline: "GPT-5 zero-shot", neuronx: "0.6%", note: "vs 4.1% baseline" },
  { metric: "Citation accuracy (legal)", baseline: "GPT-5 zero-shot", neuronx: "99.1%", note: "Source-traceable answers" },
  { metric: "Latency p95 (agent turn)", baseline: "—", neuronx: "1.8s", note: "Production median across deployments" },
];

const euAiAct = [
  { tier: "Prohibited", status: "Not deployed", desc: "Social scoring, real-time biometric ID, manipulative AI — never built or deployed by NeuronX." },
  { tier: "High-risk (Annex III)", status: "Conformity assessment ready", desc: "When building for HR, credit, education, critical infrastructure: technical documentation, post-market monitoring, and human oversight per Article 14." },
  { tier: "Limited risk", status: "Transparency by default", desc: "All chat/voice agents disclose AI nature on first interaction. Synthetic content watermarked." },
  { tier: "Minimal risk", status: "Voluntary code of conduct", desc: "Internal tools, summarization, search — still subject to NeuronX governance principles above." },
];

function AIGovernancePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="AI Governance"
        title="Model governance, transparency & EU AI Act conformity"
        description="How we build, deploy, and monitor AI systems responsibly. Designed for legal, risk, and AI-ethics committees in regulated industries."
      />

      {/* Principles */}
      <section className="container-wide py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Governing principles</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Six commitments, applied to every deployment</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="h-5 w-5 text-foreground" />
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Model inventory */}
      <section className="container-wide py-16">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Brain className="h-4 w-4" /> Approved model inventory
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Models we deploy in production</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Reviewed quarterly by our AI Governance Committee. Self-hosted options available for any workload requiring data isolation or air-gapped deployment.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Provider</th>
                  <th className="py-3 pr-4 font-medium">Model</th>
                  <th className="py-3 pr-4 font-medium">Primary use</th>
                  <th className="py-3 pr-4 font-medium">Region / data</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {modelInventory.map((m) => (
                  <tr key={m.model} className="border-b border-border/40 last:border-0">
                    <td className="py-4 pr-4 font-medium">{m.provider}</td>
                    <td className="py-4 pr-4 font-mono text-xs text-muted-foreground">{m.model}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{m.use}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{m.region}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-500">
                        <CheckCircle2 className="h-3 w-3" /> {m.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="container-wide py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Accuracy & hallucination benchmarks</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Measured, not claimed</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Published benchmarks across our deployed systems. Per-customer evaluation reports available under NDA.
          </p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4 font-medium">Metric</th>
                <th className="px-6 py-4 font-medium">Baseline</th>
                <th className="px-6 py-4 font-medium">NeuronX</th>
                <th className="px-6 py-4 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((b) => (
                <tr key={b.metric} className="border-b border-border/40 last:border-0">
                  <td className="px-6 py-4 font-medium">{b.metric}</td>
                  <td className="px-6 py-4 text-muted-foreground">{b.baseline}</td>
                  <td className="px-6 py-4 font-mono text-foreground">{b.neuronx}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{b.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* EU AI Act */}
      <section className="container-wide py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">EU AI Act · Effective Aug 2026</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">EU AI Act conformity</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We classify every engagement against the EU AI Act risk tiers and ship the documentation required for your conformity assessment.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {euAiAct.map((row) => (
            <div key={row.tier} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{row.tier}</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{row.status}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{row.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-10 text-center md:p-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Need our full Model Governance Policy?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Send your AI ethics committee questionnaire to <span className="font-mono text-foreground">governance@neuronx.ai</span> — we respond within 3 business days with a per-deployment governance brief.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:governance@neuronx.ai" className="btn-primary h-11 px-6 text-sm">
              Request governance brief <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
            <Link to="/security" className="btn-ghost h-11 px-6 text-sm">
              Trust Center
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
