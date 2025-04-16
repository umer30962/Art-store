// Initialize products array
const products = [
    {
        id: 1,
        name: "Colorful Abstraction",
        description: "Acrylic on canvas • 24\" × 36\"",
        price: 450,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Floral Essence",
        description: "Fine art photography • Limited edition",
        price: 250,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Urban Dreams",
        description: "Oil on canvas • 30\" × 40\"",
        price: 600,
        image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    // Add more products based on your gallery items
];

// Initialize cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
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

    // Shop Now button functionality
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!requireAuth()) return;
            shopModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            renderProducts();
            renderCart();
        });
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
                    <button class="btn-art view-details" data-id="${product.id}">View Details</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to all Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

        // Add event listeners to all View Details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                console.log('View Details button clicked:', e.target);
                showProductDetails(e);
            });
        });
    }

    // Update addToCart function
    function addToCart(e) {
        if (!requireAuth()) return;
        
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartAndStorage();
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
        if (!requireAuth()) return;

        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCartAndStorage();
    }

    function increaseQuantity(e) {
        if (!requireAuth()) return;

        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        item.quantity += 1;
        updateCartAndStorage();
    }

    function removeItem(e) {
        if (!requireAuth()) return;

        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCartAndStorage();
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!requireAuth()) return;

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
});

// Add authentication check function for gallery view buttons
function checkAuthAndShowDetails(e) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        if (confirm('You need to login to view product details. Would you like to login now?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    showProductDetails(e);
}

// Update showProductDetails function
function showProductDetails(e) {
    if (!requireAuth()) return;
    
    console.log('View Details clicked:', e.target);
    const productCard = e.target.closest('.art-item') || e.target.closest('.product-card');

    if (!productCard) {
        console.error('Product card not found');
        return;
    }

    const productImage = productCard.querySelector('img').src;
    const productName = productCard.querySelector('h3').textContent;
    const productDescription = productCard.querySelector('p').textContent;
    const productPrice = productCard.querySelector('.price, .product-price').textContent;

    const productDetailsModal = document.createElement('div');
    productDetailsModal.className = 'product-details-modal';
    productDetailsModal.innerHTML = `
        <div class="product-details-content">
            <span class="close-product-details">&times;</span>
            <div class="product-details-grid">
                <div class="product-details-image">
                    <img src="${productImage}" alt="${productName}">
                </div>
                <div class="product-details-info">
                    <h2>${productName}</h2>
                    <p class="artist-name">By Sarah Johnson</p>
                    <p class="product-specs">${productDescription}</p>
                    <p class="product-year">Year: 2025</p>
                    <p class="product-price-large">${productPrice}</p>
                    <p class="product-description">This stunning piece captures the essence of artistic expression through carefully crafted technique and attention to detail. Each element has been thoughtfully composed to create a harmonious and engaging visual experience.</p>
                    <div class="product-actions">
                        <button class="btn add-to-cart-detail" data-id="${productCard.querySelector('.add-to-cart, .btn-art')?.getAttribute('data-id')}">Add to Cart</button>
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

    document.body.appendChild(productDetailsModal);
    productDetailsModal.style.display = 'block';

    // Close button functionality
    const closeButton = productDetailsModal.querySelector('.close-product-details');
    closeButton.addEventListener('click', () => {
        productDetailsModal.remove();
    });

    // Click outside to close
    productDetailsModal.addEventListener('click', (e) => {
        if (e.target === productDetailsModal) {
            productDetailsModal.remove();
        }
    });

    // Add to Cart functionality
    const addToCartButton = productDetailsModal.querySelector('.add-to-cart-detail');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const addToCartEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            const originalAddToCartButton = productCard.querySelector('.add-to-cart');
            if (originalAddToCartButton) {
                originalAddToCartButton.dispatchEvent(addToCartEvent);
            }
            productDetailsModal.remove();
        });
    }

    // Inquire button functionality
    const inquireButton = productDetailsModal.querySelector('.inquire-button');
    if (inquireButton) {
        inquireButton.addEventListener('click', () => {
            productDetailsModal.remove();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const contactTextarea = contactSection.querySelector('textarea');
                if (contactTextarea) {
                    contactTextarea.value = `I'm interested in the artwork: ${productName}. Please provide more information.`;
                }
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initialize view details functionality
document.addEventListener('DOMContentLoaded', function() {
    function attachViewDetailsListeners() {
        document.querySelectorAll('.btn-art').forEach(button => {
            button.addEventListener('click', showProductDetails);
        });
    }

    // Initial attachment of listeners
    attachViewDetailsListeners();

    // Attach listeners after rendering products
    if (typeof window.renderProducts === 'function') {
        const originalRenderProducts = window.renderProducts;
        window.renderProducts = function() {
            originalRenderProducts.apply(this, arguments);
            attachViewDetailsListeners();
        };
    }
});

// Search functionality
const searchToggle = document.querySelector('.search-toggle');
const searchOverlay = document.querySelector('.search-overlay');
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
}

// Close search overlay when clicking outside
document.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
    }
});

// Update search functionality
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const artItems = document.querySelectorAll('.art-item, .product-card');
        let hasResults = false;
        
        artItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
                hasResults = true;
                if (!item.closest('.shop-modal')) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        if (!hasResults) {
            alert('No results found. Please try a different search term.');
        }
        
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    });
    
    // Add keyboard support for search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// Update cart toggle functionality
const cartToggle = document.querySelector('.cart-toggle');
if (cartToggle) {
    cartToggle.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            if (confirm('You need to login to view your cart. Would you like to login now?')) {
                window.location.href = 'login.html';
            }
            return;
        }

        const shopModal = document.getElementById('shopModal');
        if (shopModal) {
            shopModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // If renderProducts and renderCart functions exist, call them
            if (typeof renderProducts === 'function') renderProducts();
            if (typeof renderCart === 'function') renderCart();
        }
    });
}

// Newsletter functionality
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Store subscription in localStorage
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            alert('Thank you for subscribing to our newsletter!');
        } else {
            alert('This email is already subscribed to our newsletter.');
        }
        
        newsletterForm.reset();
    });
}

// Contact form functionality
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Store message in localStorage
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push({
            name,
            email,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
});

// Shopping and Authentication logic
function requireAuth(redirectUrl) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        if (confirm('You need to login to access this feature. Would you like to login now?')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    return true;
}

// Shop Now button functionality
document.addEventListener('DOMContentLoaded', function() {
    const shopNowBtn = document.getElementById('shopNowButton');
    const shopModal = document.getElementById('shopModal');
    
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (requireAuth('login.html')) {
                shopModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                renderProducts();
                renderCart();
            }
        });
    }

    // View Details functionality for gallery items
    document.querySelectorAll('.btn-art').forEach(button => {
        button.addEventListener('click', (e) => {
            if (requireAuth('login.html')) {
                showProductDetails(e);
            }
        });
    });

    // Cart toggle functionality
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            if (requireAuth('login.html')) {
                const shopModal = document.getElementById('shopModal');
                shopModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                if (typeof renderProducts === 'function') renderProducts();
                if (typeof renderCart === 'function') renderCart();
            }
        });
    }

    // ... rest of the existing script.js code ...
});

// Update cart and storage
function updateCartAndStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display if cart section exists
    if (document.getElementById('cartItems')) {
        renderCart();
    }
    
    // Update cart badge count
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartToggle.setAttribute('data-count', totalItems);
    }
}