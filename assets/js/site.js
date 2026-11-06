(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const navItems = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  document.documentElement.classList.add('menu-ready');
  const closeMenu = () => {
    if (!toggle || !links) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.sr-only').textContent = 'Open navigation';
    links.classList.remove('is-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
    links?.classList.toggle('is-open', open);
  });
  navItems.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu(); toggle.focus();
    }
  });
  document.addEventListener('click', event => { if (!header?.contains(event.target)) closeMenu(); });
  const updateActive = () => {
    const offset = (header?.offsetHeight || 76) + 30;
    const passed = navItems.map(link => ({ link, top: document.querySelector(link.hash)?.getBoundingClientRect().top }))
      .filter(item => item.top <= offset).sort((a, b) => b.top - a.top);
    const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const current = atBottom ? navItems.find(link => link.hash === '#contact') : passed[0]?.link || navItems[0];
    navItems.forEach(link => {
      link.classList.toggle('active', link === current);
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  updateActive();
  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);
})();
