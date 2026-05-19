import { Search, Beaker, Rocket, TrendingUp } from "lucide-react";

const phases = [
  { icon: Search, label: "Discovery", time: "1–2 weeks", desc: "Map highest-ROI workflows. Define success metrics, data access, and integration surfaces." },
  { icon: Beaker, label: "Pilot", time: "4–6 weeks", desc: "Production-grade pilot against one workflow. Real users, real data, measurable baseline." },
  { icon: Rocket, label: "Deploy", time: "6–10 weeks", desc: "Hardened rollout with SSO, audit logs, and observability. Integrated into your stack." },
  { icon: TrendingUp, label: "Operate & Scale", time: "Ongoing", desc: "Continuous evaluation, model updates, and expansion into adjacent workflows." },
];

export function EngagementModel() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">How we engage</span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">From first conversation to operating system — in weeks.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A predictable engagement model with measurable checkpoints. No open-ended retainers.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <div key={p.label} className={`relative rounded-2xl border border-border bg-surface/60 p-6 reveal reveal-delay-${i + 1}`}>
              <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
              <p.icon className="mt-3 h-5 w-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{p.label}</h3>
              <p className="mt-1 text-xs font-mono text-muted-foreground">{p.time}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
