import fs from "node:fs";
import path from "node:path";
import {
  activities,
  experiences,
  gallery,
  included,
  includedPt,
  imagePrompts,
  images,
  nav,
  pillars,
  policy,
  routes,
  siteConfig,
} from "./site-data.mjs";

const root = process.cwd();
const dist = path.join(root, "dist");
const publicDir = path.join(root, "public");
const assetDirs = ["assets/css", "assets/js", "assets/images", "assets/brand", "assets/icons"];
const rootDeployEntries = [
  "index.html",
  "sitemap.xml",
  "robots.txt",
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
const assetVersion = "20260826-01";
const cssFiles = [`/assets/css/core.css?v=${assetVersion}`, `/assets/css/scroll-overrides.css?v=${assetVersion}`];
const jsFiles = [
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  `/assets/js/animations.js?v=${assetVersion}`,
  `/assets/js/site.js?v=${assetVersion}`,
];

const labels = {
  en: {
    lang: "en",
    otherLang: "PT",
    explore: "Explore Experiences",
    plan: "Plan Your Stay",
    check: "Check Availability",
    lodge: "The Lodge",
    experiences: "Experiences",
    gallery: "Gallery",
    contact: "Contact",
    policy: "Company Policy",
    from: "From",
    duration: "Duration",
    price: "Price",
    highlights: "Highlights",
    itinerary: "Itinerary",
    included: "What's included",
    practical: "Practical information",
    related: "Related experiences",
    all: "All",
    categories: ["All", "Short Stay", "Jungle Immersion", "Survival", "Sport Fishing"],
    ready: "Ready for the Amazon?",
    footerHeadline: "PLAN YOUR JOURNEY",
    breadcrumbHome: "Home",
    formTitle: "Tell us about your journey",
    submit: "Prepare WhatsApp message",
  },
  pt: {
    lang: "pt-BR",
    otherLang: "EN",
    explore: "Explorar Experiências",
    plan: "Planejar Estadia",
    check: "Consultar Disponibilidade",
    lodge: "A Pousada",
    experiences: "Experiências",
    gallery: "Galeria",
    contact: "Contato",
    policy: "Política da Empresa",
    from: "A partir de",
    duration: "Duração",
    price: "Preço",
    highlights: "Destaques",
    itinerary: "Roteiro",
    included: "Incluso",
    practical: "Informações práticas",
    related: "Experiências relacionadas",
    all: "Todos",
    categories: [
      ["Todos", "All"],
      ["Estadias curtas", "Short Stay"],
      ["Imersão na selva", "Jungle Immersion"],
      ["Sobrevivência", "Survival"],
      ["Pesca esportiva", "Sport Fishing"],
    ],
    ready: "Pronto para a Amazônia?",
    footerHeadline: "PLANEJE SUA JORNADA",
    breadcrumbHome: "Início",
    formTitle: "Conte-nos sobre sua viagem",
    submit: "Preparar mensagem no WhatsApp",
  },
};

labels.en.categories = labels.en.categories.map((category) => [category, category]);

const langOf = (route) => route.startsWith("/pt/") || route === "/pt/" ? "pt" : "en";
const byKey = Object.fromEntries(experiences.map((item) => [item.key, item]));
const routeEntries = [
  ...Object.entries(routes.en).filter(([, value]) => typeof value === "string").map(([name, route]) => [route, routes.pt[name]]),
  ...Object.entries(routes.pt).filter(([, value]) => typeof value === "string").map(([name, route]) => [route, routes.en[name]]),
  ...Object.entries(routes.en.packages).map(([key, route]) => [route, routes.pt.packages[key]]),
  ...Object.entries(routes.pt.packages).map(([key, route]) => [route, routes.en.packages[key]]),
];
const alternateRoute = Object.fromEntries(routeEntries);

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attrs(values) {
  return Object.entries(values)
    .filter(([, value]) => value !== false && value !== undefined && value !== null && value !== "")
    .map(([key, value]) => (value === true ? key : `${key}="${escapeHtml(value)}"`))
    .join(" ");
}

function imageAlt(image, lang) {
  return lang === "pt" && image.altPt ? image.altPt : image.alt;
}

function locationLabel(lang) {
  return lang === "pt" ? siteConfig.locationPt : siteConfig.location;
}

function writePage(route, html) {
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  ensureDir(out);
  fs.writeFileSync(out, relativizeHtml(html, route));
}

function routeToOutputFile(route) {
  return route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
}

function pathToOutputFile(urlPath) {
  const clean = urlPath.split("#")[0].split("?")[0];
  if (clean === "/" || clean === "") return path.join(dist, "index.html");
  if (/\.[a-z0-9]+$/i.test(clean)) return path.join(dist, clean.replace(/^\/+/, ""));
  return path.join(dist, clean.replace(/^\/+/, ""), "index.html");
}

function relativeUrl(fromRoute, target) {
  if (!target.startsWith("/") || target.startsWith("//")) return target;
  const hash = target.includes("#") ? `#${target.split("#").slice(1).join("#")}` : "";
  const queryless = target.split("#")[0];
  const query = queryless.includes("?") ? `?${queryless.split("?").slice(1).join("?")}` : "";
  const pathOnly = queryless.split("?")[0];
  const fromDir = path.dirname(routeToOutputFile(fromRoute));
  const toFile = pathToOutputFile(pathOnly);
  let rel = path.relative(fromDir, toFile).replaceAll("\\", "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return `${rel}${query}${hash}`;
}

function relativizeHtml(html, route) {
  return html
    .replace(/\b(href|src|data-full)=["'](\/[^"'<>]*)["']/g, (_match, attr, target) => `${attr}="${relativeUrl(route, target)}"`)
    .replace(/content="0; url=(\/[^"]*)"/g, (_match, target) => `content="0; url=${relativeUrl(route, target)}"`)
    .replace(/location\.replace\("(\/[^"]*)"\)/g, (_match, target) => `location.replace("${relativeUrl(route, target)}")`);
}

function copyRecursive(src, destPath) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    for (const entry of fs.readdirSync(src)) copyRecursive(path.join(src, entry), path.join(destPath, entry));
  } else {
    ensureDir(destPath);
    fs.copyFileSync(src, destPath);
  }
}

