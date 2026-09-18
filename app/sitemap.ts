import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Date("2026-09-18T00:00:00Z");
  return [
    { url: "https://oceanbrown.gm", lastModified: modified, changeFrequency: "weekly", priority: 1 },
    { url: "https://oceanbrown.gm/software-development-gambia", lastModified: modified, changeFrequency: "monthly", priority: .9 },
    { url: "https://oceanbrown.gm/form", lastModified: modified, changeFrequency: "monthly", priority: .8 },
    { url: "https://oceanbrown.gm/privacy", lastModified: modified, changeFrequency: "yearly", priority: .3 },
    { url: "https://oceanbrown.gm/terms", lastModified: modified, changeFrequency: "yearly", priority: .3 },
  ];
}
