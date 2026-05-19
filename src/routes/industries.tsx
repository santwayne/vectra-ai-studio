import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  HeartPulse,
  Banknote,
  Truck,
  Factory,
  Briefcase,
  Building2,
  HardHat,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — NeuronX" },
      {
        name: "description",
        content:
          "AI systems for HealthTech, FinTech, Logistics, Manufacturing, Professional Services, Real Estate, and Construction.",
      },
      { property: "og:title", content: "Industries — NeuronX" },
      {
        property: "og:description",
        content:
          "Industry-specific AI: HealthTech, FinTech, Logistics, Manufacturing, Professional Services, Real Estate, Construction.",
      },
    ],
  }),
  component: IndustriesPage,
});

const industries = [
  {
    icon: HeartPulse,
    name: "HealthTech",
    desc: "Scheduling automation, patient communication, and internal staff productivity tools for clinics and healthcare software.",
    items: ["Appointment automation", "Patient intake AI", "Clinical knowledge assistants", "Admin workflow agents"],
  },
  {
    icon: Banknote,
    name: "FinTech",
    desc: "KYC workflows, fraud alerts, risk intelligence, and AI-driven client onboarding for lenders, payments, and wealth platforms.",
    items: ["KYC + onboarding AI", "Fraud detection", "Risk summarization", "Compliance copilots"],
  },
  {
    icon: Truck,
    name: "Logistics & Supply Chain",
    desc: "Dispatch copilots, route intelligence, and load optimization for freight, warehousing, and last-mile operations.",
    items: ["Dispatch automation", "Route intelligence", "Load matching AI", "Ops dashboards"],
  },
  {
    icon: Factory,
    name: "Industrial & Manufacturing",
    desc: "Internal SOP knowledge bots, proposal engines, and predictive systems for plant and operations teams.",
    items: ["SOP & docs assistant", "Proposal generation", "Predictive maintenance", "Quality intelligence"],
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    desc: "Document summarization, intake systems, and research assistants for law, accounting, and consulting firms.",
    items: ["Document summarization", "Client intake AI", "Research assistants", "Engagement automation"],
  },
  {
    icon: Building2,
    name: "Real Estate",
    desc: "Operational AI for brokerages, property management, and investor platforms.",
    items: ["Lead qualification", "Document automation", "Investor reporting", "Tenant communications"],
  },
  {
    icon: HardHat,
    name: "Construction",
    desc: "Estimation AI, quote systems, and workflow automation for GCs and trades.",
    items: ["Estimation AI", "Quote generation", "RFI summarization", "Project intelligence"],
  },
];

function IndustriesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Industries"
        title="AI infrastructure tuned to your industry."
        description="Same architectural rigor. Different operational context. We build systems that understand the workflows, vocabulary, and constraints of your sector."
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2">
            {industries.map((ind) => (
              <div key={ind.name} className="glass-card p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <ind.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {ind.name}
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {ind.desc}
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {ind.items.map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="glass-card flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="text-gradient">
                  Don't see your industry?
                </span>
              </h2>
              <p className="mt-2 text-muted-foreground">
                We've shipped systems across regulated, high-stakes, and operationally complex businesses.
              </p>
            </div>
            <Link to="/book" className="btn-primary">
              Talk to experts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
