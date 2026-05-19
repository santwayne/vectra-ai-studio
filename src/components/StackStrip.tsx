/**
 * Tech / model strip — communicates infrastructure depth.
 * Pure CSS marquee, reduced-motion safe via .marquee-track keyframe.
 */
const STACK = [
  "OpenAI · GPT-4o",
  "Anthropic · Claude",
  "Google · Gemini",
  "Llama 3",
  "Mistral",
  "LangChain",
  "LlamaIndex",
  "pgvector",
  "Pinecone",
  "Weaviate",
  "Hugging Face",
  "Ollama",
  "vLLM",
  "TensorFlow",
  "PyTorch",
  "Supabase",
  "AWS Bedrock",
  "Azure OpenAI",
];

export function StackStrip() {
  return (
    <section className="border-y border-border bg-surface/40 py-10">
      <div className="container-wide">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Built on the AI stack the world's best teams trust
        </p>
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent"
            aria-hidden
          />

          <div className="marquee-track gap-10">
            {[...STACK, ...STACK].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="shrink-0 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