function removeRootDeployEntry(entry) {
  const target = path.resolve(root, entry);
  if (target === root || !target.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Unsafe deploy output path: ${target}`);
  }
  fs.rmSync(target, { recursive: true, force: true });
}

function resetGeneratedDir(dirPath) {
  const target = path.resolve(dirPath);
  if (target === root || !target.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Unsafe generated output path: ${target}`);
  }
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
}

function syncRootDeploy() {
  for (const entry of rootDeployEntries) {
    const from = path.join(dist, entry);
    if (!fs.existsSync(from)) continue;
    removeRootDeployEntry(entry);
    copyRecursive(from, path.join(root, entry));
  }
}

function syncPublicDeploy() {
  resetGeneratedDir(publicDir);
  copyRecursive(dist, publicDir);
}

function logoMarkup() {
  return `<span class="brand-logo-shell"><img class="brand-logo" src="${siteConfig.logoPath}" alt="${siteConfig.name}" width="172" height="72" onerror="this.closest('.brand-logo-shell').classList.add('is-missing')"><span aria-hidden="true" class="brand-fallback">Amazon Adventure Lodge</span></span>`;
}

function header(lang, currentRoute) {
  const l = labels[lang];
  return `<header class="site-header" data-site-header>
  <a class="brand-link" href="${routes[lang].home}" aria-label="${lang === "pt" ? `${siteConfig.name} início` : `${siteConfig.name} home`}">${logoMarkup()}</a>
  <nav class="desktop-nav" aria-label="${lang === "pt" ? "Navegação principal" : "Primary navigation"}">${nav[lang].map(([text, href]) => `<a href="${href}"${href === currentRoute ? " aria-current=\"page\"" : ""}>${escapeHtml(text)}</a>`).join("")}</nav>
  <div class="header-actions">
    <a class="language-link" href="${alternateRoute[currentRoute] || routes[lang === "en" ? "pt" : "en"].home}" hreflang="${lang === "en" ? "pt-BR" : "en"}">${l.otherLang}</a>
    <a class="btn btn-small" href="${routes[lang].contact}">${l.check}</a>
    <button class="menu-toggle" type="button" aria-label="${lang === "pt" ? "Abrir menu" : "Open menu"}" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <div class="mobile-menu-brand">${logoMarkup()}</div>
    <nav aria-label="${lang === "pt" ? "Navegação mobile" : "Mobile navigation"}">${nav[lang].map(([text, href]) => `<a href="${href}">${escapeHtml(text)}</a>`).join("")}<a href="${routes[lang].companyPolicy}">${l.policy}</a></nav>
    <a class="btn" href="${routes[lang].contact}">${l.check}</a>
    <a class="language-link" href="${alternateRoute[currentRoute] || routes[lang === "en" ? "pt" : "en"].home}" hreflang="${lang === "en" ? "pt-BR" : "en"}">${l.otherLang}</a>
  </div>
</header>`;
}

