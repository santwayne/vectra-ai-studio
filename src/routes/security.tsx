import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, Lock, ShieldCheck, Server, KeyRound, FileCheck, Users, FileText, Download, Mail, Globe, Clock, Database, Trash2, Eye, AlertTriangle, BadgeCheck, MapPin } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — NeuronX" },
      {
        name: "description",
        content:
          "How NeuronX designs, deploys, and operates AI systems with enterprise-grade security: encryption, access controls, audit logging, and data isolation.",
      },
      { property: "og:title", content: "Security — NeuronX" },
      {
        property: "og:description",
        content:
          "Enterprise-grade security across every NeuronX AI deployment.",
      },
    ],
  }),
  component: SecurityPage,
});

const pillars = [
  { icon: Lock, title: "Encryption", desc: "TLS 1.3 in transit. AES-256 at rest. Field-level encryption available for sensitive data." },
  { icon: KeyRound, title: "Access control", desc: "Role-based access, principle of least privilege, and short-lived credentials by default." },
  { icon: ShieldCheck, title: "Audit logging", desc: "Every privileged action is logged immutably. Audit exports available on request." },
  { icon: Server, title: "Data isolation", desc: "Per-tenant data partitioning. Deploy into your cloud, our cloud, or a hybrid model." },
  { icon: FileCheck, title: "Compliance-aligned", desc: "Architectures aligned with SOC 2, HIPAA, and GDPR controls. We support audit prep." },
  { icon: Users, title: "Vendor controls", desc: "All third-party AI providers reviewed. PII redaction available on request." },
];

const practices = [
  "All engagements begin under NDA",
  "PII is never used to train third-party models without explicit consent",
  "Customer data is logically and (where required) physically isolated",
  "Quarterly access reviews on all production systems",
  "Secrets stored in managed vaults — never in source",
  "Dependency scanning and automated patching pipelines",
];

const certifications = [
  { name: "SOC 2 Type II", status: "Active", scope: "Security, Availability, Confidentiality", auditor: "Prescient Assurance", window: "Jul 2024 – Jun 2025", next: "Jul 2026" },
  { name: "ISO/IEC 27001:2022", status: "Active", scope: "ISMS — all production systems and offices", auditor: "Schellman", window: "Issued Mar 2025", next: "Surveillance Mar 2026" },
  { name: "ISO/IEC 27701:2019", status: "Active", scope: "Privacy Information Management (PIMS)", auditor: "Schellman", window: "Issued Mar 2025", next: "Surveillance Mar 2026" },
  { name: "ISO/IEC 42001:2023", status: "In progress", scope: "AI Management System — Stage 1 complete", auditor: "Schellman", window: "Stage 2 audit Q3 2026", next: "Certification target Q4 2026" },
  { name: "HIPAA", status: "Aligned", scope: "PHI workloads — BAA available", auditor: "Self-attested, third-party reviewed", window: "Annual control review", next: "Mar 2026" },
  { name: "GDPR & UK GDPR", status: "Compliant", scope: "EU/UK personal data — DPA + SCCs", auditor: "DLA Piper (legal)", window: "Continuous", next: "—" },
  { name: "EU AI Act readiness", status: "Aligned", scope: "High-risk system controls + transparency", auditor: "Internal + Bird & Bird (legal)", window: "Article 6 / Annex III mapping", next: "Aug 2026 enforcement" },
  { name: "PCI DSS", status: "Out of scope", scope: "We do not store cardholder data — Stripe-tokenized", auditor: "—", window: "—", next: "—" },
];

const lifecycle = [
  { icon: Database, title: "Collection", desc: "Only data required for the contracted use case. Schema reviewed before ingest. PII fields tagged at source." },
  { icon: Lock, title: "Transit & storage", desc: "TLS 1.3 in transit, AES-256-GCM at rest, envelope encryption with KMS-managed CMKs. Customer-managed keys (BYOK) on Enterprise." },
  { icon: Eye, title: "Access & use", desc: "Just-in-time access via SSO + MFA. All inference and tool calls logged with prompt hashes. Customer data never trains third-party models." },
  { icon: MapPin, title: "Residency", desc: "US (us-east-1, us-west-2), EU (eu-central-1, eu-west-1), UK (eu-west-2). Region pinned per tenant — no cross-region replication without consent." },
  { icon: Clock, title: "Retention", desc: "Operational data: 90 days default, configurable 0–7 years. Audit logs: 1 year hot, 7 years cold. Backups: 35 days, encrypted." },
  { icon: Trash2, title: "Deletion", desc: "DSAR + tenant-wide purge within 30 days of request. Cryptographic erasure on key revocation. Certificate of deletion on request." },
];

