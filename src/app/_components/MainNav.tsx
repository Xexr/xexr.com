"use client";

import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const navItems: { href: string; label: string }[] = [
  { href: "/posts", label: "writing" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/now", label: "now" },
];

interface Props {
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}

export function MainNav({ className, ...props }: Props) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 font-mono lg:space-x-6",
        className,
      )}
      {...props}
    >
      {navItems.map((item) => (
        <MainNavItem key={item.href} href={item.href}>
          {item.label}
        </MainNavItem>
      ))}
    </nav>
  );
}

export function MainNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href as Route}
      className={cn(
        "text-sm transition-colors",
        isActive
          ? "text-accent"
          : "text-muted-foreground hover:text-accent",
      )}
    >
      {children}
    </Link>
  );
}
