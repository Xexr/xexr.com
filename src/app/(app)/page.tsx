import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { allPosts } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { ParticleCanvas } from "@components/ParticleCanvas";
import PostCard from "@components/PostCard";

export const metadata: Metadata = generatePageMetadata({
  title: "xexr.com — Dane Poyzer",
  type: "website",
});

export default function HomePage() {
  const recentPosts = allPosts.slice(0, 5);

  return (
    <>
      {/* ── Hero ── */}
      <ParticleCanvas className="pointer-events-none fixed inset-0 -z-10" />
      <section className="relative">

        <div className="relative z-10 grid items-start gap-10 px-4 py-20 sm:grid-cols-[1fr_auto] sm:py-24">
          {/* Content */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Dane Poyzer<span className="text-accent">.</span>
              <br />
              Building with AI<span className="text-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[480px] leading-relaxed text-muted-foreground">
              Chartered accountant turned indie hacker. Building AI-powered
              tools, writing about orchestration, agents, and what I learn along
              the way.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href={"/posts" as Route}
                className="rounded-md bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Read the blog
              </Link>
              <a
                href={siteConfig.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Subscribe
              </a>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="hidden flex-col items-center gap-2 pt-2 sm:flex">
            <div
              aria-hidden="true"
              className="flex size-[88px] items-center justify-center rounded-full p-[3px]"
              style={{
                backgroundImage:
                  "conic-gradient(from 0deg, var(--accent), var(--accent-dim), var(--accent))",
              }}
            >
              <span className="flex size-full items-center justify-center rounded-full border-2 border-background bg-card font-mono text-[28px] font-bold text-accent/50">
                DP
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              @danepoyzer
            </span>
          </div>
        </div>
      </section>

      {/* ── Recent Posts ── */}
      {recentPosts.length > 0 && (
        <section className="w-full px-4 pb-12">
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-border pb-5 pt-12">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[2px] text-muted-foreground">
              Recent Posts
            </h2>
            <Link
              href={"/posts" as Route}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              View all &rarr;
            </Link>
          </div>

          {/* Post list */}
          <ul className="list-none">
            {recentPosts.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                number={allPosts.length - allPosts.indexOf(post)}
              />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
