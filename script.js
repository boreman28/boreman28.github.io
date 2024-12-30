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
// Añadir dentro del DOMContentLoaded, después de initializeApp();

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
    } catch (error) {
        console.error('Error during initialization:', error);
    }
    // Parallax para móviles y PC
document.addEventListener("DOMContentLoaded", function () {
    // Verifica si el navegador soporta background-attachment: fixed
    let supportsParallax = window.getComputedStyle(document.body).backgroundAttachment !== "scroll";

    if (!supportsParallax) {
        // Aplica efecto parallax mediante scroll
        let parallaxElements = document.querySelectorAll('.parallax-divider');

        window.addEventListener('scroll', function () {
            parallaxElements.forEach(function (element) {
                let speed = 0.5; // Ajusta la velocidad del efecto
                let offset = window.pageYOffset;
                let elementOffset = element.offsetTop;
                let elementHeight = element.offsetHeight;

                if (offset + window.innerHeight > elementOffset && offset < elementOffset + elementHeight) {
                    let translateY = (offset - elementOffset) * speed;
                    element.style.transform = `translateY(${translateY}px)`;
                }
            });
        });
    }
});
};
