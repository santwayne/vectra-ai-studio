import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { Check, X, Minus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "NeuronX vs Build In-House, Big Consultancies & Platforms — Compare" },
      {
        name: "description",
        content:
          "Honest comparison: NeuronX vs building in-house, vs Big-4 / McKinsey AI practices, vs Palantir / C3 AI platforms. Cost, speed, IP ownership, and risk side-by-side.",
      },
      { property: "og:title", content: "NeuronX vs alternatives — Compare" },
      { property: "og:description", content: "Side-by-side comparison of cost, speed, IP ownership, and risk." },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/compare" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/compare" }],
  }),
  component: ComparePage,
});

type Cell = "yes" | "no" | "partial" | string;

const rows: { label: string; neuronx: Cell; inhouse: Cell; consultancy: Cell; platform: Cell }[] = [
  { label: "Time to first production system", neuronx: "4–6 weeks", inhouse: "6–12 months", consultancy: "9–18 months", platform: "3–6 months" },
  { label: "You own the source code & IP", neuronx: "yes", inhouse: "yes", consultancy: "partial", platform: "no" },
  { label: "Runs in your cloud (VPC)", neuronx: "yes", inhouse: "yes", consultancy: "partial", platform: "partial" },
  { label: "No vendor lock-in", neuronx: "yes", inhouse: "yes", consultancy: "yes", platform: "no" },
  { label: "Senior AI engineers (no juniors)", neuronx: "yes", inhouse: "partial", consultancy: "no", platform: "yes" },
  { label: "Fixed-scope, fixed-price option", neuronx: "yes", inhouse: "no", consultancy: "no", platform: "no" },
  { label: "Built-in EU AI Act conformity", neuronx: "yes", inhouse: "no", consultancy: "partial", platform: "partial" },
  { label: "SOC 2 Type II + HIPAA-ready", neuronx: "yes", inhouse: "no", consultancy: "yes", platform: "yes" },
  { label: "Replaces existing data team", neuronx: "no", inhouse: "—", consultancy: "no", platform: "yes" },
  { label: "Typical 1st-year cost", neuronx: "$$", inhouse: "$$$$", consultancy: "$$$$$", platform: "$$$$" },
  { label: "Knowledge transfer to your team", neuronx: "yes", inhouse: "—", consultancy: "no", platform: "no" },
];

const verdicts = [
  {
    title: "Build In-House",
    when: "Choose if",
    desc: "You already have 3+ senior ML engineers, 6–12 months of runway, and AI is a core differentiator.",
    risk: "Hiring is the #1 failure point — most in-house AI teams ship their first production system 14 months after kickoff.",
  },
  {
    title: "Big Consultancies",
    when: "Choose if",
    desc: "You need a 100-person org-change program and AI is one of many workstreams.",
    risk: "$3–10M minimums, junior delivery teams, and you don't keep the IP. Common failure: PowerPoint-heavy, code-light.",
  },
  {
    title: "AI Platforms (Palantir, C3, etc.)",
    when: "Choose if",
    desc: "You want a single vendor to own your data lake, ontology, and apps — and you're OK with $5M+ annual licenses.",
    risk: "Total lock-in. Migrating off after 3 years typically costs more than the original implementation.",
  },
  {
    title: "NeuronX",
    when: "Choose if",
    desc: "You want production AI in 4–6 weeks, your team to own the code, and to scale spend with proven ROI — not seat licenses.",
    risk: "Not a fit for pure org-change consulting or for replacing your entire data team.",
  },
];

function CellRender({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
        <Check className="h-4 w-4 text-emerald-500" />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15">
        <X className="h-4 w-4 text-rose-500" />
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15">
        <Minus className="h-4 w-4 text-amber-500" />
      </span>
    );
  return <span className="font-mono text-xs text-foreground">{value}</span>;
}

function ComparePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Compare"
        title="NeuronX vs the alternatives"
        description="An honest, side-by-side comparison. We tell you when we're not the right fit."
      />

      {/* Comparison table */}
      <section className="container-wide py-12">
        <div className="overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[840px] text-sm">
            <thead>
              <tr className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-5 font-medium">Capability</th>
                <th className="px-4 py-5 text-center font-semibold text-foreground">NeuronX</th>
                <th className="px-4 py-5 text-center font-medium">Build in-house</th>
                <th className="px-4 py-5 text-center font-medium">Big consultancy</th>
                <th className="px-4 py-5 text-center font-medium">AI platform</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-border/40 last:border-0">
                  <td className="px-6 py-4 font-medium">{r.label}</td>
                  <td className="px-4 py-4 text-center">
                    <CellRender value={r.neuronx} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <CellRender value={r.inhouse} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <CellRender value={r.consultancy} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <CellRender value={r.platform} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Cost notation: $ = under $250k · $$ = $250k–1M · $$$ = $1–3M · $$$$ = $3–10M · $$$$$ = $10M+
        </p>
      </section>

      {/* Verdicts */}
      <section className="container-wide py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">When each is the right call</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">No vendor is right for everyone</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {verdicts.map((v) => (
            <div
              key={v.title}
              className={`rounded-2xl border p-6 ${
                v.title === "NeuronX" ? "border-foreground/30 bg-card" : "border-border bg-card"
              }`}
            >
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <div className="mt-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{v.when}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
              <div className="mt-4 border-t border-border/50 pt-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Where it breaks</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.risk}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-10 text-center md:p-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Still deciding?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Take 3 minutes — our readiness assessment recommends the right path (build, buy, or hybrid) based on your data, team, and ROI maturity.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/assessment" className="btn-primary h-11 px-6 text-sm">
              Take the assessment <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link to="/book" className="btn-ghost h-11 px-6 text-sm">
              Talk to us instead
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
