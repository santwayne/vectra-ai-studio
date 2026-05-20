import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

import { Testimonials } from "@/components/Testimonials";
import { useReveal } from "@/hooks/use-reveal";
import { useParallax } from "@/hooks/use-parallax";
import { LiveAgentCard } from "@/components/LiveAgentCard";
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel";
import { HeroCaseStrip } from "@/components/HeroCaseStrip";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { StackStrip } from "@/components/StackStrip";
import { SecurityBand } from "@/components/SecurityBand";
import { EngagementModel } from "@/components/EngagementModel";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { LogoStrip } from "@/components/LogoStrip";
import timelineDiscovery from "@/assets/timeline-discovery.jpg";
import timelineDiscovery480 from "@/assets/timeline-discovery-480.jpg";
import timelineDiscovery768 from "@/assets/timeline-discovery-768.jpg";
import timelineDiscoveryAvif from "@/assets/timeline-discovery.avif";
import timelineDiscoveryAvif480 from "@/assets/timeline-discovery-480.avif";
import timelineDiscoveryAvif768 from "@/assets/timeline-discovery-768.avif";
import timelineDiscoveryWebp from "@/assets/timeline-discovery.webp";
import timelineDiscoveryWebp480 from "@/assets/timeline-discovery-480.webp";
import timelineDiscoveryWebp768 from "@/assets/timeline-discovery-768.webp";
import timelinePilot from "@/assets/timeline-pilot.jpg";
import timelinePilot480 from "@/assets/timeline-pilot-480.jpg";
import timelinePilot768 from "@/assets/timeline-pilot-768.jpg";
import timelinePilotAvif from "@/assets/timeline-pilot.avif";
import timelinePilotAvif480 from "@/assets/timeline-pilot-480.avif";
import timelinePilotAvif768 from "@/assets/timeline-pilot-768.avif";
import timelinePilotWebp from "@/assets/timeline-pilot.webp";
import timelinePilotWebp480 from "@/assets/timeline-pilot-480.webp";
import timelinePilotWebp768 from "@/assets/timeline-pilot-768.webp";
import timelineDeployment from "@/assets/timeline-deployment.jpg";
import timelineDeployment480 from "@/assets/timeline-deployment-480.jpg";
import timelineDeployment768 from "@/assets/timeline-deployment-768.jpg";
import timelineDeploymentAvif from "@/assets/timeline-deployment.avif";
import timelineDeploymentAvif480 from "@/assets/timeline-deployment-480.avif";
import timelineDeploymentAvif768 from "@/assets/timeline-deployment-768.avif";
import timelineDeploymentWebp from "@/assets/timeline-deployment.webp";
import timelineDeploymentWebp480 from "@/assets/timeline-deployment-480.webp";
import timelineDeploymentWebp768 from "@/assets/timeline-deployment-768.webp";
import { ArrowRight, Landmark, Gauge, Activity, Handshake, Sparkles } from "lucide-react";
import strategyDiscoveryImg from "@/assets/images/strategy/Discovery.png";
import strategyPilotImg from "@/assets/images/strategy/Pilot.png";
import strategyDeploymentImg from "@/assets/images/strategy/Deployment.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuronX — AI Solutions for Enterprises & Startups" },
      {
        name: "description",
        content:
          "NeuronX is an AI consulting and engineering partner. We help enterprises and startups turn AI into measurable business outcomes — from strategy to production.",
      },
      { property: "og:title", content: "NeuronX — AI Solutions for Enterprises & Startups" },
      {
        property: "og:description",
        content:
          "AI strategy, enterprise transformation, and startup product builds — engineered for measurable business outcomes.",
      },
    ],
  }),
  component: HomePage,
});

const reasons = [
  { icon: Landmark,    title: "Enterprise-grade",    desc: "SOC 2, SSO/SAML, audit logs, VPC and on-prem deployment options." },
  { icon: Gauge,       title: "Production in weeks", desc: "Pilots ship in 4–6 weeks against a measurable baseline. No demoware." },
  { icon: Activity,    title: "ROI-accountable",     desc: "Every system is tied to operational and financial KPIs you already track." },
  { icon: Handshake,   title: "Augments your team",  desc: "Designed around your process, your data, and your domain experts." },
];

