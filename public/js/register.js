// register.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeatpassword');

    form.addEventListener('submit', (event) => {
        // Basic form validation
        if (password.value !== repeatPassword.value) {
            event.preventDefault();
            alert('Passwords do not match.');
        }
    });
});
