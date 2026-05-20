import { Shield, ShieldCheck, Scale, Fingerprint, LockKeyhole, Building2, ListChecks } from "lucide-react";
import { Link } from "@tanstack/react-router";

const items = [
  { icon: ShieldCheck, title: "SOC 2 Type II", desc: "Audited controls across security, availability, and confidentiality." },
  { icon: Scale, title: "GDPR & DPA", desc: "EU data residency options and signed Data Processing Agreements." },
  { icon: Fingerprint, title: "SSO / SAML", desc: "Okta, Azure AD, Google Workspace. SCIM provisioning available." },
  { icon: LockKeyhole, title: "Encryption", desc: "AES-256 at rest, TLS 1.3 in transit. Customer-managed keys on request." },
  { icon: Building2, title: "Private deployment", desc: "VPC, single-tenant, or on-prem deployment for regulated workloads." },
  { icon: ListChecks, title: "Audit logs", desc: "Full request, prompt, and tool-call traces. Exportable to your SIEM." },
];

export function SecurityBand() {
  return (
    <section className="section relative border-y border-border bg-surface/30">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="reveal">
            <span className="eyebrow"><Shield className="h-3 w-3" /> Security & Compliance</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">Built for regulated, security-first enterprises.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              NeuronX deploys inside your security perimeter — not around it. Every system is built
              against enterprise controls from day one.
            </p>
            <Link to="/security" className="btn-ghost mt-6 inline-flex">View Trust Center</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <div key={it.title} className={`rounded-xl border border-border bg-surface/60 p-5 reveal reveal-delay-${(i % 4) + 1}`}>
                <it.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
