import type { Metadata } from "next";
import { HeroArt } from "@/components/HeroArt";
import { PhoneLink } from "@/components/PhoneLink";
import { Section } from "@/components/Section";
import { quotes, services } from "@/lib/copy";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { openGraph } from "@/lib/metadata";
import { emailHref, hours, hoursNote, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} – Hausbesuche in Neugraben & Fischbek | ${site.owner}`,
  description:
    "Mobile Physiotherapie in Neugraben, Fischbek und Umgebung – direkt bei Ihnen zu Hause oder in Ihrer Einrichtung. Präventiv, rehabilitativ oder begleitend. Mo–Fr 9:00–17:00.",
  alternates: { canonical: "/" },
  openGraph: openGraph({
    title: `${site.name} – Hausbesuche in Neugraben & Fischbek`,
    description: quotes.offer,
    url: "/",
  }),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />

      <section aria-labelledby="hero-titel" className="border-b border-line">
        <div className="shell grid items-center gap-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-up">{site.tagline}</p>
            <h1
              id="hero-titel"
              className="fade-up mt-4 text-[2.625rem] leading-[1.04] font-semibold sm:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: "80ms" }}
            >
              Physiotherapie als Hausbesuch in Neugraben und&nbsp;Fischbek
            </h1>
            <p
              className="fade-up mt-7 max-w-[36ch] text-[1.3125rem] leading-snug lg:text-2xl"
              style={{ animationDelay: "160ms" }}
            >
              {quotes.offer}
            </p>
            <div
              className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "240ms" }}
            >
              <a href={site.phoneHref} className="btn btn-accent">
                <span>Telefon {site.phone}</span>
                <span className="text-base font-normal">({site.phoneNote})</span>
              </a>
              <a href={emailHref} className="btn btn-outline">
                E-Mail schreiben
              </a>
            </div>
            <p className="fade-up mt-6 text-muted" style={{ animationDelay: "320ms" }}>
              Mo–Fr 9:00–17:00 Uhr · Sa, So &amp; Feiertage geschlossen
            </p>
          </div>
          <div className="fade-up lg:col-span-5" style={{ animationDelay: "200ms" }}>
            <HeroArt className="mx-auto w-full max-w-[30rem]" />
          </div>
        </div>
      </section>

      <Section id="leistungen" title="Leistungen">
        <ol className="border-b border-line">
          {services.map((service, i) => (
            <li key={service.title} className="grid gap-1 border-t border-line py-6 sm:grid-cols-[4rem_1fr] lg:py-8">
              <span className="text-lg font-semibold text-muted tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl leading-tight font-semibold lg:text-[1.75rem]">{service.title}</h3>
                <p className="mt-2 text-muted">{service.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="gebiet" title="Einzugsgebiet">
        <ul className="text-[2.5rem] leading-[1.15] font-semibold tracking-[-0.03em] lg:text-6xl">
          {site.areas.map((area) => (
            <li key={area}>{area}</li>
          ))}
          <li className="text-muted">und Umgebung</li>
        </ul>
        <p className="mt-8 max-w-[38ch]">
          Die Behandlung findet bei Ihnen zu Hause oder in Ihrer Einrichtung statt.
        </p>
        <p className="mt-4 text-muted">
          Anschrift: {site.street}, {site.postalCode} {site.city}
        </p>
      </Section>

      <Section id="vor-dem-anruf" title="Bevor Sie anrufen">
        <p className="max-w-[40ch]">Das Wichtigste auf einen Blick – damit Sie schnell sehen, ob das Angebot zu Ihnen passt.</p>
        <dl className="mt-8 border-b border-line">
          <Fact term="Wo">Bei Ihnen zu Hause oder in Ihrer Einrichtung.</Fact>
          <Fact term="Gebiet">Neugraben, Fischbek und Umgebung.</Fact>
          <Fact term="Wann">
            Montag bis Freitag, 9:00 bis 17:00 Uhr. {hoursNote}
          </Fact>
          <Fact term="Termin">„Rufen Sie uns an und machen Sie einen Termin.“</Fact>
          <Fact term="Telefon">
            <PhoneLink />
          </Fact>
        </dl>
      </Section>

      <Section id="zeiten" title="Öffnungszeiten">
        <table className="w-full border-b border-line text-left">
          <caption className="sr-only">Öffnungszeiten</caption>
          <tbody>
            {hours.map((row) => (
              <tr key={row.days} className="border-t border-line">
                <th scope="row" className="py-5 pr-6 font-normal">
                  {row.days}
                </th>
                <td className={`py-5 text-right font-semibold ${row.time === "geschlossen" ? "text-muted" : ""}`}>
                  {row.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6">{hoursNote}</p>
      </Section>

      <Section id="kontakt" title="Kontakt" dark>
        <p className="max-w-[34ch] text-[1.375rem] leading-snug lg:text-[1.75rem]">{quotes.contact}</p>
        <dl className="mt-10 grid gap-8">
          <div>
            <dt className="eyebrow text-paper/75">Telefon</dt>
            <dd className="mt-2 text-2xl font-semibold lg:text-[1.75rem]">
              <a href={site.phoneHref} className="link">
                {site.phone}
              </a>
              <span className="mt-1 block text-lg font-normal text-paper/80">({site.phoneNote})</span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-paper/75">E-Mail</dt>
            <dd className="mt-2 text-xl font-semibold break-words lg:text-2xl">
              <a href={emailHref} className="link">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-paper/75">Anschrift</dt>
            <dd className="mt-2 text-xl lg:text-[1.375rem]">
              <span className="font-semibold">{site.legalName}</span>
              <br />
              {site.street}, {site.postalCode} {site.city}
              <br />
              <a href={site.mapsUrl} className="link mt-3 inline-block text-lg" rel="noopener noreferrer" target="_blank">
                Route in Google Maps öffnen
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn btn-accent">
            <span>Anrufen</span>
            <span className="text-base font-normal">({site.phoneNote})</span>
          </a>
          <a href={emailHref} className="btn btn-outline-light">
            E-Mail schreiben
          </a>
        </div>
      </Section>
    </>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="font-semibold">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}
