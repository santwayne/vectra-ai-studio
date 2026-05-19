import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, MapPin, Briefcase, Sparkles } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — NeuronX" },
      {
        name: "description",
        content:
          "Join NeuronX. We're hiring AI engineers, product engineers, and applied researchers building production intelligence systems for serious businesses.",
      },
      { property: "og:title", content: "Careers — NeuronX" },
      {
        property: "og:description",
        content:
          "We're hiring AI and product engineers building production AI systems for enterprise teams.",
      },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    title: "Senior AI Engineer",
    location: "Toronto / Remote",
    type: "Full-time",
    desc: "Design and ship production AI systems — agents, RAG pipelines, model orchestration — for enterprise clients across industries.",
  },
  {
    title: "Product Engineer (Full-Stack)",
    location: "Toronto / Remote",
    type: "Full-time",
    desc: "Build the interfaces, integrations, and operational tooling that surround our AI systems. TypeScript, React, Postgres.",
  },
  {
    title: "Applied AI Researcher",
    location: "Remote",
    type: "Full-time",
    desc: "Bring research rigor to applied problems — evaluation, fine-tuning, retrieval architecture, and model selection.",
  },
  {
    title: "Solutions Architect",
    location: "Toronto",
    type: "Full-time",
    desc: "Translate enterprise problems into AI system designs. Lead discovery, scoping, and technical architecture for new engagements.",
  },
];

const values = [
  { title: "Ship in production", desc: "We measure ourselves by what runs, not what we present." },
  { title: "Deep generalists", desc: "We hire engineers who can move across the stack with rigor." },
  { title: "High-trust, low-overhead", desc: "Async by default. Few meetings. Clear ownership." },
];

function CareersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Careers"
        title="Build the AI infrastructure that real companies run on."
        description="We're a small, senior team of engineers shipping production AI for enterprise clients. If you want to do meaningful work without the bloat, you'll like it here."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#open-roles" className="btn-primary">
            See open roles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-wide">
          <span className="eyebrow">How we operate</span>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">
              A small team. Senior bar. High autonomy.
            </span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-7">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="section">
        <div className="container-wide">
          <span className="eyebrow">Open roles</span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gradient">Join the team</span>
          </h2>

          <div className="mt-10 space-y-3">
            {roles.map((r) => (
              <div
                key={r.title}
                className="glass-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {r.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" /> {r.type}
                    </span>
                  </div>
                </div>
                <Link to="/contact" className="btn-ghost shrink-0">
                  Apply <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="glass-card mt-12 flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <p className="text-lg">
              Don't see a role that fits? We're always interested in exceptional engineers.
            </p>
            <Link to="/contact" className="btn-primary">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
