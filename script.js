// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.querySelector('nav').style.background = 'rgba(255, 255, 255, 0.98)';
        document.querySelector('nav').style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        document.querySelector('nav').style.background = 'rgba(255, 255, 255, 0.95)';
        document.querySelector('nav').style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.art-item, .artist-card, .about-content, .contact-container');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.art-item, .artist-card, .about-content, .contact-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Shop Now Functionality
document.addEventListener('DOMContentLoaded', function() {
    const shopNowBtn = document.getElementById('shopNowButton');
    const shopModal = document.getElementById('shopModal');
    const closeModal = document.querySelector('.close-modal');
    const productsGrid = document.getElementById('productsGrid');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Updated product data with your new products
    const products = [
        {
            id: 1,
            name: 'Colorful Abstraction',
            description: 'Acrylic on canvas • 24" × 36"',
            price: 450,
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 2,
            name: 'Floral Essence',
            description: 'Fine art photography • Limited edition',
            price: 250,
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 3,
            name: 'Urban Dreams',
            description: 'Oil on canvas • 30" × 40"',
            price: 600,
            image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 4,
            name: 'Silent Portrait',
            description: 'Watercolor on paper • 18" × 24"',
            price: 350,
            image: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 5,
            name: 'Mountain Serenity',
            description: 'Oil on canvas • 20" × 30"',
            price: 500,
            image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 6,
            name: 'Ocean Waves',
            description: 'Acrylic on canvas • 24" × 36"',
            price: 480,
            image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        // Add these new products
        {
            id: 7,
            name: 'Sunset Reflections',
            description: 'Oil on canvas • 24" × 36"',
            price: 520,
            image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 8,
            name: 'Abstract Harmony',
            description: 'Mixed media • 30" × 30"',
            price: 430,
            image: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 9,
            name: 'Forest Whispers',
            description: 'Watercolor • 18" × 24"',
            price: 380,
            image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 10,
            name: 'Urban Geometry',
            description: 'Photography • Limited edition',
            price: 290,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 11,
            name: 'Emotion in Blue',
            description: 'Acrylic on canvas • 36" × 48"',
            price: 750,
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 12,
            name: 'Desert Bloom',
            description: 'Pastel on paper • 16" × 20"',
            price: 320,
            image: 'https://images.unsplash.com/photo-1515511856280-7b23f68d2996?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ];

    let cart = [];

    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            shopModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            renderProducts();
            renderCart();
            console.log("Shop modal opened");
        });
        console.log("Shop Now button found and listener attached");
    } else {
        console.log("Shop Now button not found");
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            shopModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === shopModal) {
            shopModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Render products
    function renderProducts() {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to all Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add to cart function
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        renderCart();
    }

    // Render cart
    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">&times;</button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
        
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update total
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotal.textContent = totalPrice.toFixed(2);
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Quantity adjustment functions
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        renderCart();
    }

    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        item.quantity += 1;
        renderCart();
    }

    function removeItem(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    // Checkout button
    // Checkout button
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                if (confirm('You need to login to proceed. Would you like to login now?')) {
                    window.location.href = 'login.html';
                }
                return;
            }
            
            alert(`Thank you for your purchase, ${currentUser.name}! Total: $${cartTotal.textContent}`);
            cart = [];
            renderCart();
            shopModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}