function HomePage() {
  useReveal();
  const heroRef = useParallax<HTMLElement>();
  return (
    <SiteShell>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.16 0.02 260) 0%, oklch(0.14 0.012 260) 70%, var(--background) 100%)",
            }}
          />
          <div
            className="sky-layer animate-[sky-drift_22s_ease-in-out_infinite]"
            data-parallax="14"
            data-parallax-id="sky-1"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 30% 30%, oklch(0.72 0.18 250 / 0.5), transparent 60%), radial-gradient(ellipse 50% 60% at 80% 20%, oklch(0.74 0.16 165 / 0.3), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 grid-bg opacity-25"
            data-parallax="8"
            data-parallax-id="grid"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container-wide relative pb-10 pt-18 md:pb-18 md:pt-26">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="animate-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3 w-3" /> AI consulting & engineering partner
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]">
                <span className="text-gradient">Production AI systems,</span>{" "}
                <span className="text-shimmer">shipped in 6 weeks.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                NeuronX designs, builds, and operates custom AI agents, copilots, and
                automation for enterprises and funded startups — tied to KPIs you already track,
                deployed inside your VPC.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">AI strategy & advisory</span>
                <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">Enterprise AI transformation</span>
                <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">Startup MVPs & product builds</span>
                <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">Custom agents & copilots</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/demo" className="btn-primary">
                  Book a live demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/product" className="btn-ghost">
                  Explore the platform
                </Link>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                30 min · Run by an engineer · Walk away with an ROI + opportunity map.
              </p>
              {/* <div className="mt-10 border-t border-border/60 pt-6">
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                  Trusted by teams shipping AI in production
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Fortune 500 Insurer",       sub: "Insurance",      img: fortuneImg   },
                    { label: "Global Logistics",           sub: "Supply Chain",   img: logisticsImg },
                    { label: "Top-10 Health System",       sub: "Healthcare",     img: healthImg    },
                    { label: "Public FinTech",             sub: "Finance",        img: fintechImg   },
                    { label: "EU Industrial Group",        sub: "Manufacturing",  img: euImg        },
                    { label: "Series C SaaS",              sub: "AI Platform",    img: saasImg      },
                  ].map(({ label, sub, img }) => (
                    <div
                      key={label}
                      className="group flex flex-col items-center gap-1.5 rounded-lg border border-border/60 bg-surface/40 px-2 py-3 text-center transition-colors hover:border-primary/30 hover:bg-surface"
                    >
                      <div className="h-8 w-8 overflow-hidden rounded-md">
                        <img src={img} alt={label} className="h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="text-[11px] font-semibold leading-tight text-foreground/80">{label}</p>
                      <p className="text-[10px] text-muted-foreground/60">{sub}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-muted-foreground/50">
                  Client names withheld under NDA · References on request
                </p>
              </div> */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span>SOC 2 Type II</span>
                <span className="opacity-40">•</span>
                <span>GDPR</span>
                <span className="opacity-40">•</span>
                <span>SSO / SAML</span>
                <span className="opacity-40">•</span>
                <span>VPC & On-Prem</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <LiveAgentCard />
            </div>
          </div>

          <HeroCaseStrip />
        </div>
      </section>

      <LogoStrip />

      {/* STRATEGY → PRODUCTION TIMELINE */}
      <section className="section-tight border-b border-border">
        <div className="container-wide">
          <div className="reveal flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">From strategy to production</span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="text-gradient">A predictable path from idea to live system.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Three checkpoints. Real users on real data by week six. No open-ended retainers.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                label: "Discovery",
                time: "Week 1–2",
                desc: "Opportunity audit, ROI model, success metrics, and a prioritized roadmap.",
                singleImg: strategyDiscoveryImg,
                img: timelineDiscovery,
                img480: timelineDiscovery480,
                img768: timelineDiscovery768,
                avif: timelineDiscoveryAvif,
                avif480: timelineDiscoveryAvif480,
                avif768: timelineDiscoveryAvif768,
                webp: timelineDiscoveryWebp,
                webp480: timelineDiscoveryWebp480,
                webp768: timelineDiscoveryWebp768,
                alt: "Magnifier hovering over an isometric data roadmap",
              },
              {
                step: "02",
                label: "Pilot",
                time: "Week 3–6",
                desc: "Production-grade pilot against one workflow with real users and real data.",
                singleImg: strategyPilotImg,
                img: timelinePilot,
                img480: timelinePilot480,
                img768: timelinePilot768,
                avif: timelinePilotAvif,
                avif480: timelinePilotAvif480,
                avif768: timelinePilotAvif768,
                webp: timelinePilotWebp,
                webp480: timelinePilotWebp480,
                webp768: timelinePilotWebp768,
                alt: "Glowing beaker surrounded by workflow nodes",
              },
              {
                step: "03",
                label: "Deployment",
                time: "Week 7–12",
                desc: "Hardened rollout with SSO, audit logs, observability, and ongoing operation.",
                singleImg: strategyDeploymentImg,
                img: timelineDeployment,
                img480: timelineDeployment480,
                img768: timelineDeployment768,
                avif: timelineDeploymentAvif,
                avif480: timelineDeploymentAvif480,
                avif768: timelineDeploymentAvif768,
                webp: timelineDeploymentWebp,
                webp480: timelineDeploymentWebp480,
                webp768: timelineDeploymentWebp768,
                alt: "Server rack connected to a translucent shield with checkmark",
              },
            ].map((p, i, arr) => (
              <li
                key={p.step}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40 reveal reveal-delay-${i + 1}`}
              >
                <div className="relative -mx-6 -mt-6 mb-5 h-40 overflow-hidden border-b border-border bg-[oklch(0.16_0.02_260)]">
                  {"singleImg" in p && p.singleImg ? (
                    <img
                      src={p.singleImg}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover timeline-img-${i + 1}`}
                    />
                  ) : (
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={`${p.avif480} 480w, ${p.avif768} 768w, ${p.avif} 1024w`}
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw"
                      />
                      <source
                        type="image/webp"
                        srcSet={`${p.webp480} 480w, ${p.webp768} 768w, ${p.webp} 1024w`}
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw"
                      />
                      <img
                        src={p.img}
                        srcSet={`${p.img480} 480w, ${p.img768} 768w, ${p.img} 1024w`}
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw"
                        alt={p.alt}
                        width={1024}
                        height={640}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover timeline-img-${i + 1}`}
                      />
                    </picture>
                  )}
                  {/* shine sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  {/* bottom fade */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, oklch(0.14 0.012 260 / 0.85) 100%)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{p.step}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                    {p.time}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                {i < arr.length - 1 && (
                  <span
                    className="pointer-events-none absolute right-[-10px] top-1/2 hidden h-px w-5 -translate-y-1/2 bg-border md:block"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* SERVICES */}
      <ServicesShowcase />

      {/* INDUSTRIES */}
      <IndustriesGrid />

      {/* TECH STACK */}
      <StackStrip />

      {/* WHY NeuronX */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="container-wide relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="reveal">
              <span className="eyebrow">Why NeuronX</span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="text-gradient">
                  Built like infrastructure. Operated like a product.
                </span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                We don't ship demos. We deploy production AI systems that integrate cleanly
                with your stack, your data, and your team.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className={`glass-card glow-card hover-lift reveal reveal-delay-${(i % 4) + 1} p-6`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/20">
                    <r.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <CaseStudiesCarousel />

      {/* SECURITY */}
      <SecurityBand />

      {/* ENGAGEMENT MODEL */}
      <EngagementModel />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA */}
      <section className="section">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-16">
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
            <div className="reveal relative">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                <span className="text-gradient">
                  Ready to apply AI to real business problems?
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Book a strategy session. We'll map the highest-ROI AI opportunities inside your
                business in 30 minutes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary">
                  Talk to an expert <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/solutions" className="btn-ghost">
                  Explore solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
