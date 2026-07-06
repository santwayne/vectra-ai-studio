import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Workflow,
  ShieldCheck,
  FileText,
  PlayCircle,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo — See NeuronX on Your Workflow" },
      {
        name: "description",
        content:
          "A 30-minute live demo on one of your own workflows. See the trace, evals, and cost — and walk away with a prioritized opportunity map.",
      },
      { property: "og:title", content: "Book a Demo — See NeuronX on Your Workflow" },
      {
        property: "og:description",
        content:
          "30 minutes. One of your workflows, live in a NeuronX agent. Trace, evals, cost — and a prioritized opportunity map.",
      },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/demo" },
    ],
    links: [
      { rel: "canonical", href: "https://vectra-ai-engine.lovable.app/demo" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "NeuronX Live Product Demo",
            serviceType: "AI agent platform demonstration",
            url: "https://vectra-ai-engine.lovable.app/demo",
            description:
              "30-minute live demo of the NeuronX agent platform run by an engineer. Bring a real workflow and walk away with a prioritized ROI and opportunity map.",
            provider: {
              "@type": "Organization",
              name: "NeuronX Intelligence Inc.",
              url: "https://vectra-ai-engine.lovable.app",
            },
            areaServed: ["US", "EU", "UK"],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: "https://vectra-ai-engine.lovable.app/demo",
            },
            potentialAction: {
              "@type": "ReserveAction",
              target: "https://vectra-ai-engine.lovable.app/demo",
              name: "Book a live demo",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do I need to prepare anything?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Bringing one real example helps, but is not required — we have anonymized examples ready for every industry.",
                },
              },
              {
                "@type": "Question",
                name: "Is the demo gated by a sales process?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The 30-minute call is run by an engineer, not an SDR. You'll get a working trace and the ROI map regardless of fit.",
                },
              },
              {
                "@type": "Question",
                name: "Can my security team join?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — we encourage it. We can pre-share the SOC 2 report, DPIA template, and reference architecture before the call.",
                },
              },
              {
                "@type": "Question",
                name: "What if we're not ready to talk to sales?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Explore the platform writeup, customer outcomes, or the ROI calculator — all linked on the demo page. Come back when it's useful.",
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: DemoPage,
});

const youWillSee = [
  {
    icon: Workflow,
    title: "One of your workflows, live",
    body: "Bring a real example — an RFP, a claim, a support ticket. We'll run it through a live agent during the call.",
  },
  {
    icon: Eye,
    title: "The full trace",
    body: "Every retrieval, model call, and tool action — with latency and cost per step. No marketing screenshots.",
  },
  {
    icon: ShieldCheck,
    title: "How it deploys in your stack",
    body: "Reference architecture for your cloud (AWS / GCP / Azure), identity (Okta / Azure AD), and data sources.",
  },
  {
    icon: FileText,
    title: "An ROI + opportunity map",
    body: "We leave you with a 1-page artifact: top 3 workflows ranked by ROI, effort, and risk.",
  },
];

const fitCues = [
  "You have a workflow that takes humans 30+ minutes today",
  "You have structured + unstructured data the workflow needs",
  "You can name the KPI the workflow moves (cycle time, win rate, NPS)",
  "You operate in regulated, security-sensitive, or VPC-only environments",
];

const notAFit = [
  "Pure chatbot for a marketing site — use an off-the-shelf widget",
  "Replacing a single SaaS feature you already pay for",
  "Research projects with no operational owner on your side",
];

const faqs = [
  {
    q: "Do I need to prepare anything?",
    a: "No. Bringing one real example helps, but is not required — we have anonymized examples ready for every industry.",
  },
  {
    q: "Is the demo gated by a sales process?",
    a: "No. The 30-minute call is run by an engineer, not an SDR. You'll get a working trace and the ROI map regardless of fit.",
  },
  {
    q: "Can my security team join?",
    a: "Yes — we encourage it. We can pre-share the SOC 2 report, DPIA template, and reference architecture before the call.",
  },
  {
    q: "What if we're not ready to talk to sales?",
    a: "Explore the platform writeup, customer outcomes, or the ROI calculator — all linked below. Come back when it's useful.",
  },
];

