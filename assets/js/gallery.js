document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const section = gallery.closest(".showcase-section");
    const slides = Array.from(gallery.querySelectorAll("[data-slide]"));
    const previous = section?.querySelector(".gallery-prev");
    const next = section?.querySelector(".gallery-next");
    const dotsContainer = section?.querySelector(".gallery-dots");
    const currentLabel = section?.querySelector("[data-gallery-current]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeIndex = 0;
    let scrollFrame = 0;

    if (!slides.length || !dotsContainer) return;

    const dots = slides.map((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", `Show screenshot ${index + 1}`);
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer.appendChild(dot);
      return dot;
    });

    function updateState(index) {
      activeIndex = index;
      dots.forEach((dot, dotIndex) => dot.setAttribute("aria-current", dotIndex === index ? "true" : "false"));
      if (currentLabel) currentLabel.textContent = String(index + 1);
    }

    function showSlide(index) {
      const normalized = (index + slides.length) % slides.length;
      slides[normalized].scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });
      updateState(normalized);
    }

    function findCenteredSlide() {
      const galleryBox = gallery.getBoundingClientRect();
      const center = galleryBox.left + galleryBox.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      slides.forEach((slide, index) => {
        const box = slide.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      updateState(closestIndex);
    }

    previous?.addEventListener("click", () => showSlide(activeIndex - 1));
    next?.addEventListener("click", () => showSlide(activeIndex + 1));
    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); showSlide(activeIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showSlide(activeIndex + 1); }
      if (event.key === "Home") { event.preventDefault(); showSlide(0); }
      if (event.key === "End") { event.preventDefault(); showSlide(slides.length - 1); }
    });
    gallery.addEventListener("scroll", () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(findCenteredSlide);
    }, { passive: true });

    updateState(0);
  });
});
