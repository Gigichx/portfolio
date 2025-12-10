// ===================================
// LOADING SCREEN
// ===================================

const loadingMessages = [
    "Preparando esperienze uniche",
    "Caricamento soluzioni digitali innovative",
    "Un momento, stiamo per decollare",
    "Creando il tuo prossimo progetto di successo",
    "Ottimizzando ogni dettaglio"
];

let currentMessageIndex = 0;
let progress = 0;

function initLoadingScreen() {
    const progressBar = document.getElementById('progressBar');
    const percentage = document.getElementById('percentage');
    const loadingText = document.getElementById('loadingText');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return;
    
    function animateText(text) {
        if (!loadingText) return;
        loadingText.innerHTML = '';
        const chars = text.split('');
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.03}s`;
            loadingText.appendChild(span);
        });
    }
    
    function changeMessage() {
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
        animateText(loadingMessages[currentMessageIndex]);
    }
    
    function updateProgress() {
        if (progress < 100) {
            const increment = Math.random() * 15 + 5;
            progress = Math.min(progress + increment, 100);
            
            if (progressBar) progressBar.style.width = progress + '%';
            if (percentage) percentage.textContent = Math.floor(progress) + '%';
            
            if (progress > 30 && currentMessageIndex === 0) {
                changeMessage();
            } else if (progress > 60 && currentMessageIndex === 1) {
                changeMessage();
            } else if (progress > 85 && currentMessageIndex === 2) {
                changeMessage();
            }
            
            setTimeout(updateProgress, Math.random() * 300 + 200);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 800);
            }, 500);
        }
    }
    
    function createParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;
        
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + 'vh';
            container.appendChild(particle);
        }
    }
    
    createParticles();
    animateText(loadingMessages[0]);
    setTimeout(updateProgress, 500);
    
    // Fallback safety
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 800);
        }
    }, 8000);
}

// ===================================
// MOBILE MENU
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});



// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollToTopBtn = document.getElementById('scrollToTop');

function handleScrollToTop() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleScrollToTop);

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// CONTACT FORM
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Disable button
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Invio in corso...';
        submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            alert('✅ Messaggio inviato con successo! Ti risponderò presto.');
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }, 2000);
    });
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
    initLoadingScreen();
}

console.log('🚀 GigiCHX Portfolio caricato con successo!');

// ===================================
// SERVICES CAROUSEL AUTO-PLAY
// ===================================

const carousel = document.getElementById('servicesCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

if (carousel && prevBtn && nextBtn && dotsContainer) {
    const cards = carousel.querySelectorAll('.service-card');
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 4000; // 4 secondi

    // Crea i dots (esclude gli ultimi 2 service card)
    function createDots() {
        cards.forEach((_, index) => {
            if (index >= cards.length - 2) return;
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Aggiorna dots attivi
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Vai a uno slide specifico
    function goToSlide(index) {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth;
        const gap = 30;
        const scrollPosition = (cardWidth + gap) * currentIndex;
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateDots();
        resetAutoPlay();
    }

    // Slide successivo
    function nextSlide() {
        const visibleCards = cards.length - 2;
        currentIndex = (currentIndex + 1) % visibleCards;
        goToSlide(currentIndex);
    }

    // Slide precedente
    function prevSlide() {
        const visibleCards = cards.length - 2;
        currentIndex = (currentIndex - 1 + visibleCards) % visibleCards;
        goToSlide(currentIndex);
    }

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Ferma auto-play quando utente interagisce
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('touchstart', stopAutoPlay);

    // Inizializza
    createDots();
    startAutoPlay();

    // Gestisci resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            goToSlide(currentIndex);
        }, 250);
    });
}