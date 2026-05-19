export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  industry: string;
  tagline: string;
  timeline: string;
  teamSize: string;
  problem: string;
  approach: string[];
  solution: string;
  architecture: string[];
  results: string[];
  metrics: CaseMetric[];
  stack: string[];
  quote?: { text: string; author: string; role: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "rouse-navigator",
    name: "Rouse Navigator",
    industry: "Industrial",
    tagline:
      "Proposal intelligence engine that turns RFPs into brand-compliant quotes in under 60 seconds.",
    timeline: "8 weeks",
    teamSize: "3 engineers + 1 PM",
    problem:
      "Sales engineers at a mid-market industrial equipment manufacturer were spending 2–4 days per RFP, manually pulling spec sheets, historical quotes, and pricing matrices. Win rates suffered because turnaround time consistently lagged competitors.",
    approach: [
      "Audited 18 months of historical proposals to identify reusable language patterns and pricing logic.",
      "Designed a retrieval-augmented generation pipeline indexed against the product catalog and engineering specs.",
      "Built a human-in-the-loop review workflow so sales engineers stay accountable for the final document.",
    ],
    solution:
      "An end-to-end proposal intelligence engine that ingests RFPs (PDF, email, or Word), extracts requirements, retrieves matching SKUs and reference projects, and outputs a fully-formatted, brand-compliant quote ready for engineer review.",
    architecture: [
      "Document ingestion via OCR + layout-aware parsing",
      "Vector search across product catalog (pgvector)",
      "GPT-4o for drafting + Claude for quality review pass",
      "React review console with inline edit + approval",
      "Webhook output to Salesforce + DocuSign",
    ],
    results: [
      "95% reduction in proposal drafting time",
      "3× win rate on retrofit deals",
      "Used daily by 40+ engineers across 6 regions",
    ],
    metrics: [
      { label: "Drafting time", value: "−95%" },
      { label: "Win rate uplift", value: "3×" },
      { label: "Daily users", value: "40+" },
      { label: "Avg. proposal time", value: "<60s" },
    ],
    stack: ["Python", "OpenAI GPT-4o", "Postgres + pgvector", "React", "Supabase"],
    quote: {
      text: "We went from losing deals on speed to winning them on quality. The system pays for itself every week.",
      author: "VP of Sales",
      role: "Industrial Equipment Manufacturer",
    },
  },
  {
    slug: "fintech-risk-analyzer",
    name: "FinTech Risk Analyzer",
    industry: "FinTech / Lending",
    tagline:
      "Automated underwriting brief that compresses 30+ data points into a single decision-ready summary.",
    timeline: "10 weeks",
    teamSize: "4 engineers + 1 compliance lead",
    problem:
      "Underwriters at a growth-stage consumer lender reviewed 30+ data points per applicant — credit, KYC, bank transaction patterns, and behavioral signals — entirely by hand. Time-to-decision averaged 36 hours, blocking funnel growth.",
    approach: [
      "Mapped the existing manual review checklist into a structured decision schema.",
      "Built signal extractors for each upstream data source (Plaid, Experian, internal ledger).",
      "Designed an audit-first output format reviewed by compliance before any model went live.",
    ],
    solution:
      "A risk summarization engine that pulls credit, KYC, and behavioral signals into a single decision-ready brief, with citations back to the source data and a confidence score for each factor.",
    architecture: [
      "LangGraph orchestration across 6 signal extractors",
      "Snowflake feature store for behavioral aggregates",
      "Structured output via JSON schema enforcement",
      "Audit log of every model call with input/output hashing",
      "Next.js underwriter console with side-by-side source view",
    ],
    results: [
      "70% faster underwriting decisions",
      "Lower default rate vs. manual baseline",
      "Audit-ready output passed external review",
    ],
    metrics: [
      { label: "Time to decision", value: "−70%" },
      { label: "Default rate", value: "↓ vs. baseline" },
      { label: "Throughput", value: "4× per UW" },
      { label: "Audit findings", value: "0" },
    ],
    stack: ["Python", "LangGraph", "Snowflake", "Next.js", "Postgres"],
    quote: {
      text: "Our underwriters now spend their time on judgment calls, not data entry.",
      author: "Head of Credit",
      role: "Consumer Lending Platform",
    },
  },
  {
    slug: "health-clinic-ai-assistant",
    name: "Health Clinic AI Assistant",
    industry: "HealthTech",
    tagline:
      "AI voice + chat assistant handling intake, scheduling, reminders, and FAQ — integrated with EMR.",
    timeline: "6 weeks",
    teamSize: "2 engineers + 1 clinical advisor",
    problem:
      "A multi-location specialty clinic was losing roughly 20% of inbound bookings to phone tag, voicemail, and admin delays. Front-desk staff were stretched, and after-hours inquiries went unanswered.",
    approach: [
      "Shadowed front-desk staff for two days to map every common patient interaction.",
      "Defined hard guardrails around clinical advice — assistant never diagnoses or prescribes.",
      "Integrated directly with the existing EMR scheduling API rather than building a parallel system.",
    ],
    solution:
      "A bilingual voice + chat assistant that handles intake forms, schedules appointments, sends reminders, and answers high-frequency FAQs — with a clean handoff to a human for anything outside its scope.",
    architecture: [
      "Twilio Voice + WhatsApp + web chat as entry points",
      "OpenAI Realtime API for low-latency voice",
      "EMR integration via FHIR for scheduling",
      "Supabase for transcript + audit storage",
      "Escalation rules with human handoff in <30s",
    ],
    results: [
      "+22% booking conversion within 30 days",
      "60% drop in admin call volume",
      "24/7 patient coverage across 4 locations",
    ],
    metrics: [
      { label: "Booking conversion", value: "+22%" },
      { label: "Admin calls", value: "−60%" },
      { label: "Coverage", value: "24/7" },
      { label: "Avg. response", value: "<2s" },
    ],
    stack: ["Twilio", "OpenAI Realtime", "Supabase", "Next.js", "FHIR"],
    quote: {
      text: "Patients tell us they love that someone always picks up. They don't realize it's AI.",
      author: "Practice Manager",
      role: "Multi-Location Specialty Clinic",
    },
  },
  {
    slug: "logistics-ops-dashboard",
    name: "Logistics Ops Dashboard",
    industry: "Logistics",
    tagline:
      "Unified ops dashboard with route optimization, exception alerts, and an AI dispatch copilot.",
    timeline: "12 weeks",
    teamSize: "5 engineers + 1 ops lead",
    problem:
      "Dispatchers at a regional carrier were managing 200+ daily loads across spreadsheets, a legacy TMS, and Slack. There was no real-time visibility into exceptions, and route decisions were reactive instead of proactive.",
    approach: [
      "Embedded with dispatch for a full week to map every decision and data source.",
      "Built the dashboard around exception flow first — surface the 5% of loads that need attention.",
      "Layered the AI copilot on top of clean data, not as a replacement for dispatcher judgment.",
    ],
    solution:
      "A unified operations cockpit that consolidates load status, driver location, and route economics in real time, with AI-assisted route optimization and a dispatch copilot for exception handling.",
    architecture: [
      "PostGIS for routing + geofence calculations",
      "Mapbox for live fleet visualization",
      "Python optimization service for daily route plans",
      "GPT-4o copilot scoped to ops actions only",
      "WebSocket layer for sub-second updates",
    ],
    results: [
      "18% fewer empty miles across the fleet",
      "Faster exception response (minutes vs. hours)",
      "Single source of truth replacing 4 tools",
    ],
    metrics: [
      { label: "Empty miles", value: "−18%" },
      { label: "Exception response", value: "10× faster" },
      { label: "Tools consolidated", value: "4 → 1" },
      { label: "Daily loads", value: "200+" },
    ],
    stack: ["Python", "PostGIS", "Mapbox", "React", "Postgres"],
    quote: {
      text: "We're running more loads with the same dispatch team. The copilot caught things we'd have missed.",
      author: "Director of Operations",
      role: "Regional Freight Carrier",
    },
  },
  {
    slug: "vitalsync-iot",
    name: "VitalSync IoT",
    industry: "HealthTech / IoT",
    tagline:
      "BLE-connected wellness app turning wearable sensor data into real-time health insights.",
    timeline: "10 weeks",
    teamSize: "3 engineers + 1 designer",
    problem:
      "A wearable health device manufacturer needed a companion app that could reliably ingest low-power BLE data, visualize multi-modal vitals, and deliver personalized recommendations — without draining the device battery or compromising user privacy.",
    approach: [
      "Profiled BLE packet flow to minimize power draw during continuous syncs.",
      "Designed a privacy-first local cache that wipes on uninstall — no cloud lock-in.",
      "Built modular test suites for each biometric so new sensors can plug in later.",
    ],
    solution:
      "A cross-platform wellness companion that pairs with firmware over BLE, runs a full diagnostic suite (breath, ECG, SpO2, temperature), and surfaces interactive trends with personalized wellness tips.",
    architecture: [
      "React Native app with native BLE bridges",
      "Flask backend with SQL persistence",
      "Chart.js for real-time biometric graphs",
      "Local-first cache with auto-purge on uninstall",
      "Azure cloud hosting + GitHub Actions CI/CD",
    ],
    results: [
      "Sub-second BLE sync across 5 sensor types",
      "Shipped to production in under 10 weeks",
      "Powering daily health checks for thousands of users",
    ],
    metrics: [
      { label: "Sensor types", value: "5" },
      { label: "Sync latency", value: "<1s" },
      { label: "Battery impact", value: "Minimal" },
      { label: "Time to launch", value: "10 wks" },
    ],
    stack: ["React Native", "Flask", "SQL", "BLE", "Azure"],
    quote: {
      text: "The app made our hardware feel premium. Users actually engage with their health data now.",
      author: "Product Lead",
      role: "Connected Health Device Maker",
    },
  },
  {
    slug: "stridepulse",
    name: "StridePulse",
    industry: "Sports & Wellness",
    tagline:
      "Smart insole companion app tracking steps, calories, foot pressure, and gait dynamics.",
    timeline: "8 weeks",
    teamSize: "2 engineers + 1 product designer",
    problem:
      "A wearable insole startup needed a Flutter app that could turn raw pressure and IMU data from custom hardware into intuitive insights for athletes and everyday users — without overwhelming them with charts.",
    approach: [
      "Mapped the most-asked questions from beta users and reduced the dashboard to 4 core views.",
      "Built sensor abstraction so the same UI works across multiple insole revisions.",
      "Tuned heat-map rendering for smooth 60fps on mid-tier Android devices.",
    ],
    solution:
      "A Flutter mobile app that pairs with smart insoles to track steps, calories, distance, foot-pressure heat maps, and bend angles — with a clean summary view and a music player for workouts.",
    architecture: [
      "Flutter app with BLE sensor integration",
      "Python backend with TensorFlow for gait analysis",
      "Firebase for realtime sync + auth",
      "Custom heat-map renderer for pressure data",
      "GitHub Actions CI/CD",
    ],
    results: [
      "60fps pressure visualization on mid-range devices",
      "Onboarding completion above 85%",
      "Single codebase across iOS + Android",
    ],
    metrics: [
      { label: "Frame rate", value: "60fps" },
      { label: "Onboarding", value: ">85%" },
      { label: "Platforms", value: "iOS + Android" },
      { label: "Sensors", value: "Pressure + IMU" },
    ],
    stack: ["Flutter", "Python", "TensorFlow", "Firebase", "BLE"],
  },
  {
    slug: "fairwayiq",
    name: "FairwayIQ",
    industry: "Sports Tech",
    tagline:
      "AI golf coach combining swing analysis, course tracking, and smart eyewear integration.",
    timeline: "14 weeks",
    teamSize: "4 engineers + 1 ML specialist",
    problem:
      "A golf hardware brand wanted to differentiate its smart eyewear with a companion app that delivered real coaching value — not just step counts. They needed AI swing analysis, course-aware strategy, and reliable BLE pairing.",
    approach: [
      "Trained pose-estimation models on tagged swing footage from coaches.",
      "Built a course/hole/club selector flow that takes under 10 seconds before tee-off.",
      "Architected the app around offline-first play — most courses have weak signal.",
    ],
    solution:
      "A React Native golf companion that handles club/course/tee/hole selection, GPS distance tracking, post-round analytics, AI swing feedback from video, weather-aware club suggestions, and BLE pairing with smart sunglasses.",
    architecture: [
      "React Native app with offline-first sync",
      "Python AI backend with TensorFlow swing models",
      "SQL for round + shot history",
      "BLE integration for smart eyewear",
      "Azure hosting + GitHub Actions CI/CD",
    ],
    results: [
      "AI coach feedback in <5 seconds per swing",
      "Used across 200+ courses in beta",
      "Hardware attach rate doubled post-launch",
    ],
    metrics: [
      { label: "Swing feedback", value: "<5s" },
      { label: "Courses supported", value: "200+" },
      { label: "Hardware attach", value: "2×" },
      { label: "Offline rounds", value: "Full" },
    ],
    stack: ["React Native", "Python", "TensorFlow", "SQL", "BLE", "Azure"],
  },
  {
    slug: "linguabridge",
    name: "LinguaBridge",
    industry: "Consumer Hardware",
    tagline:
      "Real-time speech-to-speech translator app paired with custom BLE earpiece hardware.",
    timeline: "9 weeks",
    teamSize: "3 engineers",
    problem:
      "A travel-tech startup was launching a wearable translation device and needed an app that handled bidirectional real-time speech translation, paired reliably over BLE, and stayed responsive under poor network conditions.",
    approach: [
      "Designed a single-screen UX so first-time users can translate within 30 seconds.",
      "Engineered fallback paths for translation when network drops mid-conversation.",
      "Stress-tested BLE pairing across 12 phone models before launch.",
    ],
    solution:
      "A cross-platform React Native app that delivers real-time speech translation, pairs with custom BLE earpieces, and exposes a clean web API layer for hardware-to-cloud data flow.",
    architecture: [
      "React Native app (iOS + Android)",
      "Python backend with TensorFlow translation pipeline",
      "BLE hardware bridge with reconnect logic",
      "REST API layer for scalable hardware sync",
      "Azure cloud hosting + GitHub Actions",
    ],
    results: [
      "Sub-2-second translation latency end-to-end",
      "BLE reconnect success rate above 99%",
      "Single-page UX validated in usability tests",
    ],
    metrics: [
      { label: "Translation latency", value: "<2s" },
      { label: "BLE reconnect", value: ">99%" },
      { label: "Languages", value: "Multi" },
      { label: "Time to first use", value: "<30s" },
    ],
    stack: ["React Native", "Python", "TensorFlow", "SQL", "BLE", "Azure"],
  },
  {
    slug: "kindcube",
    name: "KindCube",
    industry: "FinTech / Social Impact",
    tagline:
      "Smart donation cube + app turning everyday coins into family-friendly charitable giving.",
    timeline: "12 weeks",
    teamSize: "4 engineers + 1 designer",
    problem:
      "A non-profit needed a way to make charitable giving tangible for families. Cash donations were declining, kids had no connection to the act of giving, and existing donation apps felt transactional and adult-focused.",
    approach: [
      "Designed the cube interaction first — a coin drop is the trigger for everything else.",
      "Built parental controls into the core flow, not bolted on as an afterthought.",
      "Integrated Stripe early so charity payouts were production-ready before the hardware shipped.",
    ],
    solution:
      "An end-to-end giving platform: a smart cube that detects coin drops and syncs over BLE/WiFi, a mobile app for onboarding and parental controls, and a web admin panel for charities to manage campaigns and donor relationships.",
    architecture: [
      "React Native mobile app",
      "React.js admin + charities web panels",
      "Flask backend with SQL persistence",
      "Stripe API for real-time donation processing",
      "GitHub Actions CI/CD",
    ],
    results: [
      "Coin-drop to donation in under 3 seconds",
      "Onboarded multiple charity partners pre-launch",
      "Family engagement metrics above category benchmark",
    ],
    metrics: [
      { label: "Drop-to-donation", value: "<3s" },
      { label: "Charity partners", value: "Multi" },
      { label: "Surfaces", value: "Cube + App + Web" },
      { label: "Payment", value: "Stripe live" },
    ],
    stack: ["React Native", "React", "Flask", "SQL", "Stripe"],
  },
  {
    slug: "gaitsense",
    name: "GaitSense",
    industry: "HealthTech / Wearables",
    tagline:
      "End-to-end wearable gait analysis system with ML-powered motion modeling and live visualization.",
    timeline: "16 weeks",
    teamSize: "5 engineers + 1 ML researcher",
    problem:
      "A movement-science research group needed a production-grade gait analysis platform: multiple IMU sensors streaming wirelessly, ML models analyzing body mechanics, and a clinician-friendly app showing live stick-figure visualization — all running at scale on the cloud.",
    approach: [
      "Started with the data pipeline — sensor → cloud → app — before any ML modeling.",
      "Trained gait models on labeled clinical motion data with researchers in the loop.",
      "Built a stick-figure renderer that runs smoothly on phones, not just desktops.",
    ],
    solution:
      "A complete wearable platform: multi-IMU sensor fusion, cloud-based motion processing, ML gait analysis models, and a cross-platform mobile app with live IMU graphs, activity selection, and customizable user profiles.",
    architecture: [
      "React Native mobile app with live stick-figure rendering",
      "Python (Flask) backend APIs",
      "TensorFlow ML models for gait analysis",
      "Azure cloud for streaming + storage",
      "GitHub Actions CI/CD pipeline",
    ],
    results: [
      "Real-time gait visualization on consumer phones",
      "Trained models with high clinical accuracy",
      "Full hardware-to-app system delivered in 16 weeks",
    ],
    metrics: [
      { label: "Live visualization", value: "Real-time" },
      { label: "Sensors", value: "Multi-IMU" },
      { label: "Stack scope", value: "HW → ML → App" },
      { label: "Activities", value: "Run/Gym/Walk/Swim" },
    ],
    stack: ["React Native", "Python", "TensorFlow", "Azure", "BLE"],
    quote: {
      text: "It's the first gait system our researchers actually want to use in the field.",
      author: "Principal Investigator",
      role: "Movement Science Lab",
    },
  },
  {
    slug: "stylemuse-ai",
    name: "StyleMuse AI",
    industry: "Consumer / Lifestyle",
    tagline:
      "AI outfit recommender blending calendar events, weather, and personal style into daily looks.",
    timeline: "7 weeks",
    teamSize: "2 engineers + 1 designer",
    problem:
      "Men consistently underuse styling apps because most are built for women's fashion or feel overwhelming. The client wanted a focused tool that answers one question well: 'What should I wear today?' — based on real schedule and weather context.",
    approach: [
      "Reduced the recommendation flow to a single primary action: 'show me today's outfit'.",
      "Used LLMs for natural-language styling reasoning, not just lookup tables.",
      "Built feedback capture into the daily flow so suggestions improve over time.",
    ],
    solution:
      "A responsive web app that syncs with Google Calendar and weather APIs, then uses LLMs to generate personalized, event-appropriate outfit recommendations that adapt to feedback.",
    architecture: [
      "React.js responsive frontend",
      "FastAPI Python backend",
      "LLM-powered recommendation engine",
      "Google Calendar API for event context",
      "Weather API for real-time conditions",
    ],
    results: [
      "Personalized recommendations in under 2 seconds",
      "Daily-active usage above 60% in beta",
      "Feedback loop measurably improved suggestions over 4 weeks",
    ],
    metrics: [
      { label: "Recommendation time", value: "<2s" },
      { label: "DAU rate", value: ">60%" },
      { label: "Adaptive learning", value: "Yes" },
      { label: "Integrations", value: "Calendar + Weather" },
    ],
    stack: ["React", "FastAPI", "Python", "LLMs", "Google APIs"],
  },
  {
    slug: "mathpath-saas",
    name: "MathPath SaaS",
    industry: "EdTech",
    tagline:
      "Adaptive math learning platform serving global curricula with AR/VR modules and live tutoring.",
    timeline: "20 weeks",
    teamSize: "8 engineers + 1 PM + 1 curriculum lead",
    problem:
      "An education company wanted to launch a SaaS math platform that could serve students across multiple curricula (EQAO, CBSE, ICSE), comply with global privacy regulations (GDPR, PIPEDA, PHIPA), and scale to thousands of concurrent learners with AR/VR content and live tutoring.",
    approach: [
      "Designed the adaptive engine first — every other feature feeds into or off it.",
      "Architected for compliance from day one: data residency, encryption, audit logging.",
      "Built AR/VR modules as optional progressive enhancements, not blocking dependencies.",
    ],
    solution:
      "A scalable, multi-curriculum SaaS platform with an adaptive learning engine, real-time collaboration, AR/VR immersive modules, live tutoring, parent dashboards, and full GDPR/PIPEDA/PHIPA compliance.",
    architecture: [
      "React 18 + Next.js web; Flutter mobile",
      "Microservices: Node.js (NestJS) + Django REST",
      "PostgreSQL + Redis + Elasticsearch",
      "Kubernetes on AWS/GCP, Terraform IaC",
      "OAuth 2.0, JWT, TLS 1.3, AES-256 encryption",
      "ELK + Prometheus + Grafana observability",
    ],
    results: [
      "Compliant rollout across 3 jurisdictions",
      "Adaptive engine personalizing across multi-curriculum content",
      "Live D3.js dashboards for students, parents, and teachers",
    ],
    metrics: [
      { label: "Curricula", value: "EQAO + CBSE + ICSE" },
      { label: "Compliance", value: "GDPR/PIPEDA/PHIPA" },
      { label: "Microservices", value: "K8s scale" },
      { label: "Encryption", value: "AES-256 / TLS 1.3" },
    ],
    stack: ["Next.js", "Flutter", "NestJS", "Django", "Postgres", "Kubernetes", "AWS/GCP"],
    quote: {
      text: "The compliance posture alone made this project worth it. The adaptive engine is the future.",
      author: "Chief Product Officer",
      role: "Global EdTech Provider",
    },
  },
  {
    slug: "aromasense",
    name: "AromaSense",
    industry: "Smart Hardware / Hospitality",
    tagline:
      "Sensor-driven smart scent diffuser that sprays only when air quality demands it.",
    timeline: "10 weeks",
    teamSize: "3 engineers + 1 hardware lead",
    problem:
      "Restaurants, gyms, and retail spaces waste money on traditional air fresheners that spray on fixed timers — using fragrance when it's not needed and missing it when it is. The client wanted a smart device that responds to actual air quality.",
    approach: [
      "Defined ppm-based odor categories with the client before any code was written.",
      "Built a percentile-based distribution model (P50–P99) to avoid false triggers.",
      "Designed the app to surface only the controls owners actually use day-to-day.",
    ],
    solution:
      "A Flutter-controlled smart diffuser that monitors TVOC air quality in real time, dynamically adjusts spray timing and intensity based on ppm thresholds, and lets owners customize scents and zones from a mobile app.",
    architecture: [
      "Flutter mobile control app",
      "Sensor-integrated spray hardware with embedded control logic",
      "Real-time ppm distribution analysis (P50–P99)",
      "Local processing + mobile app sync",
      "Tiered automated response curves",
    ],
    results: [
      "Up to 70% reduction in fragrance waste vs. timer-based units",
      "Five-tier odor response from clean air to extreme",
      "Per-location scent customization via app",
    ],
    metrics: [
      { label: "Fragrance waste", value: "−70%" },
      { label: "Response tiers", value: "5" },
      { label: "Sensors", value: "TVOC" },
      { label: "Control", value: "Mobile app" },
    ],
    stack: ["Flutter", "Embedded C", "TVOC sensors", "BLE"],
  },
  {
    slug: "parkguard",
    name: "ParkGuard",
    industry: "Automotive / IoT",
    tagline:
      "Affordable front-parking assist combining ultrasonic sensors with a clean mobile interface.",
    timeline: "6 weeks",
    teamSize: "2 engineers + 1 hardware engineer",
    problem:
      "Front parking sensors are typically reserved for premium vehicles. Everyday drivers face bumper damage and parking stress with no affordable aftermarket option that's both reliable and easy to install.",
    approach: [
      "Picked sensor + microcontroller combos optimized for cost and accuracy.",
      "Designed the in-app feedback around three intuitive zones (green/yellow/red).",
      "Kept setup under 5 minutes — pair, calibrate, drive.",
    ],
    solution:
      "A compact aftermarket parking-assist kit using IR/ultrasonic sensors and an Arduino/ESP32 controller, paired with a Flutter app for configuration, real-time visualization, and parking history logs.",
    architecture: [
      "IR + ultrasonic proximity sensors",
      "Arduino / ESP32 microcontroller for signal processing",
      "Flutter mobile app for visualization",
      "Bluetooth / Wi-Fi link between sensor and app",
      "Real-time distance threshold processing",
    ],
    results: [
      "Setup completed in under 5 minutes",
      "Centimeter-level distance accuracy",
      "Affordable aftermarket alternative to OEM sensors",
    ],
    metrics: [
      { label: "Setup time", value: "<5 min" },
      { label: "Accuracy", value: "cm-level" },
      { label: "Zones", value: "Green/Yellow/Red" },
      { label: "Cost", value: "Aftermarket-friendly" },
    ],
    stack: ["Flutter", "Arduino", "ESP32", "BLE", "Wi-Fi"],
  },
  {
    slug: "mirrorcase",
    name: "MirrorCase",
    industry: "Consumer Electronics",
    tagline:
      "Smart iPhone case with an interactive low-power display that mirrors notifications and media.",
    timeline: "11 weeks",
    teamSize: "3 engineers + 1 industrial designer",
    problem:
      "Smartphone cases haven't fundamentally changed in a decade. The client wanted to launch a premium accessory that turns the case itself into a glanceable display — without killing iPhone battery life or requiring a complex pairing flow.",
    approach: [
      "Prototyped on e-ink first to validate battery life, then evaluated OLED for richer media.",
      "Built the iOS companion app around 'glance, then unlock' interactions.",
      "Engineered the bridge to fail gracefully — case still works as a case if the link drops.",
    ],
    solution:
      "A smart iPhone cover with an embedded low-power display that mirrors the phone's screen for glanceable notifications, media, and apps — paired via Lightning/USB-C or wireless bridge and configured through a companion iOS app.",
    architecture: [
      "Smart cover with embedded display + controller",
      "Lightning/USB-C or wireless iPhone bridge",
      "Companion iOS app for mirroring + configuration",
      "Low-power E-ink / OLED display",
      "Fallback graceful-degrade mode",
    ],
    results: [
      "All-day battery impact under 5% on iPhone",
      "Glance-to-info latency under 1 second",
      "Premium-tier industrial design ready for mass production",
    ],
    metrics: [
      { label: "Battery impact", value: "<5%" },
      { label: "Glance latency", value: "<1s" },
      { label: "Display", value: "E-ink / OLED" },
      { label: "Bridge", value: "Wired + Wireless" },
    ],
    stack: ["iOS / Swift", "Embedded firmware", "BLE", "E-ink/OLED"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
