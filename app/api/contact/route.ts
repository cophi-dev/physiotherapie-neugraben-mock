import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(1).max(8000),
  consent: z.literal(true),
  hp: z.string().optional(),
});

type ContactResponse = { ok: true } | { ok: false; error: string };

const VALIDATION_ERROR =
  "Bitte füllen Sie Name, E-Mail und Nachricht aus und bestätigen Sie die Einwilligung.";
const SEND_ERROR = "Die Nachricht konnte nicht gesendet werden.";

function json(body: ContactResponse, status = 200) {
  return Response.json(body, { status });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function recipients(value: string) {
  const list = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (list.length === 0) return null;
  return list.length === 1 ? list[0] : list;
}

function mailBodies(fields: { name: string; email: string; phone: string; message: string }) {
  const text = [
    `Name: ${fields.name}`,
    `E-Mail: ${fields.email}`,
    `Telefon: ${fields.phone || "–"}`,
    "Einwilligung erteilt: Ja",
    "",
    "Nachricht:",
    fields.message,
  ].join("\n");

  const html = `<!doctype html>
<html lang="de">
  <body>
    <h1>Anfrage über die Website</h1>
    <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(fields.phone || "–")}</p>
    <p><strong>Einwilligung erteilt:</strong> Ja</p>
    <p><strong>Nachricht:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>
  </body>
</html>`;

  return { text, html };
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: VALIDATION_ERROR }, 400);
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return json({ ok: false, error: VALIDATION_ERROR }, 400);
  }

  const honeypot = "hp" in raw && typeof raw.hp === "string" ? raw.hp.trim() : "";
  if (honeypot) {
    return json({ ok: true });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, error: VALIDATION_ERROR }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = recipients(process.env.CONTACT_TO ?? "");
  const from = process.env.CONTACT_FROM?.trim();
  if (!apiKey || !to || !from) {
    return json({ ok: false, error: SEND_ERROR }, 503);
  }

  const { name, email, phone, message } = parsed.data;
  const replyTo = process.env.CONTACT_REPLY_TO?.trim() || email;
  const subject = `Anfrage über die Website (Physiotherapie Neugraben) von ${name.replace(/[\r\n]+/g, " ")}`;
  const { text, html } = mailBodies({ name, email, phone, message });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, replyTo, subject, text, html });
    if (error) {
      return json({ ok: false, error: SEND_ERROR }, 502);
    }
  } catch {
    return json({ ok: false, error: SEND_ERROR }, 502);
  }

  return json({ ok: true });
}
