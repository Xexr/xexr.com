import Link from "next/link";
import type { Route } from "next";
import { Clock } from "lucide-react";
import { Badge } from "@components/ui/badge";
import { formatDate, type Post } from "@/lib/content";

const MAX_VISIBLE_TAGS = 3;

export default function PostCard({
  post,
  number,
}: {
  post: Post;
  number?: number;
}) {
  const visibleTags = post.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraCount = post.tags.length - MAX_VISIBLE_TAGS;

  return (
    <Link
      href={post.url as Route}
      data-slot="post-card"
      className="group relative block rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-border active:bg-secondary/40"
    >
      {/* Bottom accent line — grows on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-x-100"
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {number != null && (
            <span className="font-mono text-[11px] text-accent opacity-60">
              #{String(number).padStart(3, "0")}
            </span>
          )}
          <h2 className="text-foreground text-base font-semibold tracking-normal transition-colors duration-400 group-hover:text-accent-tint">
            {post.title}
          </h2>
        </div>

        <div className="text-muted-foreground flex shrink-0 items-center gap-3 text-xs">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {post.readingTime} min
          </span>
        </div>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {visibleTags.map((tag: string) => (
            <Badge key={tag} variant="accent" className="text-[0.65rem]">
              {tag}
            </Badge>
          ))}
          {extraCount > 0 && (
            <Badge variant="ghost" className="text-[0.65rem]">
              +{extraCount} more
            </Badge>
          )}
        </div>
      )}
    </Link>
  );
}
