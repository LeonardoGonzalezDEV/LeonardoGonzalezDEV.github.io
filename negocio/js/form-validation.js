document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contacto form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        if (!nameInput.value.trim()) {
            alert('Por favor, ingresa tu nombre');
            return;
        }
        
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            alert('Por favor, ingresa un correo electrónico válido');
            return;
        }
        
        if (!messageInput.value.trim()) {
            alert('Por favor, escribe tu mensaje');
            return;
        }
        
        // Simulate form submission
        alert('Mensaje enviado. ¡Gracias por contactarnos!');
        this.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});