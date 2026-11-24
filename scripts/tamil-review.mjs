/**
 * Writes the "Tamil text – needs native review" list into README.md
 * (between the tamil-review markers), from en.json / ta.json.
 *
 * Mark a string as approved by adding its key (e.g. "hero.slides.milk.headline")
 * to src/i18n/ta-reviewed.json, then run: npm run i18n:review
 */
import { readFileSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const en = read("../src/i18n/messages/en.json");
const ta = read("../src/i18n/messages/ta.json");
const reviewed = new Set(read("../src/i18n/ta-reviewed.json"));

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") flatten(v, key, out);
    else out[key] = String(v);
  }
  return out;
}

const enFlat = flatten(en);
const taFlat = flatten(ta);
const cell = (s) => (s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ").trim();

const rows = Object.keys(enFlat).map((key) => {
  const status = reviewed.has(key) ? "✅ reviewed" : "⬜ needs native review";
  return `| \`${key}\` | ${cell(enFlat[key])} | ${cell(taFlat[key]) || "❌ missing"} | ${status} |`;
});
const pending = Object.keys(enFlat).filter((k) => !reviewed.has(k)).length;

const block = [
  "<!-- tamil-review:start -->",
  `**${pending} of ${rows.length} Tamil strings need native review.**`,
  "",
  "<details><summary>Show the full list</summary>",
  "",
  "| Key | English | Tamil | Status |",
  "| --- | --- | --- | --- |",
  ...rows,
  "",
  "</details>",
  "<!-- tamil-review:end -->",
].join("\n");

const readmeUrl = new URL("../README.md", import.meta.url);
const readme = readFileSync(readmeUrl, "utf8");
const pattern = /<!-- tamil-review:start -->[\s\S]*<!-- tamil-review:end -->/;
if (!pattern.test(readme)) {
  console.error("README.md is missing the tamil-review markers");
  process.exit(1);
}
writeFileSync(readmeUrl, readme.replace(pattern, block));
console.log(`tamil-review: ${rows.length} strings listed, ${pending} need review`);
