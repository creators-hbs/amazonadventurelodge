import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
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
  if (clean === "/" || clean === "") return path.join(dist, "index.html");
  if (clean.startsWith(".")) return path.resolve(path.dirname(fromFile), clean);
  if (!clean.startsWith("/") && clean.endsWith(".html")) return path.resolve(path.dirname(fromFile), clean);
  return path.join(dist, clean.replace(/^\/+/, ""), "index.html");
}

function assetToFile(src, fromFile) {
  if (src.startsWith(".")) return path.resolve(path.dirname(fromFile), src);
  if (!src.startsWith("/")) return path.resolve(path.dirname(fromFile), src);
  return path.join(dist, src.replace(/^\/+/, ""));
}

function isExternal(value) {
  return /^(https?:|mailto:|tel:|sms:|\/\/)/i.test(value);
}

function checkHtml(file) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(dist, file).replaceAll("\\", "/");
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

if (!fs.existsSync(dist)) {
  problems.push("dist directory does not exist. Run npm run build first.");
} else {
  const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
  htmlFiles.forEach(checkHtml);

  const publicRoutes = htmlFiles
    .filter((file) => !fs.readFileSync(file, "utf8").includes('content="noindex"'))
    .map((file) => path.relative(dist, file).replaceAll("\\", "/"));

  if (publicRoutes.length < 24) problems.push(`expected at least 24 public pages, found ${publicRoutes.length}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Route validation passed: no broken internal links, local assets, empty hrefs, or accidental /produto/ destinations found.");
