import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { PhoneLink } from "@/components/PhoneLink";
import { openGraph } from "@/lib/metadata";
import { emailHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Datenschutzerklärung | ${site.legalName}`,
  description: `Datenschutzerklärung von ${site.legalName}: Hosting bei Vercel, keine Cookies, keine Tracking-Tools, keine eingebetteten Inhalte Dritter.`,
  alternates: { canonical: "/datenschutz" },
  openGraph: openGraph({ title: `Datenschutzerklärung | ${site.name}`, url: "/datenschutz" }),
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz­erklärung">
      <h2 className="!mt-0">1. Datenschutz auf einen Blick</h2>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
        passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können.
      </p>
      <p>
        Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Tools und bindet keine Inhalte
        Dritter ein – also keine eingebettete Karte, keine Videos und keine Social-Media-Plugins. Die Schriften werden
        vom eigenen Server ausgeliefert. Ein Kontaktformular gibt es nicht.
      </p>

      <h2>2. Verantwortliche Stelle</h2>
      <p>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
      <p>
        {site.legalName}
        <br />
        {site.street}, {site.postalCode} {site.city}
        <br />
        Telefon: <PhoneLink />
        <br />
        E-Mail:{" "}
        <a href={emailHref} className="link">
          {site.email}
        </a>
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über
        die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf
        der Website verarbeitet Vercel automatisch technische Daten in Server-Logfiles, die Ihr Browser übermittelt:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite und übertragene Datenmenge</li>
        <li>Referrer-URL (die zuvor besuchte Seite)</li>
        <li>verwendeter Browser und Betriebssystem</li>
      </ul>
      <p>
        Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Sie dienen ausschließlich der sicheren und
        fehlerfreien Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte
        Interesse liegt in einer technisch fehlerfreien und sicheren Darstellung der Website.
      </p>
      <p>
        Vercel verarbeitet die Daten als Auftragsverarbeiter nach Art. 28 DSGVO auf Grundlage seines Data Processing
        Addendum. Eine Übermittlung in die USA ist möglich. Vercel ist nach dem EU-U.S. Data Privacy Framework
        zertifiziert; die Übermittlung erfolgt damit auf Grundlage des Angemessenheitsbeschlusses der
        EU-Kommission (Art. 45 DSGVO). Weitere Informationen:{" "}
        <a href="https://vercel.com/legal/privacy-notice" className="link" rel="noopener noreferrer">
          Datenschutzhinweise von Vercel
        </a>
        .
      </p>

      <h2>4. Cookies</h2>
      <p>
        Diese Website verwendet keine Cookies und keine vergleichbaren Technologien, die Informationen auf Ihrem
        Endgerät speichern oder auslesen. Eine Einwilligung ist daher nicht erforderlich.
      </p>

      <h2>5. Kontakt per E-Mail oder Telefon</h2>
      <p>
        Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden Ihre Angaben – etwa Name, Kontaktdaten und Ihr
        Anliegen – zur Bearbeitung Ihrer Anfrage verarbeitet. Anrufe unter der angegebenen Telefonnummer nimmt eine
        KI-Assistenz entgegen.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einer Behandlung zusammenhängt, im
        Übrigen Art. 6 Abs. 1 lit. f DSGVO. Soweit Sie Gesundheitsdaten mitteilen, erfolgt die Verarbeitung nach Art. 9
        Abs. 2 lit. h DSGVO. Ihre Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine
        gesetzlichen Aufbewahrungsfristen entgegenstehen.
      </p>
      <p>
        Bitte beachten Sie, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
        Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
        möglich.
      </p>

      <h2>6. Links zu anderen Websites</h2>
      <p>
        Der Link „Route in Google Maps öffnen“ ist ein einfacher Verweis. Erst wenn Sie ihn anklicken, wird Google
        Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) in einem neuen Fenster geöffnet;
        dort gelten die Datenschutzbestimmungen von Google. Vorher werden keine Daten an Google übertragen.
      </p>

      <h2>7. SSL- bzw. TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung
        erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht,</p>
      <ul>
        <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten Daten zu erhalten (Art. 15 DSGVO),</li>
        <li>die Berichtigung oder Löschung dieser Daten zu verlangen (Art. 16 und 17 DSGVO),</li>
        <li>die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO),</li>
        <li>Ihre Daten in einem gängigen Format zu erhalten (Art. 20 DSGVO),</li>
        <li>einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zu widersprechen (Art. 21 DSGVO).</li>
      </ul>
      <p>
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an die oben genannte Adresse
        oder an die im <Link href="/impressum" className="link">Impressum</Link> angegebenen Kontaktdaten wenden.
      </p>
      <p>
        Außerdem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig ist der
        Hamburgische Beauftragte für Datenschutz und Informationsfreiheit.
      </p>
    </LegalPage>
  );
}
