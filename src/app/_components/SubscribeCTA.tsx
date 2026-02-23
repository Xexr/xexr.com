import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function SubscribeCTA() {
  return (
    <div className="rounded-lg border border-accent/20 bg-accent/5 px-6 py-5">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Mail className="size-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm font-medium text-foreground">
            Enjoyed this? Get new posts in your inbox
          </p>
        </div>
        <a
          href={siteConfig.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Subscribe
        </a>
      </div>
    </div>
  );
}
