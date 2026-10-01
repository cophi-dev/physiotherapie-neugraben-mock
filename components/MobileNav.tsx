"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Props = {
  items: ReadonlyArray<{ href: string; label: string }>;
};

export function MobileNav({ items }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="btn btn-outline min-w-24"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Schließen" : "Menü"}
      </button>

      <nav
        id="mobile-menu"
        aria-label="Hauptnavigation"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper"
      >
        <ul className="shell flex flex-col py-3 text-xl">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <a href={item.href} className="flex min-h-14 items-center" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="shell pb-6">
          <a href={site.phoneHref} className="btn btn-accent w-full">
            <span className="font-semibold">{site.phone}</span>
            <span className="text-[15px] font-normal">({site.phoneNote})</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
