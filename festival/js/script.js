 // Inicializar AOS
 AOS.init({
    duration: 1000,
    once: true
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Manejo del formulario
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Reserva realizada con éxito! Te enviaremos un email con los detalles.');
    const modal = bootstrap.Modal.getInstance(document.getElementById('registroModal'));
    modal.hide();
    this.reset();
});

// Navbar scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').style.padding = '0.5rem 1rem';
    } else {
        document.querySelector('.navbar').style.padding = '1rem';
    }
});