import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RefreshCw, Loader2 } from "lucide-react";
import { runSeoAudit, type SeoPageResult } from "@/lib/seo-audit.functions";

export const Route = createFileRoute("/diagnostics")({
  head: () => ({
    meta: [
      { title: "Diagnostics — NeuronX" },
      { name: "description", content: "Automated SEO and Core Web Vitals checks for the NeuronX site." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DiagnosticsPage,
});

// --- Web Vitals thresholds (Google) ---
const VITALS = {
  LCP: { good: 2500, ni: 4000, unit: "ms" },
  INP: { good: 200, ni: 500, unit: "ms" },
  CLS: { good: 0.1, ni: 0.25, unit: "" },
  FCP: { good: 1800, ni: 3000, unit: "ms" },
  TTFB: { good: 800, ni: 1800, unit: "ms" },
} as const;

type VitalName = keyof typeof VITALS;
type VitalState = Partial<Record<VitalName, Metric>>;

function rate(name: VitalName, value: number): "good" | "ni" | "poor" {
  const t = VITALS[name];
  if (value <= t.good) return "good";
  if (value <= t.ni) return "ni";
  return "poor";
}

function ratingColor(r: "good" | "ni" | "poor") {
  return r === "good" ? "bg-green-500/15 text-green-600 dark:text-green-400" : r === "ni" ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" : "bg-red-500/15 text-red-600 dark:text-red-400";
}

function fmt(name: VitalName, v: number) {
  if (name === "CLS") return v.toFixed(3);
  return `${Math.round(v)} ${VITALS[name].unit}`;
}

function WebVitalsPanel() {
  const [vitals, setVitals] = useState<VitalState>({});

  useEffect(() => {
    const upd = (m: Metric) => setVitals((s) => ({ ...s, [m.name as VitalName]: m }));
    onLCP(upd);
    onINP(upd);
    onCLS(upd);
    onFCP(upd);
    onTTFB(upd);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {(Object.keys(VITALS) as VitalName[]).map((name) => {
        const m = vitals[name];
        const r = m ? rate(name, m.value) : null;
        return (
          <Card key={name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              {m ? (
                <>
                  <div className="text-2xl font-semibold">{fmt(name, m.value)}</div>
                  <Badge className={`mt-2 ${ratingColor(r!)}`} variant="secondary">
                    {r === "good" ? "Good" : r === "ni" ? "Needs improvement" : "Poor"}
                  </Badge>
                </>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Measuring…
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? "bg-green-500/15 text-green-600 dark:text-green-400" : score >= 70 ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" : "bg-red-500/15 text-red-600 dark:text-red-400";
  return <Badge variant="secondary" className={color}>{score}%</Badge>;
}

function PageRow({ r }: { r: SeoPageResult }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-mono">{r.path}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">HTTP {r.status} · {r.checks.filter((c) => c.pass).length}/{r.checks.length} checks</p>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={r.score} className="w-24" />
            <ScoreBadge score={r.score} />
          </div>
        </CardHeader>
      </button>
      {open && (
        <CardContent>
          {r.error ? (
            <p className="text-sm text-red-500">Error: {r.error}</p>
          ) : (
            <ul className="space-y-2">
              {r.checks.map((c) => (
                <li key={c.id} className="flex items-start gap-2 text-sm">
                  {c.pass ? <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" /> : <XCircle className="h-4 w-4 shrink-0 text-red-500" />}
                  <div className="flex-1">
                    <div className="font-medium">{c.label}</div>
                    {c.detail && <div className="text-xs text-muted-foreground break-all">{c.detail}</div>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function DiagnosticsPage() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["seo-audit"],
    queryFn: () => runSeoAudit(window.location.origin),
    staleTime: 60_000,
  });

  const results = data?.results ?? [];
  const overall = results.length ? Math.round(results.reduce((a: number, r: SeoPageResult) => a + r.score, 0) / results.length) : 0;
  const failing = results.flatMap((r: SeoPageResult) => r.checks.filter((c) => !c.pass).map((c) => ({ path: r.path, ...c })));

  return (
    <SiteShell>
      <PageHero eyebrow="Diagnostics" title="Site health" description="Automated SEO and Core Web Vitals checks. Run on demand." />
      <section className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Core Web Vitals (this page)</h2>
            <p className="text-xs text-muted-foreground">Live RUM measurement via web-vitals</p>
          </div>
          <WebVitalsPanel />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">SEO audit</h2>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50"
            >
              {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {isFetching ? "Scanning…" : "Re-run"}
            </button>
          </div>

          {data && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Overall score across {results.length} pages</span>
                  <ScoreBadge score={overall} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={overall} />
                <p className="mt-2 text-xs text-muted-foreground">
                  {failing.length} failing checks · base URL: <span className="font-mono">{data.baseUrl}</span>
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {isFetching && !data && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Fetching pages…
              </div>
            )}
            {results.map((r: SeoPageResult) => (
              <PageRow key={r.path} r={r} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
