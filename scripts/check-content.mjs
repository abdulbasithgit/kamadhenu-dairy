/**
 * Content guard – fails the build if visitors could see unfinished text:
 *  1. any "TODO" in the translation files (en.json / ta.json)
 *  2. after a build (out/ exists): "TODO" or an unfilled {placeholder} in the
 *     visible text, alt text, aria-labels or meta tags of any exported page.
 *
 * Runs automatically after `npm run build` / `npm run build:pages`,
 * or by hand: npm run check:content
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const problems = [];

function walkJson(obj, file, prefix = "") {
  for (const [name, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${name}` : name;
    if (value && typeof value === "object") walkJson(value, file, path);
    else if (/\bTODO\b/.test(String(value)))
      problems.push(`${file}: ${path} contains "TODO"`);
  }
}
for (const l of ["en", "ta"]) {
  const file = `src/i18n/messages/${l}.json`;
  walkJson(JSON.parse(readFileSync(join(root, file), "utf8")), file);
}

const out = join(root, "out");
if (existsSync(out)) {
  const pages = readdirSync(out, { recursive: true }).filter((f) => f.endsWith(".html"));
  for (const page of pages) {
    const html = readFileSync(join(out, page), "utf8");
    const attrs = [
      ...html.matchAll(/\b(?:alt|aria-label|title|content|placeholder)="([^"]*)"/g),
    ].map((m) => m[1]);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ");
    for (const chunk of [text, ...attrs]) {
      const hit = chunk.match(/\bTODO\b|\{[a-zA-Z]\w*\}/);
      if (hit) {
        const at = chunk.indexOf(hit[0]);
        const context = chunk
          .slice(Math.max(0, at - 40), at + 40)
          .replace(/\s+/g, " ")
          .trim();
        problems.push(`out/${page}: "${hit[0]}" in "…${context}…"`);
      }
    }
  }
}

if (problems.length) {
  console.error(
    `\nContent check failed – unfinished text would be visible:\n  ${problems.join("\n  ")}\n`,
  );
  process.exit(1);
}
console.log("content check: no TODO or unfilled {placeholders} visible");
