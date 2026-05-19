import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { Linkedin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Leadership & Team — NeuronX" },
      {
        name: "description",
        content:
          "The named engineers, researchers, and operators behind NeuronX. Production AI experience across enterprise, regulated, and high-stakes environments.",
      },
      { property: "og:title", content: "Leadership & Team — NeuronX" },
      {
        property: "og:description",
        content:
          "Meet the people building production AI systems at NeuronX.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/team" },
    ],
    links: [
      { rel: "canonical", href: "https://vectra-ai-engine.lovable.app/team" },
    ],
  }),
  component: TeamPage,
});

const leadership = [
  {
    name: "Founder & CEO",
    role: "Chief Executive",
    bio: "15+ years building and shipping enterprise software. Previously led ML platform teams at scale.",
    linkedin: "#",
    initials: "FC",
  },
  {
    name: "Co-founder & CTO",
    role: "Chief Technology Officer",
    bio: "Applied ML researcher turned operator. Built production LLM and agent systems before they were trendy.",
    linkedin: "#",
    initials: "CT",
  },
  {
    name: "Head of Delivery",
    role: "VP, Engineering Delivery",
    bio: "Runs every pilot from week 1 to production cutover. Background in regulated FinTech delivery.",
    linkedin: "#",
    initials: "HD",
  },
  {
    name: "Head of Security",
    role: "CISO",
    bio: "Owns SOC 2, vendor risk, and customer security reviews. Prior security leadership at SaaS scale-ups.",
    linkedin: "#",
    initials: "HS",
  },
  {
    name: "Principal AI Engineer",
    role: "AI / Agents",
    bio: "Designs the agent and retrieval architectures behind our flagship deployments.",
    linkedin: "#",
    initials: "AE",
  },
  {
    name: "Principal Solutions Architect",
    role: "Enterprise Architecture",
    bio: "Translates business outcomes into reference architectures that survive procurement and security review.",
    linkedin: "#",
    initials: "SA",
  },
];

const advisors = [
  { name: "Advisor — Former CIO, Fortune 500 Insurance", role: "Enterprise GTM" },
  { name: "Advisor — Ex-Big Four AI Practice Lead", role: "AI Risk & Governance" },
  { name: "Advisor — Former Head of Platform, Public SaaS", role: "Engineering scale" },
];

function TeamPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="The team"
        title="Named operators behind every engagement."
        description="No offshore black box. Every NeuronX engagement is led by a senior engineer with their name on the work — backed by a team that has shipped AI in regulated, high-stakes environments."
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <div key={p.name} className="glass-card p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/5 font-mono text-sm font-semibold text-primary ring-1 ring-primary/20">
                    {p.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{p.bio}</p>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">Advisors</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">Operators who've been on the buying side.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Our advisory board has signed enterprise AI contracts, run security
              reviews, and owned production AI P&Ls. They keep us honest.
            </p>
          </div>
          <ul className="space-y-3">
            {advisors.map((a) => (
              <li key={a.name} className="glass-card p-5">
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="glass-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
              <span className="text-gradient">Want to talk to the people who'd actually build it?</span>
            </h2>
            <Link to="/book" className="btn-primary">
              Book a working session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
