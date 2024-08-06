document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    menuIcon.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });

    const linkedinButton = document.getElementById('linkedin-button');
    linkedinButton.addEventListener('click', function() {
        window.open('https://www.linkedin.com/in/jorge-polanco-gonzalez-9b029a225', '_blank');
    });

    // Cambiar el color del header cuando se hace scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
});
