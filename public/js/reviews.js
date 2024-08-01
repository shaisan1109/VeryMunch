document.addEventListener('DOMContentLoaded', function() {
    const reviews = document.querySelectorAll('.review-container');
    reviews.forEach(review => {
        const thumbsUp = review.querySelector('#thumbs-up');
        thumbsUp.addEventListener('click', function() {
            const helpfulText = review.querySelector('#helpful-text-style');
            if (thumbsUp.classList.contains('selected')) {
                thumbsUp.classList.remove('selected');
                helpfulText.textContent = 'Helpful?';
            } else {
                thumbsUp.classList.add('selected');
                helpfulText.textContent = 'Marked as Helpful';
            }
        });
    });
});
