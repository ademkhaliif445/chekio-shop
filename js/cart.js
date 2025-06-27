document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const cartTotalContainer = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const completePurchaseButton = document.getElementById('complete-purchase');

    // Function to render the cart
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotalContainer.innerHTML = '';
            return;
        }

        cartContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Price: £${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });

        cartTotalContainer.innerHTML = `
            <p>Total:$${total.toFixed(2)}</p>
        `;
    }

    // Update quantity of an item
    window.updateQuantity = (index, change) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity = Math.max(1, cart[index].quantity + change); // Ensure quantity doesn't go below 1
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Remove an item from the cart
    window.removeItem = (index) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Clear entire cart
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart'); // Clear the cart from localStorage
        renderCart(); // Re-render the cart
        alert("Your cart has been cleared.");
    });

    // Complete purchase
    completePurchaseButton.addEventListener('click', () => {
        const currentUserEmail = localStorage.getItem("currentUserEmail");

        if (!currentUserEmail) {
            alert("You must be logged in to complete a purchase.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert("Your cart is empty. Add items to your cart before completing a purchase.");
            return;
        }

        // Save each cart item as a purchase
        cart.forEach((item) => {
            savePurchase(currentUserEmail, item.name, item.price * item.quantity);
        });

        // Clear the cart after purchase
        localStorage.removeItem('cart');
        renderCart();

        alert("Purchase completed successfully!");
        window.location.href = "profile.html"; // Redirect to profile page
    });

    // Function to save a purchase
    function savePurchase(email, product, price) {
        let purchases = JSON.parse(localStorage.getItem("purchases")) || [];
        purchases.push({ email, product, price });
        localStorage.setItem("purchases", JSON.stringify(purchases));
    }

    // Initial cart render
    renderCart();
});