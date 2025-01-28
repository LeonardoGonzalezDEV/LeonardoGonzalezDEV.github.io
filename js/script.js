// Add this right after your existing Google Analytics code
const consentBanner = document.createElement('div');
consentBanner.innerHTML = `
<div id="cookieConsent" class="position-fixed bottom-0 start-0 w-100 bg-dark text-light p-3" style="z-index: 1000;">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-8">
                <p class="mb-md-0">Este sitio utiliza cookies para mejorar su experiencia. Al continuar navegando, acepta nuestro uso de cookies.</p>
            </div>
            <div class="col-md-4 text-md-end">
                <button id="acceptCookies" class="btn btn-primary me-2">Aceptar</button>
                <button id="rejectCookies" class="btn btn-outline-light">Rechazar</button>
            </div>
        </div>
    </div>
</div>`;

// Initialize consent state
window.dataLayer = window.dataLayer || [];
function gtag() { 
    dataLayer.push(arguments); 
}

// Set default consent state
gtag('consent', 'default', {
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
});

// Initialize Google Analytics
gtag('js', new Date());
gtag('config', 'G-230GE6WC0C');

// Check for existing consent
const hasConsent = localStorage.getItem('cookieConsent');
if (!hasConsent) {
    document.body.appendChild(consentBanner);
}

// Handle consent choices
document.getElementById('acceptCookies')?.addEventListener('click', function() {
    gtag('consent', 'update', {
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
    });
    localStorage.setItem('cookieConsent', 'granted');
    consentBanner.remove();
});

document.getElementById('rejectCookies')?.addEventListener('click', function() {
    gtag('consent', 'update', {
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
    });
    localStorage.setItem('cookieConsent', 'denied');
    consentBanner.remove();
});

// Load Google Analytics script
const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-230GE6WC0C';
document.head.appendChild(gtagScript);
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