// Add this code to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Your existing code remains here
    
    // Product detail modal functionality
    const productDetailsModal = document.createElement('div');
    productDetailsModal.id = 'productDetailsModal';
    productDetailsModal.className = 'product-details-modal';
    document.body.appendChild(productDetailsModal);
    
    // Add event listeners to all View Details buttons
    document.querySelectorAll('.btn-art').forEach(button => {
        button.addEventListener('click', showProductDetails);
    });
    
    // Function to show product details
    function showProductDetails(e) {
        // Get the parent art item
        const artItem = e.target.closest('.art-item');
        
        // Extract product information
        const productImage = artItem.querySelector('img').src;
        const productName = artItem.querySelector('h3').textContent;
        const productDescription = artItem.querySelector('p').textContent;
        const productPrice = artItem.querySelector('.price').textContent;
        
        // Generate random additional details (you can replace this with real data)
        const artistName = ["Sarah Johnson", "Michael Chen", "Emma Rodriguez"][Math.floor(Math.random() * 3)];
        const yearCreated = 2020 + Math.floor(Math.random() * 5);
        const artDescription = [
            "This stunning piece captures the essence of abstract expression through vibrant colors and bold strokes.",
            "A remarkable work that combines traditional techniques with contemporary vision.",
            "An exploration of light and shadow that invites viewers to immerse themselves in its depth."
        ][Math.floor(Math.random() * 3)];
        
        // Create the modal content
        productDetailsModal.innerHTML = `
            <div class="product-details-content">
                <span class="close-product-details">&times;</span>
                <div class="product-details-grid">
                    <div class="product-details-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="product-details-info">
                        <h2>${productName}</h2>
                        <p class="artist-name">By ${artistName}</p>
                        <p class="product-specs">${productDescription}</p>
                        <p class="product-year">Year: ${yearCreated}</p>
                        <div class="product-price-large">${productPrice}</div>
                        <p class="product-description">${artDescription}</p>
                        <div class="product-actions">
                            <button class="btn add-to-cart-detail" data-name="${productName}">Add to Cart</button>
                            <button class="btn btn-outline inquire-button">Inquire About This Piece</button>
                        </div>
                        <div class="product-details-extras">
                            <div class="detail-item">
                                <h4>Shipping</h4>
                                <p>Free worldwide shipping on all artwork</p>
                            </div>
                            <div class="detail-item">
                                <h4>Returns</h4>
                                <p>30-day satisfaction guarantee</p>
                            </div>
                            <div class="detail-item">
                                <h4>Authentication</h4>
                                <p>Certificate of authenticity included</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show the modal
        productDetailsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close button functionality
        const closeButton = document.querySelector('.close-product-details');
        closeButton.addEventListener('click', () => {
            productDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Click outside to close
        productDetailsModal.addEventListener('click', (e) => {
            if (e.target === productDetailsModal) {
                productDetailsModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add to Cart functionality from the details modal
        const addToCartButton = document.querySelector('.add-to-cart-detail');
        addToCartButton.addEventListener('click', () => {
            // Find the product in your products array
            const productName = addToCartButton.getAttribute('data-name');
            const product = products.find(p => p.name === productName);
            
            if (product) {
                // Check if product is already in cart
                const existingItem = cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                
                renderCart();
                
                // Provide feedback
                alert(`${productName} has been added to your cart.`);
            }
        });
        
        // Inquire button functionality
        const inquireButton = document.querySelector('.inquire-button');
        inquireButton.addEventListener('click', () => {
            // Scroll to contact form and close the modal
            productDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            const contactSection = document.getElementById('contact');
            const contactTextarea = document.querySelector('.contact-form textarea');
            
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Prefill the contact form
            contactTextarea.value = `I'm interested in the artwork: ${productName}. Please provide more information.`;
            
            // Focus the textarea
            setTimeout(() => {
                contactTextarea.focus();
            }, 1000);
        });
    }
});

// Update navigation based on authentication status
function updateNavForAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Remove any existing auth links
    const existingAuthLinks = navLinks.querySelectorAll('a[href="login.html"], a[href="register.html"]');
    existingAuthLinks.forEach(link => link.parentElement.remove());
    
    // Remove any existing user dropdown
    const existingDropdown = navLinks.querySelector('.user-dropdown');
    if (existingDropdown) existingDropdown.remove();
    
    if (currentUser) {
        // Add user dropdown
        const userLi = document.createElement('li');
        userLi.className = 'user-dropdown';
        userLi.innerHTML = `
            <a href="#" class="user-link">
                <i class="fas fa-user-circle"></i> ${currentUser.name.split(' ')[0]}
            </a>
            <ul class="dropdown-menu">
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" id="logoutLink">Logout</a></li>
            </ul>
        `;
        navLinks.appendChild(userLi);
        
        // Add logout functionality
        const logoutLink = document.getElementById('logoutLink');
        if (logoutLink) {
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }
    } else {
        // Add login/register links
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="login.html" class="btn-nav">Login</a>';
        navLinks.appendChild(loginLi);
        
        const registerLi = document.createElement('li');
        registerLi.innerHTML = '<a href="register.html" class="btn-nav">Register</a>';
        navLinks.appendChild(registerLi);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', updateNavForAuth)});