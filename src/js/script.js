document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const finalTotalPriceElement = document.getElementById('final-total-price');
    const checkoutSection = document.getElementById('checkout-section');
    const orderSummary = document.getElementById('order-summary');
    let cart = [];

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${itemTotal.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        finalTotalPriceElement.textContent = totalPrice.toFixed(2);
    };

    const updateOrderSummary = () => {
        orderSummary.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
            orderSummary.appendChild(itemElement);
        });
    };

    document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const itemElement = e.target.closest('.menu-item');
            const quantityElement = itemElement.querySelector('.item-quantity');
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const quantity = parseInt(quantityElement.value);

            if (e.target.checked) {
                cart.push({ name, price, quantity });
            } else {
                cart = cart.filter(item => item.name !== name);
            }

            updateCart();
        });
    });

    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const itemElement = e.target.closest('.menu-item');
            const checkbox = itemElement.querySelector('.item-checkbox');

            if (checkbox.checked) {
                const name = checkbox.dataset.name;
                const quantity = parseInt(e.target.value);

                const item = cart.find(item => item.name === name);
                if (item) {
                    item.quantity = quantity;
                }

                updateCart();
            }
        });
    });

    document.getElementById('add-more').addEventListener('click', () => {
        checkoutSection.style.display = 'none';
    });

    document.getElementById('checkout').addEventListener('click', () => {
        checkoutSection.style.display = 'block';
        updateOrderSummary();
    });

    document.getElementById('cancel-order').addEventListener('click', () => {
        checkoutSection.style.display = 'none';
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pedido confirmado! Obrigado pela compra.');
        cart = [];
        updateCart();
        checkoutSection.style.display = 'none';
    });
});
