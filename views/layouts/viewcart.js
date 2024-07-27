//makes the selected payment method's container orange when clicked
document.addEventListener('DOMContentLoaded', () => {
    const paymentCards = document.querySelectorAll('.cart-payment-selector');

    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove 'selected' class from all cards
            paymentCards.forEach(c => c.classList.remove('selected'));
            
            // Toggle 'selected' class on the clicked card
            card.classList.toggle('selected');
        });
    });
});

//removes the item in cart when "remove" button is pressed
document.addEventListener('DOMContentLoaded', () => {
    // Select all "Remove" buttons
    const removeButtons = document.querySelectorAll('.cart-remove-item');

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the closest .cart-items-selector container to the clicked "Remove" button
            const container = button.closest('.cart-items-selector');
            
            // Remove the container from the DOM
            if (container) {
                container.remove();
            }
        });
    });
});