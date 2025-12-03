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
// SERVICES TABS
// ===================================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
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