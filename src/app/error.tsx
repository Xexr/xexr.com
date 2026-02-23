"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="max-w-md text-center">
        <p className="text-primary text-sm font-medium tracking-widest uppercase">
          Error
        </p>
        <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          An unexpected error occurred. You can try again or head back to the
          homepage.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Go home
          </Link>
        </div>
        {error.digest && (
          <p className="text-muted-foreground/50 mt-8 font-mono text-xs">
            {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
