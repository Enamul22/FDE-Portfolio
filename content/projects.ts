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
      "I developed this AI-assisted portfolio application from the scoring and peer policies through the prepared data pipeline, explanations and interactive interface. The emphasis is on making every displayed comparison traceable to its inputs.",
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
      "I used AI-assisted development to build and validate the complete demonstration: fault episodes, evidence views, maintenance recommendations, role-based work orders and joined customer feedback. It illustrates an operational workflow independently of my employer’s systems.",
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
      "I developed the AI-assisted application around an explicit scheduling policy, package catalogue and transactional service workflow, then tested the interface and persistence across customer sign-out and process restart.",
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
      "I developed this AI-assisted project from the rule specification through the server-authoritative engine, real-time interface, transactional storage, verification and deployment. The animated table presents the existing state without controlling game deadlines.",
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
];
