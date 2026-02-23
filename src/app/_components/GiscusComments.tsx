"use client";

import { useEffect, useRef, useState } from "react";
import Giscus from "@giscus/react";

export default function GiscusComments() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  const configured = repo && repoId && category && categoryId;

  useEffect(() => {
    if (!configured || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [configured]);

  if (!configured) {
    return (
      <p className="text-sm text-muted-foreground" data-slot="giscus-comments">
        Comments temporarily unavailable
      </p>
    );
  }

  return (
    <div ref={containerRef} data-slot="giscus-comments">
      {visible ? (
        <Giscus
          repo={repo as `${string}/${string}`}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="dark"
          lang="en"
          loading="lazy"
        />
      ) : (
        <div className="h-32" aria-hidden="true" />
      )}
    </div>
  );
}
