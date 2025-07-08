document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const filterButtons = document.querySelectorAll('#product-filters button');

    // Fetch product data
    fetch('products-data.json')
        .then(response => response.json())
        .then(products => {
            // Group products by category
            const productCategories = {
                electronics: products.filter(p => p.category === 'electronics'),
               suplements: products.filter(p => p.category === 'suplements'),
               menfit: products.filter(p => p.category === 'menfit'),
              jewelry: products.filter(p => p.category === 'jewelry')
            };

            // Render initial view with all products
            renderProductCategories(productCategories);

            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.dataset.category;
                    
                    if (category === 'all') {
                        renderProductCategories(productCategories);
                    } else {
                        // Create an object with just the selected category
                        const filteredCategories = {};
                        filteredCategories[category] = productCategories[category];
                        renderProductCategories(filteredCategories);
                    }
                });
            });
        })
        .catch(error => console.error('Error loading products:', error));

    function renderProductCategories(categories) {
        productsContainer.innerHTML = '';

        // Iterate through each category
        Object.entries(categories).forEach(([categoryName, products]) => {
            // Create category section
            const categorySection = document.createElement('section');
            categorySection.classList.add('product-category');
            
            // Category title
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = categoryName.toUpperCase();
            categorySection.appendChild(categoryTitle);

            // Product grid for this category
            const categoryGrid = document.createElement('div');
            categoryGrid.classList.add('category-grid');

            // Render products in this category
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <div class="product-sizes">
                        Sizes: ${product.sizes.join(', ')}
                    </div>
                    <button onclick="viewProductDetails('${product.id}')">View Details</button>
                `;
                categoryGrid.appendChild(productCard);
            });

            categorySection.appendChild(categoryGrid);
            productsContainer.appendChild(categorySection);
        });
    }

    // Navigate to product details
    window.viewProductDetails = (productId) => {
        sessionStorage.setItem('selectedProductId', productId);
        window.location.href = 'item.html';
    };
});