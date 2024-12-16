document.addEventListener('DOMContentLoaded', function() {
    // Consolidated event listeners and initialization
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Restore saved theme
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-bs-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    }

    // Toggle theme
    function toggleTheme() {
        const newTheme = body.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Smooth scrolling and menu closure
    function initSmoothScroll() {
        document.querySelectorAll('a.nav-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.querySelector(this.getAttribute('href'));
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Close menu on mobile
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // Section entry animations
    function setupSectionAnimations() {
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
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = 0;
            observer.observe(section);
        });
    }

    // Form validation
    function setupFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }

    // Contact Form Submission
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzDhq712SGUmBfS6wlPAfkC4CegwZ3OdapCDjWrhqlMZX_Rqd2sCdoGb3_mHNfmuM41Lw/exec';

        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                if (!this.checkValidity()) {
                    event.stopPropagation();
                    this.classList.add('was-validated');
                    return;
                }

                const formData = new FormData();
                formData.append('name', document.getElementById('name').value);
                formData.append('email', document.getElementById('email').value);
                formData.append('subject', document.getElementById('subject').value);
                formData.append('message', document.getElementById('message').value);

                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

                fetch(scriptURL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en el envío');
                    }
                    alert('Mensaje enviado correctamente');
                    
                    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                    modal.hide();
                    
                    this.reset();
                    this.classList.remove('was-validated');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al enviar el mensaje: ' + error.message);
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
            });
        }
    }

    // Social media links
    function setupSocialLinks() {
        const socialLinks = {
            whatsapp: 'https://wa.me/50765360544',
            linkedin: 'https://www.linkedin.com/in/jorgepolanco507/',
            instagram: 'https://www.instagram.com/jorgepolanco507/',
            reddit: 'https://www.reddit.com/user/BOREMAN507/',
            spotify: 'https://open.spotify.com/user/12141488049'
        };

        Object.keys(socialLinks).forEach(platform => {
            const icon = document.querySelector(`.fa-${platform}`);
            if (icon && icon.parentElement) {
                icon.parentElement.href = socialLinks[platform];
                icon.parentElement.target = '_blank';
                icon.parentElement.rel = 'noopener noreferrer';  // ADDED: Security attribute
            }
        });
    }

    // Event Listeners
    themeSwitch.addEventListener('change', toggleTheme);

    // Initialization
    function init() {
        initializeTheme();
        initSmoothScroll();
        setupSectionAnimations();
        setupFormValidation();
        setupContactForm();
        setupSocialLinks();
    }

    // Start the application
    init();
});