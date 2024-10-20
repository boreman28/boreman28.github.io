document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menu = document.querySelector('.navbar-collapse');
    const header = document.querySelector('header');

    // Función para manejar el clic en los enlaces de navegación
    function handleNavClick(event) {
        event.preventDefault();
        navLinks.forEach(nav => {
            nav.classList.remove('active');
            nav.classList.remove('pulse');
        });
        this.classList.add('active');
        this.classList.add('pulse');
        if (menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
        const sectionId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(sectionId);
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    }

    navLinks.forEach(link => link.addEventListener('click', handleNavClick));

    // Observador de intersección mejorado con efecto de pulso
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.classList.add('pulse');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Remover la clase de pulso después de la animación
                setTimeout(() => {
                    entry.target.classList.remove('pulse');
                }, 1000);
            } else {
                entry.target.classList.remove('in-view');
                entry.target.classList.remove('pulse');
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px) scale(0.95)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-100px 0px'
    });

    sections.forEach(section => {
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) scale(0.95)';
        observer.observe(section);
    });

    // Efecto parallax mejorado
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.pageYOffset;
                document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
                
                // Efecto de desvanecimiento para el encabezado
                const headerOpacity = Math.max(0, Math.min(1, 1 - scrollPosition / 200));
                header.style.backgroundColor = `rgba(255, 255, 255, ${headerOpacity})`;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animación de entrada para los elementos del menú
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            link.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
