"use client";

import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import type { Post } from "@/lib/content";
import PostCard from "@components/PostCard";

const POSTS_PER_PAGE = 10;

export default function PostList({
  posts,
  tags,
}: {
  posts: Post[];
  tags: string[];
}) {
  const [selectedTag, setSelectedTag] = useQueryState(
    "tag",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );

  const filtered = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);

  function handleTagToggle(tag: string) {
    if (selectedTag === tag) {
      void setSelectedTag(null);
    } else {
      void setSelectedTag(tag);
    }
    void setPage(null);
  }

  return (
    <div>
      {/* Tag filters */}
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      {paginated.length > 0 ? (
        <div className="divide-border divide-y">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            No posts tagged &ldquo;{selectedTag}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => void setSelectedTag(null)}
            className="text-accent mt-2 text-sm underline underline-offset-4 transition-colors hover:text-accent/80"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-8 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => void setPage(currentPage - 1)}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-muted-foreground px-2 text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => void setPage(currentPage + 1)}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
