import Link from "next/link";
import type { Route } from "next";
import { Clock } from "lucide-react";
import { allPosts, formatDate } from "@/lib/content";

export function generateMetadata() {
  return { title: "Page not found" };
}

export default function NotFound() {
  const recentPosts = allPosts.slice(0, 3);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>

      <nav aria-label="Recovery links" className="mb-12 flex gap-4">
        <Link
          href="/"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Go home
        </Link>
        <Link
          href="/posts"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Browse posts
        </Link>
      </nav>

      {recentPosts.length > 0 && (
        <section aria-label="Recent posts">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Recent posts
          </h2>
          <ul className="space-y-1">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={post.url as Route}
                  className="group relative block rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-border active:bg-secondary/40"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-x-100"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-foreground text-base font-semibold tracking-tight transition-colors duration-400 group-hover:text-accent">
                      {post.title}
                    </h3>
                    <div className="text-muted-foreground flex shrink-0 items-center gap-3 text-xs">
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" aria-hidden="true" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
