import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { allPosts, featuredPosts } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { ParticleCanvas } from "@components/ParticleCanvas";
import PostCard from "@components/PostCard";

export const metadata: Metadata = generatePageMetadata({
  title: "xexr.com — Dane Poyzer",
  type: "website",
});

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Subscribe", href: siteConfig.substackUrl, external: true },
] as const;

export default function HomePage() {
  const hasFeatured = featuredPosts.length > 0;
  const showLabels = allPosts.length >= 2 && hasFeatured;

  // Featured posts go in the top section; recent = everything else (max 5)
  const recentPosts = hasFeatured
    ? allPosts
        .filter((p) => !featuredPosts.some((f) => f.slug === p.slug))
        .slice(0, 5)
    : allPosts.slice(0, 5);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[50svh] flex-col items-center justify-center px-4 sm:min-h-[60svh] lg:min-h-[65svh]">
        <ParticleCanvas />

        <div className="z-10 flex flex-col items-center gap-6 text-center">
          {/* Avatar */}
          <div
            aria-hidden="true"
            className="flex size-20 items-center justify-center rounded-full p-[3px] sm:size-24"
            style={{
              backgroundImage:
                "conic-gradient(from 0deg, var(--accent), var(--accent-dim), var(--accent))",
            }}
          >
            <span className="flex size-full items-center justify-center rounded-full bg-card text-lg font-bold text-accent sm:text-xl">
              DP
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Dane Poyzer
          </h1>

          {/* Descriptor */}
          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Building AI-powered tools. Writing about what I learn.
          </p>

          {/* Quick links */}
          <nav aria-label="Quick links" className="flex flex-wrap justify-center gap-4 pt-2">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href as Route}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Posts ── */}
      {allPosts.length > 0 && (
        <section className="mx-auto w-full max-w-2xl px-4 py-12">
          {showLabels ? (
            <>
              {/* n>=2 with featured: labelled sections */}
              <div>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Featured
                </h2>
                <div className="divide-y divide-border">
                  {featuredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>

              {recentPosts.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Recent
                  </h2>
                  <div className="divide-y divide-border">
                    {recentPosts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* n=1 or no featured: just show posts, no labels */
            <div className="divide-y divide-border">
              {allPosts.slice(0, 5).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* View all link */}
          {allPosts.length > 5 && (
            <div className="mt-8 text-center">
              <Link
                href={"/posts" as Route}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                View all posts
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
}
