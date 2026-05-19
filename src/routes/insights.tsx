import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import {
  sanityClient,
  sanityEnabled,
  POSTS_QUERY,
  type SanityPost,
} from "@/lib/sanity";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — NeuronX" },
      {
        name: "description",
        content:
          "Field notes on building production AI systems — architecture, deployment, ROI, and the operational realities of enterprise machine intelligence.",
      },
      { property: "og:title", content: "Insights — NeuronX" },
      {
        property: "og:description",
        content:
          "Notes from the field on building production-grade AI infrastructure.",
      },
    ],
  }),
  component: InsightsPage,
});

const fallbackPosts = [
  {
    tag: "Architecture",
    title: "Why your first AI system should be invisible",
    desc: "The most valuable AI systems we've shipped don't have UIs. They sit inside existing workflows and just remove work.",
    date: "Coming soon",
  },
  {
    tag: "FinTech",
    title: "Risk summarization without the hallucinations",
    desc: "How we built an underwriting copilot that produces audit-ready output across 30+ structured signals.",
    date: "Coming soon",
  },
  {
    tag: "Operations",
    title: "ROI math for enterprise AI deployments",
    desc: "A pragmatic framework for evaluating where AI actually moves the financial needle in mid-market businesses.",
    date: "Coming soon",
  },
  {
    tag: "Engineering",
    title: "Agents in production: what actually works",
    desc: "Patterns we've validated across 20+ deployments — and the agent architectures that consistently fail.",
    date: "Coming soon",
  },
];

function InsightsPage() {
  const [posts, setPosts] = useState<SanityPost[] | null>(null);

  useEffect(() => {
    if (!sanityEnabled) return;
    sanityClient
      .fetch<SanityPost[]>(POSTS_QUERY)
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  const displayPosts =
    sanityEnabled && posts
      ? posts.map((p) => ({
          tag: p.tag ?? "Insight",
          title: p.title,
          desc: p.excerpt ?? "",
          date: p.publishedAt
            ? new Date(p.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "",
        }))
      : fallbackPosts;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Insights"
        title="Field notes from production AI."
        description="Architecture decisions, deployment patterns, and ROI frameworks from the systems we ship."
      />

      <section className="section">
        <div className="container-wide">
          {displayPosts.length === 0 ? (
            <div className="glass-card p-10 text-center text-muted-foreground">
              No posts yet. Check back soon.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {displayPosts.map((p) => (
                <article key={p.title} className="glass-card p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">
                    {p.tag}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  {p.date && (
                    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {p.date}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}

          <div className="glass-card mt-12 flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">Get insights as we publish.</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We send one email a month. Pure signal.
              </p>
            </div>
            <Link to="/contact" className="btn-primary">
              Subscribe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
