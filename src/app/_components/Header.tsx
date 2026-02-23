import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4">
      <div className="flex items-center gap-5 md:gap-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xl tracking-tighter"
        >
          <span className="bg-accent text-accent-foreground border-accent inline-flex size-8 items-center justify-center rounded border-2 text-sm font-semibold">
            x
          </span>
          <span className="tracking-normal">xexr</span>
        </Link>
        <MainNav className="hidden md:flex" />
      </div>
      <MobileNav />
    </header>
  );
}
