// Navbar scroll — esconde ao rolar para baixo, aparece ao rolar para cima
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // No topo da página: sempre mostra a navbar
  if (currentScrollY <= 60) {
    navbar.classList.remove('navbar-hidden');
    navbar.classList.remove('scrolled');
    return;
  }

  // Rolando para baixo: esconde
  if (currentScrollY > lastScrollY) {
    navbar.classList.add('navbar-hidden');
  } else {
    // Rolando para cima: mostra com fundo escuro
    navbar.classList.remove('navbar-hidden');
    navbar.classList.add('scrolled');
  }

  lastScrollY = currentScrollY;
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
hamburger?.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Animated counters
function animateCounter(el, target, suffix='') {
  let start = 0;
  const duration = 2200;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix || '');
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-num').forEach(el => counterObserver.observe(el));

// Video modal
const playBtn = document.getElementById('play-btn');
const videoModal = document.getElementById('video-modal');
const modalClose = document.getElementById('modal-close');
const videoFrame = document.getElementById('video-frame');
const WA = 'https://api.whatsapp.com/send?phone=5521973184161&text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Dra.%20Fernanda%20Costa.';
playBtn?.addEventListener('click', () => {
  videoModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});
modalClose?.addEventListener('click', closeModal);
videoModal?.addEventListener('click', e => { if(e.target === videoModal) closeModal(); });
function closeModal() {
  videoModal.style.display = 'none';
  document.body.style.overflow = '';
  if(videoFrame) videoFrame.src = videoFrame.src;
}

// WhatsApp links
document.querySelectorAll('.wa-link').forEach(el => {
  el.href = WA;
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Parallax hero
const heroRight = document.querySelector('.hero-right');
window.addEventListener('scroll', () => {
  if (heroRight && window.innerWidth > 1024) {
    heroRight.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }
});

// Formulário de contato para WhatsApp
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nome = contactForm.querySelector('input[name="nome"]').value;
  const email = contactForm.querySelector('input[name="email"]').value;
  const telefone = contactForm.querySelector('input[name="telefone"]').value;
  const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value;
  
  const textoWhatsApp = `Olá, Dra. Fernanda Costa. Gostaria de solicitar uma avaliação:\n\n` +
    `• *Nome:* ${nome}\n` +
    `• *E-mail:* ${email}\n` +
    `• *Telefone:* ${telefone}\n` +
    `• *Caso/Mensagem:* ${mensagem}`;
  
  const url = `https://api.whatsapp.com/send?phone=5521973184161&text=${encodeURIComponent(textoWhatsApp)}`;
  
  window.open(url, '_blank');
});
