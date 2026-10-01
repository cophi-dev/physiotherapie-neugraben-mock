// Usage: node scripts/screenshots.js [baseUrl] [outDir]
const { chromium } = require("playwright-core");
const fs = require("node:fs");
const path = require("node:path");

const base = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "/opt/cursor/artifacts";

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

const targets = [
  { name: "hero", selector: null },
  { name: "leistungen", selector: "#leistungen" },
  { name: "kontakt", selector: "#kontakt" },
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: "/usr/local/bin/google-chrome" });
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    for (const t of targets) {
      if (t.selector) {
        await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          const header = document.querySelector("header");
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - header.offsetHeight);
        }, t.selector);
      } else {
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      await page.waitForTimeout(150);
      const file = path.join(out, `${vp.name}-${vp.width}x${vp.height}-${t.name}.png`);
      await page.screenshot({ path: file });
      console.log(file);
    }
    await page.screenshot({ path: path.join("/tmp", `full-${vp.name}.png`), fullPage: true });
    await ctx.close();
  }
  await browser.close();
})();
