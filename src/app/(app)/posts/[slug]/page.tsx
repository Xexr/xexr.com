import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

import { Badge } from "@components/ui/badge";
import { MDXContent } from "@components/mdx/MDXContent";
import TableOfContents from "@components/TableOfContents";
import SubscribeCTA from "@components/SubscribeCTA";
import ShareButtons from "@components/ShareButtons";
import GiscusComments from "@components/GiscusComments";
import PostNavigation from "@components/PostNavigation";

import {
  allPosts,
  getPostBySlug,
  getAdjacentPosts,
  formatDate,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: [siteConfig.author.name],
    tags: post.tags,
    canonical: `${siteConfig.url}${post.url}`,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.updated && { dateModified: post.updated }),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}${post.url}`,
    ...(post.image && { image: post.image }),
    keywords: post.tags,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Desktop ToC positioned in right margin */}
        <aside className="absolute top-12 right-0 hidden w-56 min-[1200px]:block">
          <TableOfContents variant="desktop" />
        </aside>

        <article className="mx-auto max-w-[740px]">
          {/* Header */}
          <header className="mb-8">
            <h1 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            {/* Metadata bar */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                Published {formatDate(post.date)}
              </time>
              {post.updated && (
                <time dateTime={post.updated}>
                  / Updated {formatDate(post.updated)}
                </time>
              )}
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/posts?tag=${encodeURIComponent(tag)}` as Route}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Mobile ToC */}
          <TableOfContents variant="mobile" />

          {/* Prose content */}
          <div className="prose prose-invert prose-gray max-w-none leading-[1.75] prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-foreground prose-pre:bg-transparent prose-pre:p-0">
            <MDXContent code={post.body} />
          </div>

          {/* Post-reading sequence */}
          <div className="mt-16 space-y-10">
            <SubscribeCTA />
            <ShareButtons title={post.title} />
            <GiscusComments />
            <PostNavigation prev={prev} next={next} />
          </div>
        </article>
      </div>
    </>
  );
}
