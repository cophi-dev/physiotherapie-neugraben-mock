import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PhoneLink } from "@/components/PhoneLink";
import { openGraph } from "@/lib/metadata";
import { emailHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Impressum | ${site.legalName}`,
  description: `Impressum von ${site.legalName}, ${site.street}, ${site.postalCode} ${site.city}.`,
  alternates: { canonical: "/impressum" },
  openGraph: openGraph({ title: `Impressum | ${site.name}`, url: "/impressum" }),
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2 className="!mt-0">Angaben gemäß § 5 DDG</h2>
      <p>
        {site.legalName}
        <br />
        {site.street}
        <br />
        {site.postalCode} {site.city}
      </p>
      <p>Vertreten durch: {site.owner}</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <PhoneLink />
        <br />
        E-Mail:{" "}
        <a href={emailHref} className="link">
          {site.email}
        </a>
      </p>

      <h2>Steuernummer</h2>
      <p>47/184/02935</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {site.owner}
        <br />
        {site.street}, {site.postalCode} {site.city}
      </p>
    </LegalPage>
  );
}
