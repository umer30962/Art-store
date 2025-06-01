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
        name: "Urban Landscape",
        description: "Oil on canvas • 30\" × 40\"",
        price: 600,
        image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Portrait of a Lady",
        description: "Charcoal on paper • 18\" × 24\"",
        price: 350,
        image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Mountain Majesty",
        description: "Watercolor on paper • 22\" × 30\"",
        price: 400,
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Ocean Waves",
        description: "Oil on canvas • 36\" × 48\"",
        price: 700,
        image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Sunset Serenity",
        description: "Acrylic on canvas • 24\" × 36\"",
        price: 500,
        image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Abstract Forms",
        description: "Mixed media on canvas • 30\" × 40\"",
        price: 550,
        image: "https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Forest Path",
        description: "Oil on canvas • 24\" × 36\"",
        price: 450,
        image: "https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "City Reflections",
        description: "Fine art photography • Limited edition",
        price: 300,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Blue Harmony",
        description: "Acrylic on canvas • 24\" × 36\"",
        price: 450,
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Desert Mirage",
        description: "Oil on canvas • 30\" × 40\"",
        price: 600,
        image: "https://images.unsplash.com/photo-1515511856280-7b23f68d2996?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.hamburger')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
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

// Show feedback function
function showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `auth-feedback ${type}`;
    feedback.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Improve product details functionality with more detailed information