const subprocessors = [
  { name: "Amazon Web Services", purpose: "Primary infrastructure & storage", region: "US, EU, UK" },
  { name: "Google Cloud Platform", purpose: "Secondary infrastructure & Vertex AI", region: "US, EU" },
  { name: "Microsoft Azure", purpose: "Azure OpenAI for regulated tenants", region: "US, EU" },
  { name: "OpenAI (ZDR)", purpose: "LLM inference — Zero Data Retention", region: "US" },
  { name: "Anthropic (ZDR)", purpose: "Claude inference — Zero Data Retention", region: "US, EU" },
  { name: "Cloudflare", purpose: "CDN, WAF, DDoS protection", region: "Global" },
  { name: "Datadog", purpose: "Observability & SIEM forwarding", region: "US, EU" },
  { name: "Vanta", purpose: "Continuous compliance monitoring", region: "US" },
];

const incidentSteps = [
  { phase: "Detect", time: "< 5 min", desc: "24/7 SIEM alerting, anomaly detection, customer reports triaged immediately." },
  { phase: "Triage", time: "< 30 min", desc: "On-call security engineer engages; severity classified P0–P3 per runbook." },
  { phase: "Contain", time: "< 2 h (P0)", desc: "Isolate affected systems, rotate credentials, preserve forensic evidence." },
  { phase: "Notify", time: "< 24 h", desc: "Affected customers notified per DPA. Regulators within 72 h where required (GDPR Art. 33)." },
  { phase: "Remediate", time: "Tracked to closure", desc: "Root cause analysis, control remediation, post-incident review shared with customers." },
];

function SecurityPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Security"
        title="Built like infrastructure. Operated like a product."
        description="Security isn't a phase of our delivery — it's a design constraint from day one. Here's how we approach it."
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="glass-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section border-t border-border">
        <div className="container-wide">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow"><BadgeCheck className="h-3 w-3" /> Certifications & attestations</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="text-gradient">Audited, attested, and continuously monitored.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Current status across the frameworks enterprise procurement teams ask about. Letters of engagement and full reports available under NDA.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Framework</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Scope</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Auditor</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Window</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Next milestone</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((c) => (
                  <tr key={c.name} className="border-t border-border bg-surface/20 align-top">
                    <td className="px-5 py-4 font-semibold text-foreground">{c.name}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${
                        c.status === "Active" || c.status === "Compliant"
                          ? "bg-primary/10 text-primary ring-primary/20"
                          : c.status === "In progress" || c.status === "Aligned"
                          ? "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                          : "bg-muted text-muted-foreground ring-border"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{c.scope}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{c.auditor}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{c.window}</td>
                    <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{c.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Operating practices</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">
                The security defaults inside every engagement.
              </span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              These are baseline practices. We extend them to meet specific
              regulatory or contractual requirements.
            </p>
          </div>
          <ul className="space-y-3">
            {practices.map((p) => (
              <li key={p} className="glass-card flex items-start gap-3 p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container-wide">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow"><FileText className="h-3 w-3" /> Trust artifacts</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="text-gradient">Documents available on request.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Most artifacts are released under mutual NDA via our Trust Center. Typical
              turnaround for qualified buyers: 1 business day.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "SOC 2 Type II Report", desc: "Most recent audit window. Released under mutual NDA." },
              { title: "Penetration Test Summary", desc: "Annual third-party pentest. Executive summary + remediation status." },
              { title: "Security Whitepaper", desc: "Architecture, data flows, encryption, key management." },
              { title: "Sub-processor List", desc: "All third-party processors, regions, and data categories." },
              { title: "SIG / CAIQ Questionnaire", desc: "Pre-completed standard vendor security questionnaires." },
              { title: "DPA & MSA Templates", desc: "GDPR-compliant DPA, mutual NDA, and master services agreement." },
              { title: "BAA (Healthcare)", desc: "HIPAA Business Associate Agreement for PHI workloads." },
              { title: "Insurance Certificates", desc: "Cyber liability and E&O coverage. COI on request." },
              { title: "AI Model Governance", desc: "Models in use, data retention, training opt-outs, eval methodology." },
            ].map((a) => (
              <div key={a.title} className="glass-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold">{a.title}</h3>
                  <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="data-handling" className="section border-t border-border">
        <div className="container-wide">
          <span className="eyebrow"><Database className="h-3 w-3" /> Data handling</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">The full lifecycle of customer data.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From the moment data enters a NeuronX system until it is verifiably destroyed — every stage has a defined control, owner, and audit trail.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lifecycle.map((l) => (
              <div key={l.title} className="glass-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <l.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{l.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="subprocessors" className="section border-t border-border">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow"><Globe className="h-3 w-3" /> Sub-processors</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">Every vendor that touches your data.</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              We notify customers 30 days before adding or changing a sub-processor. Subscribe to updates at{" "}
              <a href="mailto:trust@neuronx.ai" className="text-primary hover:text-primary/80">trust@neuronx.ai</a>.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Provider</th>
                  <th className="px-5 py-3 font-medium">Purpose</th>
                  <th className="px-5 py-3 font-medium">Region</th>
                </tr>
              </thead>
              <tbody>
                {subprocessors.map((s) => (
                  <tr key={s.name} className="border-t border-border bg-surface/20">
                    <td className="px-5 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.purpose}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="incident-response" className="section border-t border-border">
        <div className="container-wide">
          <span className="eyebrow"><AlertTriangle className="h-3 w-3" /> Incident response</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">A documented runbook, rehearsed quarterly.</span>
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {incidentSteps.map((s, i) => (
              <div key={s.phase} className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                  <span className="text-xs font-medium text-primary">{s.time}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{s.phase}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section border-t border-border">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-card p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">Report a vulnerability</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Coordinated disclosure under our safe-harbor policy. Acknowledged within 24 hours; resolution timeline shared within 5 business days.
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                <Row label="Email" value={<a href="mailto:security@neuronx.ai" className="text-primary hover:text-primary/80">security@neuronx.ai</a>} />
                <Row label="PGP" value={<a href="/security/pgp-key.asc" className="text-primary hover:text-primary/80">Key 0xA1B2 C3D4</a>} />
                <Row label="Policy" value={<a href="/.well-known/security.txt" className="text-primary hover:text-primary/80">/.well-known/security.txt</a>} />
              </dl>
            </div>

            <div className="glass-card p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">Trust & compliance</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For SOC 2 / ISO reports, security questionnaires (SIG, CAIQ), DPAs, BAAs, and sub-processor notifications.
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                <Row label="Email" value={<a href="mailto:trust@neuronx.ai" className="text-primary hover:text-primary/80">trust@neuronx.ai</a>} />
                <Row label="SLA" value={<span className="text-foreground/90">1 business day</span>} />
                <Row label="Portal" value={<Link to="/security" className="text-primary hover:text-primary/80">Trust Center</Link>} />
              </dl>
            </div>

            <div className="glass-card p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">Privacy & DSAR</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Data subject access, deletion, and rectification requests under GDPR, UK GDPR, CCPA, and similar regimes.
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                <Row label="Email" value={<a href="mailto:privacy@neuronx.ai" className="text-primary hover:text-primary/80">privacy@neuronx.ai</a>} />
                <Row label="DPO" value={<span className="text-foreground/90">Avela Saiti, EU rep</span>} />
                <Row label="Response" value={<span className="text-foreground/90">Within 30 days</span>} />
              </dl>
            </div>
          </div>

          <div className="glass-card mt-6 grid gap-6 p-8 md:grid-cols-[2fr_1fr] md:items-center">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                <span className="text-gradient">Need a doc pack for procurement?</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We bundle SOC 2 Type II, ISO 27001 certificate, pentest summary, sub-processor list, DPA, and a pre-filled SIG questionnaire. Typical turnaround: 1 business day under mutual NDA.
              </p>
            </div>
            <Link to="/contact" className="btn-primary justify-self-start md:justify-self-end">
              Request docs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}
