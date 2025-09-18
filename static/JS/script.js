// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initNavbar();
    initTypingEffect();
    initPortfolioFilters();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Handle navbar background on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    // L'animazione è gestita interamente dal CSS
    console.log('Typewriter animation running via CSS');
}

// ===== TYPING SOUND EFFECT (Simulato) =====
function addTypingSoundEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    // Crea un observer per monitorare i cambiamenti del testo
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                // Simula il suono del typing con un piccolo effetto visivo
                typingText.style.textShadow = '0 0 5px rgba(229, 62, 62, 0.5)';
                setTimeout(() => {
                    typingText.style.textShadow = 'none';
                }, 100);
            }
        });
    });

    observer.observe(typingText, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// ===== PORTFOLIO FILTERS =====
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .portfolio-card, .contact-item, .skill-item'
    );

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');

        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(45deg)`;
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formInputs = this.querySelectorAll('input, textarea');
            const submitBtn = this.querySelector('button[type="submit"]');

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Messaggio inviato con successo!', 'success');

                // Reset form
                this.reset();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Add animation to form inputs
                formInputs.forEach((input, index) => {
                    setTimeout(() => {
                        input.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            input.style.transform = 'scale(1)';
                        }, 100);
                    }, index * 50);
                });

            }, 2000);
        });

        // Add focus effects to form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function () {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== PORTFOLIO MODAL (Optional Enhancement) =====
function initPortfolioModal() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('click', function () {
            // You can add modal functionality here
            console.log('Portfolio item clicked');
        });
    });
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Add resize handler with debounce
window.addEventListener('resize', debounce(function () {
    // Handle responsive adjustments
    updateActiveNavLink();
}, 250));

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease';

        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
            showNotification('🎉 Codice Konami attivato! Code. Fly. Create. 🚁', 'success');
        }, 2000);

        konamiCode = [];
    }
});

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}

// Initialize performance monitoring in development
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    initPerformanceMonitoring();
}