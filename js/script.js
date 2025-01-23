document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.elements['name'].value;
        const email = this.elements['email'].value;
        const message = this.elements['message'].value;
        
        const mailtoLink = `mailto:rodrigo_0156@hotmail.com?subject=Contacto desde Portfolio&body=Nombre: ${name}%0D%0AEmail: ${email}%0D%0AMensaje: ${message}`;
        window.location.href = mailtoLink;
        
        Swal.fire({
            title: '¡Mensaje Enviado!',
            text: 'Gracias por contactarme. Responderé lo antes posible.',
            icon: 'success',
            background: '#121212',
            color: '#f4f4f4',
            confirmButtonColor: '#3498db'
        });
        
        this.reset();
    });

    // Smooth scrolling mejorado para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cambiar estilo de navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar-principal');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});