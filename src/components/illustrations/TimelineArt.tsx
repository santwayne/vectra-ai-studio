/**
 * Editorial vector illustrations for the "From strategy to production" timeline.
 * Monochrome geometry + a single accent — built to feel hand-drawn, not stock.
 */

interface ArtProps {
  className?: string;
}

const stroke = "oklch(1 0 0 / 0.55)";
const dim = "oklch(1 0 0 / 0.18)";

/** Discovery — magnifier scanning a roadmap of opportunities */
export function DiscoveryArt({ className }: ArtProps) {
  const accent = "oklch(0.72 0.18 250)";
  return (
    <svg viewBox="0 0 320 140" className={className} fill="none" role="img" aria-label="Discovery — opportunity audit">
      <defs>
        <radialGradient id="dis-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="80" rx="150" ry="55" fill="url(#dis-glow)" />

      {/* Roadmap grid */}
      <g opacity="0.6">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={30 + i * 18} x2="300" y2={30 + i * 18} stroke={dim} />
        ))}
      </g>

      {/* Bar chart of prioritized opportunities */}
      <g>
        {[28, 44, 60, 38, 72, 50].map((h, i) => (
          <rect
            key={i}
            x={40 + i * 22}
            y={120 - h}
            width="14"
            height={h}
            rx="2"
            fill={i === 4 ? accent : "oklch(1 0 0 / 0.08)"}
            stroke={i === 4 ? accent : stroke}
            strokeOpacity={i === 4 ? 1 : 0.4}
          />
        ))}
      </g>

      {/* Trend line */}
      <polyline
        points="47,92 69,76 91,60 113,82 135,48 157,62"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeOpacity="0.9"
      />

      {/* Magnifier */}
      <g transform="translate(210 40)">
        <circle cx="30" cy="30" r="28" fill="oklch(0.18 0.014 260 / 0.6)" stroke={accent} strokeWidth="1.5" />
        <circle cx="30" cy="30" r="22" fill="none" stroke={accent} strokeOpacity="0.4" />
        <line x1="50" y1="50" x2="68" y2="68" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="white" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

/** Pilot — beaker / lab flask with active experiment */
export function PilotArt({ className }: ArtProps) {
  const accent = "oklch(0.74 0.16 165)";
  return (
    <svg viewBox="0 0 320 140" className={className} fill="none" role="img" aria-label="Pilot — production-grade experiment">
      <defs>
        <radialGradient id="pil-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pil-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="80" rx="150" ry="55" fill="url(#pil-glow)" />

      {/* Workflow rail on the left */}
      <g opacity="0.7">
        {[40, 70, 100].map((y, i) => (
          <g key={i}>
            <rect x="20" y={y - 8} width="60" height="16" rx="3" fill="oklch(1 0 0 / 0.05)" stroke={stroke} strokeOpacity="0.35" />
            <circle cx="30" cy={y} r="2.5" fill={accent} />
            <line x1="38" y1={y} x2="72" y2={y} stroke={dim} />
          </g>
        ))}
        <line x1="80" y1="40" x2="120" y2="70" stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
        <line x1="80" y1="70" x2="120" y2="70" stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
        <line x1="80" y1="100" x2="120" y2="70" stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
      </g>

      {/* Beaker */}
      <g transform="translate(150 18)">
        <path
          d="M28 0 L28 32 L8 100 Q40 112 72 100 L52 32 L52 0 Z"
          fill="oklch(1 0 0 / 0.04)"
          stroke={stroke}
          strokeWidth="1.5"
        />
        {/* Fluid */}
        <path
          d="M24 56 L14 96 Q40 106 66 96 L56 56 Q40 62 24 56 Z"
          fill="url(#pil-fluid)"
          stroke={accent}
          strokeOpacity="0.7"
        />
        {/* Bubbles */}
        <circle cx="32" cy="80" r="2.5" fill="white" fillOpacity="0.7" />
        <circle cx="46" cy="72" r="1.8" fill="white" fillOpacity="0.6" />
        <circle cx="40" cy="90" r="1.4" fill="white" fillOpacity="0.5" />
        {/* Top rim */}
        <line x1="22" y1="0" x2="58" y2="0" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        {/* Measurement ticks */}
        <line x1="56" y1="40" x2="62" y2="40" stroke={stroke} strokeOpacity="0.5" />
        <line x1="56" y1="56" x2="62" y2="56" stroke={stroke} strokeOpacity="0.5" />
        <line x1="56" y1="72" x2="62" y2="72" stroke={stroke} strokeOpacity="0.5" />
        {/* Steam */}
        <path d="M30 -6 Q34 -14 30 -20" stroke={accent} strokeOpacity="0.5" strokeLinecap="round" fill="none" />
        <path d="M50 -6 Q46 -14 50 -20" stroke={accent} strokeOpacity="0.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Sparkle */}
      <g transform="translate(252 40)" stroke={accent} strokeWidth="1.2" strokeLinecap="round">
        <line x1="0" y1="-6" x2="0" y2="6" />
        <line x1="-6" y1="0" x2="6" y2="0" />
      </g>
    </svg>
  );
}

/** Deployment — server stack + secure shield connecting outward */
export function DeploymentArt({ className }: ArtProps) {
  const accent = "oklch(0.74 0.16 30)";
  return (
    <svg viewBox="0 0 320 140" className={className} fill="none" role="img" aria-label="Deployment — hardened rollout">
      <defs>
        <radialGradient id="dep-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="80" rx="150" ry="55" fill="url(#dep-glow)" />

      {/* Server rack */}
      <g transform="translate(34 24)">
        {[0, 22, 44, 66].map((y, i) => (
          <g key={i}>
            <rect x="0" y={y} width="76" height="18" rx="3" fill="oklch(1 0 0 / 0.05)" stroke={stroke} strokeOpacity="0.5" />
            <circle cx="10" cy={y + 9} r="2.5" fill={i === 1 ? accent : "oklch(1 0 0 / 0.3)"} />
            <line x1="20" y1={y + 9} x2="64" y2={y + 9} stroke={dim} />
          </g>
        ))}
      </g>

      {/* Connection lines to nodes */}
      <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="3 3">
        <line x1="110" y1="50" x2="200" y2="34" />
        <line x1="110" y1="72" x2="220" y2="78" />
        <line x1="110" y1="94" x2="200" y2="112" />
      </g>

      {/* Endpoint nodes */}
      {[
        [200, 34],
        [220, 78],
        [200, 112],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 8} y={y - 8} width="16" height="16" rx="3" fill="oklch(0.18 0.014 260)" stroke={stroke} />
          <rect x={x - 3} y={y - 3} width="6" height="6" rx="1" fill={accent} />
        </g>
      ))}

      {/* Shield */}
      <g transform="translate(252 38)">
        <path
          d="M30 0 L58 10 L58 32 Q58 56 30 70 Q2 56 2 32 L2 10 Z"
          fill="oklch(1 0 0 / 0.04)"
          stroke={accent}
          strokeWidth="1.8"
        />
        <path
          d="M30 4 L54 12 L54 32 Q54 53 30 65 Q6 53 6 32 L6 12 Z"
          fill={accent}
          fillOpacity="0.12"
        />
        {/* Check */}
        <polyline
          points="18,34 27,44 44,24"
          fill="none"
          stroke={accent}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
