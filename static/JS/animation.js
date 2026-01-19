// ===================================
// ANIMATIONS.JS - Sistema Completo Animazioni
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. LOADING SCREEN
    // ===================================
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const percentage = document.getElementById('percentage');
    
    let progress = 0;
    const loadingDuration = 2500; // 2.5 secondi
    const interval = 50; // aggiorna ogni 50ms
    const increment = (100 / (loadingDuration / interval));
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Nascondi loading dopo 500ms
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Rimuovi dal DOM dopo l'animazione
                setTimeout(() => {
                    loadingScreen.remove();
                }, 800);
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        percentage.textContent = Math.floor(progress) + '%';
    }, interval);
    
    
    // ===================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ===================================
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.15, // Trigger quando il 15% dell'elemento è visibile
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Opzionale: smetti di osservare dopo l'animazione
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    
    // ===================================
    // 3. NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Aggiungi classe "scrolled" dopo 50px
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ===================================
    // 4. SMOOTH SCROLL PER NAV LINKS
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Solo per link interni (#)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // offset per navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Chiudi menu mobile se aperto
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    
    // ===================================
    // 5. SCROLL TO TOP BUTTON
    // ===================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // ===================================
    // 7. SERVICE CARDS HOVER EFFECT
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Aggiungi effetto glow
            card.style.boxShadow = '0 20px 60px rgba(255, 51, 51, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
    
    
    // ===================================
    // 8. PARALLAX SCROLL INDICATOR
    // ===================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    
    // ===================================
    // 9. COUNTER ANIMATION (se hai statistiche)
    // ===================================
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 secondi
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const observerCounter = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    
                    observerCounter.unobserve(counter);
                }
            });
        });
        
        observerCounter.observe(counter);
    });
    
    
    // ===================================
    // 10. HERO TYPEWRITER EFFECT (opzionale)
    // ===================================
    const typewriterText = document.querySelector('[data-typewriter]');
    
    if (typewriterText) {
        const text = typewriterText.getAttribute('data-typewriter');
        const speed = 50; // velocità in ms
        let i = 0;
        
        typewriterText.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Inizia dopo il loading
        setTimeout(() => {
            typeWriter();
        }, 3000);
    }
    
    
    // ===================================
    // PERFORMANCE: Reduce Motion per accessibilità
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disabilita animazioni per utenti che preferiscono meno movimento
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('animated');
        });
    }
    
});


// ===================================
// UTILITY: Debounce per performance
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}