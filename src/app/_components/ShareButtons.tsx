"use client";

import { useCallback, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

// Inline Twitter/X icon to avoid pulling in a social icon package
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleShare = useCallback(async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or API unavailable — fall through to Twitter
      }
    }
    // Fallback: open Twitter
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  }, [title]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <Check className="size-3.5 text-accent" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
        {copied ? "Copied!" : "Copy link"}
      </button>

      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on Twitter"
      >
        {typeof navigator !== "undefined" &&
        typeof navigator.share === "function" ? (
          <Share2 className="size-3.5" aria-hidden="true" />
        ) : (
          <XIcon className="size-3.5" />
        )}
        Share
      </button>
    </div>
  );
}
