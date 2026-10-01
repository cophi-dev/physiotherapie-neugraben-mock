import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "./LogoMark";
import { MobileNav } from "./MobileNav";

export const navItems = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#gebiet", label: "Einzugsgebiet" },
  { href: "/#zeiten", label: "Öffnungszeiten" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link href="/" className="logo-link group flex min-h-12 items-center gap-3.5" aria-label={`${site.name} – Startseite`}>
          <LogoMark className="size-11 shrink-0 lg:size-12" />
          <span className="flex flex-col leading-none">
            <span className="text-[19px] font-semibold tracking-[-0.015em] lg:text-[21px]">{site.name}</span>
            <span className="mt-1.5 text-[15px] text-muted lg:text-base">{site.owner}</span>
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7 text-[17px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link link-quiet py-3">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="btn btn-accent">
            <span className="font-semibold">{site.phone}</span>
            <span className="text-[15px] font-normal">({site.phoneNote})</span>
          </a>
        </nav>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
