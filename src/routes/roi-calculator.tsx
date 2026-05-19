import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";

export const Route = createFileRoute("/roi-calculator")({
  head: () => ({
    meta: [
      { title: "AI ROI Calculator — Estimate Your NeuronX Return | NeuronX" },
      {
        name: "description",
        content:
          "Estimate the annual ROI of automating a workflow with NeuronX. Inputs: team size, hours saved, fully-loaded cost. Outputs: annual savings, payback period, 3-year NPV.",
      },
      { property: "og:title", content: "AI ROI Calculator — NeuronX" },
      {
        property: "og:description",
        content:
          "Estimate annual savings, payback period, and 3-year NPV for an AI deployment.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/roi-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/roi-calculator" }],
  }),
  component: ROICalculatorPage,
});

interface NumInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

function NumInput({ label, value, onChange, min, max, step, prefix, suffix, hint }: NumInputProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="font-mono text-sm text-foreground">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-foreground"
      />
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function ROICalculatorPage() {
  const [employees, setEmployees] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(85);
  const [automationRate, setAutomationRate] = useState(60);
  const [implementation, setImplementation] = useState(180000);
  const [annualOps, setAnnualOps] = useState(60000);

  const calc = useMemo(() => {
    const weeklySaved = employees * hoursPerWeek * (automationRate / 100);
    const annualHoursSaved = weeklySaved * 48;
    const grossAnnualSavings = annualHoursSaved * hourlyCost;
    const netYear1 = grossAnnualSavings - implementation - annualOps;
    const netRecurring = grossAnnualSavings - annualOps;

    const paybackMonths = netRecurring > 0 ? Math.max(1, (implementation / netRecurring) * 12) : Infinity;

    // Simple 3-yr NPV at 10% discount
    const r = 0.1;
    const npv3 = -implementation +
      (netRecurring) / (1 + r) +
      (netRecurring) / Math.pow(1 + r, 2) +
      (netRecurring) / Math.pow(1 + r, 3);

    const roi3 = ((netRecurring * 3 - implementation) / (implementation + annualOps * 3)) * 100;

    return {
      annualHoursSaved: Math.round(annualHoursSaved),
      grossAnnualSavings: Math.round(grossAnnualSavings),
      netYear1: Math.round(netYear1),
      netRecurring: Math.round(netRecurring),
      paybackMonths,
      npv3: Math.round(npv3),
      roi3: Math.round(roi3),
    };
  }, [employees, hoursPerWeek, hourlyCost, automationRate, implementation, annualOps]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <SiteShell>
      <PageHero
        eyebrow="ROI Calculator"
        title="What's your AI deployment worth?"
        description="Move the sliders. We've benchmarked these defaults against 40+ enterprise NeuronX deployments. No email required to see your number."
      />

      <section className="container-wide py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-lg font-semibold">Your scenario</h2>
            <div className="mt-6 space-y-7">
              <NumInput
                label="Team members affected"
                value={employees}
                onChange={setEmployees}
                min={5}
                max={2000}
                step={5}
                hint="Headcount whose work this AI system touches."
              />
              <NumInput
                label="Manual hours per person / week"
                value={hoursPerWeek}
                onChange={setHoursPerWeek}
                min={1}
                max={30}
                step={1}
                suffix=" hrs"
                hint="Hours currently spent on the workflow you'd automate."
              />
              <NumInput
                label="Fully-loaded hourly cost"
                value={hourlyCost}
                onChange={setHourlyCost}
                min={30}
                max={300}
                step={5}
                prefix="$"
                suffix=" / hr"
                hint="Salary + benefits + overhead. Defaults to a US enterprise knowledge-worker median."
              />
              <NumInput
                label="Automation / deflection rate"
                value={automationRate}
                onChange={setAutomationRate}
                min={20}
                max={95}
                step={5}
                suffix="%"
                hint="Realistic share of work an AI agent handles end-to-end. Most NeuronX deployments land at 55–75%."
              />
              <div className="border-t border-border pt-6">
                <NumInput
                  label="One-time implementation cost"
                  value={implementation}
                  onChange={setImplementation}
                  min={50000}
                  max={750000}
                  step={10000}
                  prefix="$"
                  hint="NeuronX fixed-scope pilots typically land $120k–$250k."
                />
              </div>
              <NumInput
                label="Annual ops & model cost"
                value={annualOps}
                onChange={setAnnualOps}
                min={12000}
                max={500000}
                step={6000}
                prefix="$"
                hint="Inference, hosting, monitoring, and maintenance."
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-foreground/20 bg-gradient-to-br from-card to-background p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <TrendingUp className="h-4 w-4" /> Estimated annual return
              </div>
              <div className="mt-4 font-mono text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                {fmt(calc.netRecurring)}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Net recurring savings — year 2 onward, after ops costs.
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Payback
                  </div>
                  <div className="mt-2 font-mono text-2xl text-foreground">
                    {Number.isFinite(calc.paybackMonths) ? `${calc.paybackMonths.toFixed(1)} mo` : "—"}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" /> 3-yr ROI
                  </div>
                  <div className="mt-2 font-mono text-2xl text-foreground">
                    {Number.isFinite(calc.roi3) ? `${calc.roi3}%` : "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">Breakdown</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  { label: "Annual hours saved", value: `${calc.annualHoursSaved.toLocaleString()} hrs` },
                  { label: "Gross annual savings", value: fmt(calc.grossAnnualSavings) },
                  { label: "Year-1 net (after implementation)", value: fmt(calc.netYear1) },
                  { label: "3-year NPV (10% discount)", value: fmt(calc.npv3) },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0 last:pb-0">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-mono text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">Want this on your letterhead?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Book a 30-min ROI audit. We'll validate your inputs against industry benchmarks and send a board-ready PDF within 48 hours.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary h-10 px-4 text-sm">
                  Book ROI audit <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
                <Link to="/case-studies" className="btn-ghost h-10 px-4 text-sm">
                  See real outcomes
                </Link>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Estimates are illustrative. Actual results depend on workflow complexity, data quality, and change-management investment. NeuronX customers typically see 40–80% of modeled savings in year 1, 95%+ from year 2.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
