// Objeto para almacenar cantidades de boletos
const ticketQuantities = {
    normal: 0,
    vip: 0
};

// Función para actualizar cantidad de boletos
function updateQuantity(type, change) {
    const newQuantity = ticketQuantities[type] + change;
    if (newQuantity >= 0) {
        ticketQuantities[type] = newQuantity;
        document.getElementById(`${type}Quantity`).textContent = newQuantity;
        updateTotal();
        togglePaymentForm();
    }
}

// Función para calcular y mostrar el total
function updateTotal() {
    const normalTotal = ticketQuantities.normal * 100;
    const vipTotal = ticketQuantities.vip * 300;
    const total = normalTotal + vipTotal;
    document.getElementById('totalAmount').textContent = `€${total}`;
}

// Mostrar/ocultar formulario de pago
function togglePaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    const hasTickets = ticketQuantities.normal > 0 || ticketQuantities.vip > 0;
    paymentForm.style.display = hasTickets ? 'block' : 'none';
}

// Limpiar cantidades al cerrar modal
document.getElementById('reservationModal').addEventListener('hidden.bs.modal', function () {
    ticketQuantities.normal = 0;
    ticketQuantities.vip = 0;
    document.getElementById('normalQuantity').textContent = '0';
    document.getElementById('vipQuantity').textContent = '0';
    document.getElementById('totalAmount').textContent = '€0';
    togglePaymentForm();
});