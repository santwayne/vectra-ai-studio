import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, ShieldCheck, Layers, Gauge, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NeuronX" },
      {
        name: "description",
        content:
          "NeuronX is an AI engineering company building production intelligence systems for serious businesses across HealthTech, FinTech, Logistics, and beyond.",
      },
      { property: "og:title", content: "About — NeuronX" },
      {
        property: "og:description",
        content:
          "We build production AI infrastructure for businesses that take operations seriously.",
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  { icon: ShieldCheck, title: "Security by default", desc: "Every system is designed with role-based access, audit trails, and data isolation from day one." },
  { icon: Layers, title: "Architecture first", desc: "We build systems that scale — not prompt hacks. Composable, observable, and replaceable." },
  { icon: Gauge, title: "Measured by ROI", desc: "Every deployment ships with KPIs. If it doesn't move the number, it doesn't ship." },
  { icon: Rocket, title: "Speed of execution", desc: "Pilots in weeks. Production in months. We don't believe in 18-month transformations." },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About NeuronX"
        title="An AI company built for the operational reality of business."
        description="NeuronX: movement, direction, intelligence. We design and deploy custom AI systems that move companies forward."
      />

      <section className="section">
        <div className="container-wide grid gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Our thesis</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">
                AI doesn't transform businesses. Engineered systems do.
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              The next decade of business advantage will come from companies
              that operationalize machine intelligence — not from those that
              demo it.
            </p>
            <p className="mt-4 text-muted-foreground">
              We exist to be the engineering partner that turns AI from a
              concept into infrastructure that actually runs your business.
            </p>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold">By the numbers</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                { v: "20+", l: "Production deployments" },
                { v: "7", l: "Industries served" },
                { v: "<10w", l: "Avg time to pilot" },
                { v: "100%", l: "NDA-friendly engagements" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-semibold text-gradient-brand">
                    {s.v}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <span className="eyebrow">Operating principles</span>
          <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">
              How we build, ship, and stay accountable.
            </span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="glass-card p-7">
                <p.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="glass-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
              <span className="text-gradient">
                Let's discuss the AI system your business actually needs.
              </span>
            </h2>
            <Link to="/book" className="btn-primary">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
