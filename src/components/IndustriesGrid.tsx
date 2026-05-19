import { Link } from "@tanstack/react-router";
import {
  FinancialArt,
  HealthcareArt,
  ManufacturingArt,
  LogisticsArt,
  RetailArt,
  LegalArt,
} from "@/components/illustrations/IndustryArt";

const industries = [
  { Art: FinancialArt, name: "Financial Services", desc: "Underwriting, KYC, fraud, advisory copilots." },
  { Art: HealthcareArt, name: "Healthcare & Life Sciences", desc: "Clinical ops, prior auth, document intake, RCM." },
  { Art: ManufacturingArt, name: "Manufacturing & Industrial", desc: "RFQ automation, quality, maintenance copilots." },
  { Art: LogisticsArt, name: "Logistics & Supply Chain", desc: "Quoting, tracking, exception resolution agents." },
  { Art: RetailArt, name: "Retail & eCommerce", desc: "Merchandising, support, product data enrichment." },
  { Art: LegalArt, name: "Legal & Professional", desc: "Contract review, due diligence, knowledge search." },
];

export function IndustriesGrid() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Industries</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">Deployed where the work is regulated, complex, and high-stakes.</span>
            </h2>
          </div>
          <Link to="/industries" className="btn-ghost hidden md:inline-flex">All industries</Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.name}
              to="/industries"
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-primary/40 hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{i.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
                </div>
                <i.Art className="shrink-0 opacity-90 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
