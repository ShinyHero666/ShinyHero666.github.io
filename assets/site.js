document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const main = document.querySelector('main');
const openSourceSection = document.querySelector('#opensource');
const workSection = document.querySelector('#work');
const methodSection = document.querySelector('#method');

// Put public work first and keep the rendered, keyboard, and screen-reader order aligned.
if (main && openSourceSection && workSection) {
  main.insertBefore(openSourceSection, workSection);
}

const openSourceLink = nav?.querySelector('a[href="#opensource"]');
if (nav && openSourceLink) {
  nav.insertBefore(openSourceLink, nav.firstElementChild);
}

[
  [openSourceSection, '01'],
  [workSection, '02'],
  [methodSection, '03'],
].forEach(([section, number]) => {
  const numberNode = section?.querySelector('.section-number');
  if (numberNode) numberNode.textContent = number;
});

const navLabels = new Map([
  ['#opensource', '01'],
  ['#work', '02'],
  ['#method', '03'],
]);
nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
  const numberNode = link.querySelector('span');
  if (numberNode && navLabels.has(link.getAttribute('href'))) {
    numberNode.textContent = navLabels.get(link.getAttribute('href'));
  }
});

const heroCopy = document.querySelector('.hero-copy');
if (heroCopy) {
  const identity = document.createElement('p');
  identity.className = 'section-number';
  identity.textContent = '梁宸 / LIANG CHEN';
  heroCopy.insertBefore(identity, heroCopy.firstElementChild);
}

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
