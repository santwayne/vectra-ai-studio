export type SeoCheck = {
  id: string;
  label: string;
  pass: boolean;
  detail?: string;
};

export type SeoPageResult = {
  path: string;
  url: string;
  status: number;
  ok: boolean;
  error?: string;
  score: number;
  checks: SeoCheck[];
};

const ROUTES = [
  "/",
  "/about",
  "/solutions",
  "/industries",
  "/case-studies",
  "/insights",
  "/security",
  "/faq",
  "/careers",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
];

function pick(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function auditHtml(html: string, url: string): SeoCheck[] {
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  const ogTitle = pick(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  const ogDesc = pick(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  const ogImage = pick(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const viewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html);
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const jsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const imgs = html.match(/<img\s[^>]*>/gi) || [];
  const imgsMissingAlt = imgs.filter((t) => !/\salt=/i.test(t)).length;
  const lang = /<html[^>]+lang=/i.test(html);
  void url;

  return [
    { id: "title", label: "Title present (10–60 chars)", pass: !!title && title.length >= 10 && title.length <= 60, detail: title ? `${title.length} chars: "${title}"` : "Missing" },
    { id: "desc", label: "Meta description (50–160 chars)", pass: !!desc && desc.length >= 50 && desc.length <= 160, detail: desc ? `${desc.length} chars` : "Missing" },
    { id: "og:title", label: "og:title", pass: !!ogTitle, detail: ogTitle ?? "Missing" },
    { id: "og:desc", label: "og:description", pass: !!ogDesc, detail: ogDesc ? `${ogDesc.length} chars` : "Missing" },
    { id: "og:image", label: "og:image", pass: !!ogImage, detail: ogImage ?? "Missing" },
    { id: "canonical", label: "Canonical link", pass: !!canonical, detail: canonical ?? "Missing" },
    { id: "viewport", label: "Viewport meta", pass: viewport, detail: viewport ? "Present" : "Missing" },
    { id: "h1", label: "Exactly one <h1>", pass: h1Count === 1, detail: `${h1Count} found` },
    { id: "lang", label: "<html lang> set", pass: lang, detail: lang ? "Present" : "Missing" },
    { id: "jsonld", label: "Structured data (JSON-LD)", pass: jsonLd, detail: jsonLd ? "Present" : "Missing" },
    { id: "img-alt", label: "All <img> have alt", pass: imgsMissingAlt === 0, detail: `${imgsMissingAlt} of ${imgs.length} missing alt` },
  ];
}

export async function runSeoAudit(baseUrl?: string): Promise<{ results: SeoPageResult[]; baseUrl: string }> {
  const effectiveBaseUrl = baseUrl ?? window.location.origin;

  const results = await Promise.all(
    ROUTES.map(async (path): Promise<SeoPageResult> => {
      const url = `${effectiveBaseUrl}${path}`;
      try {
        const res = await fetch(url, { headers: { "user-agent": "NeuronX-SEO-Audit/1.0" } });
        const html = await res.text();
        const checks = auditHtml(html, url);
        const passed = checks.filter((c) => c.pass).length;
        return {
          path,
          url,
          status: res.status,
          ok: res.ok,
          checks,
          score: Math.round((passed / checks.length) * 100),
        };
      } catch (e) {
        return {
          path,
          url,
          status: 0,
          ok: false,
          error: e instanceof Error ? e.message : String(e),
          checks: [],
          score: 0,
        };
      }
    }),
  );

  return { results, baseUrl: effectiveBaseUrl };
}
