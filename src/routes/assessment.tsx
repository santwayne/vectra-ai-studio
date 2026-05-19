import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "AI Readiness Assessment — NeuronX" },
      {
        name: "description",
        content:
          "Free 10-question AI Readiness Assessment. Score your data, team, governance, and ROI maturity in under 3 minutes.",
      },
      { property: "og:title", content: "AI Readiness Assessment — NeuronX" },
      {
        property: "og:description",
        content:
          "Score your AI readiness across data, team, governance, and ROI in under 3 minutes.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/assessment" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/assessment" }],
  }),
  component: AssessmentPage,
});

interface Question {
  id: string;
  category: "Data" | "Team" | "Governance" | "ROI";
  prompt: string;
}

const QUESTIONS: Question[] = [
  { id: "q1", category: "Data", prompt: "We have a centralized data warehouse or lakehouse our teams trust." },
  { id: "q2", category: "Data", prompt: "Critical business data is documented and discoverable across teams." },
  { id: "q3", category: "Data", prompt: "We can pull a clean training/eval dataset for a new use case in under 2 weeks." },
  { id: "q4", category: "Team", prompt: "We have at least one engineer comfortable shipping production ML or LLM systems." },
  { id: "q5", category: "Team", prompt: "Business owners can clearly articulate the KPI a new AI system would move." },
  { id: "q6", category: "Governance", prompt: "We have an approved policy for using third-party LLM providers with company data." },
  { id: "q7", category: "Governance", prompt: "We have SSO/SAML, audit logs, and role-based access on internal tools." },
  { id: "q8", category: "Governance", prompt: "Sensitive data flows are documented and reviewed (PII, PHI, financial)." },
  { id: "q9", category: "ROI", prompt: "We measure baseline performance before launching new tools or workflows." },
  { id: "q10", category: "ROI", prompt: "We have an executive sponsor willing to fund a 4–6 week AI pilot this quarter." },
];

const CHOICES = [
  { value: 0, label: "Not yet" },
  { value: 1, label: "In progress" },
  { value: 2, label: "Mostly" },
  { value: 3, label: "Yes" },
];

interface Tier {
  band: string;
  range: [number, number];
  headline: string;
  recommendation: string;
}

const TIERS: Tier[] = [
  {
    band: "Exploratory",
    range: [0, 12],
    headline: "Foundations first.",
    recommendation:
      "Start with a focused discovery sprint to identify one high-value use case and the minimum data + governance needed to pilot it.",
  },
  {
    band: "Pilot-ready",
    range: [13, 21],
    headline: "Ready for a 4–6 week pilot.",
    recommendation:
      "You have enough data, talent, and governance to ship a real pilot. Lock a baseline and a target metric, then build against it.",
  },
  {
    band: "Production-ready",
    range: [22, 27],
    headline: "Ready to scale.",
    recommendation:
      "Skip the pilot theater. Move directly to a production build with proper evals, observability, and integration into your stack.",
  },
  {
    band: "Operating at scale",
    range: [28, 30],
    headline: "Optimize, don't restart.",
    recommendation:
      "Bring in a senior AI engineering pod on retainer to tune, observe, and ship the next wave of systems alongside your team.",
  },
];

function tierFor(score: number): Tier {
  return TIERS.find((t) => score >= t.range[0] && score <= t.range[1]) ?? TIERS[0];
}

function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + v, 0),
    [answers],
  );
  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === QUESTIONS.length;
  const tier = tierFor(score);

  const categoryBreakdown = useMemo(() => {
    const map: Record<string, { score: number; max: number }> = {};
    for (const q of QUESTIONS) {
      if (!map[q.category]) map[q.category] = { score: 0, max: 0 };
      map[q.category].max += 3;
      map[q.category].score += answers[q.id] ?? 0;
    }
    return Object.entries(map);
  }, [answers]);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Free assessment"
        title="AI Readiness Assessment"
        description="10 questions. About 3 minutes. Get a score, a tier, and a clear next step — no email gate, no sales call required."
      />

      <section className="section">
        <div className="container-wide max-w-3xl">
          {!submitted ? (
            <>
              <div className="mb-8 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {answeredCount} / {QUESTIONS.length} answered
                </span>
                <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <ol className="space-y-6">
                {QUESTIONS.map((q, idx) => {
                  const selected = answers[q.id];
                  return (
                    <li key={q.id} className="glass-card p-6">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <span className="eyebrow text-primary">{q.category}</span>
                          <p className="mt-2 font-medium">{q.prompt}</p>
                          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {CHOICES.map((c) => {
                              const active = selected === c.value;
                              return (
                                <button
                                  key={c.value}
                                  type="button"
                                  onClick={() =>
                                    setAnswers((prev) => ({ ...prev, [q.id]: c.value }))
                                  }
                                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                                    active
                                      ? "border-primary bg-primary/10 text-foreground"
                                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                  }`}
                                >
                                  {active ? (
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Circle className="h-4 w-4" />
                                  )}
                                  {c.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={!complete}
                  onClick={() => {
                    setSubmitted(true);
                    if (typeof window !== "undefined") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  See my score <ArrowRight className="h-4 w-4" />
                </button>
                {!complete && (
                  <span className="text-sm text-muted-foreground">
                    Answer all {QUESTIONS.length} questions to unlock your score.
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="glass-card p-8">
                <span className="eyebrow text-primary">{tier.band}</span>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-5xl font-semibold tracking-tight">{score}</span>
                  <span className="text-lg text-muted-foreground">/ 30</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">{tier.headline}</h2>
                <p className="mt-3 text-muted-foreground">{tier.recommendation}</p>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-lg font-semibold">Breakdown by category</h3>
                <div className="mt-5 space-y-4">
                  {categoryBreakdown.map(([cat, v]) => {
                    const pct = (v.score / v.max) * 100;
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{cat}</span>
                          <span className="text-muted-foreground">
                            {v.score} / {v.max}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary">
                  Book a 30-min ROI audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/pricing" className="btn-ghost">
                  See engagement models
                </Link>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                  }}
                >
                  Retake
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
