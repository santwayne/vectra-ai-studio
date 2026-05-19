import { useEffect, useRef } from "react";

/**
 * Mouse + device-tilt parallax for hero backgrounds.
 *
 * Apply to a container ref. Children with `data-parallax="<depth>"` (e.g. 10, 25, 40)
 * will translate proportionally. Higher depth = more movement.
 *
 * Live tuning (no code edits required):
 *   - localStorage key `parallax:config` holds JSON of shape:
 *       {
 *         intensity: { mobile: number, tablet: number, desktop: number }, // multipliers, default 1
 *         depths: { [parallaxId: string]: number }, // per-layer depth override
 *         enabled: boolean
 *       }
 *   - Layers may set `data-parallax-id="orb-1"` so a control panel can override their depth.
 *   - The hook listens for `parallax:config-change` window events and re-applies instantly.
 *
 * Behavior:
 *   - Desktop / mouse: tracks cursor relative to container center.
 *   - Touch / mobile: uses DeviceOrientation (gamma/beta) when available.
 *   - Honors `prefers-reduced-motion`: no-op.
 */

export type ParallaxConfig = {
  intensity: { mobile: number; tablet: number; desktop: number };
  depths: Record<string, number>;
  enabled: boolean;
};

export const PARALLAX_CONFIG_KEY = "parallax:config";
export const PARALLAX_CONFIG_EVENT = "parallax:config-change";

export const defaultParallaxConfig: ParallaxConfig = {
  intensity: { mobile: 0.6, tablet: 0.85, desktop: 1 },
  depths: {},
  enabled: true,
};

export function readParallaxConfig(): ParallaxConfig {
  if (typeof window === "undefined") return defaultParallaxConfig;
  try {
    const raw = window.localStorage.getItem(PARALLAX_CONFIG_KEY);
    if (!raw) return defaultParallaxConfig;
    const parsed = JSON.parse(raw) as Partial<ParallaxConfig>;
    return {
      intensity: { ...defaultParallaxConfig.intensity, ...(parsed.intensity ?? {}) },
      depths: { ...(parsed.depths ?? {}) },
      enabled: parsed.enabled ?? true,
    };
  } catch {
    return defaultParallaxConfig;
  }
}

export function writeParallaxConfig(config: ParallaxConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PARALLAX_CONFIG_KEY, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent(PARALLAX_CONFIG_EVENT));
}

function currentBreakpoint(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1280) return "tablet";
  return "desktop";
}

export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    type Layer = { el: HTMLElement; baseDepth: number; id: string | null };
    let layers: Layer[] = [];
    let config = readParallaxConfig();
    let intensityMult = config.intensity[currentBreakpoint()] ?? 1;

    const collectLayers = () => {
      layers = Array.from(
        container.querySelectorAll<HTMLElement>("[data-parallax]")
      ).map((el) => ({
        el,
        baseDepth: Number(el.dataset.parallax) || 10,
        id: el.dataset.parallaxId ?? null,
      }));
    };
    collectLayers();
    if (layers.length === 0) return;

    const effectiveDepth = (l: Layer) => {
      const override = l.id != null ? config.depths[l.id] : undefined;
      const base = override != null ? override : l.baseDepth;
      return base * intensityMult * (config.enabled ? 1 : 0);
    };

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      for (const layer of layers) {
        const d = effectiveDepth(layer);
        layer.el.style.transform = `translate3d(${currentX * d}px, ${currentY * d}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) / (rect.width / 2);
      targetY = (e.clientY - cy) / (rect.height / 2);
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      targetX = Math.max(-1, Math.min(1, gamma / 30));
      targetY = Math.max(-1, Math.min(1, (beta - 45) / 30));
    };

    const onResize = () => {
      intensityMult = config.intensity[currentBreakpoint()] ?? 1;
    };

    const onConfigChange = () => {
      config = readParallaxConfig();
      intensityMult = config.intensity[currentBreakpoint()] ?? 1;
    };

    const hasFinePointer =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;

    if (hasFinePointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      container.addEventListener("mouseleave", onMouseLeave);
    } else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, {
        passive: true,
      });
    }
    window.addEventListener("resize", onResize);
    window.addEventListener(PARALLAX_CONFIG_EVENT, onConfigChange);
    window.addEventListener("storage", onConfigChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(PARALLAX_CONFIG_EVENT, onConfigChange);
      window.removeEventListener("storage", onConfigChange);
      for (const layer of layers) {
        layer.el.style.transform = "";
      }
    };
  }, []);

  return ref;
}
