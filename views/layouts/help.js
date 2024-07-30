document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        const parent = event.target.closest('.faq-item');
        parent.classList.toggle('active');
    });
});