import { useEffect, useState } from "react";
import { Sparkles, Volume2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Message = { role: "user" | "agent"; text: string };

const SCRIPT: Message[] = [
  { role: "user", text: "Can you analyze last quarter's pipeline drop-off?" },
  {
    role: "agent",
    text: "Pulled CRM + product data. Drop-off concentrated at stage 3 — pricing pushback in mid-market. Drafting playbook now.",
  },
  { role: "user", text: "Send the summary to the GTM channel." },
  {
    role: "agent",
    text: "Done. 4 actions queued, 2 deals re-prioritized for this week.",
  },
];

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function buildContextMessage(messages: Message[]): string {
  const recent = messages.slice(-4);
  const transcript = recent
    .map((m) => `${m.role === "user" ? "Us" : "Agent"}: ${m.text}`)
    .join("\n");
  return `Saw the live agent demo on the homepage. Want to scope a similar AI ops copilot pilot for our team.\n\nLatest exchange:\n${transcript}`;
}

/**
 * Floating glassmorphic "Live AI Agent" demo card — Ada-inspired but
 * positioned as NeuronX's enterprise AI ops copilot.
 */
export function LiveAgentCard() {
  // Prime with the first exchange so the card never renders empty on mount.
  const [visible, setVisible] = useState<Message[]>(() => SCRIPT.slice(0, 2));
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 2;

    const step = async () => {
      while (!cancelled) {
        const next = SCRIPT[i % SCRIPT.length];
        setTyping(true);
        await wait(900);
        if (cancelled) return;
        setTyping(false);
        setVisible((prev) => {
          const updated = [...prev, next];
          return updated.length > 4 ? updated.slice(-4) : updated;
        });
        await wait(2400);
        i++;
        if (i % SCRIPT.length === 0) {
          await wait(600);
          if (cancelled) return;
          setVisible([]);
        }
      }
    };

    step();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="float-card relative w-full max-w-[440px]">
      {/* Glow halo */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.18 250 / 0.35), transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="glass-card overflow-hidden rounded-3xl p-5 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">NeuronX Agent</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Live · Ops Copilot
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1" aria-hidden>
            <span className="voice-bar" />
            <span className="voice-bar" />
            <span className="voice-bar" />
            <span className="voice-bar" />
            <span className="voice-bar" />
          </div>
        </div>

        {/* Messages */}
        <div className="mt-4 flex min-h-[280px] flex-col gap-3">
          {visible.map((m, idx) => (
            <div
              key={`${idx}-${m.text}`}
              className={`msg-in flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                  m.role === "user"
                    ? "bg-primary/15 text-foreground ring-1 ring-primary/30"
                    : "bg-surface-elevated text-foreground/90 ring-1 ring-border"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="msg-in flex justify-start">
              <div className="rounded-2xl bg-surface-elevated px-3.5 py-3 ring-1 ring-border">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Volume2 className="h-3.5 w-3.5" />
            Listening on 4 channels
          </div>
          <Link
            to="/book"
            search={{
              source: "live-agent-demo",
              use_case: "agents,copilot",
              message: buildContextMessage(visible),
            }}
            className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-primary/15 px-3.5 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/40 transition-colors hover:bg-primary/25"
          >
            Request a pilot
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

