import type { Route } from "next";
import Link from "next/link";
import { Github, Rss } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

const items = [
  {
    href: siteConfig.githubUrl,
    label: "GitHub",
    icon: Github,
    external: true,
    rssOnly: false,
  },
  {
    href: siteConfig.twitterUrl,
    label: "Twitter / X",
    icon: XIcon,
    external: true,
    rssOnly: false,
  },
  {
    href: siteConfig.substackUrl,
    label: "Substack",
    icon: SubstackIcon,
    external: true,
    rssOnly: false,
  },
  {
    href: "/api/rss",
    label: "RSS feed",
    icon: Rss,
    external: false,
    rssOnly: true,
  },
] as const;

interface SocialLinksProps {
  iconSize?: string;
  className?: string;
  showRss?: boolean;
}

export default function SocialLinks({
  iconSize = "size-4",
  className,
  showRss = false,
}: SocialLinksProps) {
  const visible = showRss ? items : items.filter((i) => !i.rssOnly);
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {visible.map((item) => {
        const Icon = item.icon;
        const shared = cn(
          "text-muted-foreground hover:text-accent transition-colors",
        );

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={shared}
            >
              <Icon className={iconSize} />
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href as Route}
            aria-label={item.label}
            className={shared}
          >
            <Icon className={iconSize} />
          </Link>
        );
      })}
    </div>
  );
}
