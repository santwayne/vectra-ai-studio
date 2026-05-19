/**
 * Procedural cover art for case study cards. Each industry maps to a unique
 * vector composition so cards feel curated rather than generic.
 */
interface Props {
  industry: string;
  slug: string;
  className?: string;
}

const PALETTES: Record<string, [string, string]> = {
  Industrial: ["oklch(0.72 0.18 250)", "oklch(0.74 0.16 165)"],
  Healthcare: ["oklch(0.78 0.16 200)", "oklch(0.74 0.16 165)"],
  Financial: ["oklch(0.74 0.16 30)", "oklch(0.72 0.18 250)"],
  Logistics: ["oklch(0.72 0.18 250)", "oklch(0.82 0.16 110)"],
  Retail: ["oklch(0.74 0.16 30)", "oklch(0.62 0.2 290)"],
  Legal: ["oklch(0.62 0.2 290)", "oklch(0.72 0.18 250)"],
  default: ["oklch(0.72 0.18 250)", "oklch(0.62 0.2 290)"],
};

// Deterministic hash so each case gets its own composition seed.
function seed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function CaseStudyArt({ industry, slug, className }: Props) {
  const [a, b] = PALETTES[industry] ?? PALETTES.default;
  const h = seed(slug);
  const variant = h % 4;
  const id = `cs-${slug}`;

  return (
    <svg
      viewBox="0 0 320 120"
      className={className}
      fill="none"
      role="img"
      aria-label={`${industry} cover art`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.22" />
          <stop offset="100%" stopColor={b} stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="80%" cy="20%" r="60%">
          <stop offset="0%" stopColor={a} stopOpacity="0.45" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="120" fill={`url(#${id}-bg)`} />
      <rect width="320" height="120" fill={`url(#${id}-glow)`} />

      {/* Faint grid */}
      <g opacity="0.18" stroke="oklch(1 0 0 / 0.5)">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="120" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30} x2="320" y2={i * 30} strokeWidth="0.5" />
        ))}
      </g>

      {variant === 0 && (
        // Waveform
        <g>
          <path
            d={`M0 80 ${Array.from({ length: 32 })
              .map((_, i) => {
                const x = i * 10;
                const y = 80 - Math.sin((i + h) * 0.6) * 30 - Math.sin((i + h) * 0.2) * 10;
                return `L${x} ${y}`;
              })
              .join(" ")}`}
            stroke={a}
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d={`M0 90 ${Array.from({ length: 32 })
              .map((_, i) => {
                const x = i * 10;
                const y = 90 - Math.cos((i + h) * 0.4) * 18;
                return `L${x} ${y}`;
              })
              .join(" ")}`}
            stroke={b}
            strokeOpacity="0.7"
            strokeWidth="1"
            fill="none"
          />
        </g>
      )}

      {variant === 1 && (
        // Constellation
        <g>
          {Array.from({ length: 18 }).map((_, i) => {
            const x = ((h * (i + 3)) % 300) + 10;
            const y = (((h >> (i + 1)) * 7) % 100) + 10;
            return <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3 : 1.5} fill={i % 3 === 0 ? a : b} fillOpacity="0.85" />;
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const x1 = ((h * (i + 3)) % 300) + 10;
            const y1 = (((h >> (i + 1)) * 7) % 100) + 10;
            const x2 = ((h * (i + 4)) % 300) + 10;
            const y2 = (((h >> (i + 2)) * 7) % 100) + 10;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={a} strokeOpacity="0.35" />;
          })}
        </g>
      )}

      {variant === 2 && (
        // Concentric arcs / radar
        <g transform="translate(240 90)">
          {[20, 40, 60, 80, 100].map((r, i) => (
            <circle key={r} r={r} stroke={i % 2 ? b : a} strokeOpacity={0.25 + i * 0.1} fill="none" />
          ))}
          <line x1="0" y1="0" x2="100" y2="-40" stroke={a} strokeWidth="1.2" />
          <circle r="3" fill={a} />
          <circle cx="60" cy="-24" r="2.5" fill={b} />
          <circle cx="-30" cy="-50" r="2" fill={b} fillOpacity="0.7" />
        </g>
      )}

      {variant === 3 && (
        // Bar pulse
        <g transform="translate(0 100)">
          {Array.from({ length: 28 }).map((_, i) => {
            const v = (Math.sin((i + h) * 0.35) + 1) / 2;
            const barH = 10 + v * 70;
            return (
              <rect
                key={i}
                x={10 + i * 11}
                y={-barH}
                width="6"
                height={barH}
                fill={i % 4 === 0 ? a : b}
                fillOpacity={0.35 + v * 0.5}
              />
            );
          })}
        </g>
      )}

      {/* Industry stamp */}
      <g>
        <rect x="14" y="14" width="6" height="6" fill={a} />
        <text
          x="26"
          y="20"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fill="oklch(1 0 0 / 0.7)"
          letterSpacing="2"
        >
          {industry.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}
