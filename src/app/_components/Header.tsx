import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import SocialLinks from "./SocialLinks";
import VibePill from "./VibePill";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4">
      {/* Left: Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 font-mono text-xl tracking-tighter"
      >
        <span className="bg-accent text-accent-foreground border-accent inline-flex size-8 items-center justify-center rounded border-2 text-sm font-semibold">
          x
        </span>
        <span className="tracking-normal">xexr</span>
      </Link>

      {/* Right: Desktop nav + social + vibe pill + mobile hamburger */}
      <div className="flex items-center gap-5">
        <MainNav className="hidden md:flex" />
        <span aria-hidden="true" className="bg-border hidden h-4 w-px md:block" />
        <SocialLinks className="hidden translate-y-px md:flex" />
        <span aria-hidden="true" className="bg-border hidden h-4 w-px md:block" />
        <VibePill />
        <MobileNav />
      </div>
    </header>
  );
}
