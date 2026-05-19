import {
  Bot,
  Brain,
  Sparkles,
  Code2,
  Eye,
  Cpu,
  Workflow,
  MessagesSquare,
  Layers,
  Zap,
  Network,
  Settings2,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface ServicePillar {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  accent: string; // oklch color stop for gradient
  services: ServiceItem[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "ai-development",
    eyebrow: "Pillar 01",
    title: "AI Development",
    intro:
      "Custom AI systems engineered around your data, workflows, and KPIs — from proof-of-concept to production.",
    accent: "oklch(0.72 0.18 250)",
    services: [
      {
        title: "AI Development Services",
        desc: "End-to-end design and engineering of bespoke AI products built around your business problem.",
        icon: Code2,
      },
      {
        title: "Enterprise AI Development",
        desc: "Scalable, secure AI systems for regulated and high-volume enterprise environments.",
        icon: Layers,
      },
      {
        title: "AI Consulting Services",
        desc: "Strategy, opportunity mapping, and ROI modeling led by senior applied-AI engineers.",
        icon: Brain,
      },
      {
        title: "AI POC Development",
        desc: "Rapid 4–6 week proofs that de-risk investment and validate the business case.",
        icon: Rocket,
      },
      {
        title: "Computer Vision",
        desc: "Detection, classification, OCR, and video understanding for industrial and consumer use cases.",
        icon: Eye,
      },
      {
        title: "ML Development",
        desc: "Predictive models, forecasting, and anomaly detection trained on your proprietary data.",
        icon: Cpu,
      },
      {
        title: "MLOps Consulting",
        desc: "Model deployment, monitoring, and lifecycle management built to enterprise SLAs.",
        icon: Settings2,
      },
    ],
  },
  {
    id: "generative-ai",
    eyebrow: "Pillar 02",
    title: "Generative AI",
    intro:
      "LLM-native products and integrations — from custom GenAI platforms to ChatGPT-powered workflows in your stack.",
    accent: "oklch(0.62 0.2 290)",
    services: [
      {
        title: "Generative AI Development",
        desc: "Domain-tuned GenAI applications that draft, summarize, retrieve, and act inside your business.",
        icon: Sparkles,
      },
      {
        title: "Generative AI Consulting",
        desc: "Roadmaps, architecture reviews, and risk frameworks for enterprise GenAI adoption.",
        icon: Brain,
      },
      {
        title: "Enterprise GenAI Development",
        desc: "Multi-tenant, role-aware GenAI platforms with audit, compliance, and observability built in.",
        icon: Layers,
      },
      {
        title: "LLM Development",
        desc: "Fine-tuning, distillation, and RAG pipelines on open-source and frontier model families.",
        icon: Cpu,
      },
      {
        title: "Generative AI Integration",
        desc: "Wire GenAI into Salesforce, Slack, ERPs, ticketing, and proprietary internal tools.",
        icon: Network,
      },
      {
        title: "Adaptive AI Development",
        desc: "Self-improving systems that learn from feedback loops and operator interactions.",
        icon: Zap,
      },
      {
        title: "ChatGPT Developers",
        desc: "Senior engineers who ship production-grade ChatGPT, GPT-4o, and o-series applications.",
        icon: Code2,
      },
      {
        title: "ChatGPT Integration",
        desc: "Embed conversational intelligence directly into customer and employee workflows.",
        icon: MessagesSquare,
      },
    ],
  },
  {
    id: "agentic-ai",
    eyebrow: "Pillar 03",
    title: "Agentic AI",
    intro:
      "Autonomous AI agents and copilots that don't just answer — they take action across your tools and processes.",
    accent: "oklch(0.74 0.16 165)",
    services: [
      {
        title: "AI Agent Development",
        desc: "Goal-driven autonomous agents wired into your APIs, data stores, and decision rules.",
        icon: Bot,
      },
      {
        title: "Enterprise AI Chatbot",
        desc: "Battle-tested chatbots for support, sales, and internal ops — multilingual and brand-aligned.",
        icon: MessagesSquare,
      },
      {
        title: "AI Chatbot Development",
        desc: "Web, mobile, and embedded chatbots with deep retrieval and tool-use capabilities.",
        icon: MessagesSquare,
      },
      {
        title: "AI Copilot Development",
        desc: "In-product copilots that augment knowledge workers without replacing their judgment.",
        icon: Sparkles,
      },
      {
        title: "Conversational AI Development",
        desc: "Voice and text experiences with NLU, dialog management, and live channel orchestration.",
        icon: Workflow,
      },
      {
        title: "LLM API Pricing Calculator",
        desc: "Plan token spend across providers — model the unit economics before you ship.",
        icon: Cpu,
      },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "AI opportunity audit, ROI modeling, and a prioritized roadmap built around your KPIs.",
  },
  {
    n: "02",
    title: "Prototype",
    desc: "A 4–6 week production-grade POC against your real data — not a sandbox demo.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Senior engineers ship the platform: agents, RAG, evals, observability, integrations.",
  },
  {
    n: "04",
    title: "Operate",
    desc: "Continuous evaluation, model upgrades, and feature growth as your business evolves.",
  },
];
