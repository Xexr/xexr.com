import { allPosts } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Strip custom MDX component wrappers, keeping inner content as clean HTML. */
function stripMdxComponents(html: string): string {
  return html
    .replace(/<CodeBlock[^>]*>([\s\S]*?)<\/CodeBlock>/gi, "$1")
    .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/gi, "$1")
    .replace(/<MDXImage[^>]*(?:\/>|>[\s\S]*?<\/MDXImage>)/gi, "");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export function GET() {
  const posts = allPosts.filter((p) => !p.draft);

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description><![CDATA[${stripMdxComponents(post.content)}]]></description>
      <link>${siteConfig.url}${post.url}</link>
      <guid isPermaLink="true">${siteConfig.url}${post.url}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
    </item>`,
    )
    .join("\n");

  const lastBuildDate = posts[0]
    ? toRfc822(posts[0].date)
    : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/api/rss" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
