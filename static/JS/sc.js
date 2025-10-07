// ===================================
// Utility Functions
// ===================================

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');

const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', throttle(handleNavbarScroll, 100));

// ===================================
// Active Navigation Link on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const updateActiveNavLink = () => {
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
};

window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// ===================================
// Smooth Scroll for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
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
// Animated Counters
// ===================================

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const observeCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
};

// ===================================
// Skill Bars Animation
// ===================================

const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.setProperty('--progress-width', `${progress}%`);
                entry.target.style.width = `${progress}%`;
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
};

// ===================================
// Portfolio Filters
// ===================================

const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            portfolioFilters.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// Scroll Reveal Animation
// ===================================

const revealElements = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
};

// ===================================
// Scroll to Top Button
// ===================================

const scrollToTopBtn = document.getElementById('scrollToTop');

const handleScrollToTop = () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
};

window.addEventListener('scroll', throttle(handleScrollToTop, 100));

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Contact Form Validation & Submission
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    const validatePhone = (phone) => {
        const re = /^[\d\s\+\-\(\)]+$/;
        return phone === '' || re.test(phone);
    };
    
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group') || input.closest('.checkbox-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.style.borderColor = 'var(--error-color)';
        if (errorElement) {
            errorElement.textContent = message;
        }
    };
    
    const clearError = (input) => {
        const formGroup = input.closest('.form-group') || input.closest('.checkbox-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.style.borderColor = '';
        if (errorElement) {
            errorElement.textContent = '';
        }
    };
    
    const validateForm = () => {
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Il nome è obbligatorio');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'L\'email è obbligatoria');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Inserisci un\'email valida');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Phone validation (optional but must be valid if provided)
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Inserisci un numero di telefono valido');
            isValid = false;
        } else {
            clearError(phoneInput);
        }
        
        // Service validation
        const serviceInput = document.getElementById('service');
        if (serviceInput.value === '') {
            showError(serviceInput, 'Seleziona un servizio');
            isValid = false;
        } else {
            clearError(serviceInput);
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Il messaggio è obbligatorio');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Il messaggio deve contenere almeno 10 caratteri');
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        // Privacy checkbox validation
        const privacyInput = document.getElementById('privacy');
        if (!privacyInput.checked) {
            showError(privacyInput, 'Devi accettare la privacy policy');
            isValid = false;
        } else {
            clearError(privacyInput);
        }
        
        return isValid;
    };
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '' || input.type === 'checkbox') {
                validateForm();
            }
        });
        
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Compila correttamente tutti i campi obbligatori', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Invio in corso...';
        submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        
        // Simulate form submission (replace with actual API call)
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would normally send the form data to your backend
            // const formData = new FormData(contactForm);
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     body: formData
            // });
            
            // Success
            showNotification('Messaggio inviato con successo! Ti risponderemo presto.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Error
            showNotification('Si è verificato un errore. Riprova più tardi.', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }
    });
}

// ===================================
// Newsletter Form
// ===================================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email === '') {
            showNotification('Inserisci un\'email valida', 'error');
            return;
        }
        
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            showNotification('Inserisci un\'email valida', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Iscrizione completata! Grazie per esserti iscritto.', 'success');
            newsletterForm.reset();
        } catch (error) {
            showNotification('Si è verificato un errore. Riprova più tardi.', 'error');
        }
    });
}

// ===================================
// Notification System
// ===================================

const showNotification = (message, type = 'success') => {
    const notification = document.getElementById('notification');
    const notificationMessage = notification.querySelector('.notification-message');
    const notificationIcon = notification.querySelector('i');
    
    // Set message
    notificationMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        notificationIcon.className = 'fas fa-check-circle';
        notification.style.borderColor = 'var(--success-color)';
        notificationIcon.style.color = 'var(--success-color)';
    } else if (type === 'error') {
        notificationIcon.className = 'fas fa-exclamation-circle';
        notification.style.borderColor = 'var(--error-color)';
        notificationIcon.style.color = 'var(--error-color)';
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
};

// ===================================
// Lazy Loading Images
// ===================================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ===================================
// Cursor Trail Effect (Optional)
// ===================================

const createCursorTrail = () => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.background = `rgba(37, 99, 235, ${1 - i / trailLength})`;
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.transition = 'all 0.1s ease';
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrail = () => {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.transform = `scale(${1 - index / trailLength})`;
            
            const nextDot = trail[index + 1] || trail[0];
            x += (parseInt(nextDot.style.left) - x) * 0.3;
            y += (parseInt(nextDot.style.top) - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

// ===================================
// Portfolio Item Click Handler
// ===================================

const portfolioLinks = document.querySelectorAll('.portfolio-link');

portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you can add lightbox functionality or redirect to project page
        showNotification('Funzionalità in arrivo! Aggiungi qui il tuo lightbox o link al progetto.', 'success');
    });
});

// ===================================
// Prevent Form Resubmission on Refresh
// ===================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// Initialize All Functions
// ===================================

const init = () => {
    // Initialize animations and observers
    observeCounters();
    animateSkillBars();
    revealElements();
    lazyLoadImages();
    
    // Optional: Uncomment to enable cursor trail
    // createCursorTrail();
    
    // Log initialization
    console.log('%c🚁 Portfolio Drone Pro Initialized! ', 'background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
    console.log('%cDeveloped with ❤️ for professional drone photography', 'color: #94a3b8; font-size: 12px;');
};

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===================================
// Performance Monitoring (Optional)
// ===================================

window.addEventListener('load', () => {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #10b981; font-weight: bold;');
    
    // Check for slow loading images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            console.warn('Slow loading image detected:', img.src);
        }
    });
});

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered:', registration))
    //         .catch(error => console.log('SW registration failed:', error));
    // });
}

// ===================================
// Accessibility Enhancements
// ===================================

// Skip to main content
const createSkipLink = () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Salta al contenuto principale';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
};

createSkipLink();

// Keyboard navigation for portfolio filters
portfolioFilters.forEach((filter, index) => {
    filter.setAttribute('tabindex', '0');
    filter.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            filter.click();
        }
    });
});

// ===================================
// Dark Mode Toggle (Optional Enhancement)
// ===================================

// Uncomment to add dark mode toggle functionality
/*
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: var(--transition-normal);
    `;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = toggle.querySelector('i');
        icon.className = document.body.classList.contains('light-mode') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    });
    
    document.body.appendChild(toggle);
};

// createDarkModeToggle();
*/

// ===================================
// Analytics Event Tracking (Optional)
// ===================================

const trackEvent = (category, action, label) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Console log for development
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
};

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.querySelector('span')?.textContent || 'Button';
        trackEvent('Button', 'Click', btnText);
    });
});

// Track portfolio filter usage
portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.getAttribute('data-filter');
        trackEvent('Portfolio', 'Filter', filterValue);
    });
});

// Track form submission
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        trackEvent('Form', 'Submit', 'Contact Form');
    });
}

// ===================================
// Error Handling
// ===================================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You can send errors to your logging service here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You can send errors to your logging service here
});

// ===================================
// Export functions for testing (Optional)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        showNotification,
        trackEvent
    };
}