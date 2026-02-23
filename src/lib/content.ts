import { books, posts, projects } from "../../.velite";

// --- Posts ---

export type Post = (typeof posts)[number];

/** All published posts, sorted by date descending. Drafts excluded in production. */
export const allPosts: Post[] = posts
  .filter((p: Post) => (process.env.NODE_ENV === "production" ? !p.draft : true))
  .sort((a: Post, b: Post) => b.date.localeCompare(a.date));

/** Featured posts (subset of allPosts). */
export const featuredPosts: Post[] = allPosts.filter((p) => p.featured);

/** All unique tags across published posts, sorted alphabetically. */
export const allTags: string[] = [
  ...new Set(allPosts.flatMap((p) => p.tags)),
].sort((a, b) => a.localeCompare(b));

/** Find a post by its slug. Returns undefined if not found. */
export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

/** Get the previous and next posts relative to the given slug. */
export function getAdjacentPosts(slug: string): {
  prev?: Post;
  next?: Post;
} {
  const idx = allPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx < allPosts.length - 1 ? allPosts[idx + 1] : undefined,
    next: idx > 0 ? allPosts[idx - 1] : undefined,
  };
}

// --- Projects ---

export type Project = (typeof projects)[number];

/** All projects, featured first then alphabetical. */
export const allProjects: Project[] = [...projects].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return a.name.localeCompare(b.name);
});

// --- Books ---

export type Book = (typeof books)[number];

/** All books, sorted: currently reading first, then by title. */
export const allBooks: Book[] = [...books].sort((a: Book, b: Book) => {
  const statusOrder: Record<Book["status"], number> = { reading: 0, finished: 1, "want-to-read": 2 };
  const diff = statusOrder[a.status] - statusOrder[b.status];
  if (diff !== 0) return diff;
  return a.title.localeCompare(b.title);
});

// --- Utilities ---

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** Format an ISO date string as "22 Feb 2026". */
export function formatDate(date: string): string {
  return dateFormatter.format(new Date(date));
}