function footer(lang) {
  const l = labels[lang];
  const r = routes[lang];
  return `<footer class="site-footer">
  <img src="${images.hero.src}" alt="" loading="lazy" aria-hidden="true">
  <div class="footer-content reveal">
    <p class="eyebrow">${l.ready}</p>
    <a class="footer-headline" href="${r.contact}">${l.footerHeadline}</a>
    <div class="footer-grid">
      <div>${logoMarkup()}<p>${escapeHtml(locationLabel(lang))}</p></div>
      <nav aria-label="${lang === "pt" ? "Navegação do rodapé" : "Footer navigation"}">
        <a href="${r.home}">${l.breadcrumbHome}</a>
        <a href="${r.lodge}">${l.lodge}</a>
        <a href="${r.experiences}">${l.experiences}</a>
        <a href="${r.gallery}">${l.gallery}</a>
        <a href="${r.contact}">${l.contact}</a>
        <a href="${r.companyPolicy}">${l.policy}</a>
      </nav>
      <div>
        <a href="${whatsappUrl(lang)}">WhatsApp ${siteConfig.whatsappDisplay}</a>
        <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
        <a href="${r.home}" hreflang="${lang === "en" ? "en" : "pt-BR"}">${lang.toUpperCase()}</a>
        <a href="${routes[lang === "en" ? "pt" : "en"].home}" hreflang="${lang === "en" ? "pt-BR" : "en"}">${lang === "en" ? "PT" : "EN"}</a>
      </div>
    </div>
    <p class="copyright">© ${new Date().getFullYear()} ${siteConfig.name}</p>
  </div>
</footer>
<a class="whatsapp-float" href="${whatsappUrl(lang)}" aria-label="${lang === "pt" ? "Abrir conversa no WhatsApp" : "Open WhatsApp conversation"}"><img src="/assets/icons/whatsapp.svg" alt="" aria-hidden="true"><span class="sr-only">WhatsApp</span></a>`;
}

