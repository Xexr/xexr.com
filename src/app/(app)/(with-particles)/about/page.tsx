import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { Github, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Dane Poyzer — from actuary to indie hacker. Building AI tools, shipping in public, and writing about the journey.",
});

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.githubUrl,
      siteConfig.twitterUrl,
      siteConfig.substackUrl,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-[740px] px-4 py-12">
        {/* Avatar */}
        <div className="mb-10 flex items-center gap-6">
          <div
            className="flex size-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold"
            style={{
              background: "conic-gradient(var(--accent), #0d9488, var(--accent))",
              padding: "3px",
            }}
          >
            <span className="bg-background flex size-full items-center justify-center rounded-full">
              DP
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {siteConfig.author.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Indie hacker, builder, writer
            </p>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-6 leading-relaxed">
          <p>
            I started my career as an actuary — quantifying risk, building models,
            living inside spreadsheets. It was rigorous and taught me to think in
            systems, but I kept gravitating toward the code that powered those
            models rather than the models themselves.
          </p>
          <p>
            That pull eventually won. I made the jump into software engineering and
            never looked back. Over the years I&apos;ve shipped products across
            fintech, SaaS, and developer tooling — always drawn to the space where
            complex problems meet clean interfaces.
          </p>
          <p>
            Today I&apos;m building independently. My focus is on AI-assisted
            developer tools — orchestrating agents, building workflow engines, and
            figuring out how humans and AI systems work together effectively. I ship
            in public, write about what I learn, and believe the best software comes
            from tight feedback loops and honest iteration.
          </p>
          <p>
            I believe in building small, shipping fast, and letting users tell you
            what matters. The best ideas come from doing the work, not planning it.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={"/projects" as Route}
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          >
            See what I&apos;ve built
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={"/posts" as Route}
            className="border-border text-foreground hover:bg-secondary inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Read my thinking
          </Link>
        </div>

        {/* Social links */}
        <div className="border-border mt-12 border-t pt-8">
          <h2 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wider">
            Elsewhere
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href={siteConfig.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4 fill-current"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
            <a
              href={siteConfig.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ExternalLink className="size-4" />
              Substack
            </a>
            <a
              href={`mailto:dane@xexr.com`}
              className="text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
            >
              <Mail className="size-4" />
              Email
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
