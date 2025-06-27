document.addEventListener('DOMContentLoaded', () => {
    const productDetailsContainer = document.getElementById('product-details');
    const productId = sessionStorage.getItem('selectedProductId');

    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    // Fetch product data
    fetch('products-data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                renderProductDetails(product);
            } else {
                window.location.href = 'products.html';
            }
        })
        .catch(error => console.error('Error loading product details:', error));

    function renderProductDetails(product) {
        productDetailsContainer.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="description">${product.description}</p>
                <p class="price">£${product.price.toFixed(2)}</p>
                
                <div class="size-selection">
                    <label for="size">Size:</label>
                    <select id="size" name="size">
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">X-Large</option>
                    </select>
                </div>

                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
    }

    // Add to cart function
    window.addToCart = (productId) => {
        fetch('products-data.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                const size = document.getElementById('size').value;

                if (product) {
                    const cartItem = {
                        ...product,
                        size,
                        quantity: 1
                    };

                    // Retrieve existing cart or initialize
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    
                    // Check if item already exists
                    const existingItemIndex = cart.findIndex(
                        item => item.id === productId && item.size === size
                    );

                    if (existingItemIndex > -1) {
                        cart[existingItemIndex].quantity += 1;
                    } else {
                        cart.push(cartItem);
                    }

                    // Save updated cart
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Optional: Show confirmation
                    alert(`${product.name} added to cart!`);
                }
            });
    };
});