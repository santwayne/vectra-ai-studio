/**
 * Compact vector illustrations for industry tiles.
 * Each is a stylized, geometric mini-scene rather than a generic icon.
 */
interface ArtProps {
  className?: string;
}

const accent = "oklch(0.72 0.18 250)";
const accent2 = "oklch(0.74 0.16 165)";
const stroke = "oklch(1 0 0 / 0.55)";
const dim = "oklch(1 0 0 / 0.2)";

const Wrap = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox="0 0 96 64" fill="none" role="img" aria-label={label} className="h-14 w-20">
    {children}
  </svg>
);

export function FinancialArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Wrap label="Financial chart with rising candles">
        <line x1="6" y1="56" x2="90" y2="56" stroke={dim} />
        {[12, 24, 36, 48, 60, 72, 84].map((x, i) => {
          const tall = i % 2 === 0;
          const h = tall ? 28 : 16;
          const up = i > 2;
          return (
            <g key={x}>
              <line x1={x} y1={56 - h - 4} x2={x} y2={56 - 2} stroke={stroke} strokeWidth="0.7" />
              <rect
                x={x - 3}
                y={56 - h}
                width="6"
                height={h - 4}
                fill={up ? accent : "oklch(0.18 0.014 260)"}
                stroke={up ? accent : stroke}
                strokeWidth="0.8"
              />
            </g>
          );
        })}
        <path d="M6 44 L24 38 L42 30 L60 22 L78 14 L90 10" stroke={accent} strokeWidth="1.2" fill="none" />
      </Wrap>
    </div>
  );
}

export function HealthcareArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Wrap label="Heart pulse over cross">
        <rect x="34" y="16" width="28" height="32" rx="3" stroke={dim} />
        <rect x="44" y="20" width="8" height="24" fill={accent} fillOpacity="0.2" stroke={accent} />
        <rect x="36" y="28" width="24" height="8" fill={accent} fillOpacity="0.2" stroke={accent} />
        <path
          d="M6 38 L20 38 L26 28 L34 48 L42 32 L48 38 L90 38"
          stroke={accent2}
          strokeWidth="1.4"
          fill="none"
          strokeLinejoin="round"
        />
      </Wrap>
    </div>
  );
}

export function ManufacturingArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Wrap label="Factory silhouette with gears">
        <path
          d="M6 56 L6 36 L20 36 L20 26 L36 36 L36 22 L56 36 L56 28 L78 36 L78 56 Z"
          fill="oklch(1 0 0 / 0.04)"
          stroke={stroke}
          strokeLinejoin="round"
        />
        <rect x="14" y="44" width="6" height="12" fill={accent} fillOpacity="0.4" />
        <rect x="40" y="44" width="6" height="12" fill={accent} fillOpacity="0.4" />
        <rect x="62" y="44" width="6" height="12" fill={accent} fillOpacity="0.4" />
        <circle cx="84" cy="20" r="6" stroke={accent} fill="none" />
        <circle cx="84" cy="20" r="2" fill={accent} />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180;
          const x1 = 84 + Math.cos(r) * 6;
          const y1 = 20 + Math.sin(r) * 6;
          const x2 = 84 + Math.cos(r) * 9;
          const y2 = 20 + Math.sin(r) * 9;
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1" />;
        })}
      </Wrap>
    </div>
  );
}

export function LogisticsArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Wrap label="Truck with route line">
        <path d="M4 12 Q30 4 56 18 T92 14" stroke={accent} strokeWidth="1" fill="none" strokeDasharray="2 2" />
        <circle cx="4" cy="12" r="2" fill={accent} />
        <circle cx="92" cy="14" r="2" fill={accent2} />
        <rect x="14" y="34" width="40" height="20" rx="2" fill="oklch(1 0 0 / 0.04)" stroke={stroke} />
        <path d="M54 38 L70 38 L78 46 L78 54 L54 54 Z" fill="oklch(1 0 0 / 0.04)" stroke={stroke} strokeLinejoin="round" />
        <rect x="58" y="42" width="14" height="6" fill={accent} fillOpacity="0.3" />
        <circle cx="26" cy="56" r="4" fill="oklch(0.14 0.012 260)" stroke={stroke} />
        <circle cx="68" cy="56" r="4" fill="oklch(0.14 0.012 260)" stroke={stroke} />
      </Wrap>
    </div>
  );
}

export function RetailArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Wrap label="Storefront shelves with tag">
        <path d="M10 22 L10 16 L86 16 L86 22 Z" fill={accent} fillOpacity="0.2" stroke={accent} />
        <rect x="14" y="22" width="68" height="32" stroke={stroke} fill="oklch(1 0 0 / 0.03)" />
        {[28, 38, 48].map((y) => (
          <line key={y} x1="14" y1={y} x2="82" y2={y} stroke={dim} />
        ))}
        {[20, 32, 44, 56, 68, 76].map((x, i) => (
          <rect key={x} x={x} y={i % 2 === 0 ? 30 : 40} width="4" height="6" fill={accent2} fillOpacity="0.6" />
        ))}
        <circle cx="74" cy="14" r="6" fill={accent} />
        <text x="74" y="17" fontSize="6" textAnchor="middle" fill="oklch(0.14 0.012 260)" fontFamily="monospace" fontWeight="700">
          %
        </text>
      </Wrap>
    </div>
  );
}

export function LegalArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Wrap label="Balance scale over document">
        <rect x="20" y="14" width="40" height="44" rx="2" stroke={stroke} fill="oklch(1 0 0 / 0.03)" />
        <line x1="26" y1="22" x2="54" y2="22" stroke={dim} />
        <line x1="26" y1="28" x2="48" y2="28" stroke={dim} />
        <line x1="26" y1="34" x2="52" y2="34" stroke={dim} />
        <line x1="26" y1="40" x2="44" y2="40" stroke={dim} />
        <g>
          <line x1="72" y1="10" x2="72" y2="50" stroke={accent} strokeWidth="1.2" />
          <line x1="60" y1="18" x2="84" y2="18" stroke={accent} strokeWidth="1.2" />
          <path d="M60 18 L54 32 L66 32 Z" fill={accent} fillOpacity="0.25" stroke={accent} />
          <path d="M84 18 L78 32 L90 32 Z" fill={accent} fillOpacity="0.25" stroke={accent} />
          <circle cx="72" cy="52" r="3" fill={accent} />
        </g>
      </Wrap>
    </div>
  );
}
