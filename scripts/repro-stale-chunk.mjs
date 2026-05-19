#!/usr/bin/env node
/**
 * Reproduces the "Failed to fetch dynamically imported module" error that
 * happens when the preview tab holds onto chunk URLs that no longer exist
 * on the dev server (e.g. after a Vite restart or a rebuild).
 *
 * Strategy: load the home page, then start 404-ing every subsequent JS chunk
 * request to simulate a stale build, then click an in-app <Link> so TanStack
 * Router triggers a dynamic import. Capture the page error + extract the URL.
 *
 * Usage:
 *   BASE_URL=https://id-preview--<id>.lovable.app node scripts/repro-stale-chunk.mjs
 *   # optional: NAV_SELECTOR='a[href="/about"]' HEADLESS=false
 *
 * Requires: npm i -D playwright   (then `npx playwright install chromium`)
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const NAV_SELECTOR = process.env.NAV_SELECTOR || 'a[href="/about"]';
const HEADLESS = process.env.HEADLESS !== "false";

const IMPORT_ERROR_RE =
  /(Failed to fetch dynamically imported module|Importing a module script failed)/i;
const URL_RE = /https?:\/\/\S+?\.(?:js|mjs|tsx?|jsx?)(?:\?[^\s'")]*)?/;

const failures = [];

function record(source, message) {
  if (!IMPORT_ERROR_RE.test(message)) return;
  const url = message.match(URL_RE)?.[0] ?? "<unknown>";
  failures.push({ source, url, message });
  console.log(`[${source}] url=${url}`);
  console.log(`         message=${message}`);
}

const browser = await chromium.launch({ headless: HEADLESS });
const ctx = await browser.newContext();
const page = await ctx.newPage();

page.on("pageerror", (err) => record("pageerror", err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") record("console.error", msg.text());
});

console.log(`→ loading ${BASE_URL}/`);
await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

// Simulate a stale build: any *new* JS module request 404s.
console.log("→ enabling stale-chunk simulation (404 all new JS requests)");
await ctx.route("**/*.{js,mjs,tsx,ts,jsx}", (route) => route.fulfill({ status: 404, body: "stale" }));

console.log(`→ clicking ${NAV_SELECTOR} to trigger a dynamic import`);
const link = await page.$(NAV_SELECTOR);
if (!link) {
  console.error(`No element matched ${NAV_SELECTOR}. Set NAV_SELECTOR to a real <Link>.`);
  await browser.close();
  process.exit(2);
}
await link.click().catch(() => {});
await page.waitForTimeout(2500); // let the failed import surface

await browser.close();

if (failures.length === 0) {
  console.error("\nNo dynamic-import failure captured. Try a different NAV_SELECTOR or rerun.");
  process.exit(1);
}

console.log(`\n✓ reproduced ${failures.length} dynamic-import failure(s):`);
for (const f of failures) console.log(`  - ${f.url}  (${f.source})`);
