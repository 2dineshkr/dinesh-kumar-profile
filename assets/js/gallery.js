document.addEventListener("DOMContentLoaded", () => {
  const AUTOPLAY_DELAY = 2400;
  const INTERACTION_RESUME_DELAY = 3500;

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const section = gallery.closest(".showcase-section");
    const slides = Array.from(gallery.querySelectorAll("[data-slide]"));
    const previous = section?.querySelector(".gallery-prev");
    const next = section?.querySelector(".gallery-next");
    const dotsContainer = section?.querySelector(".gallery-dots");
    const currentLabel = section?.querySelector("[data-gallery-current]");
    const totalLabel = section?.querySelector("[data-gallery-total]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeIndex = 0;
    let scrollFrame = 0;
    let autoplayTimer = 0;
    let resumeTimer = 0;
    let hasFocus = false;
    let isPointerDown = false;

    if (!slides.length || !dotsContainer) return;
    if (totalLabel) totalLabel.textContent = String(slides.length);

    const dots = slides.map((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", `Show screenshot ${index + 1}`);
      dot.addEventListener("click", () => showSlideFromInteraction(index));
      dotsContainer.appendChild(dot);
      return dot;
    });

    function stopAutoplay() {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    }

    function canAutoplay() {
      return !reduceMotion && !document.hidden && !hasFocus && !isPointerDown;
    }

    function startAutoplay() {
      stopAutoplay();
      if (!canAutoplay()) return;
      autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), AUTOPLAY_DELAY);
    }

    function scheduleAutoplay() {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(startAutoplay, INTERACTION_RESUME_DELAY);
    }

    function updateState(index) {
      activeIndex = index;
      dots.forEach((dot, dotIndex) => dot.setAttribute("aria-current", dotIndex === index ? "true" : "false"));
      slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === index));
      if (currentLabel) currentLabel.textContent = String(index + 1);
    }

    function showSlide(index) {
      const normalized = (index + slides.length) % slides.length;
      const slide = slides[normalized];
      const targetLeft = slide.offsetLeft - (gallery.clientWidth - slide.offsetWidth) / 2;
      gallery.scrollTo({
        left: targetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      updateState(normalized);
    }

    function showSlideFromInteraction(index) {
      stopAutoplay();
      showSlide(index);
      scheduleAutoplay();
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

    previous?.addEventListener("click", () => showSlideFromInteraction(activeIndex - 1));
    next?.addEventListener("click", () => showSlideFromInteraction(activeIndex + 1));
    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); showSlideFromInteraction(activeIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showSlideFromInteraction(activeIndex + 1); }
      if (event.key === "Home") { event.preventDefault(); showSlideFromInteraction(0); }
      if (event.key === "End") { event.preventDefault(); showSlideFromInteraction(slides.length - 1); }
    });
    gallery.addEventListener("scroll", () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(findCenteredSlide);
    }, { passive: true });

    section?.addEventListener("focusin", () => { hasFocus = true; stopAutoplay(); });
    section?.addEventListener("focusout", () => {
      window.setTimeout(() => {
        hasFocus = section.contains(document.activeElement);
        if (!hasFocus) startAutoplay();
      }, 0);
    });
    gallery.addEventListener("pointerdown", () => { isPointerDown = true; stopAutoplay(); }, { passive: true });
    gallery.addEventListener("pointerup", () => { isPointerDown = false; scheduleAutoplay(); }, { passive: true });
    gallery.addEventListener("pointercancel", () => { isPointerDown = false; scheduleAutoplay(); }, { passive: true });
    gallery.addEventListener("wheel", () => { stopAutoplay(); scheduleAutoplay(); }, { passive: true });
    document.addEventListener("visibilitychange", () => document.hidden ? stopAutoplay() : startAutoplay());

    findCenteredSlide();
    startAutoplay();
  });
});
