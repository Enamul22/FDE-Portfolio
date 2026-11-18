export type Project = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  live: string;
  github: string;
  image: string;
  imageAlt: string;
  problem: string;
  context: string;
  workflow: string[];
  contribution: string;
  decisions: { title: string; body: string }[];
  validation: string[];
  evidence: { label: string; href: string }[];
  gallery: { src: string; alt: string; caption: string }[];
};
export const projects: Project[] = [
  {
    slug: "fleetpulse",
    name: "FleetPulse",
    title: "Vehicle Health & Peer Analytics",
    summary:
      "Understand a vehicle’s condition, compare it with relevant peers and see what drives the difference.",
    highlights: [
      "Context-adjusted health scores",
      "Matched peers & four-month trends",
    ],
    tags: ["Python", "Streamlit", "scikit-learn", "Plotly"],
    live: "https://fleetpulse-vehiclehealth-peeranalytics.streamlit.app",
    github:
      "https://github.com/Enamul22/FleetPulse-VehicleHealth-PeerAnalytics",
    image: "/images/fleetpulse-overview.webp",
    imageAlt:
      "FleetPulse fleet overview with monthly vehicle health scores and peer comparisons",
    problem:
      "A low score is useful only when someone can understand why it is low. Comparing vehicles with different operating conditions can obscure the component signals that deserve investigation.",
    context:
      "An independent demonstration using a synthetic fleet of 1,000 vehicles. Its condition index describes simulated observations; it is not remaining useful life or a real-vehicle failure probability.",
    workflow: [
      "Operating summaries",
      "Healthy-context reference",
      "Component scores",
      "Matched peers",
      "Explained investigation",
    ],
    contribution:
      "I defined the health-scoring approach, peer-matching criteria and explanations, then translated them into detailed implementation prompts for Codex. Through iterative debugging and validation, I refined the data pipeline and interface so each displayed comparison could be traced back to its inputs.",
    decisions: [
      {
        title: "A healthy reference before a relative comparison",
        body: "A frozen ridge reference estimates expected sensor behaviour from model and operating context. It is fitted on a separate healthy development population. The matched-peer average answers a different question: how this vehicle compares with similar vehicles this month.",
      },
      {
        title: "Scores that add up",
        body: "Five equally weighted component scores contribute to the overall index. Component deductions explain the distance from 100; signed peer-gap contributions explain the difference from the matched-peer average.",
      },
      {
        title: "Make insufficient evidence visible",
        body: "Coverage, active-day and supported-hour gates keep incomplete scores unavailable. Matching uses the same month, model and usage profile plus explicit context calipers. Sparse peer groups are labelled rather than silently widened.",
      },
    ],
    validation: [
      "Scoring checks reconstruct overall health and peer gaps from component contributions.",
      "Peer-policy tests check target exclusion, explicit calipers and sparse or absent comparators.",
      "Four-month trends retain missing-score gaps; filters and exports do not change score or peer membership.",
    ],
    evidence: [
      {
        label: "Scoring & baseline policy",
        href: "docs/scoring-baseline-card.md",
      },
      { label: "Peer reference policy", href: "docs/peer-reference-policy.md" },
      { label: "Verification report", href: "docs/verification.md" },
    ],
    gallery: [
      {
        src: "/images/fleetpulse-health.webp",
        alt: "FleetPulse vehicle health gauges and four-month trend",
        caption:
          "Own condition and monthly matched-peer averages, with recent history.",
      },
      {
        src: "/images/fleetpulse-comparison.webp",
        alt: "FleetPulse component comparison with contributions to the peer gap",
        caption:
          "Component-level comparisons explain the overall score and the peer gap.",
      },
    ],
  },
  {
    slug: "fleetcare",
    name: "FleetCare",
    title: "Predictive Maintenance",
    summary:
      "Follow an abnormal sensor signal through evidence, maintenance action and the customer’s technical response.",
    highlights: ["Fault-to-feedback workflow", "Durable work-order history"],
    tags: ["Python", "Streamlit", "PostgreSQL", "Time series"],
    live: "https://fleetcare-predictivemaintenance.streamlit.app",
    github: "https://github.com/Enamul22/FleetCare-PredictiveMaintenance",
    image: "/images/fleetcare-overview.webp",
    imageAlt:
      "FleetCare detected-fault overview with vehicle and maintenance recommendation records",
    problem:
      "A detected fault does not complete a maintenance workflow. Users need understandable sensor evidence, an actionable recommendation and a way to connect the resulting service response back to the original fault.",
    context:
      "An independent demonstration with synthetic vehicle telemetry, customers, service procedures and parts. Detector evaluation measures the simulator, not performance on real vehicles.",
    workflow: [
      "Telemetry",
      "Confirmed fault episode",
      "Evidence & parts",
      "Explicit work order",
      "Technical feedback",
    ],
    contribution:
      "I designed the complete fault-to-feedback workflow, from sensor evidence and maintenance recommendations to customer work orders and technical responses. I guided implementation with Codex through structured planning and prompting, then refined the application through debugging, workflow review and validation of access controls and saved history.",
    decisions: [
      {
        title: "Evidence follows the episode",
        body: "A complete fault overview leads to contextual sensor evidence, confirmation timing and recommended inspections or parts. The interface distinguishes missing later evidence from observed recovery.",
      },
      {
        title: "A work order is an explicit action",
        body: "Creating an order saves a recommendation snapshot. Duplicate-safe writes and customer ownership checks protect the workflow; a detected fault alone does not create an order.",
      },
      {
        title: "Close the information loop",
        body: "The assigned customer records completion or rejection with technical findings, actions and actual parts. PostgreSQL retains the response and joins it back to the fault record. Stored feedback supports review; it does not automatically retrain a model.",
      },
    ],
    validation: [
      "Temporal checks cover confirmation windows, recovery, recurrence, missing data and past-only features.",
      "Service checks cover customer isolation, duplicate prevention, rollback and identical versus conflicting retries.",
      "Separate-session and process-restart checks verify that saved orders and technical feedback remain readable.",
    ],
    evidence: [
      { label: "Detection model card", href: "docs/MODEL_CARD.md" },
      { label: "Verification & evaluation", href: "docs/TESTING.md" },
    ],
    gallery: [
      {
        src: "/images/fleetcare-evidence.webp",
        alt: "FleetCare time-series evidence with a customer-friendly explanation",
        caption:
          "Sensor evidence and a readable explanation support each recommendation.",
      },
      {
        src: "/images/fleetcare-feedback.webp",
        alt: "FleetCare saved customer technical feedback joined to a fault record",
        caption:
          "Technical customer feedback stays connected to the original fault.",
      },
    ],
  },
  {
    slug: "serviceplan",
    name: "ServicePlan",
    title: "Scheduled Maintenance",
    summary:
      "Turn fixed mileage milestones into clear service packages, validated work orders and a reliable maintenance record.",
    highlights: [
      "Fixed mileage & combined packages",
      "Validated completion & persistence",
    ],
    tags: ["Python", "Streamlit", "PostgreSQL", "Workflow validation"],
    live: "https://serviceplan-scheduledmaintenance.streamlit.app",
    github: "https://github.com/Enamul22/ServicePlan-ScheduledMaintenance",
    image: "/images/serviceplan-overview.webp",
    imageAlt:
      "ServicePlan maintenance overview with upcoming, due and overdue mileage milestones",
    problem:
      "Mileage-based maintenance needs consistent milestones and a trustworthy record of what was actually done. Late service, overlapping packages and rejected work orders must not silently rewrite the schedule.",
    context:
      "An independent demonstration using a synthetic fleet of 1,000 vehicles and fictional schedules, tasks and parts. Prepared service events are demonstration records, not real customer outcomes.",
    workflow: [
      "Odometer history",
      "Fixed milestones",
      "Combined package",
      "Validated response",
      "Durable service history",
    ],
    contribution:
      "I specified the mileage rules, combined service packages and customer completion requirements, then guided development with Codex through detailed prompts and iterative refinement. Debugging and validation focused on scheduling edge cases, task and parts checks, and retaining service history across sign-out and application restarts.",
    decisions: [
      {
        title: "Keep the milestone fixed",
        body: "Targets are lifetime-odometer multiples of 1,000 km. Service completed late does not shift the next target. Observed crossings establish due dates; missing or decreasing counters are handled explicitly.",
      },
      {
        title: "One occurrence, combined work",
        body: "At a shared target, the largest applicable package includes the smaller service packages. Unique tasks appear once, compatible parts use validated units and quantities, and orders preserve their original evidence snapshot.",
      },
      {
        title: "Completion must mean something",
        body: "Completion requires mandatory tasks, compatible parts and service findings. Rejection requires a reason and leaves the requirement outstanding. PostgreSQL preserves the response through sign-out and restart.",
      },
    ],
    validation: [
      "Boundary examples include 4,200 → 5,000 km, 9,700 → 10,000 km and 25,100 → 26,000 km.",
      "Domain checks cover package composition, overdue boundaries, skipped milestones and invalid counters.",
      "Database and UI checks verify ownership, concurrency, immutable snapshots, completion validation and retained history.",
    ],
    evidence: [
      { label: "Scheduling policy", href: "docs/scheduling-policy.md" },
      { label: "Catalogue", href: "docs/catalogue.md" },
      { label: "Verification report", href: "docs/verification.md" },
    ],
    gallery: [
      {
        src: "/images/serviceplan-evidence.webp",
        alt: "ServicePlan odometer chart showing a mileage milestone and its first observed crossing",
        caption:
          "Observed odometer readings establish the milestone crossing and service deadline.",
      },
      {
        src: "/images/serviceplan-history.webp",
        alt: "ServicePlan saved completed service feedback after an application restart",
        caption:
          "Saved tasks, parts and customer feedback remain available in service history.",
      },
    ],
  },
  {
    slug: "fatal-figures",
    name: "Fatal Figures",
    title: "Multiplayer Strategy Game",
    summary:
      "A private-room game of prediction and elimination, built around authoritative state and recoverable play.",
    highlights: [
      "Secret choices & exact scoring",
      "Reconnects & verifiable replays",
    ],
    tags: ["React", "TypeScript", "Socket.IO", "PostgreSQL"],
    live: "https://fatalfigures-enamul22.onrender.com",
    github: "https://github.com/Enamul22/FatalFigures-MultiplayerGame",
    image: "/images/fatal-figures-room.webp",
    imageAlt:
      "Fatal Figures oval playing table with fixed seats, revealed figures and phase totals",
    problem:
      "A multiplayer game must keep private choices secret while every player sees a consistent result. Disconnects, repeated submissions and server restarts make that more than a presentation problem.",
    context:
      "An independent multiplayer strategy game for 2–5 players, with friend rooms and computer opponents. Verification covers implemented rules and recovery; simulations do not establish human strategy or enjoyment.",
    workflow: [
      "Private rooms",
      "Acknowledged secret choices",
      "Server-owned scoring",
      "Transactional checkpoint",
      "Replay & rematch",
    ],
    contribution:
      "I designed the game rules, elimination phases and playing-room experience, then used Codex to develop the implementation through structured prompts and iterative debugging. Repeated playtesting and validation shaped the scoring, private choices, reconnect behaviour and interface, taking the game from a console experiment to a deployed multiplayer application.",
    decisions: [
      {
        title: "The server owns the outcome",
        body: "The server controls timing, exact scoring and bounded tie resolution. Opponents’ numbers remain sealed until reveal, and an acknowledged choice cannot be changed.",
      },
      {
        title: "One authority, durable state",
        body: "An exclusive PostgreSQL ownership lease and fenced transactions protect a single authoritative server. Durable choice receipts support reconnects. A restart outside the recovery window records an interruption rather than inventing missed rounds.",
      },
      {
        title: "Presentation follows committed state",
        body: "Stable seats, readable phase totals, reduced motion and optional locally hosted licensed music support the room. The final announcement appears immediately after decisive scoring and any required tiebreak are committed.",
      },
    ],
    validation: [
      "The deployment release passed 57 tests, 14 browser scenarios, 4,000 seeded simulated matches and a Docker build.",
      "Public checks exercised independent friend sessions, hidden choices, lock receipts, scoring, ordinary/tied finals, computer play, replay and rematch.",
      "A controlled public restart retained completed history; the active match followed the documented interruption rules.",
    ],
    evidence: [
      { label: "Architecture & privacy", href: "docs/ARCHITECTURE.md" },
      { label: "Verification record", href: "docs/VERIFICATION.md" },
      {
        label: "Public deployment evidence",
        href: "docs/DEPLOYMENT_RECORD.md",
      },
    ],
    gallery: [
      {
        src: "/images/fatal-figures-champion.webp",
        alt: "Fatal Figures immediate champion announcement with the final revealed choices",
        caption:
          "The champion announcement includes the decisive revealed figures.",
      },
      {
        src: "/images/fatal-figures-history.webp",
        alt: "Fatal Figures completed and interrupted match history retained after a controlled restart",
        caption:
          "Completed match history survives a controlled server restart.",
      },
    ],
  },
  {
    slug: "onboarddesk",
    name: "OnboardDesk",
    title: "Corporate KYC Review Agent",
    summary:
      "Review company onboarding documents, trace missing or conflicting information to its source, and prepare an analyst-reviewed follow-up.",
    highlights: [
      "Evidence-linked document review",
      "Analyst decisions & versioned history",
    ],
    tags: ["Python", "LangGraph", "Tool calling", "PostgreSQL"],
    live: "https://onboarddesk-corporatekyc-reviewagent.streamlit.app/",
    github: "https://github.com/Enamul22/OnboardDesk-CorporateKYC-ReviewAgent",
    image: "/images/onboarddesk-overview.webp",
    imageAlt:
      "OnboardDesk company-case overview with document questions and examples for analyst review",
    problem:
      "Company information is scattered across onboarding documents. Missing fields and inconsistent details need to be traced to their sources before an analyst can prepare a useful follow-up.",
    context:
      "A demonstration with 60 fictional company cases, English PDFs and a versioned checklist. The application prepares a document-review pack; the analyst owns the review outcome.",
    workflow: [
      "Company records",
      "Scoped document & checklist tools",
      "Validated findings & evidence",
      "Analyst decisions & draft follow-up",
      "Revised documents & retained history",
    ],
    contribution:
      "I framed the document-review problem, designed the analyst workflow and guided Codex through structured implementation prompts. Iterative debugging and validation focused on source-linked findings, explicit human decisions, revised documents and history that remains available after refresh or restart.",
    decisions: [
      {
        title: "One bounded agent, exact checks",
        body: "A single tool-using agent inspects scoped document pages and the checklist. Deterministic checks handle dates, identity comparisons and ownership arithmetic; request, time and tool limits bound execution.",
      },
      {
        title: "Validate evidence before saving",
        body: "Each cited reference must point to an inspected page in the current case and document version, with an excerpt that occurs in the source. Reference validity supports traceability; it does not prove every interpretation is correct.",
      },
      {
        title: "Keep the analyst and history in the loop",
        body: "An analyst can accept, correct or dismiss findings with reasons and edit the follow-up. Revised documents retain earlier reviews and decisions in PostgreSQL rather than silently carrying them into a new version.",
      },
    ],
    validation: [
      "The published live evaluation completed 19 of 22 attempted cases. Recall across all attempts was 70.8%, below the deterministic baseline’s 83.3%; higher completed-case recall did not offset failed runs.",
      "All 38 cited references in completed live reviews passed automatic reference checks. Independent human assessment of semantic support remains pending.",
      "Workflow, evidence, revision and persistence checks cover isolated visitors and recovery after refresh and process restart.",
    ],
    evidence: [
      {
        label: "Architecture & scoped tools",
        href: "docs/ARCHITECTURE.md",
      },
      {
        label: "Evaluation & limitations",
        href: "docs/EVALUATION.md",
      },
      {
        label: "Verification record",
        href: "docs/VERIFICATION.md",
      },
    ],
    gallery: [
      {
        src: "/images/onboarddesk-evidence.webp",
        alt: "OnboardDesk source-evidence dialog quoting the conflicting registration identifier from an ownership document",
        caption:
          "A registration-identifier question links back to the exact ownership-document excerpt.",
      },
      {
        src: "/images/onboarddesk-decisions.webp",
        alt: "OnboardDesk phone view showing a saved analyst correction and finding-decision controls",
        caption:
          "A saved analyst correction explains how a funds question was addressed; decisions and follow-up remain under human review.",
      },
    ],
  },
  {
    slug: "cashpilot",
    name: "CashPilot",
    title: "Corporate Cash-Flow Forecasting",
    summary:
      "Forecast seven-day business cash balances, explain potential shortfalls and explore the effect of delayed customer receipts.",
    highlights: [
      "Seven-day forecasts & shortfall alerts",
      "Receipt-delay scenarios & review history",
    ],
    tags: ["Python", "Time-series forecasting", "scikit-learn", "PostgreSQL"],
    live: "https://cashpilot-corporatecashflow.streamlit.app/",
    github: "https://github.com/Enamul22/CashPilot-CorporateCashFlow",
    image: "/images/cashpilot-overview.webp",
    imageAlt:
      "CashPilot account overview with computed forecast examples and account search",
    problem:
      "Cash-management users need advance visibility of possible shortfalls and the expected receipts and payments behind them. A forecast becomes useful when it supports investigation and a concrete planning scenario.",
    context:
      "A synthetic demonstration with 100 businesses and cash movements in EUR, SEK and CHF. Forecasts estimate seven daily closing balances, excluding intraday liquidity and available credit.",
    workflow: [
      "Reconciled transactions & schedule versions",
      "Point-in-time snapshots",
      "Scheduled & estimated cash flows",
      "Seven-day closing balances",
      "Review & receipt-delay scenario",
    ],
    contribution:
      "I framed the business question, specified the forecasting and receipt-delay behaviour, and guided Codex through structured planning and implementation prompts. I refined the application through debugging and validation of ledger arithmetic, past-only inputs, model comparisons, scenario calculations and persistent review history.",
    decisions: [
      {
        title: "Separate expected and remaining cash",
        body: "Known scheduled receipts and payments remain separate from nonnegative estimates of remaining flows. Origin-specific matching prevents double counting while retaining timing and amount differences as forecast errors.",
      },
      {
        title: "Compare models chronologically",
        body: "A seasonal-naive baseline is compared with pooled gradient boosting. Validation selects the default before testing future origins for known businesses and a separate held-out set of businesses. Monetary errors stay within each currency.",
      },
      {
        title: "Fast browsing, immutable originals",
        body: "Forecasts are prepared offline. A receipt-delay scenario moves one scheduled receipt using arithmetic, keeps remaining-flow estimates fixed and leaves the original forecast unchanged. PostgreSQL stores reviews and named scenarios against that forecast origin.",
      },
    ],
    validation: [
      "Known-business shortfall recall improved from 56.5% with the baseline to 62.3% with gradient boosting. Unseen-business recall stayed at 61.1%, with two additional false alarms. These synthetic results do not establish real-bank performance.",
      "Exact ledger reconciliation, future-information perturbation checks and scenario tests verify the data and arithmetic behind the displayed warnings.",
      "Browser and PostgreSQL checks verify forecast-linked notes and scenarios, visitor isolation and saved history after refresh and a server restart.",
    ],
    evidence: [
      {
        label: "Architecture & cash-flow decomposition",
        href: "docs/ARCHITECTURE.md",
      },
      {
        label: "Forecast evaluation",
        href: "docs/EVALUATION.md",
      },
      {
        label: "Verification record",
        href: "docs/VERIFICATION.md",
      },
    ],
    gallery: [
      {
        src: "/images/cashpilot-outlook.webp",
        alt: "CashPilot actual and forecast daily closing cash with an operating buffer and seven-day cash decline",
        caption:
          "The cash outlook connects an expected balance decline to scheduled movements and the operating buffer.",
      },
      {
        src: "/images/cashpilot-scenario.webp",
        alt: "CashPilot original and delayed-receipt balance paths with a scenario shortfall",
        caption:
          "Moving one receipt beyond the horizon reveals a potential shortfall while preserving the original forecast.",
      },
    ],
  },
];
