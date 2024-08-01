// For opening and closing the pop up window when adding an item to cart
function showPopup(name, image, price, description) {
    document.getElementById('popup-product-name-style').textContent = name;
    document.getElementById('popup-product-image').src = image;
    document.getElementById('popup-product-price').textContent = price;
    document.getElementById('popup-product-description').textContent = description;

    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('popup-window').style.display = 'block';
}

function hidePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('popup-window').style.display = 'none';
    resetCounter(); // Reset counter when popup is closed
}

function resetCounter() {
    const quantityInput = document.getElementById('product-quantity');
    quantityInput.value = '1'; // Reset quantity to 1
}

// Quantity counter - in add to cart pop up window
document.addEventListener('DOMContentLoaded', (event) => {
    const decreaseButton = document.getElementById('decrease-button');
    const increaseButton = document.getElementById('increase-button');
    const quantityInput = document.getElementById('product-quantity');
    const cancelButton = document.querySelector('.cancel-decision-button'); // Ensure this class matches the cancel button in HTML

    // Initialize quantity to 1
    quantityInput.value = '1';

    decreaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value, 10);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    });

    increaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value, 10);
        quantityInput.value = currentQuantity + 1;
    });

    cancelButton.addEventListener('click', hidePopup); // Bind hidePopup to cancel button click
});
