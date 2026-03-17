// assets/js/cart.js

$(document).ready(function () {
    // Event listeners
    $('#cart-items-container').on('click', '.qty-btn', function () {
        const cartKey = $(this).data('key');
        let currentQty = parseInt($(this).siblings('.qty-input').val());
        const action = $(this).data('action');

        if (action === 'increase') {
            currentQty++;
        } else if (action === 'decrease') {
            currentQty--;
        }

        if (currentQty > 0) {
            $(this).siblings('.qty-input').val(currentQty);
            updateCartItem(cartKey, currentQty);
        } else {
            removeCartItem(cartKey);
        }
    });

    $('#cart-items-container').on('change', '.qty-input', function () {
        const cartKey = $(this).data('key');
        let newQty = parseInt($(this).val());

        if (newQty > 0) {
            updateCartItem(cartKey, newQty);
        } else {
            removeCartItem(cartKey);
        }
    });
