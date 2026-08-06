document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const setNavState = (open) => {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  toggle.setAttribute('title', open ? '关闭导航' : '打开导航');
  toggle.querySelector('.sr-only').textContent = open ? '关闭导航' : '打开导航';
  nav.classList.toggle('is-open', open);
};

toggle?.addEventListener('click', () => {
  setNavState(toggle.getAttribute('aria-expanded') !== 'true');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNavState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setNavState(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) setNavState(false);
}, { passive: true });

const revealNodes = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealNodes.forEach((node) => revealObserver.observe(node));
}
