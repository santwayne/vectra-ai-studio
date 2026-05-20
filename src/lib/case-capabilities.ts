import type { CaseStudy } from "@/data/caseStudies";

export const ALL_CAPABILITIES = [
  "Conversational AI",
  "Predictive ML",
  "Knowledge / RAG",
  "Workflow Automation",
  "IoT / Edge",
] as const;

export type Capability = (typeof ALL_CAPABILITIES)[number];

const STACK_BUCKETS: Record<Capability, RegExp> = {
  "Conversational AI": /(voice|whisper|stt|tts|chat|conversational|nlu|dialog)/i,
  "Predictive ML": /(predict|forecast|model|ml |scikit|xgboost|risk|anomaly|score)/i,
  "Knowledge / RAG": /(rag|pgvector|vector|embed|retrieval|knowledge|search|llamaindex)/i,
  "Workflow Automation": /(workflow|automation|agent|n8n|zapier|orchestrat|pipeline)/i,
  "IoT / Edge": /(iot|ble|edge|sensor|wearable|raspberry|esp32|firmware|hardware)/i,
};

export function deriveCapabilities(study: CaseStudy): Capability[] {
  const haystack = [
    study.name,
    study.tagline,
    study.industry,
    study.solution,
    study.stack.join(" "),
    study.architecture.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const matched = (Object.keys(STACK_BUCKETS) as Capability[]).filter((cap) =>
    STACK_BUCKETS[cap].test(haystack)
  );

  // Always guarantee at least one tag for filter display.
  return matched.length > 0 ? matched : ["Workflow Automation"];
}

export function uniqueIndustries(studies: CaseStudy[]): string[] {
  return Array.from(new Set(studies.map((s) => s.industry))).sort();
}
