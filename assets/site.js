document.documentElement.classList.add('js');
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
const setNavState = open => {
 if (!toggle || !nav) return;
 toggle.setAttribute('aria-expanded', String(open));
 toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
 const label = toggle.querySelector('.sr-only');
 if (label) label.textContent = open ? '关闭导航' : '打开导航';
 nav.classList.toggle('is-open', open);
};
toggle?.addEventListener('click', () => setNavState(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavState(false)));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { setNavState(false); toggle.focus(); }
});
document.addEventListener('click', event => {
 if (toggle?.getAttribute('aria-expanded') === 'true' && !header?.contains(event.target)) setNavState(false);
});
window.addEventListener('resize', () => { if (window.innerWidth > 760) setNavState(false); }, { passive: true });
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
