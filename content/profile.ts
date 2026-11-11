export type Profile = {
  name: string;
  headline: string;
  statement: string;
  intro: string;
  location: string;
  email: string;
  showCvDownload: boolean;
  cvUrl: string | null;
  links: { label: string; href: string }[];
  about: string[];
};
export const profile: Profile = {
  name: "Enamul Haque",
  headline: "Forward Deployed Engineer · Palantir Foundry",
  statement: "Building data systems that turn insight into action.",
  intro:
    "Over four years at Metso, I’ve built end-to-end data solutions, integrating enterprise systems and delivering applications that help maintenance and service teams act on equipment insights.",
  location: "Tampere, Finland",
  email: "enamulhaque16022@gmail.com",
  showCvDownload: false,
  cvUrl: null,
  links: [
    { label: "GitHub", href: "https://github.com/Enamul22" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/enamul-haque-28720221a/",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=8KwUoRQAAAAJ&hl=en",
    },
  ],
  about: [
    "My foundation is in statistics and data analytics: asking useful questions, understanding variation and making evidence understandable. At Metso, I apply that thinking to industrial data, equipment condition and the practical needs of maintenance and service teams.",
    "I enjoy owning the connections between stages of a workflow—preparing dependable data, modelling operational relationships, building useful applications and bringing feedback back into the data model. My independent projects give me another space to explore that complete delivery process.",
  ],
};
export function validCvUrl(url: string | null): url is string {
  if (!url) return false;
  return /^\/(?!\/)[^\s]+\.pdf$/i.test(url) || /^https:\/\/[^\s]+$/i.test(url);
}
export const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Professional experience"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
] as const;