function showProductDetails(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showFeedback('Product not found', 'error');
        return;
    }
    
    // Enhanced product details with more information
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-content">
            <span class="close-modal">&times;</span>
            <div class="product-details-grid">
                <div class="product-details-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
                </div>
                <div class="product-details-info">
                    <h2>${product.name}</h2>
                    <p class="artist-name">By Sarah Johnson</p>
                    <div class="product-specs">
                        <p><strong>Medium:</strong> ${product.description.split('•')[0].trim()}</p>
                        <p><strong>Size:</strong> ${product.description.split('•')[1]?.trim() || 'Dimensions vary'}</p>
                        <p><strong>Year:</strong> 2024</p>
                        <p><strong>Style:</strong> Contemporary</p>
                    </div>
                    <p class="product-description">
                        This stunning piece showcases the artist's masterful technique and unique vision. 
                        The artwork demonstrates exceptional craftsmanship and attention to detail, 
                        making it a valuable addition to any collection. Each piece is original and 
                        comes with a certificate of authenticity.
                    </p>
                    <p class="product-price-large">$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="btn btn-outline inquire-button">Inquire</button>
                    </div>
                    <div class="product-details-extras">
                        <div class="detail-item">
                            <h4>Shipping</h4>
                            <p>Free worldwide shipping • Delivery within 5-7 business days</p>
                        </div>
                        <div class="detail-item">
                            <h4>Returns</h4>
                            <p>30-day money-back guarantee for undamaged items</p>
                        </div>
                        <div class="detail-item">
                            <h4>Authenticity</h4>
                            <p>Includes certificate of authenticity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
      // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const inquireBtn = modal.querySelector('.inquire-button');
    
    closeBtn.addEventListener('click', () => modal.remove());
    
    // Note: Add to Cart is handled by event delegation in cart.setupEventListeners()
    // No need to add a direct event listener here to avoid duplicate additions
    
    inquireBtn.addEventListener('click', () => {
        window.location.href = `#contact?product=${product.id}`;
        modal.remove();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Display search results with error handling
function displaySearchResults(results, query) {
    const resultsContainer = document.querySelector('.search-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <p>No results found for "${query}"</p>
                <p>Try different keywords or browse our gallery</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = results.map(product => `
            <div class="art-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn-art" data-id="${product.id}">View Details</button>
            </div>
        `).join('');
        
        // Reinitialize product event listeners
        resultsContainer.querySelectorAll('.btn-art').forEach(button => {
            button.addEventListener('click', showProductDetails);
        });
    }
}

// DOM Elements Cache
const elements = {
    authDropdown: () => document.querySelector('.auth-dropdown'),
    authMenu: () => document.querySelector('.auth-menu'),
    cartToggle: () => document.querySelector('.cart-toggle'),
    mobileMenu: () => document.querySelector('.mobile-menu'),
    navLinks: () => document.querySelector('.nav-links')
};

// Initialize App
function initializeApp() {
    // Check if auth is available (loaded from auth.js)
    if (window.auth) {
        window.auth.init();
    }
    initializeEventListeners();
    
    // initializeDropdownToggle is defined in auth.js, skip if not available
    if (typeof initializeDropdownToggle === 'function') {
        initializeDropdownToggle();
    }
    
    if (window.location.pathname.includes('profile.html')) {
        initializeProfile();
    }
}

// Event Listeners
function initializeEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        // Mobile menu
        initializeMobileMenu();

        // Storage events
        window.addEventListener('storage', handleStorageChange);
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenu = elements.mobileMenu();
    const navLinks = elements.navLinks();
    
    if (!mobileMenu || !navLinks) return;
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Profile Page
function initializeProfile() {
    if (!window.auth || !window.auth.requireAuth()) {
        window.location.href = 'login.html';
        return;
    }

    displayUserProfile();
    displayOrderHistory();
}

function displayUserProfile() {
    const profileInfo = document.getElementById('profileInfo');
    if (!profileInfo || !window.auth || !window.auth.currentUser) return;
    
    profileInfo.innerHTML = `
        <h2>${window.auth.currentUser.name}'s Profile</h2>
        <p>Email: ${window.auth.currentUser.email}</p>
    `;
}

function displayOrderHistory() {
    const orderHistory = document.getElementById('orderHistory');
    if (!orderHistory || !window.auth || !window.auth.currentUser) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.userEmail === window.auth.currentUser.email);
    
    orderHistory.innerHTML = userOrders.length ? 
        userOrders.map(order => createOrderElement(order)).join('') :
        '<p>No orders yet</p>';
}

function createOrderElement(order) {
    return `
        <div class="order-item">
            <h4>Order #${order.id}</h4>
            <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
            <p>Total: $${order.total.toFixed(2)}</p>
        </div>
    `;
}

// Storage event handler
function handleStorageChange(e) {
    if (e.key === 'cart') {
        cart.updateCartDisplay();
    }
}

// Cart Management
const cart = {
    items: [],    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateCartDisplay();
        
        // Check if we're on the cart page
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    },    setupEventListeners() {
        // Use event delegation for add to cart buttons (including modal buttons)
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-add-to-cart')) {
                e.preventDefault();
                e.stopPropagation();
                const productId = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === productId);
                if (product) {
                    this.addItem(product);
                    
                    // If this button is in a modal, close the modal
                    const modal = e.target.closest('.product-modal');
                    if (modal) {
                        modal.remove();
                    }
                }
            }
        });
        
        // Quantity buttons on cart page
        if (window.location.pathname.includes('cart.html')) {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('quantity-btn')) {
                    const productId = parseInt(e.target.dataset.id);
                    const isIncrease = e.target.classList.contains('increase');
                    this.updateQuantity(productId, isIncrease);
                }
                
                if (e.target.classList.contains('cart-item-remove')) {
                    const productId = parseInt(e.target.dataset.id);
                    this.removeItem(productId);
                }
            });
        }
    },
    
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        this.items = savedCart ? JSON.parse(savedCart) : [];
    },
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartDisplay();
    },    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        showFeedback('Added to cart successfully!');
    },
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
        
        showFeedback('Item removed from cart');
    },
    
    updateQuantity(productId, isIncrease) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (isIncrease) {
                item.quantity++;
            } else if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.removeItem(productId);
                return;
            }
            this.saveCart();
            this.renderCartPage();
        }
    },
    
    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    },
    
    calculateTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    renderCartPage() {
        const cartItemsContainer = document.querySelector('.cart-items-container');
        const cartSubtotal = document.querySelector('.cart-subtotal');
        const cartTotal = document.querySelector('.cart-total');
        
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <a href="index.html#gallery" class="btn continue-shopping">Start Shopping</a>
                </div>
            `;
            if (cartSubtotal) cartSubtotal.textContent = '$0.00';
            if (cartTotal) cartTotal.textContent = '$0.00';
            return;
        }
        
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        const total = this.calculateTotal();
        if (cartSubtotal) cartSubtotal.textContent = `$${total.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    },
    
    proceedToCheckout() {
        if (!this.items.length) {
            showFeedback('Your cart is empty', 'error');
            return;
        }
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            showFeedback('Please login to checkout', 'error');
            window.location.href = 'login.html';
            return;
        }
        
        showFeedback('Processing checkout...');
        // Implement checkout process
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    cart.init();
      // Initialize product detail buttons with event delegation
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-art')) {
            e.preventDefault();
            showProductDetails(e);
        }
    });
    
    // Initialize search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input[type="search"]');
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) {
                showFeedback('Please enter a search term', 'error');
                return;
            }
            
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query)
            );
            
            displaySearchResults(filteredProducts, query);
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => cart.proceedToCheckout());
    }
});

// Search functionality for navigation bar
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.nav-search-input');
    const searchIcon = document.querySelector('.search-toggle');
    
    if (searchInput && searchIcon) {
        searchIcon.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(query.toLowerCase()) || 
                    product.description.toLowerCase().includes(query.toLowerCase())
                );
                displaySearchResults(filteredProducts, query);
            }
        });

        // Also trigger search on enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const filteredProducts = products.filter(product => 
                        product.name.toLowerCase().includes(query.toLowerCase()) || 
                        product.description.toLowerCase().includes(query.toLowerCase())
                    );
                    displaySearchResults(filteredProducts, query);
                }
            }
        });
    }
});

// Initialize app on page load
document.addEventListener('DOMContentLoaded', initializeApp);