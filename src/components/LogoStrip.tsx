import fortuneImg from "@/assets/images/hero-section/fortune-500-insurer.jpeg";
import logisticsImg from "@/assets/images/hero-section/global-logistics.png";
import healthImg from "@/assets/images/hero-section/top-10-us-health-system.png";
import fintechImg from "@/assets/images/hero-section/public-fintech.png";
import euImg from "@/assets/images/hero-section/eu-industrial-group.png";
import saasImg from "@/assets/images/hero-section/series-c-saas.png";

const clients = [
  { name: "Fortune 500 Insurer",       industry: "Insurance",      img: fortuneImg   },
  { name: "Global Logistics Operator", industry: "Supply Chain",   img: logisticsImg },
  { name: "Top-10 US Health System",   industry: "Healthcare",     img: healthImg    },
  { name: "Public FinTech",            industry: "Financial Tech", img: fintechImg   },
  { name: "EU Industrial Group",       industry: "Manufacturing",  img: euImg        },
  { name: "Series C SaaS",            industry: "AI Platform",    img: saasImg      },
];

export function LogoStrip() {
  return (
    <div className="border-y border-border bg-surface/40">
      <div className="container-wide py-16">
        <p className="reveal text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by teams shipping AI in production
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map(({ name, industry, img }, i) => (
            <div
              key={name}
              className={`group relative flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-surface/50 px-4 py-6 text-center transition-all duration-300 hover:border-primary/50 hover:bg-surface hover:shadow-[0_0_32px_rgba(99,179,237,0.12)] reveal reveal-delay-${(i % 4) + 1}`}
            >
              {/* logo + glow */}
              <div className="relative flex items-center justify-center">
                {/* ambient glow layer */}
                <span className="absolute h-14 w-14 rounded-full bg-primary/20 blur-xl transition-all duration-300 group-hover:h-16 group-hover:w-16 group-hover:bg-primary/40 group-hover:blur-2xl" />
                {/* logo container */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-surface/90 to-surface/60 shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={img}
                    alt={name}
                    className="h-10 w-10 object-contain drop-shadow-[0_0_6px_rgba(99,179,237,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(99,179,237,0.8)]"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold leading-snug text-foreground/90">{name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/60">{industry}</p>
              </div>

              {/* subtle bottom accent line */}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-primary/50 transition-all duration-300 group-hover:w-3/4" />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground/40">
          Client names withheld under NDA · References available on qualified request
        </p>
      </div>
    </div>
  );
}
