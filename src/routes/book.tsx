import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  ArrowRight,
  Building2,
  Sparkles,
  Layers,
  Timer,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

type BookSearch = {
  use_case?: string;
  message?: string;
  source?: string;
  industry?: string;
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    use_case: typeof search.use_case === "string" ? search.use_case : undefined,
    message: typeof search.message === "string" ? search.message : undefined,
    source: typeof search.source === "string" ? search.source : undefined,
    industry: typeof search.industry === "string" ? search.industry : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Strategy Session — NeuronX" },
      {
        name: "description",
        content:
          "Book a 30-minute AI strategy session. We'll map the highest-ROI AI opportunities inside your business.",
      },
      { property: "og:title", content: "Book a Strategy Session — NeuronX" },
      {
        property: "og:description",
        content:
          "Book a free 30-minute AI strategy session with the NeuronX team.",
      },
    ],
  }),
  component: BookPage,
});

/* ------------------------------- Data ------------------------------- */

const INDUSTRIES = [
  { id: "financial", label: "Financial Services", desc: "Banking, insurance, fintech" },
  { id: "healthcare", label: "Healthcare & Life Sciences", desc: "Providers, payers, pharma" },
  { id: "retail", label: "Retail & E-commerce", desc: "DTC, marketplaces, brands" },
  { id: "manufacturing", label: "Manufacturing & Supply Chain", desc: "Industrial, logistics" },
  { id: "saas", label: "SaaS & Technology", desc: "B2B software, platforms" },
  { id: "professional", label: "Professional Services", desc: "Legal, consulting, agencies" },
  { id: "public", label: "Public Sector & Education", desc: "Government, universities" },
  { id: "other", label: "Other", desc: "Tell us more in the next step" },
] as const;

const USE_CASES = [
  { id: "agents", label: "Autonomous AI agents", desc: "Resolve work end-to-end" },
  { id: "copilot", label: "Internal copilot", desc: "Assist your operators & analysts" },
  { id: "support", label: "Customer support automation", desc: "Tickets, chat, voice" },
  { id: "rag", label: "Knowledge & RAG search", desc: "Search across docs, wikis, data" },
  { id: "ops", label: "Back-office automation", desc: "Finance, HR, claims, ops" },
  { id: "data", label: "Data & decision intelligence", desc: "Forecasting, scoring, insights" },
  { id: "genai", label: "Generative AI product feature", desc: "Embed GenAI in your product" },
  { id: "exploring", label: "Still exploring", desc: "Help us scope opportunities" },
] as const;

const SYSTEMS = [
  { id: "salesforce", label: "Salesforce" },
  { id: "hubspot", label: "HubSpot" },
  { id: "zendesk", label: "Zendesk" },
  { id: "intercom", label: "Intercom" },
  { id: "snowflake", label: "Snowflake" },
  { id: "databricks", label: "Databricks" },
  { id: "sap", label: "SAP / Oracle ERP" },
  { id: "ms365", label: "Microsoft 365 / Azure" },
  { id: "gws", label: "Google Workspace / GCP" },
  { id: "aws", label: "AWS" },
  { id: "postgres", label: "Postgres / MySQL" },
  { id: "custom", label: "Custom in-house stack" },
] as const;

const TIMELINES = [
  { id: "now", label: "Within 30 days", desc: "Active project, ready to start", priority: "P0" },
  { id: "quarter", label: "This quarter", desc: "Budgeted, scoping vendors", priority: "P1" },
  { id: "half", label: "Next 3–6 months", desc: "Planning & evaluation phase", priority: "P2" },
  { id: "exploring", label: "Just exploring", desc: "Education & strategy", priority: "P3" },
] as const;

const COMPANY_SIZES = [
  { id: "smb", label: "1–50" },
  { id: "mid", label: "51–500" },
  { id: "ent", label: "501–5,000" },
  { id: "large", label: "5,000+" },
] as const;

