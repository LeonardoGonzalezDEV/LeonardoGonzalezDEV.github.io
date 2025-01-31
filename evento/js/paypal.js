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
                        value: total.toString()
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('¡Pago completado! Gracias por tu compra, ' + details.payer.name.given_name);
                $('#reservationModal').modal('hide');
                // Aquí puedes agregar código para enviar un email de confirmación
            });
        }
    }).render('#paypal-button-container');
}