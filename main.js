const nav = document.getElementById('nav');
const toggle = nav.querySelector('.nav-toggle');
const links = nav.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});

links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
});

document.getElementById('year').textContent = new Date().getFullYear();
