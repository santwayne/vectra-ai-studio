import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Target,
  Workflow,
  LineChart,
  FileCheck2,
  Calendar,
  Users,
  Gauge,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/pilot")({
  head: () => ({
    meta: [
      { title: "30-Day Paid Pilot — One Workflow, One Written SLA" },
      {
        name: "description",
        content:
          "A 30-day production pilot on one workflow, with a written success criterion and fixed scope. Built for enterprise and mid-market teams who need proof, not POC theater.",
      },
      { property: "og:title", content: "30-Day Paid Pilot — NeuronX" },
      {
        property: "og:description",
        content:
          "Production pilot in 30 days on one workflow. Written SLA, fixed price, engineer-led.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/pilot" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/pilot" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "NeuronX 30-Day Production Pilot",
          serviceType: "AI agent deployment pilot",
          url: "https://vectra-ai-engine.lovable.app/pilot",
          description:
            "A 30-day paid pilot deploying one production workflow on the NeuronX agent platform, with a written success criterion and fixed scope.",
          provider: {
            "@type": "Organization",
            name: "NeuronX Intelligence Inc.",
            url: "https://vectra-ai-engine.lovable.app",
          },
          areaServed: ["US", "EU", "UK"],
          termsOfService: "https://vectra-ai-engine.lovable.app/terms",
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://vectra-ai-engine.lovable.app/pilot",
            eligibleCustomerType: "Enterprise",
          },
        }),
      },
    ],
  }),
  component: PilotPage,
});

const phases = [
  {
    week: "Week 0",
    title: "Scoping & SLA",
    icon: Target,
    points: [
      "Pick one workflow with a measurable KPI",
      "Write the success criterion together (e.g. ≥40% cycle-time reduction at ≥95% acceptance)",
      "Sign mutual NDA + pilot order form (fixed scope, fixed price)",
    ],
  },
  {
    week: "Weeks 1–2",
    title: "Build in your VPC",
    icon: Workflow,
    points: [
      "Connect to your data sources via read-only IAM",
      "Stand up agent, evals, and OpenTelemetry traces in your tenant",
      "Daily Loom updates from a NeuronX engineer — no SDR layer",
    ],
  },
  {
    week: "Week 3",
    title: "Shadow + iterate",
    icon: Gauge,
    points: [
      "Agent runs in shadow against live traffic",
      "Eval set tuned against your golden examples",
      "Security review with your team (SOC 2 + DPA pre-shared)",
    ],
  },
  {
    week: "Week 4",
    title: "Production + readout",
    icon: LineChart,
    points: [
      "Cut over to production with kill-switch + per-step caps",
      "Joint readout against the written success criterion",
      "Decision: expand to MSA, extend pilot, or close out cleanly",
    ],
  },
];

const guarantees = [
  {
    icon: FileCheck2,
    title: "Written success criterion",
    body: "We don't ship until both sides sign one number we'll be measured on. No moving goalposts.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade from day one",
    body: "Built in your VPC with SOC 2 controls, evals, and OpenTelemetry traces — not a sandbox you'll have to rebuild later.",
  },
  {
    icon: Clock,
    title: "Fixed scope, fixed price",
    body: "One workflow. One price quoted upfront. No T&M surprises, no scope creep into a second team.",
  },
  {
    icon: Users,
    title: "Engineer-led, no SDR layer",
    body: "Your daily contact is the engineer building it. Procurement and security calls included.",
  },
];

const fit = [
  "30+ minutes of human time per instance, today",
  "Clear KPI owner on your side (Ops, Support, Finance, Claims, RevOps)",
  "Structured + unstructured data the workflow already uses",
  "Buying authority for a $25k–$150k pilot decision",
];

const notFit = [
  "Pure marketing-site chatbot — use a widget",
  "Workflows with no human baseline to compare against",
  "Research projects with no production owner",
  "Sub-$10k discovery engagements — start with a free demo instead",
];

const faqs = [
  {
    q: "What does the pilot cost?",
    a: "Pilots are quoted between $25k and $150k depending on data-source complexity, security review depth, and region (US / EU / UK). The number is fixed in the order form before kickoff — no T&M surprises.",
  },
  {
    q: "Where does it run?",
    a: "Default is single-tenant in your AWS, GCP, or Azure account via Terraform. Customer-managed keys (BYOK), VPC-only egress, and region pinning are standard. Sovereign and air-gapped options on request.",
  },
  {
    q: "How is this different from a free POC?",
    a: "A POC runs on toy data with no SLA. This pilot runs on your production data, ships into your VPC, and has a written success bar. If we miss it, you get the money back — that's the difference.",
  },
  {
    q: "What happens after the 30 days?",
    a: "If we hit the bar, you sign an MSA and we expand. If we don't, you keep the trace logs, the eval set, and a written readout of why — so the next attempt (with us or anyone) starts ahead.",
  },
];

function PilotPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteShell>
      <PageHero
        eyebrow="30-day production pilot"
        title="One workflow. One SLA. Production in 30 days."
        description="A paid pilot designed for enterprise and mid-market teams who are done with POC theater. We build in your VPC, ship to production, and tie our fee to a number you write."
      />

      {/* Guarantee strip */}
      <section className="section pt-0">
        <div className="container-wide grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-border bg-surface/60 p-6"
            >
              <div className="flex items-center gap-2">
                <g.icon className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">{g.title}</p>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 30-day timeline */}
      <section className="section-tight border-t border-border bg-surface/40">
        <div className="container-wide">
          <span className="eyebrow">What the 30 days look like</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient">From order form to production, mapped to the week.</span>
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((p) => (
              <div
                key={p.week}
                className="rounded-2xl border border-border bg-background/60 p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.week}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <p.icon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit cues + form */}
      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <div>
              <span className="eyebrow">Is your team a fit?</span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="text-gradient">We'd rather walk away than mis-sell a pilot.</span>
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/60 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Great fit
                </p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                  {fit.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Not a fit
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {notFit.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/60 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Recent pilot — Fortune 500 insurer
              </p>
              <blockquote className="mt-3 text-base text-foreground/90">
                "Signed the order form on a Monday. Production agent triaging
                first-notice-of-loss four weeks later. 47% cycle-time reduction
                against the SLA we'd written. We've expanded to three more
                workflows."
              </blockquote>
              <p className="mt-3 text-xs text-muted-foreground">— VP Claims Operations (under NDA)</p>
            </div>
          </div>

          {/* Pilot request form */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Request a pilot scoping call</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                45 min · Engineer + solutions lead · Pilot quote within 5 business days
              </p>

              {!submitted ? (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-muted-foreground">Work email</span>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </label>
                    <label className="block text-xs">
                      <span className="text-muted-foreground">Company</span>
                      <input
                        type="text"
                        required
                        placeholder="Acme Inc."
                        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-muted-foreground">Company size</span>
                      <select
                        required
                        defaultValue=""
                        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option>200 – 1,000</option>
                        <option>1,000 – 5,000</option>
                        <option>5,000 – 25,000</option>
                        <option>25,000+</option>
                      </select>
                    </label>
                    <label className="block text-xs">
                      <span className="text-muted-foreground">Region</span>
                      <select
                        required
                        defaultValue=""
                        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option>North America</option>
                        <option>EU / UK</option>
                        <option>APAC</option>
                        <option>Other / Multi-region</option>
                      </select>
                    </label>
                  </div>
                  <label className="block text-xs">
                    <span className="text-muted-foreground">
                      Workflow you'd pilot (1–2 sentences)
                    </span>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Triage inbound RFPs, draft first-pass response, route to sales engineer. ~1,200 RFPs / quarter."
                      className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                  </label>
                  <label className="block text-xs">
                    <span className="text-muted-foreground">Target KPI to move</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. cycle time, win rate, deflection %"
                      className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                  </label>
                  <button type="submit" className="btn-primary w-full">
                    Request pilot scoping <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[10px] text-muted-foreground">
                    By submitting, you agree to our{" "}
                    <Link to="/privacy" className="underline">
                      privacy policy
                    </Link>
                    . NDA available on request before any data is shared.
                  </p>
                </form>
              ) : (
                <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold text-foreground">Request received.</p>
                  <p className="mt-2 text-muted-foreground">
                    A solutions engineer will reach out within one business day with three time
                    options and a pre-read tailored to the workflow you described.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-background/40 p-5">
              <p className="text-xs font-semibold text-foreground">Not ready to scope a pilot?</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    to="/demo"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Start with a 30-min live demo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roi-calculator"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-3.5 w-3.5 text-primary" />
                    Model the ROI yourself first
                  </Link>
                </li>
                <li>
                  <Link
                    to="/procurement"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Send the procurement pack to legal
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-tight border-t border-border bg-surface/40">
        <div className="container-wide">
          <span className="eyebrow">Pilot FAQ</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient">The questions every buying committee asks.</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="text-sm font-semibold text-foreground">{f.q}</p>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
