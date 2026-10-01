import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Seite nicht gefunden | ${site.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="shell py-20 lg:py-28">
      <h1 className="text-[2.5rem] leading-tight font-semibold lg:text-[3.5rem]">Seite nicht gefunden</h1>
      <p className="mt-6">
        Diese Seite gibt es nicht.{" "}
        <Link href="/" className="link">
          Zur Startseite
        </Link>
      </p>
    </div>
  );
}
