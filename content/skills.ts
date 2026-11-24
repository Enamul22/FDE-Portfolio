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
      "Python · SQL · PySpark · R · ETL/ELT · CI/CD",
      "SAP · Salesforce · Snowflake · PDM/PLM",
    ],
    links: [
      { label: "Metso experience", href: "#experience" },
      { label: "FleetCare case study", href: "/projects/fleetcare" },
    ],
  },
  {
    title: "Palantir Foundry & Ontology",
    statement:
      "Model enterprise data relationships and connect them to operational actions.",
    groups: [
      "Pipeline Builder · Code Repositories · Ontology",
      "Object/link modelling · Actions · Contour · AI FDE",
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
      "Workshop · Quiver · TypeScript · Webhooks",
      "Functions · Work orders · Feedback integration",
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
      "Time series · Anomaly detection · Machine learning",
      "Predictive maintenance · Peer benchmarking",
    ],
    links: [
      { label: "Metso experience", href: "#experience" },
      { label: "FleetPulse case study", href: "/projects/fleetpulse" },
    ],
  },
  {
    title: "Workflow Automation & Reliability",
    statement:
      "Automate recurring processes, monitor execution and improve resource use.",
    groups: [
      "Scheduling · Monitoring · Error handling · AI agent",
      "Pipeline optimisation · Feedback loops",
    ],
    links: [
      { label: "Metso experience & impact", href: "#experience" },
      { label: "OnboardDesk case study", href: "/projects/onboarddesk" }
    ],
  },
  {
    title: "Application Development",
    statement:
      "Deliver interactive applications with persistent data and real-time behaviour.",
    groups: [
      "React · TypeScript · Streamlit · Socket.IO",
      "PostgreSQL · Git/GitHub · Render · Vercel",
    ],
    links: [
      {
        label: "Independent portfolio work",
        href: "https://github.com/Enamul22/FDE-Portfolio",
      },
      { label: "Fatal Figures case study", href: "/projects/fatal-figures" },
    ],
  },
];
