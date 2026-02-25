import type { Route } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import SocialLinks from "./SocialLinks";

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
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {/* Top row: branding + social */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <Link href="/" className="text-accent font-mono text-lg">
              xexr
            </Link>
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} {siteConfig.author.name}
            </p>
          </div>
          <SocialLinks iconSize="size-4" showRss />
        </div>

        {/* Nav links row */}
        <nav
          className="flex justify-center gap-6 font-mono"
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
      </div>
    </footer>
  );
}
