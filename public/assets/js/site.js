(function () {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (toggle && menu && header) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
        header.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      }
    });
  }

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.toggle("is-active", item === button));
      document.querySelectorAll(".experience-card").forEach((card) => {
        card.hidden = filter !== "All" && card.dataset.category !== filter;
      });
    });
  });

  let lightbox = document.querySelector(".lightbox");
  if (!lightbox) {
    const isPt = document.documentElement.lang.toLowerCase().startsWith("pt");
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML = `<button type="button" aria-label="${isPt ? "Fechar imagem da galeria" : "Close gallery image"}">X</button><img alt="">`;
    document.body.appendChild(lightbox);
  }
  const lightboxImage = lightbox.querySelector("img");
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("menu-open");
  };
  lightbox.querySelector("button").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
  document.querySelectorAll(".lightbox-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = button.getAttribute("aria-label") || "";
      lightbox.hidden = false;
      document.body.classList.add("menu-open");
      lightbox.querySelector("button").focus();
    });
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const isPt = form.dataset.lang === "pt" || document.documentElement.lang.toLowerCase().startsWith("pt");
    const status = form.querySelector(".form-status");
    const submit = form.querySelector("button[type='submit']");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "";
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = isPt ? "Preencha os campos obrigatórios." : "Please complete the required fields.";
        return;
      }
      submit.disabled = true;
      submit.textContent = isPt ? "Preparando..." : "Preparing...";
      const data = new FormData(form);
      const lines = isPt
        ? [
            "Olá! Gostaria de saber mais sobre uma estadia no Amazon Adventure Lodge.",
            `Nome: ${data.get("name")}`,
            `E-mail: ${data.get("email")}`,
            `Telefone: ${data.get("phone")}`,
            `País: ${data.get("country") || "-"}`,
            `Experiência: ${data.get("experience") || "-"}`,
            `Chegada: ${data.get("arrival") || "-"}`,
            `Hóspedes: ${data.get("guests") || "-"}`,
            `Mensagem: ${data.get("message") || "-"}`,
          ]
        : [
            "Hello! I would like to know more about staying at Amazon Adventure Lodge.",
            `Name: ${data.get("name")}`,
            `Email: ${data.get("email")}`,
            `Phone: ${data.get("phone")}`,
            `Country: ${data.get("country") || "-"}`,
            `Experience: ${data.get("experience") || "-"}`,
            `Arrival: ${data.get("arrival") || "-"}`,
            `Guests: ${data.get("guests") || "-"}`,
            `Message: ${data.get("message") || "-"}`,
          ];
      const url = `https://wa.me/559284378024?text=${encodeURIComponent(lines.join("\n"))}`;
      status.textContent = isPt
        ? "Abrindo o WhatsApp com sua mensagem. Se não abrir, envie um e-mail para info@amazonadventurelodge.com."
        : "Opening WhatsApp with your message. If it does not open, email info@amazonadventurelodge.com.";
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => {
        submit.disabled = false;
        submit.textContent = submit.dataset.submitLabel || "Prepare WhatsApp message";
      }, 800);
    });
  });
})();
