 // Inicializar AOS (Animate On Scroll)
 AOS.init({
    duration: 1000,
    once: true
});

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 75, 140, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(26, 75, 140, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scroll para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de contador para las estadísticas
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 10);
}

// Iniciar animación de contadores cuando sean visibles
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsNumbers = entry.target.querySelectorAll('.display-4');
            statsNumbers.forEach(number => {
                const target = parseInt(number.textContent);
                animateCounter(number, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stats-card');
if (statsSection) {
    observer.observe(statsSection);
}

// Validación simple del formulario
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            // Aquí iría la lógica de envío del formulario
            alert('¡Gracias por unirte a nuestro movimiento!');
            form.reset();
        }
    });
}