function whatsappUrl(lang, message) {
  const text = message || (lang === "pt"
    ? "Olá! Gostaria de saber mais sobre uma estadia no Amazon Adventure Lodge."
    : "Hello! I would like to know more about staying at Amazon Adventure Lodge.");
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function layout({ lang, route, title, description, body, image = images.hero.src, jsonLd = [] }) {
  const canonical = `${siteConfig.canonicalBase}${route}`;
  const alternate = alternateRoute[route] ? `${siteConfig.canonicalBase}${alternateRoute[route]}` : "";
  return `<!DOCTYPE html>
<html lang="${labels[lang].lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
${alternate ? `<link rel="alternate" hreflang="${lang === "en" ? "pt-BR" : "en"}" href="${alternate}">` : ""}
<meta name="robots" content="index, follow">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${siteConfig.canonicalBase}${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Syncopate:wght@400;700&display=swap" rel="stylesheet">
${cssFiles.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")}
${jsonLd.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n")}
</head>
<body>
<div class="noise-overlay"></div>
${header(lang, route)}
<main id="main-content">${body}</main>
${footer(lang)}
${jsFiles.map((src) => `<script src="${src}" defer></script>`).join("\n")}
</body>
</html>`;
}

function hero({ lang = "en", eyebrow, title, copy, image, primary, secondary, compact = false }) {
  return `<section class="hero${compact ? " hero-compact" : ""}">
  <img class="hero-img" src="${image.src}" alt="${escapeHtml(imageAlt(image, lang))}" fetchpriority="high">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="eyebrow hero-fade">${escapeHtml(eyebrow)}</p>
    <h1 class="display hero-title">${title.split("\n").map((line) => `<span class="hero-text"><span>${escapeHtml(line)}</span></span>`).join("")}</h1>
    <p class="hero-copy hero-fade">${escapeHtml(copy)}</p>
    <div class="hero-actions hero-fade">${primary || ""}${secondary || ""}</div>
  </div>
</section>`;
}

function sectionHeader(eyebrow, title, copy = "") {
  return `<div class="section-header reveal">${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ""}<h2 class="display split-animate">${escapeHtml(title)}</h2>${copy ? `<p>${escapeHtml(copy)}</p>` : ""}</div>`;
}

function experienceCard(exp, lang, index, stacked = false) {
  const data = exp[lang];
  const route = routes[lang].packages[exp.key];
  const duration = lang === "pt" ? exp.durationPt : exp.duration;
  const price = lang === "pt" ? exp.pricePt : exp.price;
  return `<article class="${stacked ? "card-item" : "experience-card"}" data-category="${exp.category}">
    <div class="${stacked ? "card-inner" : "experience-card-inner"}">
      <div class="card-content">
        <div>
          <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(data.title)}</h3>
          <p class="meta">${escapeHtml(duration)} · ${escapeHtml(price)}</p>
        </div>
        <p>${escapeHtml(data.summary)}</p>
        <a class="text-link" href="${route}">${lang === "pt" ? "Explorar experiência" : "Explore this experience"}</a>
      </div>
      <div class="card-img-wrap"><img class="card-img" src="${exp.image.src}" alt="${escapeHtml(imageAlt(exp.image, lang))}" loading="lazy"></div>
    </div>
  </article>`;
}

function homePage(lang) {
  const r = routes[lang];
  const copy = lang === "pt"
    ? "Natureza, aventura e hospitalidade amazônica autêntica."
    : "Nature, adventure and authentic Amazon hospitality.";
  const intro = lang === "pt"
    ? "Amazon Adventure Lodge é um retiro autêntico às margens do Lago do Maçarico, inspirado pela arquitetura tradicional das comunidades ribeirinhas da Amazônia e concebido para conectar hóspedes à floresta, à biodiversidade, à cultura e ao modo de vida local."
    : "Amazon Adventure Lodge is an authentic retreat on the shores of Lago do Maçarico, inspired by traditional Amazon riverside architecture and designed to connect guests with the forest, biodiversity, culture and local ways of life.";
  const body = `${hero({
    lang,
    eyebrow: lang === "pt" ? "LAGO DO MAÇARICO · AMAZONAS · BRASIL" : "LAGO DO MAÇARICO · AMAZONAS · BRAZIL",
    title: lang === "pt" ? "ENTRE NA\nAMAZÔNIA" : "DEEP INTO\nTHE AMAZON",
    copy,
    image: images.hero,
    primary: `<a class="btn" href="${r.experiences}">${labels[lang].explore}</a>`,
    secondary: `<a class="btn btn-ghost" href="${r.contact}">${labels[lang].plan}</a>`,
  })}
  <section class="intro-section">
    <div><h2 class="display split-animate">${lang === "pt" ? "Um retiro autêntico no coração da Amazônia." : "An authentic retreat in the heart of the Amazon."}</h2></div>
    <div><p class="lead split-animate">${escapeHtml(intro)}</p><dl class="fact-row"><div><dt>Lago</dt><dd>Maçarico</dd></div><div><dt>Base</dt><dd>Manaus</dd></div></dl></div>
  </section>
  <section class="stack-section">
    ${sectionHeader(lang === "pt" ? "Experiências" : "Experiences", lang === "pt" ? "PACOTES AMAZÔNICOS" : "AMAZON JOURNEYS", lang === "pt" ? "Cards editoriais para comparar duração, ritmo e foco." : "Editorial cards for comparing duration, pace and focus.")}
    <div class="stack-container">${experiences.map((exp, index) => experienceCard(exp, lang, index, true)).join("")}</div>
  </section>
  <section class="value-section">
    ${sectionHeader(lang === "pt" ? "Por que viajar conosco" : "Why travel with us", lang === "pt" ? "QUATRO PILARES" : "FOUR PILLARS")}
    <div class="pillar-grid">${pillars[lang].map(([title, text]) => `<article class="pillar reveal"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>
  </section>
  <section class="activity-section">
    <img src="${images.sunset.src}" alt="${escapeHtml(imageAlt(images.sunset, lang))}" loading="lazy">
    <div>${sectionHeader(lang === "pt" ? "Atividades" : "Activities", lang === "pt" ? "IMERSÃO EM RITMO NATURAL" : "IMMERSION AT A NATURAL PACE", lang === "pt" ? "A fauna e a floresta são observadas com respeito, sempre dependendo do clima, do nível da água e das condições do dia." : "Wildlife and forest encounters are approached respectfully, always depending on weather, water levels and the conditions of the day.")}
    <ul class="activity-cloud">${activities[lang].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
  </section>`;
  return layout({
    lang,
    route: r.home,
    title: `${siteConfig.name} | ${lang === "pt" ? "Pousada e experiências na Amazônia" : "Amazon Rainforest Lodge from Manaus"}`,
    description: lang === "pt" ? "Pousada amazônica no Lago do Maçarico com experiências de floresta, canoa, sobrevivência e pesca esportiva." : "Amazon rainforest lodge at Lago do Maçarico with jungle tours, canoe exploration, survival tours and sport fishing from Manaus.",
    body,
    jsonLd: baseJsonLd(lang, r.home),
  });
}

function lodgePage(lang) {
  const r = routes[lang];
  const journey = lang === "pt"
    ? ["Manaus", "Porto da Ceasa", "Encontro das Águas", "Região do Careiro", "Lago do Maçarico", "Amazon Adventure Lodge"]
    : ["Manaus", "Ceasa Port", "Meeting of the Waters", "Careiro area", "Lago do Maçarico", "Amazon Adventure Lodge"];
  const body = `${hero({
    lang,
    eyebrow: locationLabel(lang),
    title: lang === "pt" ? "A POUSADA\nNA FLORESTA" : "THE LODGE\nIN THE FOREST",
    copy: lang === "pt" ? "Arquitetura simples, hospitalidade regional e acesso direto à natureza." : "Simple architecture, regional hospitality and direct access to nature.",
    image: images.lodge,
    primary: `<a class="btn" href="${r.contact}">${labels[lang].check}</a>`,
    compact: true,
  })}
  <section class="split-section">
    ${sectionHeader(lang === "pt" ? "Amazon Adventure Lodge" : "Amazon Adventure Lodge", lang === "pt" ? "CONFORTO SEM OSTENTAÇÃO" : "COMFORT WITHOUT OSTENTATION")}
    <div class="split-copy">
      <p>${lang === "pt" ? "A pousada fica no Lago do Maçarico e usa uma linguagem inspirada nas comunidades ribeirinhas: madeira, passarelas, chalés privativos, refeições regionais e convivência próxima com a floresta." : "The lodge sits at Lago do Maçarico and follows a language inspired by riverside communities: timber, boardwalks, private chalets, regional meals and close contact with the forest."}</p>
      <p>${lang === "pt" ? "A chegada a partir de Manaus faz parte da experiência, conectando água, estrada, floresta e modos de vida locais sem inventar distâncias ou promessas artificiais." : "The journey from Manaus is part of the experience, connecting water, road, forest and local ways of life without invented distances or artificial promises."}</p>
    </div>
  </section>
  <section class="image-text-section">
    <img src="${images.room.src}" alt="${escapeHtml(imageAlt(images.room, lang))}" loading="lazy">
    <div><h2 class="display">${lang === "pt" ? "Chalés privativos e refeições regionais." : "Private chalets and regional meals."}</h2><p>${lang === "pt" ? "A proposta é oferecer uma base confortável para dias de trilhas, canoas, amanheceres, noites na floresta e descanso simples depois das atividades." : "The idea is to offer a comfortable base for days of trails, canoes, sunrise outings, forest nights and simple rest after activities."}</p></div>
  </section>
  <section class="journey-section">
    ${sectionHeader(lang === "pt" ? "Rota" : "Route", lang === "pt" ? "SUA JORNADA DESDE MANAUS" : "YOUR JOURNEY FROM MANAUS")}
    <ol class="journey-list">${journey.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
  </section>`;
  return layout({ lang, route: r.lodge, title: `${labels[lang].lodge} | ${siteConfig.name}`, description: lang === "pt" ? "Conheça o Amazon Adventure Lodge no Lago do Maçarico, com chalés privativos, refeições regionais e acesso desde Manaus." : "Discover Amazon Adventure Lodge at Lago do Maçarico, with private chalets, regional meals and access from Manaus.", body, image: images.lodge.src, jsonLd: breadcrumbJsonLd(lang, r.lodge, labels[lang].lodge) });
}

function experiencesPage(lang) {
  const r = routes[lang];
  const body = `${hero({
    lang,
    eyebrow: lang === "pt" ? "Pacotes" : "Packages",
    title: lang === "pt" ? "ESCOLHA\nSEU RITMO" : "CHOOSE\nYOUR PACE",
    copy: lang === "pt" ? "Da primeira noite na floresta a expedições, sobrevivência e pesca esportiva." : "From a first forest overnight to expeditions, survival and sport fishing.",
    image: images.canoe,
    primary: `<a class="btn" href="${r.contact}">${labels[lang].check}</a>`,
    compact: true,
  })}
  <section class="listing-section">
    ${sectionHeader(lang === "pt" ? "Experiências" : "Experiences", lang === "pt" ? "TODOS OS PACOTES" : "ALL PACKAGES", lang === "pt" ? "Filtros simples para comparar estadias curtas, imersão, sobrevivência e pesca." : "Simple filters for comparing short stays, jungle immersion, survival and fishing.")}
    <div class="filter-bar" role="list" aria-label="${lang === "pt" ? "Filtros de experiências" : "Experience filters"}">${labels[lang].categories.map(([label, value], index) => `<button type="button" class="filter-btn${index === 0 ? " is-active" : ""}" data-filter="${escapeHtml(value)}">${escapeHtml(label)}</button>`).join("")}</div>
    <div class="experience-grid">${experiences.map((exp, index) => experienceCard(exp, lang, index)).join("")}</div>
  </section>`;
  return layout({ lang, route: r.experiences, title: `${labels[lang].experiences} | ${siteConfig.name}`, description: lang === "pt" ? "Compare pacotes do Amazon Adventure Lodge: 2, 3, 4 e 5 dias, sobrevivência e pesca esportiva." : "Compare Amazon Adventure Lodge packages: 2, 3, 4 and 5 days, survival tours and sport fishing.", body, image: images.canoe.src, jsonLd: breadcrumbJsonLd(lang, r.experiences, labels[lang].experiences) });
}

function experiencePage(exp, lang) {
  const data = exp[lang];
  const r = routes[lang];
  const route = r.packages[exp.key];
  const duration = lang === "pt" ? exp.durationPt : exp.duration;
  const price = lang === "pt" ? exp.pricePt : exp.price;
  const l = labels[lang];
  const related = experiences.filter((item) => item.key !== exp.key).slice(0, 3);
  const body = `${hero({
    lang,
    eyebrow: `${duration} · ${price}`,
    title: data.shortTitle.toUpperCase(),
    copy: data.summary,
    image: exp.image,
    primary: `<a class="btn" href="${r.contact}">${l.check}</a>`,
    secondary: `<a class="btn btn-ghost" href="${r.experiences}">${l.experiences}</a>`,
    compact: true,
  })}
  <section class="detail-layout">
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${r.home}">${l.breadcrumbHome}</a><span>/</span><a href="${r.experiences}">${l.experiences}</a><span>/</span><span>${escapeHtml(data.shortTitle)}</span></nav>
    <aside class="price-panel reveal"><p>${l.duration}</p><strong>${escapeHtml(duration)}</strong><p>${l.price}</p><strong>${escapeHtml(price)}</strong><a class="btn" href="${r.contact}">${l.check}</a></aside>
    <article class="detail-main">
      <h1 class="display">${escapeHtml(data.title)}</h1>
      <p class="lead">${escapeHtml(data.summary)}</p>
      <h2>${l.highlights}</h2>
      <ul class="check-list">${data.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>${l.itinerary}</h2>
      <div class="timeline">${data.itinerary.map(([day, text]) => `<section><span>${escapeHtml(day)}</span><p>${escapeHtml(text)}</p></section>`).join("")}</div>
      <h2>${l.included}</h2>
      <ul class="check-list">${(lang === "pt" ? includedPt : included).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>${l.practical}</h2>
      <p>${escapeHtml(data.practical)}</p>
    </article>
  </section>
  <section class="mini-gallery">${[exp.image, images.lodge, images.sunset, images.wildlife].map((img) => `<button class="lightbox-trigger" type="button" data-full="${img.src}" aria-label="${escapeHtml(imageAlt(img, lang))}"><img src="${img.src}" alt="${escapeHtml(imageAlt(img, lang))}" loading="lazy"></button>`).join("")}</section>
  <section class="booking-cta"><h2 class="display">${lang === "pt" ? "Converse com a equipe antes de reservar." : "Talk with the team before booking."}</h2><p>${lang === "pt" ? "Sem checkout inventado: a disponibilidade é confirmada por WhatsApp ou e-mail." : "No invented checkout: availability is confirmed by WhatsApp or email."}</p><a class="btn" href="${r.contact}">${l.check}</a></section>
  <section class="related-section">${sectionHeader("", l.related)}<div class="related-grid">${related.map((item, index) => experienceCard(item, lang, index)).join("")}</div></section>`;
  return layout({ lang, route, title: `${data.title} | ${siteConfig.name}`, description: data.summary, body, image: exp.image.src, jsonLd: breadcrumbJsonLd(lang, route, data.title) });
}

function galleryTile(item, lang, route) {
  const label = lang === "pt" ? item.categoryPt : item.category;
  const coverAlt = imageAlt(item.image, lang);
  const galleryImages = item.images?.length ? item.images : [];
  const galleryData = galleryImages.length
    ? ` data-gallery="${escapeHtml(JSON.stringify(galleryImages.map((img) => ({ src: relativeUrl(route, img.src), alt: imageAlt(img, lang) }))))}"`
    : ` data-full="${item.image.src}"`;
  const ariaLabel = galleryImages.length
    ? lang === "pt"
      ? `Abrir galeria ${label} com ${galleryImages.length} imagens.`
      : `Open ${label} gallery with ${galleryImages.length} images.`
    : coverAlt;
  return `<button class="gallery-tile lightbox-trigger" type="button"${galleryData} aria-label="${escapeHtml(ariaLabel)}"><img src="${item.image.src}" alt="${escapeHtml(coverAlt)}" loading="lazy"><span>${escapeHtml(label)}</span></button>`;
}

function galleryPage(lang) {
  const r = routes[lang];
  const body = `${hero({
    lang,
    eyebrow: labels[lang].gallery,
    title: lang === "pt" ? "GALERIA\nEDITORIAL" : "EDITORIAL\nGALLERY",
    copy: lang === "pt" ? "Imagens provisórias geradas para o mockup, prontas para troca pelo pacote oficial do cliente." : "Temporary generated images for the mockup, ready to be replaced by the client's official photo package.",
    image: images.sunset,
    compact: true,
  })}
  <section class="gallery-section">
    ${sectionHeader(lang === "pt" ? "Categorias" : "Categories", lang === "pt" ? "POUSADA, CHALÉS, PASSEIOS, ALIMENTAÇÃO E AMAZÔNIA" : "LODGE, CHALETS, TOURS, FOOD AND AMAZON NATURE")}
    <div class="masonry-grid">${gallery.map((item) => galleryTile(item, lang, r.gallery)).join("")}</div>
  </section>`;
  return layout({ lang, route: r.gallery, title: `${labels[lang].gallery} | ${siteConfig.name}`, description: lang === "pt" ? "Galeria editorial provisória do Amazon Adventure Lodge com pousada, floresta, água, fauna e pesca." : "Temporary editorial gallery for Amazon Adventure Lodge with lodge, forest, water, wildlife and fishing.", body, image: images.sunset.src, jsonLd: breadcrumbJsonLd(lang, r.gallery, labels[lang].gallery) });
}

function contactPage(lang) {
  const r = routes[lang];
  const body = `${hero({
    lang,
    eyebrow: labels[lang].contact,
    title: lang === "pt" ? "PLANEJE\nSUA ESTADIA" : "PLAN\nYOUR STAY",
    copy: lang === "pt" ? "Fale com a equipe para consultar disponibilidade, detalhes e opções de moeda." : "Talk with the team to check availability, details and currency options.",
    image: images.lodge,
    primary: `<a class="btn" href="${whatsappUrl(lang)}">WhatsApp</a>`,
    secondary: `<a class="btn btn-ghost" href="mailto:${siteConfig.email}">${lang === "pt" ? "E-mail" : "Email"}</a>`,
    compact: true,
  })}
  <section class="contact-section">
    <div class="contact-info reveal">
      <h2 class="display">${labels[lang].check}</h2>
      <p>WhatsApp: <a href="${whatsappUrl(lang)}">${siteConfig.whatsappDisplay}</a></p>
      <p>${lang === "pt" ? "E-mail" : "Email"}: <a href="mailto:${siteConfig.email}">${siteConfig.email}</a></p>
      <p>${lang === "pt" ? "Suporte" : "Support"}: ${siteConfig.support}</p>
      <p>${lang === "pt" ? "Valores referenciais em BRL. Para outras moedas, consulte a equipe." : "Canonical prices are in BRL. For other currencies, contact the team."}</p>
    </div>
    <form class="contact-form" data-contact-form data-lang="${lang}" novalidate>
      <h2>${labels[lang].formTitle}</h2>
      ${field("name", lang === "pt" ? "Nome" : "Name", "text", true)}
      ${field("email", lang === "pt" ? "E-mail" : "Email", "email", true)}
      ${field("phone", lang === "pt" ? "WhatsApp / Telefone" : "WhatsApp / Phone", "tel", true)}
      ${field("country", lang === "pt" ? "País" : "Country", "text", false)}
      <label>${lang === "pt" ? "Experiência de interesse" : "Experience of interest"}<select name="experience">${experiences.map((exp) => `<option>${escapeHtml(exp[lang].title)}</option>`).join("")}</select></label>
      ${field("arrival", lang === "pt" ? "Data preferida de chegada" : "Preferred arrival date", "date", false)}
      ${field("guests", lang === "pt" ? "Número de hóspedes" : "Number of guests", "number", false, "1")}
      <label>${lang === "pt" ? "Mensagem" : "Message"}<textarea name="message" rows="5"></textarea></label>
      <p class="form-note">${lang === "pt" ? "Sem backend configurado: o formulário prepara uma mensagem segura para WhatsApp ou e-mail, sem simular confirmação." : "No backend is configured: this form prepares a safe WhatsApp or email message without simulating confirmation."}</p>
      <button class="btn" type="submit" data-submit-label="${labels[lang].submit}">${labels[lang].submit}</button>
      <output class="form-status" role="status"></output>
    </form>
  </section>`;
  return layout({ lang, route: r.contact, title: `${labels[lang].contact} | ${siteConfig.name}`, description: lang === "pt" ? "Contato do Amazon Adventure Lodge por WhatsApp ou e-mail para consultar disponibilidade." : "Contact Amazon Adventure Lodge by WhatsApp or email to check availability.", body, image: images.lodge.src, jsonLd: breadcrumbJsonLd(lang, r.contact, labels[lang].contact) });
}

function field(name, label, type, required, min = "") {
  return `<label>${escapeHtml(label)}<input ${attrs({ name, type, required, min })}></label>`;
}

function policyPage(lang) {
  const r = routes[lang];
  const body = `${hero({
    lang,
    eyebrow: labels[lang].policy,
    title: lang === "pt" ? "TERMOS\nDE RESERVA" : "BOOKING\nTERMS",
    copy: lang === "pt" ? "Políticas de reserva, pagamento, cancelamento, segurança e preservação." : "Reservation, payment, cancellation, safety and preservation policies.",
    image: images.trek,
    compact: true,
  })}
  <section class="policy-section">${policy[lang].map(([title, text]) => `<article class="policy-block reveal"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></article>`).join("")}</section>`;
  return layout({ lang, route: r.companyPolicy, title: `${labels[lang].policy} | ${siteConfig.name}`, description: lang === "pt" ? "Políticas de reserva, pagamento, cancelamento, proteção ambiental e segurança do Amazon Adventure Lodge." : "Amazon Adventure Lodge reservation, payment, cancellation, environmental protection and safety policies.", body, image: images.trek.src, jsonLd: breadcrumbJsonLd(lang, r.companyPolicy, labels[lang].policy) });
}

function baseJsonLd(lang, route) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: `${siteConfig.canonicalBase}${route}`,
      email: siteConfig.email,
      telephone: siteConfig.whatsappDisplay,
    },
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lago do Maçarico",
        addressRegion: "Amazonas",
        addressCountry: "BR",
      },
      email: siteConfig.email,
      telephone: siteConfig.whatsappDisplay,
      url: `${siteConfig.canonicalBase}${route}`,
    },
  ];
}

function breadcrumbJsonLd(lang, route, name) {
  const r = routes[lang];
  return [
    ...baseJsonLd(lang, route),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: labels[lang].breadcrumbHome, item: `${siteConfig.canonicalBase}${r.home}` },
        { "@type": "ListItem", position: 2, name, item: `${siteConfig.canonicalBase}${route}` },
      ],
    },
  ];
}

function redirectPage(from, to) {
  const lang = langOf(to);
  const title = lang === "pt" ? "Redirecionando" : "Redirecting";
  const copy = lang === "pt" ? "Redirecionando para" : "Redirecting to";
  return `<!DOCTYPE html><html lang="${labels[lang].lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${siteConfig.canonicalBase}${to}"><title>${title} | ${siteConfig.name}</title></head><body><p>${copy} <a href="${to}">${to}</a>.</p><script>location.replace(${JSON.stringify(to)});</script></body></html>`;
}

function sitemap() {
  const allRoutes = collectRoutes();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((route) => `  <url><loc>${siteConfig.canonicalBase}${route}</loc></url>`).join("\n")}
</urlset>`;
}

function robots() {
  return `User-agent: *
Allow: /
Sitemap: ${siteConfig.canonicalBase}/sitemap.xml
`;
}

function collectRoutes() {
  return [
    ...Object.values(routes.en).filter((value) => typeof value === "string"),
    ...Object.values(routes.en.packages),
    ...Object.values(routes.pt).filter((value) => typeof value === "string"),
    ...Object.values(routes.pt.packages),
  ];
}

function build() {
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });
  for (const dir of assetDirs) copyRecursive(path.join(root, dir), path.join(dist, dir));

  writePage(routes.en.home, homePage("en"));
  writePage(routes.pt.home, homePage("pt"));
  writePage(routes.en.lodge, lodgePage("en"));
  writePage(routes.pt.lodge, lodgePage("pt"));
  writePage(routes.en.experiences, experiencesPage("en"));
  writePage(routes.pt.experiences, experiencesPage("pt"));
  writePage(routes.en.gallery, galleryPage("en"));
  writePage(routes.pt.gallery, galleryPage("pt"));
  writePage(routes.en.contact, contactPage("en"));
  writePage(routes.pt.contact, contactPage("pt"));
  writePage(routes.en.companyPolicy, policyPage("en"));
  writePage(routes.pt.companyPolicy, policyPage("pt"));

  for (const exp of experiences) {
    writePage(routes.en.packages[exp.key], experiencePage(exp, "en"));
    writePage(routes.pt.packages[exp.key], experiencePage(exp, "pt"));
    for (const legacy of exp.legacyUrls) writePage(legacy, redirectPage(legacy, routes.en.packages[exp.key]));
  }
  const legacyRedirects = {
    "/photo-gallery/": routes.en.gallery,
    "/contact-us/": routes.en.contact,
    "/politica-da-empresa/": routes.pt.companyPolicy,
  };
  for (const [from, to] of Object.entries(legacyRedirects)) writePage(from, redirectPage(from, to));

  fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap());
  fs.writeFileSync(path.join(dist, "robots.txt"), robots());
  fs.writeFileSync(path.join(root, "IMAGE-PROMPTS.md"), `# Generated Image Prompts\n\n${imagePrompts.map(([file, prompt]) => `## ${file}\n\n${prompt}\n`).join("\n")}`);
  syncRootDeploy();
  syncPublicDeploy();
}

build();
