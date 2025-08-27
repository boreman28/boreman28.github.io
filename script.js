document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const themeSwitch = document.getElementById('themeSwitch');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Funciones principales
    const Theme = {
        init() {
            // Cambiamos el tema predeterminado a 'dark'
            const savedTheme = localStorage.getItem('theme') || 'dark';
            this.applyTheme(savedTheme);
            // Invertimos la lógica del checkbox
            themeSwitch.checked = savedTheme === 'light';
        },
    
        applyTheme(theme) {
            body.setAttribute('data-bs-theme', theme);
            // Invertimos los iconos
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        },
    
        toggle() {
            // Invertimos la lógica del toggle
            const newTheme = body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
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

            // Note: Social links are also hardcoded in the HTML.
            // This script dynamically updates them, which might be redundant.
            Object.entries(links).forEach(([platform, url]) => {
                const icon = document.querySelector(`.fa-${platform}`);
                if (icon && icon.parentElement) { // Added null check for icon
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

    // The initializeApp call that was previously here has been successfully moved 
    // to the end of the script, after the initializeApp definition.
});

// Función de alerta para el formulario de contacto
/*
function mostrarAlerta() {
    alert('¡Gracias por tu interés! En breve te contactaré.');
}
*/
// The initializeApp call is now correctly placed within a DOMContentLoaded listener 
// at the end of this script.

const ParallaxEffect = {
    elements: [],
    speedFactor: 0.5, // Adjust this value for desired parallax intensity (0.1 to 0.9)

    init: function() {
        this.elements = Array.from(document.querySelectorAll('.parallax-divider'));
        if (!this.elements.length) return;

        this.updateElementProperties(); // Initial calculation

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.updateElementProperties.bind(this));
    },

    updateElementProperties: function() {
        this.elements.forEach(el => {
            el.parallaxData = {
                offsetTop: el.offsetTop,
                offsetHeight: el.offsetHeight
            };
        });
        // Trigger a scroll handle in case positions changed affecting current view
        this.handleScroll(); 
    },

    handleScroll: function() {
        const viewportTop = window.pageYOffset;
        const viewportBottom = viewportTop + window.innerHeight;

        this.elements.forEach(el => {
            const elData = el.parallaxData;
            if (!elData) return;

            // Check if element is roughly in viewport
            if (elData.offsetTop + elData.offsetHeight > viewportTop && elData.offsetTop < viewportBottom) {
                const scrollDistance = viewportTop - elData.offsetTop;
                const newBackgroundPositionY = scrollDistance * this.speedFactor;
                el.style.backgroundPositionY = newBackgroundPositionY + 'px';
            }
        });
    }
};

const NavbarEffects = {
    init() {
        this.setupActiveLinks();
        this.setupScrollEffect();
    },

    setupActiveLinks() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        const setActiveLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', setActiveLink);
        window.addEventListener('load', setActiveLink);
    },

    setupScrollEffect() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
};

// Añadir NavbarEffects a la inicialización
const initializeApp = () => {
    try {
        Theme.init();
        Navigation.init();
        Animations.init();
        SocialLinks.init();
        NavbarEffects.init(); // Añadir esta línea
        ParallaxEffect.init(); // Add this line
    } catch (error) {
        console.error('Error during initialization:', error);
    }
};

// Call initializeApp after DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all modules are defined before calling initializeApp
    // Theme, Navigation, Animations, SocialLinks, NavbarEffects should be defined above this call
    initializeApp();
});
