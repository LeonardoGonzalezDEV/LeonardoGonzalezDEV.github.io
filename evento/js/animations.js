// Inicialización de animaciones AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cambio de fondo de la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        document.querySelector('.navbar').style.backgroundColor = 'rgba(26, 26, 26, 0.7)';
    }
});

// Cerrar menú móvil al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
navLinks.forEach((l) => {
    l.addEventListener('click', () => { 
        if (menuToggle.classList.contains('show')) {
            bsCollapse.toggle();
        }
    });
});