/**
 * Tamil review list, generated from en.json / ta.json:
 *  - docs/tamil-review.csv  (key, English, Tamil, page, status – grouped by page;
 *    upload to Google Sheets to review with the client)
 *  - the "Tamil text – needs native review" table in README.md
 *
 * Mark a string as approved by adding its key (e.g. "hero.slides.milk.headline")
 * to src/i18n/ta-reviewed.json, then run: npm run i18n:review
 * When a new page adds a new top-level section to the JSON files, add it to PAGES below.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const en = read("../src/i18n/messages/en.json");
const ta = read("../src/i18n/messages/ta.json");
const reviewed = new Set(read("../src/i18n/ta-reviewed.json"));

/** Page each top-level JSON section appears on, in the order rows are grouped */
const PAGES = [
  [
    "All pages (header, footer, buttons, WhatsApp messages)",
    [
      "brand",
      "common",
      "units",
      "days",
      "nav",
      "language",
      "preview",
      "whatsapp",
      "footer",
    ],
  ],
  [
    "Home",
    [
      "meta",
      "hero",
      "intro",
      "promise",
      "products",
      "how",
      "stats",
      "gallery",
      "reviews",
      "certs",
      "delivery",
      "sample",
    ],
  ],
  ["Home + About", ["ethos"]],
  ["About", ["about"]],
  ["Coming soon, 404 and language redirect", ["comingSoon", "notFound", "redirect"]],
];
const pageOf = new Map(
  PAGES.flatMap(([page, sections]) => sections.map((s) => [s, page])),
);
const unmapped = Object.keys(en).filter((s) => !pageOf.has(s));
if (unmapped.length) {
  console.warn(`tamil-review: add these sections to PAGES: ${unmapped.join(", ")}`);
  for (const s of unmapped) {
    PAGES.push([s, [s]]);
    pageOf.set(s, s);
  }
}

function flatten(obj, prefix = "", out = {}) {
  for (const [name, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${name}` : name;
    if (value && typeof value === "object") flatten(value, path, out);
    else out[path] = String(value);
  }
  return out;
}

const enFlat = flatten(en);
const taFlat = flatten(ta);
const order = PAGES.map(([page]) => page);
const rows = Object.keys(enFlat)
  .map((path, i) => ({
    path,
    i,
    page: pageOf.get(path.split(".")[0]),
    en: enFlat[path],
    ta: taFlat[path] ?? "",
    done: reviewed.has(path),
  }))
  .sort((a, b) => order.indexOf(a.page) - order.indexOf(b.page) || a.i - b.i);
const pending = rows.filter((row) => !row.done).length;

// CSV – UTF-8 with BOM so Excel also shows Tamil correctly (Google Sheets ignores it)
const csvCell = (s) => `"${String(s).replace(/"/g, '""')}"`;
const csv = [
  ["key", "English", "Tamil", "page", "status"],
  ...rows.map((row) => [
    row.path,
    row.en,
    row.ta || "MISSING",
    row.page,
    row.done ? "reviewed" : "needs native review",
  ]),
]
  .map((cols) => cols.map(csvCell).join(","))
  .join("\r\n");
mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(new URL("../docs/tamil-review.csv", import.meta.url), "﻿" + csv + "\r\n");

// README table
const cell = (s) => (s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
const block = [
  "<!-- tamil-review:start -->",
  `**${pending} of ${rows.length} Tamil strings need native review.**`,
  "Spreadsheet version for Google Sheets: [`docs/tamil-review.csv`](docs/tamil-review.csv).",
  "",
  "<details><summary>Show the full list</summary>",
  "",
  "| Page | Key | English | Tamil | Status |",
  "| --- | --- | --- | --- | --- |",
  ...rows.map(
    (row) =>
      `| ${row.page} | \`${row.path}\` | ${cell(row.en)} | ${cell(row.ta) || "❌ missing"} | ${row.done ? "✅ reviewed" : "⬜ needs native review"} |`,
  ),
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
console.log(
  `tamil-review: ${rows.length} strings (docs/tamil-review.csv + README), ${pending} need review`,
);
