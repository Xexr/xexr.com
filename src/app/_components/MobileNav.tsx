"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Route } from "next";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./MainNav";
import SocialLinks from "./SocialLinks";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // mounted keeps DOM present during exit transition
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Mount when opening; unmount after transition when closing
  useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);

  function handleTransitionEnd() {
    if (!open) setMounted(false);
  }

  // Close on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Trigger enter animation on next frame after mount
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (mounted && open) {
      // requestAnimationFrame ensures the initial (off-screen) styles are painted first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }
    if (!open) {
      setAnimate(false);
    }
  }, [mounted, open]);

  return (
    <>
      <button
        type="button"
        className="text-foreground md:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-6" />
      </button>

      {mounted && (
        <>
          {/* Backdrop */}
          <div
            className={cn(
              "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200",
              animate ? "opacity-100" : "opacity-0",
            )}
            onClick={close}
            onTransitionEnd={handleTransitionEnd}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className={cn(
              "bg-background fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-sm flex-col p-6 transition-transform duration-300 ease-out",
              animate ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-foreground rounded-sm p-1"
                aria-label="Close menu"
                onClick={close}
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1 font-mono">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  onClick={close}
                  className={cn(
                    "flex min-h-11 items-center rounded-md px-4 text-lg transition-colors",
                    pathname.startsWith(item.href)
                      ? "text-accent"
                      : "text-foreground hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <SocialLinks iconSize="size-5" className="mt-8 px-4" />
          </div>
        </>
      )}
    </>
  );
}
