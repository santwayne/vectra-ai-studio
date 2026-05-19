#!/usr/bin/env node
/**
 * Automated JSON-LD + SEO validator.
 *
 * For each route, fetches the rendered HTML and validates:
 *  - <title> present, 10–60 chars
 *  - <meta name="description"> present, 50–160 chars
 *  - canonical link present
 *  - og:title / og:description / og:url present
 *  - exactly one <h1>
 *  - every <script type="application/ld+json"> contains valid JSON
 *  - each JSON-LD node has @context (schema.org) and @type
 *  - required props are present for common @types
 *
 * Exits non-zero if any route fails — suitable for CI.
 *
 * Usage:
 *   BASE_URL=http://localhost:4173 node scripts/validate-jsonld.mjs
 *   BASE_URL=https://staging.example.com node scripts/validate-jsonld.mjs
 *
 * Optional: ROUTES="/,/product,/demo" to override the route list.
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:4173").replace(/\/$/, "");

const DEFAULT_ROUTES = [
  "/",
  "/about",
  "/product",
  "/demo",
  "/solutions",
  "/industries",
  "/case-studies",
  "/insights",
  "/pricing",
  "/security",
  "/faq",
  "/careers",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
  "/ai-governance",
  "/changelog",
  "/compare",
  "/marketplace",
  "/roi-calculator",
  "/status",
  "/whitepapers",
];

const ROUTES = process.env.ROUTES
  ? process.env.ROUTES.split(",").map((r) => r.trim()).filter(Boolean)
  : DEFAULT_ROUTES;

// Required properties per schema.org @type (subset we use on the site).
const REQUIRED_PROPS = {
  Organization: ["name", "url"],
  WebSite: ["name", "url"],
  WebPage: ["name"],
  SoftwareApplication: ["name", "applicationCategory"],
  Service: ["name", "provider"],
  Product: ["name"],
  Article: ["headline"],
  NewsArticle: ["headline"],
  BlogPosting: ["headline"],
  FAQPage: ["mainEntity"],
  Question: ["name", "acceptedAnswer"],
  BreadcrumbList: ["itemListElement"],
  CollectionPage: ["name"],
  ItemList: ["itemListElement"],
  Person: ["name"],
  JobPosting: ["title", "description", "datePosted", "hiringOrganization"],
};

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const pickAll = (html, re) => {
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
};

function decodeEntities(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#x22;/gi, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function validateLdNode(node, pathStack) {
  const errors = [];
  if (!node || typeof node !== "object") {
    errors.push(`${pathStack.join(".")}: node is not an object`);
    return errors;
  }
  // @graph wrapper
  if (Array.isArray(node["@graph"])) {
    node["@graph"].forEach((g, i) => {
      errors.push(...validateLdNode(g, [...pathStack, `@graph[${i}]`]));
    });
    return errors;
  }
  const ctx = node["@context"];
  if (pathStack.length === 1) {
    // top-level requires @context
    const ctxStr = Array.isArray(ctx) ? ctx.join(",") : ctx;
    if (!ctxStr || !String(ctxStr).includes("schema.org")) {
      errors.push(`${pathStack.join(".")}: missing or non-schema.org @context`);
    }
  }
  const type = node["@type"];
  if (!type) {
    errors.push(`${pathStack.join(".")}: missing @type`);
  } else {
    const types = Array.isArray(type) ? type : [type];
    for (const t of types) {
      const required = REQUIRED_PROPS[t];
      if (required) {
        for (const prop of required) {
          if (node[prop] === undefined || node[prop] === null || node[prop] === "") {
            errors.push(`${pathStack.join(".")} (@type=${t}): missing required prop "${prop}"`);
          }
        }
      }
    }
  }
  return errors;
}

function auditHtml(html) {
  const issues = [];

  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) issues.push("missing <title>");
  else if (title.length < 10 || title.length > 60)
    issues.push(`<title> length ${title.length} not in 10–60`);

  const desc = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  if (!desc) issues.push("missing meta description");
  else if (desc.length < 50 || desc.length > 160)
    issues.push(`meta description length ${desc.length} not in 50–160`);

  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonical) issues.push("missing canonical link");

  for (const prop of ["og:title", "og:description", "og:url"]) {
    const re = new RegExp(
      `<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`,
      "i",
    );
    if (!pick(html, re)) issues.push(`missing ${prop}`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) issues.push(`expected exactly one <h1>, found ${h1Count}`);

  // JSON-LD blocks
  const blocks = pickAll(
    html,
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  if (blocks.length === 0) {
    issues.push("no JSON-LD blocks found");
  }
  blocks.forEach((raw, i) => {
    let parsed;
    try {
      parsed = JSON.parse(decodeEntities(raw.trim()));
    } catch (e) {
      issues.push(`JSON-LD[${i}] invalid JSON: ${e.message}`);
      return;
    }
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    nodes.forEach((n, j) => {
      issues.push(
        ...validateLdNode(n, [`JSON-LD[${i}]${nodes.length > 1 ? `[${j}]` : ""}`]),
      );
    });
  });

  return issues;
}

async function run() {
  console.log(`→ validating ${ROUTES.length} routes against ${BASE_URL}\n`);
  const results = [];
  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "NeuronX-JSONLD-Validator/1.0" },
        redirect: "follow",
      });
      if (!res.ok) {
        results.push({ route, ok: false, issues: [`HTTP ${res.status}`] });
        continue;
      }
      const html = await res.text();
      const issues = auditHtml(html);
      results.push({ route, ok: issues.length === 0, issues });
    } catch (e) {
      results.push({ route, ok: false, issues: [`fetch failed: ${e.message}`] });
    }
  }

  let failed = 0;
  for (const r of results) {
    if (r.ok) {
      console.log(`✓ ${r.route}`);
    } else {
      failed++;
      console.log(`✗ ${r.route}`);
      for (const i of r.issues) console.log(`    - ${i}`);
    }
  }

  console.log(
    `\n${results.length - failed}/${results.length} routes passed JSON-LD + SEO validation.`,
  );

  if (failed > 0) {
    console.error(`\n${failed} route(s) failed validation.`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
