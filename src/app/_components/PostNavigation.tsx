import Link from "next/link";
import type { Route } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/content";

interface PostNavigationProps {
  prev?: Post;
  next?: Post;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Post navigation" className="grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.url as Route}
          className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-accent/50"
        >
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <ChevronLeft className="size-3" aria-hidden="true" />
            Previous
          </span>
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
            {prev.title}
          </span>
          <time
            dateTime={prev.date}
            className="text-xs text-muted-foreground"
          >
            {formatDate(prev.date)}
          </time>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.url as Route}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-accent/50"
        >
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            Next
            <ChevronRight className="size-3" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
            {next.title}
          </span>
          <time
            dateTime={next.date}
            className="text-xs text-muted-foreground"
          >
            {formatDate(next.date)}
          </time>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
