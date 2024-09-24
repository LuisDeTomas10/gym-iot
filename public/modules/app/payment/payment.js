document.addEventListener('DOMContentLoaded', function () {
    const paymentMethods = document.getElementById('paymentMethods');
    const cardDetails = document.getElementById('cardDetails');
    const yapeDetails = document.getElementById('yapeDetails');
    const plinDetails = document.getElementById('plinDetails');
    paymentMethods.addEventListener('change', function (e) {
        if (e.target.type === 'radio') {
            const method = e.target.value;
            document
                .querySelectorAll('.radio-item')
                .forEach((item) => item.classList.remove('active'));
            e.target.closest('.radio-item').classList.add('active');
            cardDetails.style.display = 'none';
            yapeDetails.style.display = 'none';
            plinDetails.style.display = 'none';
            switch (method) {
                case 'yape':
                    yapeDetails.style.display = 'block';
                    break;
                case 'plin':
                    plinDetails.style.display = 'block';
                    break;
                default:
                    cardDetails.style.display = 'block';
            }
        }
    });
    document
        .getElementById('paymentForm')
        .addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Pago procesado con éxito!');
    });
});
