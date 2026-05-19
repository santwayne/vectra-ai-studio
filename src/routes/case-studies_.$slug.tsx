import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { caseStudies, getCaseStudyBySlug, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/case-studies_/$slug")({
  loader: ({ params }): CaseStudy => {
    const study = getCaseStudyBySlug(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }: { loaderData?: CaseStudy }) => {
    const study = loaderData;
    if (!study) {
      return {
        meta: [{ title: "Case Study — NeuronX" }],
      };
    }
    const title = `${study.name} — NeuronX Case Study`;
    return {
      meta: [
        { title },
        { name: "description", content: study.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: study.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://vectra-ai-engine.lovable.app/case-studies/${study.slug}` },
      ],
      links: [
        { rel: "canonical", href: `https://vectra-ai-engine.lovable.app/case-studies/${study.slug}` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: study.name,
            description: study.tagline,
            articleSection: study.industry,
            author: { "@type": "Organization", name: "NeuronX" },
            publisher: {
              "@type": "Organization",
              name: "NeuronX",
              logo: {
                "@type": "ImageObject",
                url: "https://vectra-ai-engine.lovable.app/favicon-light.svg",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://vectra-ai-engine.lovable.app/case-studies/${study.slug}`,
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <PageHero
        eyebrow="Not Found"
        title="Case study not found"
        description="The case study you're looking for doesn't exist or has been moved."
      >
        <Link to="/case-studies" className="btn-primary">
          <ArrowLeft className="h-4 w-4" /> Back to all case studies
        </Link>
      </PageHero>
    </SiteShell>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <SiteShell>
        <PageHero
          eyebrow="Error"
          title="Something went wrong"
          description={error.message}
        >
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Retry
          </button>
        </PageHero>
      </SiteShell>
    );
  },
  component: CaseStudyDetailPage,
});

async function downloadSummary(study: CaseStudy) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const writeWrapped = (text: string, size: number, opts?: { bold?: boolean; gap?: number; color?: [number, number, number] }) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
    if (opts?.color) doc.setTextColor(...opts.color);
    else doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    for (const line of lines) {
      if (y > 760) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += size * 1.3;
    }
    y += opts?.gap ?? 6;
  };

  writeWrapped("NeuronX — Case Study Summary", 10, { color: [120, 120, 120], gap: 4 });
  writeWrapped(study.name, 22, { bold: true, gap: 2 });
  writeWrapped(study.industry, 11, { color: [100, 100, 140], gap: 14 });
  writeWrapped(study.tagline, 12, { gap: 18 });

  writeWrapped("Engagement", 13, { bold: true, gap: 6 });
  writeWrapped(`Timeline: ${study.timeline}`, 11);
  writeWrapped(`Team: ${study.teamSize}`, 11, { gap: 14 });

  writeWrapped("Problem", 13, { bold: true, gap: 6 });
  writeWrapped(study.problem, 11, { gap: 14 });

  writeWrapped("Approach", 13, { bold: true, gap: 6 });
  for (const step of study.approach) writeWrapped(`• ${step}`, 11);
  y += 8;

  writeWrapped("Solution", 13, { bold: true, gap: 6 });
  writeWrapped(study.solution, 11, { gap: 14 });

  writeWrapped("Architecture", 13, { bold: true, gap: 6 });
  for (const item of study.architecture) writeWrapped(`• ${item}`, 11);
  y += 8;

  writeWrapped("Results", 13, { bold: true, gap: 6 });
  for (const r of study.results) writeWrapped(`• ${r}`, 11);
  y += 8;

  writeWrapped("Key metrics", 13, { bold: true, gap: 6 });
  for (const m of study.metrics) writeWrapped(`${m.label}: ${m.value}`, 11);
  y += 8;

  writeWrapped("Tech stack", 13, { bold: true, gap: 6 });
  writeWrapped(study.stack.join(" · "), 11, { gap: 14 });

  if (study.quote) {
    writeWrapped("Client", 13, { bold: true, gap: 6 });
    writeWrapped(`"${study.quote.text}"`, 11, { gap: 6 });
    writeWrapped(`— ${study.quote.author}, ${study.quote.role}`, 10, { color: [110, 110, 110] });
  }

  doc.save(`neuronx-${study.slug}.pdf`);
}

function CaseStudyDetailPage() {
  const study = Route.useLoaderData() as CaseStudy;
  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <SiteShell>
      <PageHero eyebrow={study.industry} title={study.name} description={study.tagline}>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => downloadSummary(study)} className="btn-primary">
            <Download className="h-4 w-4" /> Download PDF summary
          </button>
          <Link to="/case-studies" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" /> All case studies
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="glass-card p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {m.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-gradient">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-3">
          <aside className="space-y-6 lg:col-span-1">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Timeline
              </p>
              <p className="mt-2 font-mono text-foreground">{study.timeline}</p>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                Team
              </p>
              <p className="mt-2 font-mono text-foreground">{study.teamSize}</p>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                Tech stack
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {study.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {study.quote && (
              <figure className="glass-card p-6">
                <blockquote className="text-foreground/90">
                  "{study.quote.text}"
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {study.quote.author}
                  </span>
                  <br />
                  {study.quote.role}
                </figcaption>
              </figure>
            )}
          </aside>

          <article className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Problem
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                {study.problem}
              </p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Approach
              </h2>
              <ol className="mt-3 space-y-3">
                {study.approach.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-sm text-primary">
                      0{i + 1}
                    </span>
                    <span className="text-foreground/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Solution
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                {study.solution}
              </p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Architecture
              </h2>
              <ul className="mt-3 space-y-2">
                {study.architecture.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Results
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {study.results.map((r) => (
                  <div
                    key={r}
                    className="rounded-xl border border-border bg-surface p-4 text-sm text-foreground/90"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <h2 className="text-2xl font-semibold tracking-tight">
              More case studies
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/case-studies/$slug"
                  params={{ slug: o.slug }}
                  className="glass-card group block p-6 transition hover:border-primary/40"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">
                    {o.industry}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {o.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {o.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-wide">
          <div className="glass-card flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
              <span className="text-gradient">
                Want a system like this for your business?
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
