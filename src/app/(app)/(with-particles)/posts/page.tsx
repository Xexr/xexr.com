import type { Metadata } from "next";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";
import { allPosts, allTags } from "@/lib/content";
import PostList from "@components/PostList";

export const metadata: Metadata = generatePageMetadata({
  title: "Posts",
  description:
    "Writing about AI, indie hacking, and building in public.",
});

export default function PostsPage() {
  return (
    <article className="mx-auto max-w-[740px] px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Posts</h1>
      <p className="text-muted-foreground mb-8">
        Writing about AI, indie hacking, and building in public.
      </p>
      <Suspense>
        <PostList posts={allPosts} tags={allTags} totalCount={allPosts.length} />
      </Suspense>
    </article>
  );
}