/* ------------------------- Routing logic ------------------------- */

type IndustryId = (typeof INDUSTRIES)[number]["id"];
type TimelineId = (typeof TIMELINES)[number]["id"];

const ROUTING: Record<IndustryId, { name: string; email: string; title: string }> = {
  financial: { name: "Marcus Chen", title: "Head of Financial Services", email: "marcus@neuronx.ai" },
  healthcare: { name: "Dr. Priya Anand", title: "Head of Healthcare", email: "priya@neuronx.ai" },
  retail: { name: "Sofia Reyes", title: "Head of Retail & Commerce", email: "sofia@neuronx.ai" },
  manufacturing: { name: "Jonas Weber", title: "Head of Industry & Supply Chain", email: "jonas@neuronx.ai" },
  saas: { name: "Alex Park", title: "Head of Technology Practice", email: "alex@neuronx.ai" },
  professional: { name: "Olivia Grant", title: "Head of Professional Services", email: "olivia@neuronx.ai" },
  public: { name: "Daniel Okafor", title: "Head of Public Sector", email: "daniel@neuronx.ai" },
  other: { name: "Mira Solis", title: "Head of New Markets", email: "mira@neuronx.ai" },
};

function slaFor(timeline: TimelineId): string {
  switch (timeline) {
    case "now": return "within 4 business hours";
    case "quarter": return "within 1 business day";
    case "half": return "within 2 business days";
    default: return "within 3 business days";
  }
}

/* ----------------------------- State ----------------------------- */

