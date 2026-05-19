import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "NeuronX delivered a production AI system in eight weeks that's now central to how our sales engineering team works. The architecture is clean, the team ships, and the ROI was obvious by week six.",
    name: "M. Patterson",
    role: "VP Operations, Industrial Manufacturer",
  },
  {
    quote:
      "We evaluated three AI consultancies. NeuronX was the only one that talked about systems, security, and KPIs instead of demos. They built infrastructure — not a prototype.",
    name: "S. Okafor",
    role: "Head of Product, FinTech Lender",
  },
  {
    quote:
      "Our intake voice agent now handles 60% of after-hours calls. Patients love it, our admin team has time back, and bookings are up 22%.",
    name: "Dr. L. Reyes",
    role: "Director, Multi-Site Healthcare Group",
  },
];

export function Testimonials() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="max-w-2xl">
          <span className="eyebrow">What clients say</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">
              Built with operators who take AI seriously.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass-card flex flex-col p-8">
              <Quote className="h-6 w-6 text-primary" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
