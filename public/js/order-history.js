document.addEventListener('DOMContentLoaded', () => {
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.past-order').forEach(order => {
        order.addEventListener('click', () => {
            openModal(order.dataset.orderId);
        });
    });

    function openModal(orderId) {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
