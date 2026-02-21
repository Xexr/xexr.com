"use client";

import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems: { href: Route; label: string }[] = [];

interface Props {
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}

export function MainNav({ className, ...props }: Props) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
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
  href: Route;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors",
        pathname === href
          ? "bg-primary text-primary-foreground rounded-md px-3 py-1"
          : "text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
