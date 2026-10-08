(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const closeMenu = () => { if (!toggle || !links) return; toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); };
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); links?.classList.toggle('is-open', !open); });
  navItems.forEach((link) => link.addEventListener('click', closeMenu));
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
  if ('IntersectionObserver' in window) {
    const sections = navItems.map((link) => document.querySelector(link.hash)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (!visible) return; navItems.forEach((link) => link.classList.toggle('active', link.hash === `#${visible.target.id}`)); }, { rootMargin: '-25% 0px -60%', threshold: [0, .2, .6] });
    sections.forEach((section) => observer.observe(section));
  }
})();
