import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Lock, Download, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/whitepapers")({
  head: () => ({
    meta: [
      { title: "Whitepapers & Research — NeuronX" },
      {
        name: "description",
        content:
          "Gated enterprise research: AI ROI benchmarks, governance playbooks, and reference architectures from NeuronX engineering.",
      },
      { property: "og:title", content: "Whitepapers & Research — NeuronX" },
      {
        property: "og:description",
        content:
          "Enterprise research and reference architectures for AI infrastructure buyers.",
      },
    ],
  }),
  component: WhitepapersPage,
});

const papers = [
  {
    id: "roi-2026",
    title: "The 2026 Enterprise AI ROI Benchmark",
    blurb:
      "Cross-industry analysis of 142 production AI deployments. Median payback 7.2 months; top quartile <90 days.",
    pages: 38,
    audience: "CFO, COO, VP Operations",
  },
  {
    id: "governance",
    title: "EU AI Act Implementation Playbook",
    blurb:
      "Conformity workflow, Article 9–15 controls, and a model-risk register template aligned to ISO/IEC 42001.",
    pages: 52,
    audience: "Chief Compliance, General Counsel, CISO",
  },
  {
    id: "reference-arch",
    title: "Reference Architecture: Multi-Tenant Agentic Systems",
    blurb:
      "End-to-end blueprint covering retrieval, tool routing, evals, observability, and on-prem deployment patterns.",
    pages: 64,
    audience: "Chief Architect, Head of Platform",
  },
  {
    id: "vendor-eval",
    title: "AI Vendor Evaluation Scorecard (RFP-Ready)",
    blurb:
      "84-criterion scorecard covering security, model governance, commercial terms, and exit/portability rights.",
    pages: 22,
    audience: "Procurement, Sourcing, IT Strategy",
  },
];

function WhitepapersPage() {
  const [requested, setRequested] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-wide py-20 lg:py-28">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">Research</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">
          Whitepapers & reference architectures
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Long-form research from NeuronX engineering and our enterprise field team.
          Each paper is reviewed quarterly and includes editable artifacts you can
          take into your own organization.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {papers.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-foreground/20"
          >
            <div className="flex items-start justify-between gap-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {p.pages} pages · PDF
              </span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
              For: {p.audience}
            </p>
            <button
              onClick={() => {
                setRequested(p.id);
                setSubmitted(false);
              }}
              className="btn-ghost mt-6 inline-flex h-10 items-center gap-2 px-4 text-sm"
            >
              <Lock className="h-4 w-4" />
              Request access
            </button>
          </article>
        ))}
      </div>

      {requested && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setRequested(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                <h3 className="mt-4 text-lg font-semibold">Request received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll email a signed download link to{" "}
                  <span className="text-foreground">{form.email}</span> within one
                  business hour.
                </p>
                <button
                  onClick={() => setRequested(null)}
                  className="btn-primary mt-6 h-10 w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Request whitepaper</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {papers.find((p) => p.id === requested)?.title}
                  </p>
                </div>
                {(["name", "email", "company", "role"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {field === "email" ? "Work email" : field}
                    </label>
                    <input
                      required
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40"
                    />
                  </div>
                ))}
                <p className="text-[11px] text-muted-foreground">
                  By requesting, you agree to receive related research from NeuronX.
                  Unsubscribe anytime. See our{" "}
                  <Link to="/privacy" className="underline">
                    privacy policy
                  </Link>
                  .
                </p>
                <button type="submit" className="btn-primary h-10 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Send me the PDF
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
