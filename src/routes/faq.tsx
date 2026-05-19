import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NeuronX" },
      {
        name: "description",
        content:
          "Common questions about NeuronX's AI systems, engagement model, security, and timelines.",
      },
      { property: "og:title", content: "FAQ — NeuronX" },
      {
        property: "og:description",
        content:
          "How NeuronX engages, deploys, secures, and supports custom AI systems.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "What kinds of companies do you work with?",
    a: "We work primarily with mid-market and enterprise teams ($2M–$100M+ revenue) across HealthTech, FinTech, Logistics, Manufacturing, Professional Services, Real Estate, and Construction.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Pilots ship in 4–8 weeks. Full production deployments typically run 8–16 weeks depending on integration complexity. We move fast and iterate publicly with you.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. Every engagement starts under NDA. We're built for confidential, regulated, and competitive environments.",
  },
  {
    q: "How do you handle security and data privacy?",
    a: "All systems are built with role-based access control, audit logging, encrypted storage, and data residency requirements. We support deployment into your cloud or ours.",
  },
  {
    q: "Do we own the AI system you build?",
    a: "Yes. You own the code, the models, the data, and the deployment. We work as your engineering partner — not a vendor lock-in.",
  },
  {
    q: "What does pricing look like?",
    a: "Engagements are scoped per project after a free strategy session. Pricing depends on system complexity, integrations, and ongoing support requirements.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We offer SLA-backed support and continuous improvement plans for systems we ship.",
  },
  {
    q: "Can you integrate with our existing stack?",
    a: "Yes. We integrate with most major CRMs, ERPs, EMRs, data warehouses, and internal tools. If it has an API or database, we can connect to it.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteShell>
      <PageHero
        eyebrow="FAQ"
        title="Answers to the questions teams actually ask."
      />
      <section className="section">
        <div className="container-wide max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="glass-card overflow-hidden"
                  style={{ transform: "none" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >
                    <span className="text-base font-medium md:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="glass-card mt-12 flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <p className="text-lg">Still have questions?</p>
            <Link to="/contact" className="btn-primary">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
