document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const themeSwitch = document.getElementById('themeSwitch');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Funciones principales
    const Theme = {
        init() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.applyTheme(savedTheme);
            themeSwitch.checked = savedTheme === 'dark';
        },

        applyTheme(theme) {
            body.setAttribute('data-bs-theme', theme);
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        },

        toggle() {
            const newTheme = body.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }
    };

    const Navigation = {
        init() {
            this.setupSmoothScroll();
            this.setupMobileMenuClose();
        },

        setupSmoothScroll() {
            document.querySelectorAll('a.nav-link').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href && href !== '#') {
                        e.preventDefault();
                        const targetSection = document.querySelector(href);
                        if (targetSection) {
                            targetSection.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                            this.closeMobileMenu();
                        }
                    }
                });
            });
        },

        setupMobileMenuClose() {
            document.addEventListener('click', (e) => {
                const isNavbarCollapsed = window.getComputedStyle(navbarCollapse).display !== 'none';
                if (isNavbarCollapsed && !e.target.closest('.navbar')) {
                    this.closeMobileMenu();
                }
            });
        },

        closeMobileMenu() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    };

    const Animations = {
        init() {
            this.setupIntersectionObserver();
        },

        setupIntersectionObserver() {
            const sections = document.querySelectorAll('section');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeIn');
                        entry.target.style.opacity = 1;
                        observer.unobserve(entry.target); // Dejar de observar después de animar
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                section.style.opacity = 0;
                observer.observe(section);
            });
        }
    };

    const SocialLinks = {
        init() {
            const links = {
                whatsapp: 'https://wa.me/50765360544',
                linkedin: 'https://www.linkedin.com/in/jorgepolanco507/',
                instagram: 'https://www.instagram.com/jorgepolanco507/',
                reddit: 'https://www.reddit.com/user/BOREMAN507/',
                spotify: 'https://open.spotify.com/user/12141488049'
            };

            Object.entries(links).forEach(([platform, url]) => {
                const icon = document.querySelector(`.fa-${platform}`);
                if (icon?.parentElement) {
                    const link = icon.parentElement;
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
            });
        }
    };

    // Event Listeners
    themeSwitch.addEventListener('change', () => Theme.toggle());

    // Inicialización de módulos
    const initializeApp = () => {
        try {
            Theme.init();
            Navigation.init();
            Animations.init();
            SocialLinks.init();
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    };

    initializeApp();
});

// Función de alerta para el formulario de contacto
function mostrarAlerta() {
    alert('¡Gracias por tu interés! En breve te contactaré.');
}
