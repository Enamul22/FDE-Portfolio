import type { MetadataRoute } from "next";
import { productionOrigin } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(productionOrigin ? { sitemap: `${productionOrigin}/sitemap.xml` } : {}),
  };
}
