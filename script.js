// Performance Optimierung mit requestAnimationFrame
let lastKnownScrollPosition = 0;
let ticking = false;

// Debounce Funktion für Performance
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

// Mobile Menu wird im inline JavaScript der index.html gehandelt
// Entfernt um Konflikte zu vermeiden

// Smooth Scroll mit verbesserter Performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Mobile Menü schließen
            const navLinksEl = document.querySelector('.nav-links');
            const mobileMenuEl = document.getElementById('mobile-menu');
            if (navLinksEl) navLinksEl.classList.remove('active');
            if (mobileMenuEl) {
                mobileMenuEl.classList.remove('active');
                mobileMenuEl.setAttribute('aria-expanded', 'false');
                mobileMenuEl.setAttribute('aria-label', 'Menü öffnen');
            }
            document.body.style.overflow = '';
        }
    });
});

// Optimierte Scroll Animation mit IntersectionObserver
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Einmal animieren reicht
        }
    });
};

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Alle zu animierenden Elemente beobachten
document.querySelectorAll('.service-card, .gallery-item, .about-content').forEach(el => {
    if (el && !el.classList.contains('animate')) {
        el.style.opacity = '0';
        observer.observe(el);
    }
});

// Optimierte Sticky Navigation
const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (currentScroll <= 0) {
                    navbar.classList.remove('scroll-up');
                    navbar.classList.remove('scroll-down');
                } else if (currentScroll > lastKnownScrollPosition) {
                    navbar.classList.remove('scroll-up');
                    navbar.classList.add('scroll-down');
                } else {
                    navbar.classList.remove('scroll-down');
                    navbar.classList.add('scroll-up');
                }
            }
            lastKnownScrollPosition = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
};

// Event Listener mit Debounce für bessere Performance
window.addEventListener('scroll', debounce(handleScroll, 10));

// Lazy Loading für Bilder mit moderne Browser-Support
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback für ältere Browser
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Preload wichtiger Bilder
const preloadImages = () => {
    const images = ['hero-bg.png', 'logo.png'];
    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
};

preloadImages();

// Kontaktformular Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hier später Backend-Integration einbauen
        alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
        contactForm.reset();
    });
} 