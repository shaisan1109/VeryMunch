//Makes the thumbs up button orange when clicked (view buyer reviews)
document.addEventListener('DOMContentLoaded', (event) => {
    const thumbsUpIcon = document.getElementById('thumbs-up');

    thumbsUpIcon.addEventListener('click', () => {
        thumbsUpIcon.classList.toggle('active');
    });
});