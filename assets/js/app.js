$(document).ready(function() {
    // Add JS indicator for CSS animations
    $('body').addClass('js-enabled');

    // Initialize Animations
    initAnimations();

    // Load initial cart
    refreshCart();
    
    // Hero Quantity Selector
    $('.hero-qty-plus').on('click', function() {
        let val = parseInt($('.hero-qty-val').text());
        $('.hero-qty-val').text(val + 1);
    });
    
    $('.hero-qty-minus').on('click', function() {
        let val = parseInt($('.hero-qty-val').text());
        if (val > 1) $('.hero-qty-val').text(val - 1);
    });

    // Delegate add to cart click since cards are injected dynamically
    // Also handles the hero's static button
    // Delegate card click to open detail modal
    $(document).on('click', '.luxury-product-card', function(e) {
        // Only trigger if we're not clicking the wishlist btn specifically
        if ($(e.target).closest('.wishlist-btn').length) return;
        
        const productId = $(this).find('.add-to-cart-btn').data('id');
        if (typeof openProductDetail === 'function') {
            openProductDetail(productId);
        }
    });

    // Handle add-to-cart button on card specifically to also open detail
    $(document).on('click', '.add-to-cart-btn', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent card double-trigger
        const productId = $(this).data('id');
        if (typeof openProductDetail === 'function') {
            openProductDetail(productId);
        }
    });
});

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


/**
 * Global Animation Observer
 */
let revealObserver;

/**
 * Initialize Reveal and Scroll Animations
 */
function initAnimations() {
    // 1. Intersection Observer for Scroll Reveals
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all initial reveal elements
    $('.scroll-reveal, .text-reveal-item').each(function() {
        revealObserver.observe(this);
    });

    // Wishlist Toast Handler
    $(document).on('click', '.wishlist-btn, .modal-wishlist-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showWishlistToast();
        
        // Toggle heart icon state for visual feedback
        const icon = $(this).find('i');
        if (icon.hasClass('bi-heart')) {
            icon.removeClass('bi-heart').addClass('bi-heart-fill text-danger');
        } else {
            // It's a demo, so we can toggle back if clicked again
            icon.removeClass('bi-heart-fill text-danger').addClass('bi-heart');
        }
    });

    // 2. Scroll Progress Bar & Hero Parallax

