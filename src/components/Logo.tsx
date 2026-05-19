import { Link } from "@tanstack/react-router";

export type LogoVariant = "dark" | "light" | "mono";

interface LogoProps {
  className?: string;
  /** Visual variant. `dark` = for dark backgrounds (default), `light` = for light backgrounds, `mono` = single-color (uses currentColor). */
  variant?: LogoVariant;
  /** Render without the wordmark (icon only). */
  iconOnly?: boolean;
  /** Render without the link wrapper (useful for footers, emails, favicons). */
  asStatic?: boolean;
}

/**
 * NeuronX logo — neuron mark with synaptic X.
 *
 * Three variants:
 *  - `dark`  → gradient mark + light wordmark, for dark surfaces (default site chrome)
 *  - `light` → gradient mark + dark wordmark, for light surfaces (light-mode UI, print)
 *  - `mono`  → single-color via `currentColor`, for monochrome contexts (favicons,
 *              partner decks, embossing, watermarks, fax-grade printing)
 */
export function Logo({
  className = "",
  variant = "dark",
  iconOnly = false,
  asStatic = false,
}: LogoProps) {
  const content = (
    <>
      <LogoMark variant={variant} className="h-7 w-7" />
      {!iconOnly && (
        <span
          className={
            "text-base font-semibold tracking-tight " +
            (variant === "light" ? "text-[oklch(0.18_0.014_260)]" : variant === "mono" ? "text-current" : "")
          }
        >
          {variant === "mono" ? (
            <>NeuronX</>
          ) : (
            <>
              Neuron<span className="text-gradient">X</span>
            </>
          )}
        </span>
      )}
    </>
  );

  if (asStatic) {
    return <span className={`inline-flex items-center gap-2 ${className}`}>{content}</span>;
  }

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="NeuronX — Home">
      {content}
    </Link>
  );
}

/** Standalone mark, exported for favicons, og imagery scaffolding, and tight chrome. */
export function LogoMark({
  variant = "dark",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const isMono = variant === "mono";
  const somaFill = isMono
    ? "transparent"
    : variant === "light"
    ? "oklch(0.98 0.005 260)"
    : "oklch(0.18 0.014 260)";
  const focalFill = isMono ? "currentColor" : "oklch(0.72 0.18 250)";
  const stroke = isMono ? "currentColor" : "url(#nx)";
  const fill = isMono ? "currentColor" : "url(#nx)";

  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      role="img"
      aria-label="NeuronX mark"
    >
      <g stroke={stroke} strokeWidth="1.6" strokeLinecap="round">
        <line x1="6" y1="6" x2="12" y2="12" />
        <line x1="22" y1="6" x2="16" y2="12" />
        <line x1="6" y1="22" x2="12" y2="16" />
        <line x1="22" y1="22" x2="16" y2="16" />
      </g>
      <g fill={fill}>
        <circle cx="6" cy="6" r="1.6" />
        <circle cx="22" cy="6" r="1.6" />
        <circle cx="6" cy="22" r="1.6" />
        <circle cx="22" cy="22" r="1.6" />
      </g>
      <circle cx="14" cy="14" r="4.2" fill={somaFill} stroke={stroke} strokeWidth="1.6" />
      <circle cx="14" cy="14" r="1.6" fill={focalFill} />
      {!isMono && (
        <defs>
          <linearGradient id="nx" x1="0" y1="0" x2="28" y2="28">
            <stop offset="0%" stopColor="oklch(0.95 0.02 250)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 250)" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
