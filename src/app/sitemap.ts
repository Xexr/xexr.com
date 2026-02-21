import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    // other pages
    {
      url: `${siteConfig.url}/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/forgot-password`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // const postSlugs = await getAllPostSlugsWithModifyTime();
  // const categorySlugs = await getAllCategories();

  const sitemap = [
    ...defaultPages,
    // ...postSlugs.map((e: any) => ({
    //   url: `${siteConfig.url}/${e.slug}`,
    //   lastModified: e.modified_at,
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // })),
    // ...categorySlugs.map((e: any) => ({
    //   url: `${siteConfig.url}/category/${e}`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.7,
    // })),
  ];

  return sitemap;
}
