import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { mockPosts, mockProjects, mockBooks } = vi.hoisted(() => ({
  mockPosts: [
    {
      slug: "draft-post",
      title: "Draft Post",
      date: "2026-02-25",
      tags: ["draft"],
      featured: false,
      draft: true,
    },
    {
      slug: "newest",
      title: "Newest Post",
      date: "2026-02-20",
      tags: ["typescript", "testing"],
      featured: true,
      draft: false,
    },
    {
      slug: "middle",
      title: "Middle Post",
      date: "2026-02-15",
      tags: ["react", "testing"],
      featured: false,
      draft: false,
    },
    {
      slug: "oldest",
      title: "Oldest Post",
      date: "2026-02-10",
      tags: ["typescript"],
      featured: false,
      draft: false,
    },
  ],
  mockProjects: [
    { name: "Zeta", featured: false },
    { name: "Alpha", featured: true },
  ],
  mockBooks: [
    { title: "C Book", status: "want-to-read" as const },
    { title: "A Book", status: "reading" as const },
    { title: "B Book", status: "finished" as const },
  ],
}));

vi.mock("../../.velite", () => ({
  posts: mockPosts,
  projects: mockProjects,
  books: mockBooks,
}));

// --- formatDate ---

describe("formatDate", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("formats ISO date as 'd Mon Year'", async () => {
    const { formatDate } = await import("./content");
    expect(formatDate("2026-02-22")).toBe("22 Feb 2026");
  });

  it("formats single-digit day without leading zero", async () => {
    const { formatDate } = await import("./content");
    expect(formatDate("2026-01-05")).toBe("5 Jan 2026");
  });

  it("formats different months correctly", async () => {
    const { formatDate } = await import("./content");
    expect(formatDate("2025-12-25")).toBe("25 Dec 2025");
    expect(formatDate("2026-07-04")).toBe("4 Jul 2026");
  });
});

// --- allPosts (development) ---

describe("allPosts", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("includes drafts in non-production", async () => {
    const { allPosts } = await import("./content");
    expect(allPosts).toHaveLength(4);
    expect(allPosts.some((p) => p.slug === "draft-post")).toBe(true);
  });

  it("sorts by date descending", async () => {
    const { allPosts } = await import("./content");
    for (let i = 0; i < allPosts.length - 1; i++) {
      const curr = allPosts[i]!;
      const next = allPosts[i + 1]!;
      expect(curr.date >= next.date).toBe(true);
    }
  });
});

// --- draft filtering (production) ---

describe("draft filtering (production)", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("excludes drafts in production", async () => {
    const { allPosts } = await import("./content");
    expect(allPosts.every((p) => !p.draft)).toBe(true);
    expect(allPosts.find((p) => p.slug === "draft-post")).toBeUndefined();
  });

  it("returns only non-draft posts in production", async () => {
    const { allPosts } = await import("./content");
    expect(allPosts).toHaveLength(3);
  });
});

// --- featuredPosts ---

describe("featuredPosts", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("contains only featured posts", async () => {
    const { featuredPosts } = await import("./content");
    expect(featuredPosts).toHaveLength(1);
    expect(featuredPosts[0]!.slug).toBe("newest");
  });
});

// --- allTags ---

describe("allTags", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("extracts unique tags sorted alphabetically", async () => {
    const { allTags } = await import("./content");
    expect(allTags).toEqual(["draft", "react", "testing", "typescript"]);
  });

  it("contains no duplicates", async () => {
    const { allTags } = await import("./content");
    expect(new Set(allTags).size).toBe(allTags.length);
  });
});

// --- getPostBySlug ---

describe("getPostBySlug", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns the post for a valid slug", async () => {
    const { getPostBySlug } = await import("./content");
    const post = getPostBySlug("newest");
    expect(post).toBeDefined();
    expect(post!.title).toBe("Newest Post");
  });

  it("returns undefined for an invalid slug", async () => {
    const { getPostBySlug } = await import("./content");
    expect(getPostBySlug("nonexistent")).toBeUndefined();
  });
});

// --- getAdjacentPosts ---

describe("getAdjacentPosts", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  // allPosts sorted desc: draft-post (2/25), newest (2/20), middle (2/15), oldest (2/10)

  it("returns prev and next for a middle post", async () => {
    const { getAdjacentPosts } = await import("./content");
    const { prev, next } = getAdjacentPosts("newest");
    expect(prev?.slug).toBe("middle");
    expect(next?.slug).toBe("draft-post");
  });

  it("returns no next for the first (newest) post", async () => {
    const { getAdjacentPosts } = await import("./content");
    const { prev, next } = getAdjacentPosts("draft-post");
    expect(prev?.slug).toBe("newest");
    expect(next).toBeUndefined();
  });

  it("returns no prev for the last (oldest) post", async () => {
    const { getAdjacentPosts } = await import("./content");
    const { prev, next } = getAdjacentPosts("oldest");
    expect(prev).toBeUndefined();
    expect(next?.slug).toBe("middle");
  });

  it("returns empty object for non-existent slug", async () => {
    const { getAdjacentPosts } = await import("./content");
    const result = getAdjacentPosts("nonexistent");
    expect(result).toEqual({});
  });
});
