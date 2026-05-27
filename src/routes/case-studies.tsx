import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import {
  sanityClient,
  sanityEnabled,
  CASE_STUDIES_QUERY,
  type SanityCaseStudy,
} from "@/lib/sanity";
import { caseStudies as fallbackCases } from "@/data/caseStudies";
import rouseNavigatorImg    from "@/assets/images/case-study/images/Rouse Navigator.jpg.png";
import fintechImg           from "@/assets/images/case-study/images/FinTech Risk Analyzer.jpg.png";
import healthClinicImg      from "@/assets/images/case-study/images/Health Clinic AI Assistant.jpg.jpeg";
import logisticsImg         from "@/assets/images/case-study/images/Logistics Ops Dashboard.jpg.jpeg";
import stridePulseImg       from "@/assets/images/case-study/images/StridePulse.jpg.jpeg";
import vitalSyncImg         from "@/assets/images/case-study/images/VitalSync IoT.jpg.jpeg";
import fairwayIQImg         from "@/assets/images/case-study/images/FairwayIQ.jpg.jpeg";
import linguaBridgeImg      from "@/assets/images/case-study/images/LinguaBridge.jpg.jpeg";
import kindCubeImg          from "@/assets/images/case-study/images/KindCube.jpg.jpeg";

const caseCardImages: Record<string, string> = {
  "rouse-navigator":          rouseNavigatorImg,
  "fintech-risk-analyzer":    fintechImg,
  "health-clinic-ai-assistant": healthClinicImg,
  "logistics-ops-dashboard":  logisticsImg,
  "stridepulse":              stridePulseImg,
  "vitalsync-iot":            vitalSyncImg,
  "fairwayiq":                fairwayIQImg,
  "linguabridge":             linguaBridgeImg,
  "kindcube":                 kindCubeImg,
};

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — NeuronX" },
      {
        name: "description",
        content:
          "Production AI systems delivered for industrial, fintech, healthcare, and logistics teams. Real problems, measurable results.",
      },
      { property: "og:title", content: "Case Studies — NeuronX" },
      {
        property: "og:description",
        content:
          "How NeuronX's AI systems are delivering measurable results across industries.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/case-studies" },
    ],
    links: [
      { rel: "canonical", href: "https://vectra-ai-engine.lovable.app/case-studies" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "NeuronX Case Studies",
          url: "https://vectra-ai-engine.lovable.app/case-studies",
          description:
            "Production AI systems delivered for industrial, fintech, healthcare, and logistics teams.",
          isPartOf: {
            "@type": "WebSite",
            name: "NeuronX",
            url: "https://vectra-ai-engine.lovable.app",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: fallbackCases.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://vectra-ai-engine.lovable.app/case-studies/${c.slug}`,
              item: {
                "@type": "Article",
                "@id": `https://vectra-ai-engine.lovable.app/case-studies/${c.slug}`,
                headline: c.name,
                description: c.tagline,
                about: c.industry,
                articleSection: c.industry,
                keywords: c.stack.join(", "),
                author: {
                  "@type": "Organization",
                  name: "NeuronX Intelligence Inc.",
                },
                publisher: {
                  "@type": "Organization",
                  name: "NeuronX Intelligence Inc.",
                  url: "https://vectra-ai-engine.lovable.app",
                },
              },
            })),
          },
        }),
      },
    ],
  }),
  component: CaseStudiesPage,
});

