/**
 * Wordmark-style placeholder logos. Replace with real client logos when available.
 */
const logos = [
  "Northwind",
  "Helix Health",
  "Ledgerline",
  "Atlas Freight",
  "Veritone",
  "Forge Industrial",
];

export function LogoStrip() {
  return (
    <div className="border-y border-border bg-surface/40">
      <div className="container-wide py-12">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by teams shipping AI in production
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center text-center font-mono text-base font-medium tracking-tight text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
