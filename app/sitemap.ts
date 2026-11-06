import type { MetadataRoute } from "next";
import { productionOrigin } from "@/content/site";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!productionOrigin) return [];
  return [
    { url: productionOrigin, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${productionOrigin}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