type FormState = {
  industry: IndustryId | "";
  industryOther: string;
  useCases: string[];
  companySize: string;
  systems: string[];
  systemsOther: string;
  timeline: TimelineId | "";
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

const INITIAL: FormState = {
  industry: "",
  industryOther: "",
  useCases: [],
  companySize: "",
  systems: [],
  systemsOther: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  role: "",
  message: "",
};

const STEPS = [
  { id: 1, label: "Industry", icon: Building2 },
  { id: 2, label: "Use case", icon: Sparkles },
  { id: 3, label: "Systems", icon: Layers },
  { id: 4, label: "Timeline", icon: Timer },
  { id: 5, label: "Contact", icon: Mail },
] as const;

/* ----------------------------- Page ----------------------------- */

function BookPage() {
  const search = Route.useSearch();
  const validUseCaseIds = useMemo(() => new Set<string>(USE_CASES.map((u) => u.id)), []);
  const validIndustryIds = useMemo(() => new Set<string>(INDUSTRIES.map((i) => i.id)), []);

  const [step, setStep] = useState(() => {
    // If we arrived with prefilled context, jump straight to the contact step.
    if (search.use_case || search.message || search.source) return 5;
    return 1;
  });
  const [data, setData] = useState<FormState>(() => {
    const next: FormState = { ...INITIAL };
    if (search.industry && validIndustryIds.has(search.industry)) {
      next.industry = search.industry as IndustryId;
    }
    if (search.use_case) {
      const ids = search.use_case.split(",").filter((id: string) => validUseCaseIds.has(id));
      if (ids.length) next.useCases = ids;
    }
    if (search.message) next.message = search.message;
    return next;
  });
  const [submitted, setSubmitted] = useState(false);

  const owner = useMemo(
    () => (data.industry ? ROUTING[data.industry as IndustryId] : null),
    [data.industry],
  );

  const canProceed = useMemo(() => {
    if (step === 1) return !!data.industry && (data.industry !== "other" || data.industryOther.trim().length > 1);
    if (step === 2) return data.useCases.length > 0;
    if (step === 3) return data.systems.length > 0 || data.systemsOther.trim().length > 1;
    if (step === 4) return !!data.timeline && !!data.companySize;
    if (step === 5)
      return (
        data.name.trim().length > 1 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
        data.company.trim().length > 1
      );
    return false;
  }, [step, data]);

  const progress = (step / STEPS.length) * 100;

  function next() {
    if (!canProceed) return;
    if (step < STEPS.length) setStep(step + 1);
    else setSubmitted(true);
  }
  function back() {
    if (step > 1) setStep(step - 1);
  }
  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }
  function toggleArr(key: "useCases" | "systems", value: string) {
    setData((d) => {
      const set = new Set(d[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...d, [key]: Array.from(set) };
    });
  }

  return (
    <SiteShell>
      <PageHero
        eyebrow="Book a Strategy Session"
        title="Map your highest-ROI AI opportunities in 30 minutes."
        description="Answer a few questions so we can route you to the right specialist and come prepared with relevant examples."
      />

      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-5">
          {/* Sidebar */}
          <aside className="space-y-4 lg:col-span-2">
            <div className="glass-card p-6">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Step {step} of {STEPS.length}
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.74_0.16_165)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <ul className="mt-6 space-y-3">
                {STEPS.map((s) => {
                  const active = s.id === step;
                  const done = s.id < step;
                  return (
                    <li key={s.id} className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ring-1 transition-colors ${
                          active
                            ? "bg-primary/15 text-primary ring-primary/40"
                            : done
                              ? "bg-emerald/15 text-emerald ring-emerald/30"
                              : "bg-white/5 text-muted-foreground ring-white/10"
                        }`}
                        style={done ? { color: "oklch(0.74 0.16 165)" } : undefined}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                      </span>
                      <span
                        className={`text-sm ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="glass-card p-6">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">30 minutes, zero fluff</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You'll talk to engineers who ship — not account managers.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted-foreground">
              <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
              All conversations are confidential. NDA available on request.
            </div>

            {owner && (
              <div className="glass-card p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Your specialist
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary ring-1 ring-primary/30">
                    {owner.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{owner.name}</p>
                    <p className="text-xs text-muted-foreground">{owner.title}</p>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 md:p-10">
              {submitted ? (
                <SuccessPanel data={data} />
              ) : (
                <>
                  {step === 1 && (
                    <Step
                      title="What industry are you in?"
                      hint="We'll route you to a specialist who's shipped AI in your sector."
                    >
                      <OptionGrid
                        options={INDUSTRIES}
                        value={data.industry}
                        onSelect={(v) => update("industry", v as IndustryId)}
                      />
                      {data.industry === "other" && (
                        <TextField
                          className="mt-5"
                          label="Tell us about your industry"
                          value={data.industryOther}
                          onChange={(v) => update("industryOther", v)}
                          placeholder="e.g. Renewable energy operator"
                        />
                      )}
                    </Step>
                  )}

                  {step === 2 && (
                    <Step
                      title="What are you trying to build?"
                      hint="Pick everything that's relevant — we'll prioritize on the call."
                    >
                      <OptionGrid
                        options={USE_CASES}
                        multi
                        values={data.useCases}
                        onToggle={(v) => toggleArr("useCases", v)}
                      />
                    </Step>
                  )}

                  {step === 3 && (
                    <Step
                      title="Which systems should the AI plug into?"
                      hint="So we can talk integrations with concrete reference architectures."
                    >
                      <ChipGrid
                        options={SYSTEMS}
                        values={data.systems}
                        onToggle={(v) => toggleArr("systems", v)}
                      />
                      <TextField
                        className="mt-5"
                        label="Other systems (optional)"
                        value={data.systemsOther}
                        onChange={(v) => update("systemsOther", v)}
                        placeholder="e.g. NetSuite, Stripe, Twilio, internal data lake"
                      />
                    </Step>
                  )}

                  {step === 4 && (
                    <Step
                      title="What's your timeline & team size?"
                      hint="This helps us match the right team and SLA."
                    >
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Project timeline
                      </p>
                      <div className="mt-3">
                        <OptionGrid
                          options={TIMELINES}
                          value={data.timeline}
                          onSelect={(v) => update("timeline", v as TimelineId)}
                        />
                      </div>
                      <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Company size
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {COMPANY_SIZES.map((s) => {
                          const active = data.companySize === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => update("companySize", s.id)}
                              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                                active
                                  ? "border-primary/60 bg-primary/15 text-primary"
                                  : "border-border bg-surface text-muted-foreground hover:border-primary/30 hover:text-foreground"
                              }`}
                            >
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </Step>
                  )}

                  {step === 5 && (
                    <Step
                      title="Where should we send your prep doc?"
                      hint={
                        owner
                          ? `${owner.name} will reply ${slaFor(data.timeline as TimelineId)}.`
                          : "We'll get back to you shortly."
                      }
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <TextField label="Full name" value={data.name} onChange={(v) => update("name", v)} required />
                        <TextField
                          label="Work email"
                          type="email"
                          value={data.email}
                          onChange={(v) => update("email", v)}
                          required
                        />
                        <TextField
                          label="Company"
                          value={data.company}
                          onChange={(v) => update("company", v)}
                          required
                        />
                        <TextField label="Role" value={data.role} onChange={(v) => update("role", v)} />
                      </div>
                      <div className="mt-5">
                        <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Anything specific you'd like us to prepare?
                        </label>
                        <textarea
                          rows={4}
                          value={data.message}
                          onChange={(e) => update("message", e.target.value)}
                          className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
                          placeholder="A workflow, KPI, or decision you'd like AI to support."
                        />
                      </div>
                    </Step>
                  )}

                  {/* Nav */}
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 1}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canProceed}
                      className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                    >
                      {step === STEPS.length ? "Request strategy session" : "Continue"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

/* --------------------------- Subcomponents --------------------------- */

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

type Option = { id: string; label: string; desc?: string };

function OptionGrid({
  options,
  value,
  values,
  multi,
  onSelect,
  onToggle,
}: {
  options: readonly Option[];
  value?: string;
  values?: string[];
  multi?: boolean;
  onSelect?: (v: string) => void;
  onToggle?: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const active = multi ? values?.includes(o.id) : value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => (multi ? onToggle?.(o.id) : onSelect?.(o.id))}
            className={`group relative rounded-2xl border p-4 text-left transition-all ${
              active
                ? "border-primary/60 bg-primary/10 shadow-[0_0_0_1px_oklch(0.72_0.18_250/0.4)]"
                : "border-border bg-surface hover:border-primary/30 hover:bg-surface-elevated"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{o.label}</p>
                {o.desc && <p className="mt-1 text-xs text-muted-foreground">{o.desc}</p>}
              </div>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                }`}
              >
                {active && <CheckCircle2 className="h-3.5 w-3.5" />}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ChipGrid({
  options,
  values,
  onToggle,
}: {
  options: readonly Option[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = values.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onToggle(o.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-surface text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function SuccessPanel({ data }: { data: FormState }) {
  const owner = data.industry ? ROUTING[data.industry as IndustryId] : ROUTING.other;
  const sla = slaFor((data.timeline as TimelineId) || "exploring");
  return (
    <div className="py-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">Request received.</h3>
      <p className="mt-3 text-muted-foreground">
        We've routed your request to <span className="text-foreground">{owner.name}</span>,{" "}
        {owner.title}. Expect a reply <span className="text-foreground">{sla}</span> with a
        calendar link and a short prep doc.
      </p>
      <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
        <Summary label="Industry" value={INDUSTRIES.find((i) => i.id === data.industry)?.label || data.industryOther} />
        <Summary
          label="Use cases"
          value={
            USE_CASES.filter((u) => data.useCases.includes(u.id))
              .map((u) => u.label)
              .join(", ") || "—"
          }
        />
        <Summary label="Timeline" value={TIMELINES.find((t) => t.id === data.timeline)?.label || "—"} />
      </div>
      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5 text-primary" /> A calendar invite will arrive at{" "}
        <span className="text-foreground">{data.email}</span>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
}
