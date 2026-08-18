import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteRoot = path.resolve(root, process.argv[2] || "dist");
const deployEntries = [
  "index.html",
  "the-lodge",
  "experiences",
  "gallery",
  "contact",
  "company-policy",
  "pt",
  "package",
  "produto",
  "photo-gallery",
  "contact-us",
  "politica-da-empresa",
  "sport-fishing",
];
const problems = [];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function routeToFile(route, fromFile) {
  const clean = route.split("#")[0].split("?")[0];
  if (clean === "/" || clean === "") return path.join(siteRoot, "index.html");
  if (clean.startsWith(".")) return path.resolve(path.dirname(fromFile), clean);
  if (!clean.startsWith("/") && clean.endsWith(".html")) return path.resolve(path.dirname(fromFile), clean);
  return path.join(siteRoot, clean.replace(/^\/+/, ""), "index.html");
}

function assetToFile(src, fromFile) {
  if (src.startsWith(".")) return path.resolve(path.dirname(fromFile), src);
  if (!src.startsWith("/")) return path.resolve(path.dirname(fromFile), src);
  return path.join(siteRoot, src.replace(/^\/+/, ""));
}

function isExternal(value) {
  return /^(https?:|mailto:|tel:|sms:|\/\/)/i.test(value);
}

function checkHtml(file) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(siteRoot, file).replaceAll("\\", "/");
  const isRedirect = /<meta http-equiv="refresh"/.test(html);

  if (/href=["']#["']/.test(html)) problems.push(`${rel}: contains href="#"`);
  if (/javascript:void/i.test(html)) problems.push(`${rel}: contains javascript:void`);

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (!value || value.startsWith("data:") || isExternal(value)) continue;
    if (value.startsWith("#")) continue;

    if (value.includes("/produto/") && !isRedirect) problems.push(`${rel}: non-redirect link points to /produto/: ${value}`);

    const fileToCheck = value.match(/\.(css|js|jpg|jpeg|png|webp|avif|svg|xml|txt)$/i)
      ? assetToFile(value, file)
      : routeToFile(value, file);
    if (!fs.existsSync(fileToCheck)) problems.push(`${rel}: missing local target ${value}`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    if (!/\salt=/.test(tag)) problems.push(`${rel}: image missing alt attribute`);
  }
}

function deployHtmlFiles() {
  if (siteRoot !== root) return walk(siteRoot).filter((file) => file.endsWith(".html"));
  return deployEntries.flatMap((entry) => {
    const full = path.join(siteRoot, entry);
    if (!fs.existsSync(full)) return [];
    if (fs.statSync(full).isDirectory()) return walk(full).filter((file) => file.endsWith(".html"));
    return full.endsWith(".html") ? [full] : [];
  });
}

if (!fs.existsSync(siteRoot)) {
  problems.push(`${path.relative(root, siteRoot) || "."} directory does not exist. Run npm run build first.`);
} else {
  const htmlFiles = deployHtmlFiles();
  htmlFiles.forEach(checkHtml);

  const publicRoutes = htmlFiles
    .filter((file) => !fs.readFileSync(file, "utf8").includes('content="noindex"'))
    .map((file) => path.relative(siteRoot, file).replaceAll("\\", "/"));

  if (publicRoutes.length < 24) problems.push(`expected at least 24 public pages, found ${publicRoutes.length}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Route validation passed for ${path.relative(root, siteRoot) || "."}: no broken internal links, local assets, empty hrefs, or accidental /produto/ destinations found.`);
