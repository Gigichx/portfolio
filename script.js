// 1. Smooth scroll migliorato
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.offsetTop - 50;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  });
});

// 2. Scroll-triggered animation (fade-in)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Mobile menu toggle animato
const toggle = document.getElementById('mobileMenuToggle');
const menu = document.getElementById('navMenu');

toggle?.addEventListener('click', () => {
  menu.classList.toggle('active');
  toggle.classList.toggle('open');
});

// 4. Scroll to Top animato
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTop';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #111;
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 18px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  scrollBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
});

// 5. Form handler con UX feedback
const form = document.querySelector('.contact-form');

form?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('✅ Richiesta inviata con successo! Ti risponderò entro 24h.');
  form.reset();
});
