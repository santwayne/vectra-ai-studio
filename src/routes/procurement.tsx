import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  FileText,
  Download,
  ShieldCheck,
  ClipboardCheck,
  Building2,
  Mail,
  FileSignature,
  Lock,
  Workflow,
  CheckCircle2,
  Timer,
  Circle,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/procurement")({
  head: () => ({
    meta: [
      { title: "Vendor Onboarding & Procurement Kit — NeuronX" },
      {
        name: "description",
        content:
          "Everything procurement, legal, and security teams need to onboard NeuronX as a vendor: MSA/DPA workflow, security intake, vendor forms, and W-9.",
      },
      { property: "og:title", content: "Vendor Onboarding & Procurement Kit — NeuronX" },
      {
        property: "og:description",
        content:
          "MSA, DPA, BAA, security questionnaires (SIG/CAIQ), insurance certificates, and vendor intake forms — all in one place.",
      },
    ],
  }),
  component: ProcurementPage,
});

const workflow = [
  {
    icon: Mail,
    step: "01",
    title: "Initial intake",
    desc: "Send your vendor request to procurement@neuronx.ai with scope, business unit, and target start date. We respond within one business day with a named account contact.",
  },
  {
    icon: FileSignature,
    step: "02",
    title: "Mutual NDA",
    desc: "We countersign your NDA, or send ours, within 24 hours. All discovery sessions begin under NDA.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Security intake & questionnaires",
    desc: "We complete SIG Lite, CAIQ v4, or your custom questionnaire within 5 business days. Trust artifacts (SOC 2, pen test, whitepaper) shared via secure data room.",
  },
  {
    icon: FileText,
    step: "04",
    title: "MSA / DPA / BAA review",
    desc: "Use our templates or redline yours. Standard turnaround: 7 business days for MSA, 3 for DPA. BAA available for HIPAA-regulated work.",
  },
  {
    icon: Building2,
    step: "05",
    title: "Vendor setup",
    desc: "We submit W-9, COI naming you as additional insured, banking details (ACH/wire), and complete your supplier portal (Coupa, Ariba, Workday, Oracle).",
  },
  {
    icon: CheckCircle2,
    step: "06",
    title: "PO issued — kickoff",
    desc: "Once PO is issued, kickoff scheduled within 5 business days with delivery lead, solutions architect, and your champion.",
  },
];

const documents = [
  {
    title: "Master Services Agreement (MSA)",
    desc: "Editable template with mutual indemnification, IP assignment, and limitation of liability.",
    type: "Template · DOCX",
  },
  {
    title: "Data Processing Agreement (DPA)",
    desc: "GDPR Article 28 + UK addendum + Standard Contractual Clauses (SCCs) included.",
    type: "Template · PDF",
  },
  {
    title: "Business Associate Agreement (BAA)",
    desc: "HIPAA-compliant template for healthcare engagements.",
    type: "Template · PDF",
  },
  {
    title: "Statement of Work (SOW)",
    desc: "Modular SOW template with milestones, acceptance criteria, and change-order process.",
    type: "Template · DOCX",
  },
  {
    title: "Service Level Agreement (SLA)",
    desc: "Standard SLA with uptime targets, response times, and remediation credits.",
    type: "Template · PDF",
  },
  {
    title: "Sub-processor List",
    desc: "Current list of all sub-processors, regions, and the data they touch. Updated quarterly.",
    type: "Document · PDF",
  },
];

const securityArtifacts = [
  { title: "SOC 2 Type II Report", note: "Signed NDA required" },
  { title: "Penetration Test Summary", note: "Annual, third-party" },
  { title: "Security Whitepaper", note: "Public download" },
  { title: "AI Model Governance Policy", note: "Public download" },
  { title: "Business Continuity & DR Plan", note: "Signed NDA required" },
  { title: "SIG Lite (pre-completed)", note: "Available on request" },
  { title: "CAIQ v4 (pre-completed)", note: "Available on request" },
  { title: "Cyber Liability Insurance COI", note: "$5M / $10M aggregate" },
];

const forms = [
  {
    title: "Vendor Intake Form",
    desc: "Single form: legal entity, tax ID, banking, insurance, and security contacts.",
    cta: "Open form",
  },
  {
    title: "W-9 / W-8BEN-E",
    desc: "U.S. and international tax documents pre-completed and downloadable.",
    cta: "Download",
  },
  {
    title: "Certificate of Insurance (COI)",
    desc: "Request a COI naming your entity as additional insured. 24-hour turnaround.",
    cta: "Request COI",
  },
  {
    title: "Supplier Portal Onboarding",
    desc: "We are pre-registered in Coupa, Ariba, Workday, and Oracle Supplier Network.",
    cta: "Send invite",
  },
];

const terms = [
  { label: "Standard payment terms", value: "Net-30 (Net-60 by exception)" },
  { label: "Accepted payment methods", value: "ACH · Wire · PO + Invoice" },
  { label: "Currency", value: "USD · EUR · GBP" },
  { label: "Tax ID (EIN)", value: "88-XXXXXXX" },
  { label: "D-U-N-S Number", value: "00-000-0000" },
  { label: "NAICS code", value: "541512 — Computer Systems Design" },
  { label: "Cage code", value: "Available on request" },
  { label: "Marketplace listings", value: "AWS · GCP · Azure (Q3 2026)" },
];

function ProcurementPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Procurement"
        title="Vendor onboarding & procurement kit"
        description="Everything your procurement, legal, and security teams need to onboard NeuronX. Templates, questionnaires, insurance, and a single named contact end-to-end."
      />

      {/* Quick contacts */}
      <section className="container-wide py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Procurement", email: "procurement@neuronx.ai" },
            { label: "Legal & Contracts", email: "legal@neuronx.ai" },
            { label: "Security & Compliance", email: "security@neuronx.ai" },
          ].map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-mono text-sm text-foreground">{c.email}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </section>

      {/* SLA status */}
      <section className="container-wide py-12">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Timer className="h-4 w-4" /> SLA & live status
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Turnaround times by stage
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Target SLAs for every step. Active requests show their current stage; reference ID is emailed at intake.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-muted-foreground">All systems on-SLA</span>
            </div>
          </div>

          {[
            { stage: "Initial intake", sla: "1 business day", status: "done" },
            { stage: "Mutual NDA", sla: "1 business day", status: "done" },
            { stage: "Security intake & questionnaires", sla: "5 business days", status: "active", note: "Day 2 of 5" },
            { stage: "MSA / DPA / BAA review", sla: "7 business days", status: "pending" },
            { stage: "Vendor setup (W-9, COI, portal)", sla: "3 business days", status: "pending" },
            { stage: "PO issued — kickoff scheduled", sla: "5 business days", status: "pending" },
          ].map((row, i, arr) => {
            const isDone = row.status === "done";
            const isActive = row.status === "active";
            return (
              <div key={row.stage} className="relative">
                <div
                  className={`flex items-center gap-4 py-4 ${
                    i < arr.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : isActive ? (
                      <Loader2 className="h-5 w-5 animate-spin text-foreground" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className={`text-sm font-medium ${
                          isActive ? "text-foreground" : isDone ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {row.stage}
                      </span>
                      {isActive && row.note && (
                        <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground">
                          {row.note}
                        </span>
                      )}
                      {isDone && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-500/80">
                          Complete
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">SLA</div>
                    <div className="font-mono text-sm text-foreground">{row.sla}</div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/40 p-4">
            <div className="text-xs text-muted-foreground">
              Sample request <span className="font-mono text-foreground">#NX-VR-2418</span> · opened 2 days ago · projected PO in <span className="text-foreground">~16 business days</span>
            </div>
            <a
              href="mailto:procurement@neuronx.ai?subject=Status%20update%20on%20vendor%20request"
              className="btn-ghost h-9 px-3 text-xs"
            >
              Check my request <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="container-wide py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Workflow className="h-4 w-4" /> End-to-end workflow
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              From intake to PO in ~3 weeks
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflow.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">{s.step}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contract templates */}
      <section className="container-wide py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <FileText className="h-4 w-4" /> Contract templates
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            MSA, DPA, BAA, SOW, SLA
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Use our templates as-is to accelerate review, or send us yours for redline. Most enterprise legal teams complete MSA review in under 7 business days.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {documents.map((d) => (
            <div key={d.title} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6">
              <div>
                <h3 className="text-base font-semibold">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {d.type}
                </div>
              </div>
              <a
                href="mailto:legal@neuronx.ai?subject=Request%20contract%20template"
                className="btn-ghost h-9 shrink-0 px-3 text-xs"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" /> Request
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Security intake */}
      <section className="container-wide py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="h-4 w-4" /> Security intake
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Trust artifacts & questionnaires
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We pre-complete SIG Lite and CAIQ v4 to cut your security review from weeks to days. NDA-gated artifacts shared via secure data room.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {securityArtifacts.map((a) => (
              <div key={a.title} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{a.title}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{a.note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/security" className="btn-ghost h-10 px-4 text-sm">
              View Trust Center
            </Link>
            <a href="mailto:security@neuronx.ai?subject=Security%20questionnaire%20request" className="btn-primary h-10 px-4 text-sm">
              Request artifacts <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="container-wide py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <ClipboardCheck className="h-4 w-4" /> Required forms
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Vendor setup forms
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {forms.map((f) => (
            <div key={f.title} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6">
              <div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
              <a
                href="mailto:procurement@neuronx.ai"
                className="btn-ghost h-9 shrink-0 px-3 text-xs"
              >
                {f.cta} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor facts */}
      <section className="container-wide py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Vendor facts</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use these to pre-fill your supplier-master record.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2">
            {terms.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                <dt className="text-sm text-muted-foreground">{t.label}</dt>
                <dd className="font-mono text-sm text-foreground">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-10 text-center md:p-16">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Get a named procurement contact today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Email procurement@neuronx.ai with your entity name, scope, and target start date. We respond within one business day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:procurement@neuronx.ai" className="btn-primary h-11 px-6 text-sm">
              Start vendor onboarding <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
            <Link to="/book" className="btn-ghost h-11 px-6 text-sm">
              Book a call instead
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
