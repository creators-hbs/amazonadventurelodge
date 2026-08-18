import http from "node:http";
import { spawn } from "node:child_process";
import { experiences, routes } from "../src/site-data.mjs";

const port = 4183;
const host = `http://127.0.0.1:${port}`;

function publicRoutes() {
  return [
    ...Object.values(routes.en).filter((value) => typeof value === "string"),
    ...Object.values(routes.en.packages),
    ...Object.values(routes.pt).filter((value) => typeof value === "string"),
    ...Object.values(routes.pt.packages),
  ];
}

function legacyRoutes() {
  return [
    ...experiences.flatMap((exp) => exp.legacyUrls),
    "/photo-gallery/",
    "/contact-us/",
    "/politica-da-empresa/",
  ];
}

function get(pathname) {
  return new Promise((resolve, reject) => {
    http.get(`${host}${pathname}`, (res) => {
      res.resume();
      res.on("end", () => resolve(res.statusCode));
    }).on("error", reject);
  });
}

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const status = await get("/");
      if (status === 200) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Local server did not start in time.");
}

const child = spawn(process.execPath, ["scripts/serve.mjs"], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

try {
  await waitForServer();
  const checks = [...publicRoutes(), ...legacyRoutes()];
  const failures = [];
  for (const route of checks) {
    const status = await get(route);
    if (status !== 200) failures.push(`${route} returned ${status}`);
  }
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`HTTP smoke passed: ${checks.length} routes returned 200.`);
  }
} finally {
  child.kill();
}