interface DisplayCase {
  slug: string;
  name: string;
  industry: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  timeline: string;
  results: string[];
  headline: { label: string; value: string };
  stack: string[];
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function categorize(industry: string): string {
  const i = industry.toLowerCase();
  if (i.includes("fintech")) return "FinTech";
  if (i.includes("health")) return "HealthTech";
  if (i.includes("logist")) return "Logistics";
  if (i.includes("industrial") || i.includes("automotive")) return "Industrial";
  if (i.includes("sport") || i.includes("consumer") || i.includes("lifestyle") || i.includes("hardware") || i.includes("hospitality"))
    return "Consumer";
  if (i.includes("ed")) return "EdTech";
  return "Other";
}

function pickHeadlineMetric(results: string[], metrics?: { label: string; value: string }[]): { label: string; value: string } {
  if (metrics && metrics.length > 0) {
    return { label: metrics[0].label, value: metrics[0].value };
  }
  if (results.length > 0) {
    const r = results[0];
    const match = r.match(/(\d+[\d.,]*\s*[×x%+]?|<\s*\d+\s*\w*)/);
    return { label: "Outcome", value: match ? match[0] : r.slice(0, 20) };
  }
  return { label: "Result", value: "—" };
}

function CaseStudiesPage() {
  const [cases, setCases] = useState<SanityCaseStudy[] | null>(null);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    if (!sanityEnabled) return;
    sanityClient
      .fetch<SanityCaseStudy[]>(CASE_STUDIES_QUERY)
      .then((data) => setCases(data))
      .catch(() => setCases([]));
  }, []);

  const displayCases: DisplayCase[] = useMemo(() => {
    const source: DisplayCase[] =
      sanityEnabled && cases && cases.length > 0
        ? cases.map((c) => ({
            slug: c.slug?.current ?? slugify(c.title),
            name: c.title,
            industry: c.industry ?? "—",
            category: categorize(c.industry ?? ""),
            tagline: c.problem?.slice(0, 140) ?? "",
            problem: c.problem ?? "",
            solution: c.solution ?? "",
            timeline: c.timeline ?? "—",
            results: c.results ?? [],
            headline: pickHeadlineMetric(c.results ?? []),
            stack: c.stack ?? [],
          }))
        : fallbackCases.map((c) => ({
            slug: c.slug,
            name: c.name,
            industry: c.industry,
            category: categorize(c.industry),
            tagline: c.tagline,
            problem: c.problem,
            solution: c.solution,
            timeline: c.timeline,
            results: c.results,
            headline: pickHeadlineMetric(c.results, c.metrics),
            stack: c.stack,
          }));
    return source;
  }, [cases]);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    displayCases.forEach((c) => set.add(c.category));
    return Array.from(set);
  }, [displayCases]);

  const filtered = filter === "All" ? displayCases : displayCases.filter((c) => c.category === filter);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Customer outcomes"
        title="Real systems. Real businesses. Real results."
        description="Each story is structured around the workflow we changed and the metric that moved. Filter by industry to find one close to your own."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/demo" className="btn-primary">
            See a live demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/product" className="btn-ghost">
            How the platform works
          </Link>
        </div>
      </PageHero>

      {/* Filters */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-wide flex flex-wrap items-center gap-2 py-5">
          <span className="mr-2 text-xs uppercase tracking-widest text-muted-foreground">
            Industry
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                filter === c
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </span>
        </div>
      </section>

      {/* Outcome-focused card grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link
                key={c.slug}
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors hover:border-primary/40"
              >
                {/* card image */}
                {caseCardImages[c.slug] && (
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={caseCardImages[c.slug]}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-border bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {c.industry}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {c.timeline}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  {c.name}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.tagline}</p>

                {/* Headline metric */}
                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/80">
                    <TrendingUp className="h-3 w-3" />
                    {c.headline.label}
                  </div>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                    {c.headline.value}
                  </p>
                </div>

                {/* Secondary results */}
                {c.results.length > 1 && (
                  <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    {c.results.slice(1, 3).map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        <span className="line-clamp-1">{r}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {c.stack.slice(0, 2).join(" · ") || "Custom stack"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-primary">
                    Read story
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No stories in this category yet. Try a different filter.
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section pt-0">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-14">
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
            <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  <span className="text-gradient">
                    Have a workflow like one of these? Let's run yours next.
                  </span>
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  We'll spend 30 minutes on a live demo with your actual data — and leave you with
                  a written opportunity map.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link to="/demo" className="btn-primary">
                  Book a live demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/roi-calculator" className="btn-ghost">
                  Estimate ROI yourself
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
