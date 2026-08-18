(function () {
  if (!window.gsap || !window.ScrollTrigger || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll(".hero-text span").forEach((el) => {
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  function splitTextToWords(element) {
    if (element.dataset.splitReady) return;
    const words = element.textContent.trim().split(/\s+/);
    element.textContent = "";
    words.forEach((word, index) => {
      const wrap = document.createElement("span");
      wrap.className = "word-wrap";
      const inner = document.createElement("span");
      inner.className = "word-inner";
      inner.textContent = word;
      wrap.appendChild(inner);
      element.appendChild(wrap);
      if (index < words.length - 1) element.appendChild(document.createTextNode(" "));
    });
    element.dataset.splitReady = "true";
  }

  document.querySelectorAll(".split-animate").forEach(splitTextToWords);
  gsap.set(".split-animate .word-inner", { yPercent: 112 });

  gsap.set(".hero-text span", { yPercent: 110 });
  gsap.to(".hero-text span", {
    yPercent: 0,
    duration: 1.35,
    stagger: 0.12,
    ease: "power4.out",
  });
  gsap.fromTo(".hero-fade", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.45, stagger: 0.08 });

  gsap.utils.toArray(".hero-img").forEach((img) => {
    gsap.to(img, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: img.closest(".hero"),
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  document.querySelectorAll(".split-animate").forEach((el) => {
    gsap.to(el.querySelectorAll(".word-inner"), {
      yPercent: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.018,
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
      },
    });
  });

  const cards = gsap.utils.toArray(".card-item");
  cards.forEach((card, index) => {
    const next = cards[index + 1];
    if (!next) return;
    gsap.to(card.querySelector(".card-inner"), {
      scale: 0.94,
      opacity: 0.55,
      ease: "none",
      scrollTrigger: {
        trigger: next,
        start: "top bottom",
        end: "top 16%",
        scrub: true,
      },
    });
  });
})();
