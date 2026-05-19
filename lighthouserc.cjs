module.exports = {
  ci: {
    collect: {
      // Started by the GitHub workflow before LHCI runs.
      startServerCommand: "bun run preview --port 4173",
      startServerReadyPattern: "Local:",
      url: [
        "http://localhost:4173/",
        "http://localhost:4173/product",
        "http://localhost:4173/demo",
        "http://localhost:4173/case-studies",
        "http://localhost:4173/pricing",
        "http://localhost:4173/security",
      ],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        // Skip PWA — we're not shipping a service worker.
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        chromeFlags: "--no-sandbox --headless=new",
      },
    },
    assert: {
      assertions: {
        // Category-level gates — fail PR if SEO or perf regresses.
        "categories:seo": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.8 }],

        // Explicit SEO / metadata regressions (hard fails).
        "document-title": "error",
        "meta-description": "error",
        "http-status-code": "error",
        "link-text": "error",
        "crawlable-anchors": "error",
        "is-crawlable": "error",
        "robots-txt": "error",
        "hreflang": "error",
        "canonical": "error",
        "viewport": "error",
        "structured-data": "off", // manual rule — not auditable by Lighthouse

        // Perf budgets (warnings — don't block PRs on noisy metrics).
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
