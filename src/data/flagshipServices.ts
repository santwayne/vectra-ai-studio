import {
  Bot,
  Search,
  FileText,
  Workflow,
  TrendingUp,
  Mic,
  type LucideIcon,
} from "lucide-react";

export interface FlagshipService {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  outcome: { metric: string; label: string };
  capabilities: string[];
  useCases: { industry: string; example: string }[];
  stack: string[];
  caseStudySlug?: string;
}

export const FLAGSHIP_SERVICES: FlagshipService[] = [
  {
    slug: "ai-voice-agents",
    icon: Mic,
    shortTitle: "AI Voice Agents",
    title: "AI Voice Agents that handle calls 24/7",
    tagline: "Inbound, outbound, multilingual — booking, intake, and support without the call-center overhead.",
    description:
      "Production voice agents that pick up in under a second, follow your scripts, hand off cleanly to humans, and write structured records straight into your CRM. Built on the latest realtime speech models and wired into your telephony stack.",
    outcome: { metric: "78%", label: "of routine calls resolved without a human" },
    capabilities: [
      "Sub-1s response latency on Twilio, Telnyx, or your SIP trunk",
      "Multilingual (35+ languages) with accent-robust ASR",
      "Native CRM writebacks (Salesforce, HubSpot, custom)",
      "Live human handoff with full transcript context",
      "Full call recording, redaction, and audit trail",
    ],
    useCases: [
      { industry: "Healthcare", example: "Patient intake & appointment booking for clinic networks" },
      { industry: "Financial Services", example: "Outbound collections and KYC verification at scale" },
      { industry: "Logistics", example: "Driver dispatch and delivery confirmation calls" },
    ],
    stack: ["OpenAI Realtime", "Deepgram", "ElevenLabs", "Twilio", "LiveKit"],
  },
  {
    slug: "predictive-pricing-engine",
    icon: TrendingUp,
    shortTitle: "Predictive Pricing Engine",
    title: "Predictive Pricing Engine for revenue teams",
    tagline: "Forecast demand, set prices, and detect anomalies on your own historical data.",
    description:
      "Custom forecasting and dynamic pricing models trained on your transaction history. We ship the model, the API, the dashboard, and the playbook — not just a notebook.",
    outcome: { metric: "+12%", label: "average margin lift in first 90 days" },
    capabilities: [
      "Demand forecasting with seasonality and competitor signals",
      "Elasticity modeling per SKU, segment, and channel",
      "Real-time price API with guardrails and approval workflows",
      "Anomaly detection on margin, conversion, and inventory",
      "Decision dashboards for finance and pricing teams",
    ],
    useCases: [
      { industry: "Retail & eCommerce", example: "Dynamic pricing across 50K+ SKUs with markdown automation" },
      { industry: "Logistics", example: "Freight rate forecasting and lane-level pricing" },
      { industry: "Manufacturing", example: "Quote-to-order pricing for configured products" },
    ],
    stack: ["XGBoost", "Prophet", "PyTorch Forecasting", "Snowflake", "dbt"],
  },
  {
    slug: "custom-gpt-copilots",
    icon: Bot,
    shortTitle: "Custom GPT & Copilots",
    title: "Custom GPT assistants & in-product copilots",
    tagline: "Domain-trained copilots for sales, support, ops, and engineering — secured to your roles.",
    description:
      "Embedded copilots that read your data, call your tools, and respect your permissions. Shipped as a chat surface, an inline assistant in your product, or both.",
    outcome: { metric: "3.4×", label: "faster ticket resolution after rollout" },
    capabilities: [
      "Department-tuned models with curated tool access",
      "Role-based access control and per-tenant data isolation",
      "Citations and source attribution on every answer",
      "Eval harness with regression detection on every model bump",
      "Audit logs, PII redaction, and SOC 2-aligned controls",
    ],
    useCases: [
      { industry: "Legal & Professional", example: "Matter-aware research copilot for partners and associates" },
      { industry: "Financial Services", example: "Underwriter copilot reading policy docs and submission packs" },
      { industry: "SaaS", example: "In-product assistant that drafts, configures, and explains" },
    ],
    stack: ["GPT-5", "Claude Opus", "LangGraph", "Pinecone", "Postgres pgvector"],
  },
  {
    slug: "internal-search-ai",
    icon: Search,
    shortTitle: "Internal Search AI",
    title: "Internal Search AI across every doc, ticket, and channel",
    tagline: "One search box that actually finds the right answer — with citations.",
    description:
      "Hybrid semantic + keyword search across SharePoint, Drive, Notion, Confluence, Slack, Zendesk, and S3. Ranked, cited, and permission-aware.",
    outcome: { metric: "−62%", label: "drop in 'where is X?' Slack messages" },
    capabilities: [
      "Connectors for 20+ enterprise systems out of the box",
      "Hybrid retrieval (BM25 + dense) with reranking",
      "Source-of-truth citations on every result",
      "Honors source-system permissions per user",
      "Slack, Teams, and browser extension surfaces",
    ],
    useCases: [
      { industry: "Enterprise IT", example: "Unified search for distributed engineering knowledge bases" },
      { industry: "Healthcare", example: "Clinician access to policies, protocols, and prior auth docs" },
      { industry: "Legal & Professional", example: "Cross-matter precedent search with attribution" },
    ],
    stack: ["Cohere Rerank", "Elastic", "Qdrant", "OpenAI embeddings", "Unstructured.io"],
  },
  {
    slug: "ai-workflow-automation",
    icon: Workflow,
    shortTitle: "AI Workflow Automation",
    title: "AI Workflow Automation that takes action, not just suggests",
    tagline: "Multi-step agents wired into your stack — event-driven, observable, and safe to retry.",
    description:
      "Agents that read tickets, call APIs, transform data, write back to systems of record, and escalate to humans only when needed. Built with proper retries, idempotency, and observability.",
    outcome: { metric: "11 hrs", label: "of ops work removed per analyst per week" },
    capabilities: [
      "Event-driven triggers (webhooks, queues, schedulers)",
      "Tool calling with retries, timeouts, and circuit breakers",
      "Slack and email handoff with rich context cards",
      "Per-step traces and replay for any failed run",
      "Approval gates for destructive or high-cost actions",
    ],
    useCases: [
      { industry: "Financial Services", example: "Automated reconciliation and exception triage" },
      { industry: "Healthcare", example: "Prior-authorization packet assembly and submission" },
      { industry: "Manufacturing", example: "Vendor PO matching and three-way invoice approval" },
    ],
    stack: ["Temporal", "LangGraph", "Inngest", "Postgres", "Datadog"],
  },
  {
    slug: "proposal-document-ai",
    icon: FileText,
    shortTitle: "Proposal & Document AI",
    title: "Proposal & Document AI for revenue and ops teams",
    tagline: "Generate proposals, reports, summaries, and contracts from structured inputs and your templates.",
    description:
      "Brand-consistent document generation with reviewer workflows, template libraries, and clause-level approvals. Integrates with your DMS and CRM.",
    outcome: { metric: "5×", label: "faster proposal turnaround vs. manual drafting" },
    capabilities: [
      "Template engine with branded layouts and clause libraries",
      "Structured input from CRM, CPQ, and intake forms",
      "Reviewer workflows with redlines and version history",
      "Export to DOCX, PDF, and your DMS of choice",
      "Audit trail of every AI-generated edit",
    ],
    useCases: [
      { industry: "Professional Services", example: "RFP responses with auto-pulled past performance" },
      { industry: "Legal", example: "Contract drafting from playbook clauses with risk flags" },
      { industry: "Financial Services", example: "Quarterly client reports generated from portfolio data" },
    ],
    stack: ["GPT-5", "Claude Opus", "Docassemble", "Documate", "Postgres"],
  },
];

export function getFlagshipService(slug: string) {
  return FLAGSHIP_SERVICES.find((s) => s.slug === slug);
}
