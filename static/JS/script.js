// Typewriter effect
class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.speed = options.speed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;

            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
                return;
            }

            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;

            if (this.currentCharIndex === currentText.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseTime);
                return;
            }

            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const nome = form.querySelector('[name="nome"]').value;
        const email = form.querySelector('[name="email"]').value;
        const oggetto = form.querySelector('[name="oggetto"]').value;
        const messaggio = form.querySelector('[name="messaggio"]').value;

        // Create mailto URL
        const subject = encodeURIComponent(`${oggetto} - da ${nome}`);
        const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\nMessaggio:\n${messaggio}`);
        const mailtoURL = `mailto:lattanzio.luigi.business@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoURL;

        // Show success message
        const statusDiv = form.querySelector('.form-status');
        statusDiv.className = 'form-status success';
        statusDiv.textContent = 'Email client aperto! Completa l\'invio dal tuo client email.';
        statusDiv.style.display = 'block';

        // Reset form
        setTimeout(() => {
            form.reset();
            statusDiv.style.display = 'none';
        }, 5000);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
    // Initialize typewriter
    const typewriterElement = document.getElementById('text-content');
    const texts = [
        'Ciao, sono Luigi Lattanzio',
        'Web Developer',
        'Drone Pilot',
        'Video Editor'
    ];

    new Typewriter(typewriterElement, texts, {
        speed: 80,
        deleteSpeed: 50,
        pauseTime: 2500
    });

    // Initialize portfolio filter
    initPortfolioFilter();

    // Initialize contact form
    initContactForm();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});