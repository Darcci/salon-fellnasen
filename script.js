// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100,
    delay: 0,
});

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

// Mobile Menu Toggle with Advanced Animations
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuContainer = document.getElementById('mobile-menu-container');
const menuIcon = document.getElementById('menu-icon');
const menuItems = document.querySelectorAll('.menu-item');
let isMenuOpen = false;

if (mobileMenuButton && mobileMenu && mobileMenuContainer) {
    mobileMenuButton.addEventListener('click', () => {
        if (!isMenuOpen) {
            // Opening animation
            isMenuOpen = true;
            mobileMenu.classList.remove('hidden');
            
            // Menu container slide down animation
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
                mobileMenuContainer.classList.add('animate-slide-down');
            }, 10);
            
            // Animate menu items with stagger
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('opacity-0');
                    item.classList.add('animate-menu-item-in', 'opacity-100');
                }, 100 + (index * 50));
            });
            
            // Change icon to X
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            menuIcon.style.transform = 'rotate(180deg)';
            document.body.style.overflow = 'hidden';
            
        } else {
            // Closing animation
            isMenuOpen = false;
            
            // Remove animations and hide items
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('opacity-0');
                    item.classList.remove('animate-menu-item-in', 'opacity-100');
                }, index * 30);
            });
            
            // Menu container slide up animation
            setTimeout(() => {
                mobileMenuContainer.classList.remove('animate-slide-down');
                mobileMenuContainer.classList.add('animate-slide-up-out');
                mobileMenu.classList.remove('opacity-100');
                mobileMenu.classList.add('opacity-0');
            }, 100);
            
            // Hide menu completely
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenuContainer.classList.remove('animate-slide-up-out');
            }, 300);
            
            // Change icon back to hamburger
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            menuIcon.style.transform = 'rotate(0deg)';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on menu items
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isMenuOpen) {
                mobileMenuButton.click();
            }
        });
    });
}

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
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && isMenuOpen) {
                mobileMenuButton.click();
            }
        }
    });
});

// Enhanced Navbar Scroll Behavior mit permanentem Glassmorphism
const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                // Glassmorphismus bleibt IMMER aktiv - keine Änderung der backdrop-filter Klassen
                // Nur Hide/show navbar on scroll
                if (currentScroll <= 0) {
                    navbar.style.transform = 'translateY(0)';
                } else if (currentScroll > lastKnownScrollPosition && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            lastKnownScrollPosition = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
};

// Enhanced Hero Section Effects (without problematic parallax)
const enhanceHeroSection = () => {
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        // Smooth opacity change on scroll for subtle effect
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        const opacity = Math.max(0.3, 1 - (scrolled / heroHeight));
        
        if (scrolled < heroHeight) {
            heroSection.style.filter = `brightness(${0.8 + (opacity * 0.2)})`;
        }
    }
};

// Service Cards Hover Effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(139, 69, 19, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.15)';
    });
});

// Button Ripple Effect
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Ripple Animation CSS
const rippleCSS = `
@keyframes ripple-effect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Loading Animation für bessere UX
const showLoadingAnimation = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
};

const hideLoadingAnimation = () => {
    document.body.style.opacity = '1';
};

// Page Load Animation mit modernen Effekten
document.addEventListener('DOMContentLoaded', () => {
    hideLoadingAnimation();
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Intersection Observer für erweiterte Scroll-Animationen
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Service Cards Staggered Animation
            if (element.classList.contains('service-card')) {
                const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                setTimeout(() => {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }, delay);
            }
            
            // Andere Animationen
            element.classList.add('animate-fade-in');
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

// Alle animierbaren Elemente beobachten
document.querySelectorAll('.service-card, .hover-lift').forEach(el => {
    animationObserver.observe(el);
});

// Advanced Scroll Event Listeners
window.addEventListener('scroll', debounce(() => {
    handleScroll();
    enhanceHeroSection();
}, 16)); // ~60fps

// Touch-friendly interactions für mobile Geräte
if ('ontouchstart' in window) {
    document.querySelectorAll('.hover-lift').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 100);
        });
    });
}

// Performance Monitor für Development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 Modern Hundecoiffeur Website loaded successfully!');
    console.log('📱 Mobile optimized with Tailwind CSS');
    console.log('✨ Enhanced with modern animations');
}

// Preload wichtiger Bilder mit modernem lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100', 'transition-opacity', 'duration-300');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Error Handling für bessere UX
window.addEventListener('error', (e) => {
    console.error('Ein Fehler ist aufgetreten:', e.error);
});

// Cleanup bei Page Unload
window.addEventListener('beforeunload', () => {
    // Clean up event listeners
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', enhanceHeroSection);
}); 