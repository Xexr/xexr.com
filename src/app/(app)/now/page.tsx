import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Now",
  description: "What I'm currently working on, learning, and reading.",
});

const lastUpdated = "2026-02-23";

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function isStale(dateStr: string): boolean {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days > 90;
}

export default function NowPage() {
  const stale = isStale(lastUpdated);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Now</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Last updated: {lastUpdated} ({relativeTime(lastUpdated)})
      </p>
      {stale && (
        <p className="text-muted-foreground/70 mt-1 text-xs italic">
          This page may be out of date.
        </p>
      )}

      <div className="mt-10 space-y-10">
        {/* Current projects */}
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold tracking-tight">
            Building
          </h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              Focused on <strong className="text-foreground">Gas Town</strong> — a
              multi-agent orchestration framework for developer workflows. It
              coordinates autonomous agents across git repositories, managing
              issue tracking, code review, and merge queues without human
              intervention.
            </p>
            <p>
              Also shipping{" "}
              <strong className="text-foreground">this site</strong> (xexr.com) as
              a place to write, share projects, and build in public.
            </p>
          </div>
        </section>

        {/* Learning */}
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold tracking-tight">
            Learning
          </h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              Deep-diving into agentic AI patterns — tool use, multi-turn
              reasoning, and how to build reliable systems on top of LLMs.
              Exploring what it means to give agents real autonomy while keeping
              humans in the loop where it matters.
            </p>
          </div>
        </section>

        {/* Reading */}
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold tracking-tight">
            Reading
          </h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              Working through a mix of technical papers on agent architectures
              and classic systems design. Always have a fiction book going on the
              side to keep the other half of the brain engaged.
            </p>
          </div>
        </section>

        {/* Life */}
        <section>
          <h2 className="text-foreground mb-3 text-xl font-semibold tracking-tight">
            Life
          </h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              Based in the UK. Splitting time between building software, writing
              about the process, and figuring out the indie hacker path. Trying to
              stay focused on fewer things done well rather than many things done
              halfway.
            </p>
          </div>
        </section>
      </div>

      {/* Inspired by nownownow.com */}
      <div className="border-border mt-12 border-t pt-6">
        <p className="text-muted-foreground text-xs">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent underline decoration-transparent transition-colors hover:decoration-current"
          >
            /now page
          </a>
          . If you have your own site, you should make one too.
        </p>
      </div>
    </article>
  );
}
