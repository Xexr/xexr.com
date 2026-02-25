import type { Route } from "next";
import Link from "next/link";
import { Rss, Github } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const primaryLinks: { href: Route; label: string }[] = [
  { href: "/posts" as Route, label: "writing" },
  { href: "/about" as Route, label: "about" },
  { href: "/projects" as Route, label: "projects" },
  { href: "/now" as Route, label: "now" },
];

// Secondary links hidden until content is ready (per spec Q7)
// const secondaryLinks = [
//   { href: "/uses", label: "Uses" },
//   { href: "/bookshelf", label: "Bookshelf" },
//   { href: "/colophon", label: "Colophon" },
// ] as const;

export default function Footer() {
  return (
    <footer
      data-slot="footer"
      className="border-border mt-auto border-t px-4 py-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Branding */}
          <Link href="/" className="text-accent font-mono text-lg">
            xexr
          </Link>

          {/* Navigation */}
          <nav
            className="flex items-center space-x-4 font-mono lg:space-x-6"
            aria-label="Footer navigation"
          >
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social & Subscribe */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github className="size-5" />
              </a>
              <a
                href={siteConfig.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <Link
                href={"/api/rss" as Route}
                aria-label="RSS feed"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Rss className="size-5" />
              </Link>
            </div>
            <a
              href={siteConfig.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent text-sm underline decoration-transparent transition-colors hover:decoration-current"
            >
              Subscribe
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
