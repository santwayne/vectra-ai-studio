import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { CheckCircle2, Activity, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System Status — NeuronX" },
      { name: "description", content: "Real-time uptime and incident history for NeuronX platform services." },
      { property: "og:title", content: "System Status — NeuronX" },
      { property: "og:description", content: "Live platform status and 90-day uptime history." },
      { property: "og:url", content: "https://vectra-ai-engine.lovable.app/status" },
    ],
    links: [{ rel: "canonical", href: "https://vectra-ai-engine.lovable.app/status" }],
  }),
  component: StatusPage,
});

const services = [
  { name: "API Gateway", uptime: "99.99%", status: "operational" },
  { name: "Inference (US-East)", uptime: "99.98%", status: "operational" },
  { name: "Inference (EU-West)", uptime: "99.97%", status: "operational" },
  { name: "Vector Store", uptime: "100.00%", status: "operational" },
  { name: "Agent Runtime", uptime: "99.96%", status: "operational" },
  { name: "Webhook Delivery", uptime: "99.99%", status: "operational" },
  { name: "Dashboard", uptime: "99.98%", status: "operational" },
  { name: "Auth (SSO/SAML)", uptime: "100.00%", status: "operational" },
];

const incidents = [
  {
    date: "May 02, 2026",
    title: "Elevated latency on EU-West inference",
    duration: "23 min",
    severity: "minor",
    resolution: "Traffic rebalanced across availability zones. Root cause: upstream model provider rate-limit spike.",
  },
  {
    date: "Apr 14, 2026",
    title: "Webhook delivery delays",
    duration: "47 min",
    severity: "minor",
    resolution: "Queue worker autoscaler tuned. No webhooks lost — all eventually delivered.",
  },
  {
    date: "Mar 22, 2026",
    title: "Dashboard read-only mode",
    duration: "1h 12min",
    severity: "minor",
    resolution: "Database failover during planned maintenance ran longer than expected. Inference unaffected.",
  },
];

// Generate 90-day uptime bars (mostly green, a few yellow)
const generateUptimeBars = () => {
  return Array.from({ length: 90 }, (_, i) => {
    const isIncident = i === 12 || i === 30 || i === 43;
    return isIncident ? "minor" : "operational";
  });
};

function StatusPage() {
  const bars = generateUptimeBars();

  return (
    <SiteShell>
      <PageHero
        eyebrow="System Status"
        title="All systems operational"
        description="Real-time platform health and 90-day incident history. Subscribe to incident notifications via email or RSS."
      />

      {/* Overall status banner */}
      <section className="container-wide py-8">
        <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">All systems operational</div>
              <div className="text-sm text-muted-foreground">Last checked just now · 90-day uptime: 99.98%</div>
            </div>
          </div>
          <a
            href="mailto:status-subscribe@neuronx.ai"
            className="btn-ghost h-10 px-4 text-sm"
          >
            Subscribe
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="container-wide py-12">
        <h2 className="mb-6 text-xl font-semibold">Services</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${
                i < services.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden gap-0.5 sm:flex">
                  {bars.slice(-30).map((b, idx) => (
                    <div
                      key={idx}
                      className={`h-6 w-1 rounded-sm ${
                        b === "operational" ? "bg-emerald-500/70" : "bg-amber-500/70"
                      }`}
                      title={b}
                    />
                  ))}
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-foreground">{s.uptime}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">90 days</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Incidents */}
      <section className="container-wide py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Incident history</h2>
          <span className="text-xs text-muted-foreground">Last 90 days · 3 incidents</span>
        </div>
        <div className="space-y-3">
          {incidents.map((inc) => (
            <div key={inc.date} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold">{inc.title}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono uppercase tracking-wider text-amber-500">
                    {inc.severity}
                  </span>
                  <span className="font-mono text-muted-foreground">{inc.duration}</span>
                  <span className="text-muted-foreground">{inc.date}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{inc.resolution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="container-wide py-12 pb-24">
        <h2 className="mb-6 text-xl font-semibold">Performance (last 30 days)</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "API uptime", value: "99.99%" },
            { label: "Inference p50", value: "412ms" },
            { label: "Inference p95", value: "1.8s" },
            { label: "MTTR", value: "18min" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-border bg-card p-6">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <div className="mt-3 font-mono text-2xl text-foreground">{m.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
