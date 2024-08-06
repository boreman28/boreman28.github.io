document.addEventListener('DOMContentLoaded', function() {
    // Añadir evento de scroll para cambiar el color del header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Redirigir a LinkedIn
    document.getElementById('linkedin-button').addEventListener('click', function() {
        window.open('https://www.linkedin.com/in/jorge-polanco-10859aa5/', '_blank'); // Cambiar a la URL de tu perfil de LinkedIn
    });

    // Desplazamiento suave al hacer clic en los enlaces de navegación
    const links = document.querySelectorAll('nav a');
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Ajustar según la altura del header
                behavior: 'smooth'
            });
        });
    }

    // Función para abrir un enlace externo en una nueva pestaña
    window.abrirEnlace = function() {
        window.open('https://www.ejemplo.com', '_blank'); // Cambiar 'https://www.ejemplo.com' al enlace deseado
    };
});
