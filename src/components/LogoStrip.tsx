import logisticsImg from "@/assets/images/hero-section/global-logistics.png";
import healthImg from "@/assets/images/hero-section/top-10-us-health-system.png";
import fintechImg from "@/assets/images/hero-section/public-fintech.png";
import saasImg from "@/assets/images/hero-section/series-c-saas.png";

const clients = [
  { name: "Global Logistics Operator", industry: "Supply Chain",   img: logisticsImg },
  { name: "Top-10 US Health System",   industry: "Healthcare",     img: healthImg    },
  { name: "Public FinTech",            industry: "Financial Tech", img: fintechImg   },
  { name: "Series C SaaS",             industry: "AI Platform",    img: saasImg      },
];

export function LogoStrip() {
  return (
    <div className="border-y border-border/50 bg-surface/30">
      <div className="container-wide py-10">

        <p className="reveal text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Trusted by teams shipping AI in production
        </p>

        {/* unified strip */}
        <div className="reveal mt-8 flex flex-wrap items-stretch justify-center divide-x divide-border/40 overflow-hidden rounded-2xl border border-border/40 bg-surface/40">
          {clients.map(({ name, industry, img }) => (
            <div
              key={name}
              className="group flex flex-1 min-w-[180px] items-center gap-4 px-8 py-5 transition-colors duration-200 hover:bg-surface/80"
            >
              <img
                src={img}
                alt={name}
                className="h-14 w-14 shrink-0 object-contain opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(99,179,237,0.5)]"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
                  {name}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  {industry}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-muted-foreground/30">
          Client names withheld under NDA · References available on qualified request
        </p>

      </div>
    </div>
  );
}
