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

// Animación de números para contador de asistentes (opcional)
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Lazy loading para imágenes
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Manejar el formulario de contacto (si se agrega uno)
const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para manejar el envío del formulario
    console.log('Formulario enviado');
};

// Detectar cuando el usuario llega al final de la página
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('Usuario llegó al final de la página');
        // Aquí puedes agregar alguna acción específica
    }
});
// Variables para el control de cantidades y precios
let tickets = {
normal: { quantity: 0, price: 2000 },
vip: { quantity: 0, price: 6000 }
};

// Función para actualizar cantidades
function updateQuantity(type, change) {
const newQuantity = tickets[type].quantity + change;
if (newQuantity >= 0 && newQuantity <= 10) {
    tickets[type].quantity = newQuantity;
    document.getElementById(`${type}Quantity`).textContent = newQuantity;
    updateSummary();
}
}

// Función para actualizar el resumen
function updateSummary() {
const normalTotal = tickets.normal.quantity * tickets.normal.price;
const vipTotal = tickets.vip.quantity * tickets.vip.price;
const total = normalTotal + vipTotal;

document.getElementById('normalSummary').textContent = 
    `${tickets.normal.quantity} x $${tickets.normal.price} MXN = $${normalTotal} MXN`;
document.getElementById('vipSummary').textContent = 
    `${tickets.vip.quantity} x $${tickets.vip.price} MXN = $${vipTotal} MXN`;
document.getElementById('totalAmount').textContent = `$${total} MXN`;

// Limpiar contenedor de PayPal antes de renderizar
const paypalContainer = document.getElementById('paypal-button-container');
paypalContainer.innerHTML = '';

// Actualizar botón de PayPal solo si hay un total mayor a 0
if (total > 0) {
    initPayPalButton(total);
}
}

// Inicializar botón de PayPal
function initPayPalButton(total) {
paypal.Buttons({
    style: {
        color: 'gold',
        shape: 'rect',
        layout: 'vertical'
    },
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'MXN',
                    value: total.toString()
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('¡Pago completado! Gracias por tu compra, ' + details.payer.name.given_name);
            document.getElementById('reservationModal').modal('hide');
        });
    }
}).render('#paypal-button-container');
}

// Limpiar el modal cuando se cierra
document.getElementById('reservationModal').addEventListener('hidden.bs.modal', function () {
tickets.normal.quantity = 0;
tickets.vip.quantity = 0;
document.getElementById('normalQuantity').textContent = '0';
document.getElementById('vipQuantity').textContent = '0';
updateSummary();
});