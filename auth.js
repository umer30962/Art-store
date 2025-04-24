// Initialize auth state when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthDisplay(currentUser);
    initializeAuthListeners();
    updateCartBadge();
    initializeDropdownToggle();
});

// Initialize dropdown toggle functionality
function initializeDropdownToggle() {
    const dropdownToggle = document.querySelector('.auth-dropdown-toggle');
    const dropdownMenu = document.querySelector('.auth-dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
            const icon = dropdownToggle.querySelector('i');
            icon.style.transform = dropdownMenu.classList.contains('active') ? 'rotate(180deg)' : '';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.auth-dropdown')) {
                dropdownMenu.classList.remove('active');
                const icon = dropdownToggle.querySelector('i');
                icon.style.transform = '';
            }
        });
    }
}

// Update auth display
function updateAuthDisplay(currentUser) {
    const authDropdown = document.querySelector('.auth-dropdown');
    const authToggle = document.querySelector('.auth-toggle');
    const authMenu = document.querySelector('.auth-menu');
    
    if (authDropdown && authToggle) {
        if (currentUser) {
            // Update toggle button content
            authToggle.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>${currentUser.name}</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            // Update menu content for logged in user
            if (authMenu) {
                authMenu.innerHTML = `
                    <a href="profile.html"><i class="fas fa-user"></i>My Profile</a>
                    <a href="#"><i class="fas fa-shopping-bag"></i>My Orders</a>
                    <a href="#"><i class="fas fa-heart"></i>Wishlist</a>
                    <a href="#"><i class="fas fa-cog"></i>Settings</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i>Logout</a>
                `;
                
                // Add logout functionality
                const logoutBtn = authMenu.querySelector('#logoutBtn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', handleLogout);
                }
            }
        } else {
            // Update for logged out user
            authToggle.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>Account</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            if (authMenu) {
                authMenu.innerHTML = `
                    <a href="login.html"><i class="fas fa-sign-in-alt"></i>Login</a>
                    <a href="register.html"><i class="fas fa-user-plus"></i>Register</a>
                `;
            }
        }

        // Toggle menu on click (especially for mobile)
        authToggle.addEventListener('click', (e) => {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                authMenu.classList.toggle('show');
                authToggle.setAttribute('aria-expanded', 
                    authMenu.classList.contains('show'));
            }
        });
    }
    
    // Update cart badge
    updateCartBadge();
}

function showAuthFeedback(message, isError = false) {
    // Remove any existing feedback
    const existingFeedback = document.querySelector('.auth-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = `auth-feedback ${isError ? 'error' : 'success'}`;
    feedback.innerHTML = `
        <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function requireAuth(successCallback, message = 'Please log in to continue') {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showAuthFeedback(message, true);
        if (confirm('You need to login to access this feature. Would you like to login now?')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    if (typeof successCallback === 'function') {
        successCallback();
    }
    return true;
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    showAuthFeedback('Successfully logged out. See you again!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Authentication form handlers
function initializeAuthListeners() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Add error handling and validation to login form
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAuthFeedback('Please fill in all fields', true);
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showAuthFeedback('Invalid email or password', true);
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    showAuthFeedback('Login successful! Welcome back.');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Add validation to registration form
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showAuthFeedback('Please fill in all fields', true);
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthFeedback('Passwords do not match', true);
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        showAuthFeedback('An account with this email already exists', true);
        return;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showAuthFeedback('Registration successful! Welcome to Timeless Art.');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Update profile page functionality
function initializeProfile() {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const orderHistory = document.getElementById('orderHistory');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    if (profileName) profileName.textContent = currentUser.name;
    if (profileEmail) profileEmail.textContent = currentUser.email;

    // Display order history if exists
    if (orderHistory) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => order.userId === currentUser.email);
        
        if (userOrders.length === 0) {
            orderHistory.innerHTML = '<p>No orders yet.</p>';
        } else {
            orderHistory.innerHTML = userOrders.map(order => `
                <div class="order-item">
                    <h4>Order #${order.id}</h4>
                    <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                    <p>Total: $${order.total.toFixed(2)}</p>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-product">
                                <span>${item.name}</span>
                                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    }
}

// Initialize profile if on profile page
if (window.location.pathname.includes('profile.html')) {
    initializeProfile();
}

// Update cart functions
function addToCart(productId) {
    if (!requireAuth()) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showAuthFeedback('Item added to cart!');
}

