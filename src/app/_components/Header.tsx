import { MainNav } from "./MainNav";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default async function Header() {
  return (
    <>
      <header className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-5 md:gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl tracking-tighter"
          >
            <span className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-lg border-2 px-2 py-1 font-semibold">
              {siteConfig.name.charAt(0).toUpperCase()}
            </span>
            <span className="font-normal tracking-normal">
              {siteConfig.name}
            </span>
          </Link>
          <MainNav className="hidden md:flex" />
        </div>
      </header>
      <nav className="md:hidden">
        <MainNav className="p-3" />
      </nav>
    </>
  );
}
