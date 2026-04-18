/**
 * LA CELLULE - WebApp JavaScript
 * Fonctionnalités interactives et animations avancées
 */

class LaCelluleWebApp {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupScrollAnimations();
            this.setupIntersectionObserver();
        } else {
            this.revealWithoutObserver();
        }
        this.setupNavbarScroll();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupLoadingStates();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
    }

    // Animations au scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec la classe reveal
        document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Navbar qui change au scroll
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Masquer/afficher navbar au scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Observer d'intersection pour les animations
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';

                    // Animation des cartes dans la section
                    const cards = section.querySelectorAll('.resultat-card, .promesse-card, .contenu-card, .step-card, .rassurance-item');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease-out';
            sectionObserver.observe(section);
        });
    }

    // Smooth scrolling amélioré
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Fermer le menu mobile si ouvert
                    this.closeMobileMenu();
                }
            });
        });
    }

    // Menu mobile amélioré
    // Menu mobile - À ajouter plus tard lorsqu'on aura accès aux comptes utilisateurs
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // Désactivé temporairement
        if (!hamburger) return;

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Animation du hamburger
            if (hamburger.classList.contains('active')) {
                this.openMobileMenu();
            } else {
                this.closeMobileMenu();
            }
        });

        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Délai pour que l'animation se termine avant de fermer
                setTimeout(() => {
                    this.closeMobileMenu();
                }, 100);
            });
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                if (hamburger?.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }
        });
    }

    openMobileMenu() {
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        // Animation d'ouverture
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.style.animation = `slideInUp 0.3s ease-out ${index * 0.1}s both`;
        });
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';

        // Reset animations
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }

    // États de chargement
    setupLoadingStates() {
        // Simuler un état de chargement initial
        document.body.classList.add('loading');

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                this.animateHeroElements();
            }, 500);
        });

        // États de chargement pour les interactions
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.add('loading');
                button.textContent = 'Chargement...';

                // Simuler une action asynchrone
                setTimeout(() => {
                    button.classList.remove('loading');
                    button.textContent = button.dataset.originalText || 'Entrer dans LA CELLULE maintenant';
                }, 2000);
            });

            // Sauvegarder le texte original
            button.dataset.originalText = button.textContent;
        });
    }

    // Animation des éléments hero
    animateHeroElements() {
        const heroElements = [
            '.hero-title',
            '.hero-subtitle',
            '.hero-hook',
            '.cta-button',
            '.social-proof'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Navigation clavier
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC pour fermer le menu mobile
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }

            // Navigation au clavier pour les cartes
            if (e.key === 'Tab') {
                const isMobileMenuOpen = document.body.classList.contains('menu-open');
                if (!isMobileMenuOpen) {
                    return;
                }

                const focusableElements = document.querySelectorAll(
                    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Optimisations de performance
    setupPerformanceOptimizations() {
        // Lazy loading des images
        this.setupLazyLoading();

        // Préchargement des ressources critiques
        this.preloadCriticalResources();

        // Optimisation des événements de scroll
        this.throttleScrollEvents();
    }

    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
            return;
        }

        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    preloadCriticalResources() {
        // Précharger les polices
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);

        // Précharger les images hero
        const heroImage = document.querySelector('.hero-img');
        if (heroImage) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = heroImage.src;
            link.as = 'image';
            document.head.appendChild(link);
        }
    }

    throttleScrollEvents() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Logique de scroll optimisée
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // API publique pour extensions futures
    static extend(name, fn) {
        LaCelluleWebApp.prototype[name] = fn;
    }

    revealWithoutObserver() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });

        const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in');
        animatedElements.forEach(el => el.classList.add('animate-visible'));
    }
}

// Initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new LaCelluleWebApp();
});

// Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
if (!('IntersectionObserver' in window)) {
    // Polyfill simple
    const elements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in');
    elements.forEach(el => el.classList.add('animate-visible'));
}

// Service Worker pour PWA (futur)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics et tracking (futur)
const trackEvent = (eventName, properties = {}) => {
    // Implémentation future avec analytics
    console.log('Event tracked:', eventName, properties);
};

// Export pour utilisation modulaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LaCelluleWebApp;
}