// Renders public/og.png and the logo before/after comparison.
// Usage: node scripts/brand-assets.js <baseUrl> <originalLogo.jpg> <originalIcon.jpg> <comparisonOut.png>
// The base URL must be a running build of this site (fonts are loaded from it).
const { chromium } = require("playwright-core");
const fs = require("node:fs");
const path = require("node:path");

const [base = "http://localhost:3000", originalLogo, originalIcon, comparisonOut] = process.argv.slice(2);
const toDataUrl = (file) => `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;

const icon = fs.readFileSync(path.join(__dirname, "../app/icon.svg"), "utf8");
const css = `
  * { margin: 0; box-sizing: border-box; }
  body { font-family: var(--font-inter-tight), sans-serif; background: #f7f5f0; color: #15191d; }
  .mark svg { display: block; width: 100%; height: 100%; }
`;

function wordmark(size) {
  return `
    <div style="display:flex;align-items:center;gap:${size * 0.32}px">
      <div class="mark" style="width:${size}px;height:${size}px;flex-shrink:0">${icon}</div>
      <div style="line-height:1">
        <div style="font-size:${size * 0.42}px;font-weight:600;letter-spacing:-0.015em">Physiotherapie Neugraben</div>
        <div style="margin-top:${size * 0.14}px;font-size:${size * 0.24}px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#464c52">Mobil und nah</div>
      </div>
    </div>`;
}

const ogHtml = `
  <div style="width:1200px;height:630px;padding:88px;display:flex;flex-direction:column;justify-content:space-between;border-bottom:16px solid #ef7a1a">
    ${wordmark(120)}
    <div>
      <div style="font-size:64px;font-weight:600;letter-spacing:-0.03em;line-height:1.05">Physiotherapie als Hausbesuch<br>in Neugraben und Fischbek</div>
      <div style="margin-top:20px;font-size:30px;color:#464c52">Hans Marius Pieper</div>
    </div>
  </div>`;

function comparisonHtml(originalDataUrl, originalIconUrl) {
  const sizes = [16, 32, 64];
  const label = (t) =>
    `<div style="font-size:18px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#464c52">${t}</div>`;
  const small = (render) =>
    `<div style="display:flex;align-items:flex-end;gap:28px;margin-top:40px">${sizes
      .map((s) => `<div style="text-align:center">${render(s)}<div style="margin-top:8px;font-size:14px;color:#464c52">${s}px</div></div>`)
      .join("")}</div>`;
  return `
  <div style="width:1600px;height:900px;display:grid;grid-template-columns:1fr 1fr">
    <div style="padding:64px;background:#fff;border-right:1px solid #d9d4ca;display:flex;flex-direction:column">
      ${label("Vorher – bisheriges Logo")}
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        <img src="${originalDataUrl}" style="width:640px">
      </div>
      ${small((s) => `<img src="${originalIconUrl}" style="width:${s}px;height:${s}px">`)}
    </div>
    <div style="padding:64px;display:flex;flex-direction:column">
      ${label("Nachher – neu gezeichnet")}
      <div style="flex:1;display:flex;align-items:center;justify-content:center">${wordmark(132)}</div>
      ${small((s) => `<div class="mark" style="width:${s}px;height:${s}px">${icon}</div>`)}
    </div>
  </div>`;
}

async function render(page, html, width, height, file) {
  await page.setViewportSize({ width, height });
  await page.evaluate(
    ({ html, css }) => {
      document.head.querySelectorAll("style[data-brand]").forEach((n) => n.remove());
      const style = document.createElement("style");
      style.dataset.brand = "";
      style.textContent = css;
      document.head.appendChild(style);
      document.body.className = "";
      document.body.innerHTML = html;
    },
    { html, css }
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width, height } });
  console.log(file);
}

(async () => {
  const browser = await chromium.launch({ executablePath: "/usr/local/bin/google-chrome" });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: "networkidle" });

  await render(page, ogHtml, 1200, 630, path.join(__dirname, "../public/og.png"));

  if (originalLogo && originalIcon && comparisonOut) {
    const hi = await browser.newPage({ deviceScaleFactor: 2 });
    await hi.goto(base, { waitUntil: "networkidle" });
    await render(hi, comparisonHtml(toDataUrl(originalLogo), toDataUrl(originalIcon)), 1600, 900, comparisonOut);
  }
  await browser.close();
})();