// Checkout functionality
function handleCheckout() {
    if (!requireAuth()) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showAuthFeedback('Your cart is empty!', true);
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const order = {
        id: Date.now(),
        userId: currentUser.email,
        date: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('cart', JSON.stringify([]));
    
    showAuthFeedback('Order placed successfully!');
    updateCartBadge();
    
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

// Cart badge update
function updateCartBadge() {
    const cartToggle = document.querySelector('.cart-toggle');
    if (!cartToggle) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartToggle.setAttribute('data-count', itemCount);
}

// Listen for cart changes
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartBadge();
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');
    
    if (mobileMenu && navLinks && header) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            header.classList.toggle('nav-open');
            
            // Toggle aria-expanded
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded);
            
            // Toggle body scroll
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                header.classList.remove('nav-open');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.mobile-menu')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                header.classList.remove('nav-open');
                document.body.style.overflow = '';
            }
        });
    }
});

// Authentication related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthUI(currentUser);

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store current user
                localStorage.setItem('currentUser', JSON.stringify({
                    name: user.name,
                    email: user.email
                }));
                showAuthFeedback('Login successful!');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showAuthFeedback('Invalid email or password', true);
            }
        });
    }

    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showAuthFeedback('Passwords do not match', true);
                return;
            }
            
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if user already exists
            if (users.some(user => user.email === email)) {
                showAuthFeedback('Email already registered', true);
                return;
            }
            
            // Add new user
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            showAuthFeedback('Registration successful! Please login.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            showAuthFeedback('Logged out successfully');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Profile page handler
    if (window.location.pathname.includes('profile.html')) {
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        // Update profile information
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        
        // Load order history if any
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => order.userEmail === currentUser.email);
        const orderHistory = document.getElementById('orderHistory');
        
        if (userOrders.length === 0) {
            orderHistory.innerHTML = '<p>No orders yet</p>';
        } else {
            orderHistory.innerHTML = userOrders.map(order => `
                <div class="order-item">
                    <h4>Order #${order.id}</h4>
                    <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                    <p>Total: $${order.total}</p>
                </div>
            `).join('');
        }
    }
});

// Update UI based on auth state
function updateAuthUI(currentUser) {
    const authDropdown = document.querySelector('.auth-dropdown');
    if (!authDropdown) return;

    const authMenu = authDropdown.querySelector('.auth-menu');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (currentUser) {
        // User is logged in
        if (userDisplayName) {
            userDisplayName.textContent = currentUser.name;
        }
        
        authMenu.innerHTML = `
            <a href="profile.html"><i class="fas fa-user"></i>Profile</a>
            <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i>Logout</a>
        `;
        
        // Add logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                showAuthFeedback('Logged out successfully');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            });
        }
    } else {
        // User is not logged in
        if (userDisplayName) {
            userDisplayName.textContent = 'Account';
        }
        
        authMenu.innerHTML = `
            <a href="login.html"><i class="fas fa-sign-in-alt"></i>Login</a>
            <a href="register.html"><i class="fas fa-user-plus"></i>Register</a>
        `;
    }
}

// User authentication state
const auth = {
    currentUser: null,
    
    // Check if user is logged in
    requireAuth() {
        return this.currentUser !== null;
    },

    // Initialize auth functionality
    init() {
        // Check for existing login
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    },

    // Handle login form submission
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!email || !password) {
            showFeedback('Please fill in all fields', 'error');
            return;
        }
        
        // In a real app, this would make an API call
        // For demo purposes, we'll simulate a successful login
        this.currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        showFeedback('Login successful!', 'success');
        window.location.href = 'profile.html';
    },

    handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        this.currentUser = null;
        window.location.href = 'index.html';
    },

    // Update UI for logged-in user
    updateUIForLoggedInUser() {
        const userDisplayName = document.getElementById('userDisplayName');
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        
        if (userDisplayName) {
            userDisplayName.textContent = this.currentUser.name;
        }
        
        if (profileName) {
            profileName.textContent = this.currentUser.name;
        }
        
        if (profileEmail) {
            profileEmail.textContent = this.currentUser.email;
        }
    }
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => auth.handleLogin(e));
    }

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => auth.handleLogout(e));
    }

    auth.init();
});

// Feedback display utility
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Export auth object
window.auth = auth;