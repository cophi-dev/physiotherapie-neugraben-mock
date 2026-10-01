export const site = {
  url: "https://physiotherapieneugraben.vercel.app",

  name: "Physiotherapie Neugraben",
  owner: "Hans Marius Pieper",
  legalName: "Physiotherapie Neugraben – Hans Marius Pieper",
  tagline: "Mobil und nah",

  street: "Cuxhavener Straße 467",
  postalCode: "21149",
  city: "Hamburg",
  district: "Neugraben-Fischbek",

  email: "physiotherapie.neugraben@mail.de",

  phone: "030 82685451",
  phoneHref: "tel:+493082685451",
  phoneNote: "KI-Assistenz",

  areas: ["Neugraben", "Fischbek"],

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cuxhavener+Stra%C3%9Fe+467%2C+21149+Hamburg",
} as const;

export const hours = [
  { days: "Montag – Freitag", time: "9:00 – 17:00 Uhr" },
  { days: "Samstag & Sonntag", time: "geschlossen" },
  { days: "Feiertage", time: "geschlossen" },
] as const;

export const hoursShort = "Mo–Fr 9:00–17:00";
export const hoursNote = "Nach Absprache auch außerhalb dieser Zeiten.";

export const phoneE164 = site.phoneHref.replace("tel:", "");
export const emailHref = `mailto:${site.email}`;
export const addressLine = `${site.street}, ${site.postalCode} ${site.city}`;
