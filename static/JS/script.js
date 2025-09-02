// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.innerText);
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            counter.innerText = target;
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Generate floating particles
function createParticles() {
    const container = document.querySelector('.animated-bg');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const service = formData.get('service');
    const budget = formData.get('budget');
    const message = formData.get('message');

    // Create email content
    const subject = encodeURIComponent(`Nuova Richiesta Progetto: ${service || 'Servizio non specificato'}`);
    const emailBody = encodeURIComponent(`
Nuova richiesta di progetto da ${firstName} ${lastName}

DETTAGLI CONTATTO:
Nome: ${firstName} ${lastName}
Email: ${email}
Servizio richiesto: ${service || 'Non specificato'}
Budget: ${budget || 'Non specificato'}

MESSAGGIO:
${message}

---
Questa email è stata generata automaticamente dal portfolio di Luigi Lattanzio.
            `);

    const mailtoLink = `mailto:lattanzio.luigi.business@gmail.com?subject=${subject}&body=${emailBody}`;

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Invio in corso...';
    submitBtn.disabled = true;

    // Simulate processing time
    setTimeout(() => {
        window.location.href = mailtoLink;

        // Reset button after a moment
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Messaggio Preparato!';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1000);

        // Show success message
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success mt-3';
        successAlert.innerHTML = `
                    <i class="bi bi-check-circle me-2"></i>
                    Il tuo client email si aprirà con il messaggio pre-compilato. 
                    Se non si apre automaticamente, contattami direttamente a: 
                    <strong>lattanzio.luigi.business@gmail.com</strong>
                `;
        this.appendChild(successAlert);

        // Remove success message after 10 seconds
        setTimeout(() => {
            successAlert.remove();
        }, 10000);

    }, 1500);
});

// Initialize particles on load
window.addEventListener('load', createParticles);

// Portfolio items interaction
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.02) translateY(-5px)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
    });
});