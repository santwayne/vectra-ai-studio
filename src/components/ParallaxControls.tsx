import { useEffect, useState } from "react";
import { Settings2, X, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  defaultParallaxConfig,
  readParallaxConfig,
  writeParallaxConfig,
  type ParallaxConfig,
} from "@/hooks/use-parallax";

type LayerSpec = { id: string; label: string; defaultDepth: number };

/**
 * Floating control panel to live-tune hero parallax.
 *
 * Persists to localStorage (key: `parallax:config`) and broadcasts changes
 * so any mounted `useParallax` hook re-applies instantly. No code edits
 * needed to retune intensity per breakpoint or override per-layer depth.
 */
export function ParallaxControls({ layers }: { layers: LayerSpec[] }) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<ParallaxConfig>(defaultParallaxConfig);

  useEffect(() => {
    setConfig(readParallaxConfig());
  }, []);

  const update = (next: ParallaxConfig) => {
    setConfig(next);
    writeParallaxConfig(next);
  };

  const setIntensity = (bp: keyof ParallaxConfig["intensity"], v: number) =>
    update({ ...config, intensity: { ...config.intensity, [bp]: v } });

  const setDepth = (id: string, v: number) =>
    update({ ...config, depths: { ...config.depths, [id]: v } });

  const reset = () => {
    update({
      ...defaultParallaxConfig,
      depths: {},
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open parallax controls"
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-background"
      >
        <Settings2 className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Parallax Controls</h3>
              <p className="text-xs text-muted-foreground">
                Live-tune hero motion
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={reset}
                aria-label="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
            <span className="text-xs font-medium">Enabled</span>
            <Switch
              checked={config.enabled}
              onCheckedChange={(v) => update({ ...config, enabled: v })}
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Intensity per breakpoint
              </p>
              {(
                [
                  { key: "mobile", label: "Mobile (<768px)" },
                  { key: "tablet", label: "Tablet (768–1280px)" },
                  { key: "desktop", label: "Desktop (≥1280px)" },
                ] as const
              ).map(({ key, label }) => (
                <div key={key} className="mb-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span>{label}</span>
                    <span className="font-mono text-muted-foreground">
                      {config.intensity[key].toFixed(2)}×
                    </span>
                  </div>
                  <Slider
                    value={[config.intensity[key]]}
                    min={0}
                    max={2}
                    step={0.05}
                    onValueChange={(v) => setIntensity(key, v[0])}
                  />
                </div>
              ))}
            </div>

            {layers.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Per-layer depth
                </p>
                {layers.map((layer) => {
                  const value = config.depths[layer.id] ?? layer.defaultDepth;
                  return (
                    <div key={layer.id} className="mb-3">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span>{layer.label}</span>
                        <span className="font-mono text-muted-foreground">
                          {Math.round(value)}px
                        </span>
                      </div>
                      <Slider
                        value={[value]}
                        min={0}
                        max={120}
                        step={1}
                        onValueChange={(v) => setDepth(layer.id, v[0])}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
