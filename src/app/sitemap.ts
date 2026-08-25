import type { MetadataRoute } from "next";
import { selectedWorks } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = selectedWorks.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
