import Link from "next/link";
import { emailHref, hoursShort, site } from "@/lib/site";
import { PhoneLink } from "./PhoneLink";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-6 py-10 text-[17px] leading-relaxed text-muted lg:grid-cols-12 lg:gap-8">
        <p className="lg:col-span-4">
          <span className="font-semibold text-ink">{site.legalName}</span>
          <br />
          {site.street}, {site.postalCode} {site.city}
        </p>
        <p className="lg:col-span-5">
          Telefon <PhoneLink />
          <br />
          E-Mail{" "}
          <a href={emailHref} className="link">
            {site.email}
          </a>
          <br />
          {hoursShort}
        </p>
        <ul className="flex gap-6 lg:col-span-3 lg:justify-end">
          <li>
            <Link href="/impressum" className="link">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/datenschutz" className="link">
              Datenschutz
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
