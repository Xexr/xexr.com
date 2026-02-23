"use client";

import type { Route } from "next";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./MainNav";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="text-foreground md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          data-slot="mobile-nav-backdrop"
          className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50 duration-200"
        />
        <Dialog.Popup
          data-slot="mobile-nav"
          className="data-open:animate-in data-closed:animate-out data-open:slide-in-from-right-full data-closed:slide-out-to-right-full data-open:fade-in-0 data-closed:fade-out-0 bg-background fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-sm flex-col p-6 duration-300 ease-out data-closed:duration-200 data-closed:ease-in"
        >
          <div className="flex items-center justify-end">
            <Dialog.Close
              className="text-foreground rounded-sm p-1"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <nav className="mt-8 flex flex-col gap-1 font-mono">
            {navItems.map((item) => (
              <Dialog.Close
                key={item.href}
                render={
                  <Link
                    href={item.href as Route}
                    className={cn(
                      "flex min-h-11 items-center rounded-md px-4 text-lg transition-colors",
                      pathname.startsWith(item.href)
                        ? "text-accent"
                        : "text-foreground hover:text-accent",
                    )}
                  />
                }
              >
                {item.label}
              </Dialog.Close>
            ))}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
