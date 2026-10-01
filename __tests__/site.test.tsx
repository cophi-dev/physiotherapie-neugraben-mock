import { render } from "@testing-library/react";
import HomePage, { metadata as homeMeta } from "@/app/page";
import ImpressumPage, { metadata as impressumMeta } from "@/app/impressum/page";
import DatenschutzPage, { metadata as datenschutzMeta } from "@/app/datenschutz/page";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const pages = [
  { name: "Startseite", Page: HomePage, meta: homeMeta },
  { name: "Impressum", Page: ImpressumPage, meta: impressumMeta },
  { name: "Datenschutz", Page: DatenschutzPage, meta: datenschutzMeta },
];

function visibleText(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const parts: string[] = [];
  while (walker.nextNode()) parts.push(walker.currentNode.textContent ?? "");
  return parts.join(" ");
}

function renderWithChrome(Page: () => React.ReactElement) {
  return render(
    <>
      <Header />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}

describe.each(pages)("$name", ({ Page, meta }) => {
  it("has exactly one h1", () => {
    const { container } = renderWithChrome(Page);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("has a unique title that does not start with Home and a description", () => {
    expect(String(meta.title)).not.toMatch(/^home/i);
    expect(meta.description).toBeTruthy();
    expect(meta.alternates?.canonical).toBeTruthy();
    expect(meta.openGraph).toMatchObject({ siteName: site.name, images: [{ url: "/og.png" }] });
  });

  it("only links the phone constant and always labels it", () => {
    const { container } = renderWithChrome(Page);
    const telLinks = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]')];
    expect(telLinks.length).toBeGreaterThan(0);
    for (const link of telLinks) {
      expect(link.getAttribute("href")).toBe(site.phoneHref);
      expect(link.parentElement?.textContent).toContain(`(${site.phoneNote})`);
    }
  });

  it("never shows the mobile number or build/meta copy", () => {
    const { container } = renderWithChrome(Page);
    const text = visibleText(container);
    expect(text).not.toMatch(/0177|92276164|9276164/);
    expect(text).not.toMatch(/\b(demo|mock|agentur|phillipp|pexels|preise?|rund um die uhr|telefonassistent)\b/i);
  });
});

it("homepage title follows the agreed pattern", () => {
  expect(homeMeta.title).toBe(
    "Physiotherapie Neugraben – Hausbesuche in Neugraben & Fischbek | Hans Marius Pieper"
  );
});

it("JSON-LD carries the same NAP as the site constant", () => {
  const ld = localBusinessJsonLd();
  expect(ld.name).toBe(site.legalName);
  expect(ld.telephone).toBe("+493082685451");
  expect(ld.email).toBe(site.email);
  expect(ld.address.streetAddress).toBe("Cuxhavener Straße 467");
  expect(ld.address.postalCode).toBe("21149");
  expect(ld.areaServed[0].name).toBe("Neugraben-Fischbek");
});
