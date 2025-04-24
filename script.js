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
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

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

// Improve product details functionality with error handling
function showProductDetails(event) {
    if (!requireAuth()) {
        showFeedback('Please log in to view product details', 'error');
        return;
    }
    
    const productId = parseInt(event.currentTarget.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showFeedback('Product not found', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-content">
            <span class="close-modal">&times;</span>
            <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.querySelector('.btn-add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
        modal.remove();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Cart functionality with error handling
const cart = {
    items: [],
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartBadge();
    },
    
    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.saveCart();
            this.updateCartBadge();
        }
    },
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId);
            }
            this.saveCart();
            this.updateCartBadge();
        }
    },
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        this.items = savedCart ? JSON.parse(savedCart) : [];
        this.updateCartBadge();
    },
    
    updateCartBadge() {
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
        }
    },
    
    clear() {
        this.items = [];
        this.saveCart();
        this.updateCartBadge();
    }
};

// Initialize cart when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    cart.loadCart();
    
    // Initialize product event listeners
    document.querySelectorAll('.btn-art').forEach(button => {
        button.addEventListener('click', showProductDetails);
    });
    
    // Initialize search functionality with error handling
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
});

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

// Import auth module from auth.js
const { auth } = window;

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
    auth.init();
    initializeEventListeners();
    updateCartBadge();
    initializeDropdownToggle();
    
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

// UI Updates
function updateCartBadge() {
    const cartToggle = elements.cartToggle();
    if (!cartToggle) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartToggle.setAttribute('data-count', itemCount);
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
    if (!auth.requireAuth()) {
        window.location.href = 'login.html';
        return;
    }

    displayUserProfile();
    displayOrderHistory();
}

function displayUserProfile() {
    const profileInfo = document.getElementById('profileInfo');
    if (!profileInfo || !auth.currentUser) return;
    
    profileInfo.innerHTML = `
        <h2>${auth.currentUser.name}'s Profile</h2>
        <p>Email: ${auth.currentUser.email}</p>
    `;
}

function displayOrderHistory() {
    const orderHistory = document.getElementById('orderHistory');
    if (!orderHistory || !auth.currentUser) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.userEmail === auth.currentUser.email);
    
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
        updateCartBadge();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initializeApp);