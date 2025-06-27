document.addEventListener('DOMContentLoaded', () => {
    const featuredProductsContainer = document.getElementById('featured-products-container');

    // Fetch product data
    fetch('products-data.json')
        .then(response => response.json())
        .then(products => {
            // Select 6 random featured products
            const featuredProducts = getRandomProducts(products, 6);

            // Populate featured products
            featuredProducts.forEach(product => {
                const productSlide = document.createElement('div');
                productSlide.classList.add('swiper-slide', 'featured-product-slide');
                productSlide.innerHTML = `
                    <div class="featured-product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="featured-product-details">
                            <h3>${product.name}</h3>
                            <p>£${product.price.toFixed(2)}</p>
                            <a href="item.html" onclick="selectFeaturedProduct('${product.id}')">View Details</a>
                        </div>
                    </div>
                `;
                featuredProductsContainer.appendChild(productSlide);
            });

            // Initialize Swiper with fullscreen centering
            new Swiper('.featured-products-slider', {
                slidesPerView: 1,  // Show one product at a time
                effect: 'fade',     // Smooth fading transition
                loop: true,         // Infinite looping
                autoplay: {
                    delay: 3000,    // Change product every 3 seconds
                    disableOnInteraction: false
                },
                centeredSlides: true, // Ensure slides are centered
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        })
        .catch(error => console.error('Error loading featured products:', error));

    // Function to select random featured products
    function getRandomProducts(products, count) {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Function to store selected product for item page
    window.selectFeaturedProduct = (productId) => {
        sessionStorage.setItem('selectedProductId', productId);
    };
});
