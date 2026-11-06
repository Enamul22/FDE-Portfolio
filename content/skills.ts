export type Skill = {
  title: string;
  statement: string;
  groups: string[];
  links: { label: string; href: string }[];
};
export const skills: Skill[] = [
  {
    title: "Data Engineering & Integration",
    statement:
      "Connect enterprise systems and transform their data into reliable datasets.",
    groups: [
      "Python · SQL · PySpark · ETL/ELT",
      "SAP · Salesforce · Snowflake",
    ],
    links: [
      { label: "Metso experience", href: "#experience" },
      { label: "FleetCare case study", href: "/projects/fleetcare" },
    ],
  },
  {
    title: "Palantir Foundry & Ontology",
    statement: "Model assets, relationships and operational actions.",
    groups: [
      "Palantir Foundry · Pipeline Builder · Code Repositories",
      "Ontology · Object/link modelling · Actions",
    ],
    links: [
      { label: "Metso experience", href: "#experience" },
      { label: "Palantir Learn training", href: "#certifications" },
    ],
  },
  {
    title: "Operational Applications & APIs",
    statement:
      "Build workflows that turn analytical findings into business action.",
    groups: [
      "Workshop · TypeScript · APIs · Webhooks",
      "Work orders · Feedback integration",
    ],
    links: [
      { label: "Metso experience", href: "#experience" },
      { label: "ServicePlan case study", href: "/projects/serviceplan" },
    ],
  },
  {
    title: "Applied Analytics & Decision Support",
    statement:
      "Detect abnormal behaviour, assess condition and explain performance.",
    groups: [
      "Time series · Anomaly detection · Contextual baselines",
      "Health scoring · Peer benchmarking · Model evaluation",
    ],
    links: [
      { label: "FleetPulse case study", href: "/projects/fleetpulse" },
      { label: "FleetCare case study", href: "/projects/fleetcare" },
    ],
  },
  {
    title: "Workflow Automation & Reliability",
    statement:
      "Automate recurring processes, monitor execution and improve resource use.",
    groups: [
      "Scheduling · Monitoring · Error handling",
      "Pipeline optimisation · Feedback loops",
    ],
    links: [{ label: "Metso experience & impact", href: "#experience" }],
  },
  {
    title: "Full-Stack Application Development",
    statement:
      "Deliver interactive applications with persistent data and real-time behaviour.",
    groups: [
      "React · TypeScript · Streamlit · Socket.IO",
      "PostgreSQL · Git/GitHub · Render",
    ],
    links: [
      { label: "Independent portfolio work", href: "#projects" },
      { label: "Fatal Figures case study", href: "/projects/fatal-figures" },
    ],
  },
];