function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    role: "",
    workflow: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const templateParams = {
      title: "New Demo Request",
      time: new Date().toLocaleString(),
      ...formData,
      message: `
Email: ${formData.email}
Company: ${formData.company}
Role: ${formData.role}

Workflow to automate:
${formData.workflow || "Not specified"}
      `.trim(),
    };

    try {
      await emailjs.send(
        "service_gpkmole",
        "template_7xnt2qj",
        templateParams,
        "bBMebUMYk1P4zsdvp"
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send your request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Live demo"
        title="30 minutes. Your workflow. A working agent."
        description="Skip the deck. Bring a real example and watch it run through a NeuronX agent — trace, evals, and cost included."
      />

      <section className="section pt-0">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: what you'll see + fit cues */}
          <div className="space-y-12">
            <div>
              <span className="eyebrow">What you'll see</span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                <span className="text-gradient">The outcome of the call, before the call.</span>
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {youWillSee.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-border bg-surface/60 p-5"
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fit cues */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/60 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  This call is for you if
                </p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                  {fitCues.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-background/40 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Not a great fit
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {notAFit.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Proof */}
            <div className="rounded-2xl border border-border bg-surface/60 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                What past attendees said
              </p>
              <blockquote className="mt-3 text-base text-foreground/90">
                "Cleanest AI demo we've sat through. They ran our actual claim
                through their agent, showed the trace, and gave us a written
                opportunity map before the call ended."
              </blockquote>
              <p className="mt-3 text-xs text-muted-foreground">
                — VP Operations, Fortune 500 insurer (under NDA)
              </p>
            </div>
          </div>

          {/* Right: form */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-xl">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Book your 30-min live demo</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Free · No sales pitch · Runs by an engineer
              </p>

              {!submitted ? (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs">
                      <span className="text-muted-foreground">Work email</span>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </label>
                    <label className="block text-xs">
                      <span className="text-muted-foreground">Company</span>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="block text-xs">
                    <span className="text-muted-foreground">Role</span>
                    <select
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option value="Engineering / Platform">Engineering / Platform</option>
                      <option value="Operations / Business">Operations / Business</option>
                      <option value="Data / ML">Data / ML</option>
                      <option value="Security / Compliance">Security / Compliance</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </label>
                  <label className="block text-xs">
                    <span className="text-muted-foreground">
                      Workflow you'd like to see automated (optional)
                    </span>
                    <textarea
                      name="workflow"
                      rows={3}
                      placeholder="e.g. claims triage, RFP response, ticket deflection..."
                      value={formData.workflow}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                  </label>
                  {error && (
                    <p className="text-xs text-red-500">{error}</p>
                  )}
                  <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
                    {sending ? "Sending…" : <><span>Request demo</span> <ArrowRight className="h-4 w-4" /></>}
                  </button>
                  <p className="text-[10px] text-muted-foreground">
                    By submitting, you agree to our{" "}
                    <Link to="/privacy" className="underline">
                      privacy policy
                    </Link>
                    . We respond within one business day.
                  </p>
                </form>
              ) : (
                <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold text-foreground">Request received.</p>
                  <p className="mt-2 text-muted-foreground">
                    An engineer will reach out within one business day with three time options and
                    a pre-read tailored to your workflow.
                  </p>
                </div>
              )}
            </div>

            {/* Alternate paths */}
            <div className="mt-4 rounded-2xl border border-border bg-background/40 p-5">
              <p className="text-xs font-semibold text-foreground">Not ready for a demo?</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    to="/product"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    Read the platform writeup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/case-studies"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Browse customer outcomes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roi-calculator"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    Estimate ROI yourself
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-tight border-t border-border bg-surface/40">
        <div className="container-wide">
          <span className="eyebrow">Demo FAQ</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient">Answers before the call.</span>
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="text-sm font-semibold text-foreground">{f.q}</p>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
