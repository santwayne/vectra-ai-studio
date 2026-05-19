/**
 * Hand-crafted SVG illustrations for the three service pillars.
 * Geometric, monochrome with single accent color — built to feel like
 * editorial vector art rather than stock iconography.
 */

interface ArtProps {
  accent?: string;
  className?: string;
}

const baseStroke = "oklch(1 0 0 / 0.55)";
const dimStroke = "oklch(1 0 0 / 0.18)";

/** AI Development — neural lattice + data plane */
export function AIDevelopmentArt({ accent = "oklch(0.72 0.18 250)", className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      fill="none"
      role="img"
      aria-label="Neural lattice over a data plane"
    >
      <defs>
        <linearGradient id="aid-plane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="aid-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <ellipse cx="160" cy="100" rx="140" ry="60" fill="url(#aid-glow)" />

      {/* Iso data plane */}
      <g opacity="0.55">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={40 + i * 30}
            y1="140"
            x2={120 + i * 30}
            y2="60"
            stroke={dimStroke}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={40 + i * 25}
            y1={140 - i * 13}
            x2={280 - (6 - i) * 25 + i * 25 - 120}
            y2={140 - i * 13}
            stroke={dimStroke}
            strokeWidth="1"
          />
        ))}
      </g>
      <path
        d="M40 140 L160 60 L280 140 L160 170 Z"
        fill="url(#aid-plane)"
        stroke={accent}
        strokeOpacity="0.4"
        strokeWidth="1"
      />

      {/* Neural nodes */}
      {[
        [80, 60],
        [140, 40],
        [200, 50],
        [250, 80],
        [110, 95],
        [170, 80],
        [220, 110],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="8" fill={accent} fillOpacity="0.12" stroke={accent} />
          <circle cx={cx} cy={cy} r="2.5" fill={accent} />
        </g>
      ))}
      {/* Edges */}
      <g stroke={baseStroke} strokeWidth="0.8">
        <line x1="80" y1="60" x2="140" y2="40" />
        <line x1="140" y1="40" x2="200" y2="50" />
        <line x1="200" y1="50" x2="250" y2="80" />
        <line x1="80" y1="60" x2="110" y2="95" />
        <line x1="140" y1="40" x2="170" y2="80" />
        <line x1="200" y1="50" x2="170" y2="80" />
        <line x1="250" y1="80" x2="220" y2="110" />
        <line x1="170" y1="80" x2="220" y2="110" />
        <line x1="110" y1="95" x2="170" y2="80" />
      </g>
    </svg>
  );
}

/** Generative AI — prismatic refraction + token stream */
export function GenerativeAIArt({ accent = "oklch(0.62 0.2 290)", className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      fill="none"
      role="img"
      aria-label="Prism refracting tokens into spectrum"
    >
      <defs>
        <linearGradient id="gen-spec" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.72 0.18 250)" />
          <stop offset="50%" stopColor={accent} />
          <stop offset="100%" stopColor="oklch(0.74 0.16 30)" />
        </linearGradient>
        <radialGradient id="gen-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="90" rx="150" ry="70" fill="url(#gen-glow)" />

      {/* Token stream entering left */}
      <g opacity="0.7">
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={10 + i * 8}
            y={88 - (i % 3) * 2}
            width="5"
            height="2"
            rx="1"
            fill={baseStroke}
            opacity={0.3 + (i / 12) * 0.6}
          />
        ))}
      </g>

      {/* Prism */}
      <g>
        <polygon
          points="120,40 180,90 120,140"
          fill="oklch(1 0 0 / 0.04)"
          stroke={accent}
          strokeWidth="1.5"
        />
        <polygon
          points="120,40 180,90 120,140"
          fill={accent}
          fillOpacity="0.08"
        />
        <line x1="120" y1="40" x2="180" y2="90" stroke="oklch(1 0 0 / 0.7)" strokeWidth="0.5" />
      </g>

      {/* Refracted spectrum lines */}
      <g strokeLinecap="round">
        {[
          { y2: 50, c: "oklch(0.72 0.18 250)" },
          { y2: 70, c: "oklch(0.74 0.16 200)" },
          { y2: 90, c: "oklch(0.78 0.16 165)" },
          { y2: 110, c: "oklch(0.82 0.16 110)" },
          { y2: 130, c: accent },
          { y2: 150, c: "oklch(0.74 0.16 30)" },
        ].map((s, i) => (
          <line
            key={i}
            x1="180"
            y1="90"
            x2="310"
            y2={s.y2}
            stroke={s.c}
            strokeWidth="1.5"
            opacity="0.85"
          />
        ))}
      </g>

      {/* Sparkle */}
      <circle cx="180" cy="90" r="3" fill="white" />
      <circle cx="180" cy="90" r="8" fill="none" stroke="white" strokeOpacity="0.4" />
    </svg>
  );
}

/** Agentic AI — orchestration graph with active agent */
export function AgenticAIArt({ accent = "oklch(0.74 0.16 165)", className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      fill="none"
      role="img"
      aria-label="Agent orchestrating tools across a graph"
    >
      <defs>
        <radialGradient id="ag-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="95" rx="140" ry="65" fill="url(#ag-glow)" />

      {/* Outer orbit */}
      <circle
        cx="160"
        cy="90"
        r="68"
        stroke={accent}
        strokeOpacity="0.3"
        strokeDasharray="2 4"
      />
      <circle
        cx="160"
        cy="90"
        r="44"
        stroke={accent}
        strokeOpacity="0.5"
        strokeDasharray="3 3"
      />

      {/* Connecting lines from center to tools */}
      {[
        [160 - 68, 90],
        [160 + 68, 90],
        [160, 90 - 60],
        [160 + 50, 90 + 48],
        [160 - 50, 90 + 48],
        [160 + 60, 90 - 30],
        [160 - 60, 90 - 30],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1="160"
          y1="90"
          x2={x}
          y2={y}
          stroke={baseStroke}
          strokeWidth="0.8"
          opacity="0.6"
        />
      ))}

      {/* Tool nodes (squares) */}
      {[
        [160 - 68, 90],
        [160 + 68, 90],
        [160, 90 - 60],
        [160 + 50, 90 + 48],
        [160 - 50, 90 + 48],
        [160 + 60, 90 - 30],
        [160 - 60, 90 - 30],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x - 7}
            y={y - 7}
            width="14"
            height="14"
            rx="3"
            fill="oklch(0.18 0.014 260)"
            stroke={baseStroke}
          />
          <rect x={x - 3} y={y - 3} width="6" height="6" rx="1" fill={accent} fillOpacity="0.7" />
        </g>
      ))}

      {/* Center agent */}
      <g>
        <circle cx="160" cy="90" r="18" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5" />
        <circle cx="160" cy="90" r="9" fill={accent} />
        <circle cx="160" cy="90" r="3" fill="oklch(0.14 0.012 260)" />
      </g>

      {/* Decision sparks */}
      <g stroke="white" strokeOpacity="0.7" strokeWidth="0.8">
        <line x1="160" y1="68" x2="160" y2="62" />
        <line x1="160" y1="118" x2="160" y2="124" />
        <line x1="138" y1="90" x2="132" y2="90" />
        <line x1="182" y1="90" x2="188" y2="90" />
      </g>
    </svg>
  );
}
