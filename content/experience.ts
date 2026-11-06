export type Experience = {
  title: string;
  company: string;
  dates: string;
  location: string;
  responsibilities: { title: string; body: string }[];
  impact: { label: string; text: string }[];
};
export const experience: Experience[] = [
  {
    title: "Data Scientist",
    company: "Metso",
    dates: "May 2024–Present",
    location: "Tampere, Finland",
    responsibilities: [
      {
        title: "Enterprise Data Integration",
        body: "Integrated data from SAP, Salesforce, Snowflake, PLM/Aton and equipment sources into Palantir Foundry. Built and maintained PySpark pipelines to prepare consistent asset, operational and service data for downstream applications.",
      },
      {
        title: "Condition & Performance Analytics",
        body: "Developed analytical workflows for equipment-condition monitoring, periodic maintenance and performance benchmarking. Translated time-series signals and business rules into maintenance alerts and recommendations with supporting evidence.",
      },
      {
        title: "Ontology & Operational Applications",
        body: "Modelled equipment, components, alerts and recommendations in Foundry’s Ontology. Built operational applications that enabled users to review evidence, investigate maintenance needs and follow recommendations through the service workflow.",
      },
      {
        title: "APIs & Work-Order Automation",
        body: "Connected recommendation workflows to Salesforce through APIs and TypeScript integrations. Automated work-order creation with inspection tasks, maintenance guidance and compatible parts recommendations, supporting aftermarket service and parts workflows.",
      },
      {
        title: "Customer Feedback Integration",
        body: "Automated the return of customer responses and service feedback to the ontology and analytical data model. Used this feedback to review recommendation relevance and identify where workflow or recommendation improvements were needed.",
      },
      {
        title: "Workflow Reliability",
        body: "Maintained scheduling, monitoring and error handling across automated data workflows. Reviewed pipeline execution and resource consumption to identify opportunities for improved reliability and efficiency.",
      },
    ],
    impact: [
      {
        label: "Service & commercial value.",
        text: "Connected equipment insights to actionable maintenance and parts recommendations, supporting aftermarket parts sales and helping customers address maintenance needs earlier to reduce avoidable downtime and associated costs.",
      },
      {
        label: "Compute efficiency.",
        text: "Optimised Foundry pipeline resource consumption, including redesigning a weekly bill-of-materials pipeline to reduce its build/compute credit consumption by more than 50%.",
      },
    ],
  },
  {
    title: "Data Management Trainee",
    company: "Metso",
    dates: "October 2022–April 2024",
    location: "Tampere, Finland",
    responsibilities: [
      {
        title: "Master data",
        body: "Maintained SAP master data and performed quality checks to support consistent enterprise reporting and downstream analytics.",
      },
      {
        title: "Data workflows",
        body: "Supported routine data-processing workflows, helping maintain reliable business data for analytical use.",
      },
    ],
    impact: [
      {
        label: "",
        text: "Supported the data quality and consistency underpinning enterprise reporting and analytics.",
      },
    ],
  },
];
