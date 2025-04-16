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
    if (authDropdown) {
        if (currentUser) {
            authDropdown.innerHTML = `
                <button class="auth-dropdown-toggle">
                    <i class="fas fa-user-circle"></i>
                    ${currentUser.name} 
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="auth-dropdown-menu">
                    <a href="profile.html"><i class="fas fa-user"></i>My Profile</a>
                    <a href="#"><i class="fas fa-shopping-bag"></i>My Orders</a>
                    <a href="#"><i class="fas fa-heart"></i>Wishlist</a>
                    <a href="#"><i class="fas fa-cog"></i>Settings</a>
                    <a href="#" id="headerLogout"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </div>
            `;
            
            const headerLogout = document.getElementById('headerLogout');
            if (headerLogout) {
                headerLogout.addEventListener('click', handleLogout);
            }
        } else {
            authDropdown.innerHTML = `
                <button class="auth-dropdown-toggle">
                    Account <i class="fas fa-chevron-down"></i>
                </button>
                <div class="auth-dropdown-menu">
                    <a href="login.html"><i class="fas fa-sign-in-alt"></i>Login</a>
                    <a href="register.html"><i class="fas fa-user-plus"></i>Register</a>
                </div>
            `;
        }
        initializeDropdownToggle();
    }

    // Update header-auth section
    const headerAuth = document.querySelector('.header-auth');
    if (headerAuth) {
        headerAuth.innerHTML = currentUser 
            ? `<a href="profile.html">${currentUser.name}</a><span class="divider">|</span><a href="#" id="headerLogout">Logout</a>`
            : `<a href="login.html">Login</a><span class="divider">|</span><a href="register.html">Register</a>`;
            
        const headerLogout = document.getElementById('headerLogout');
        if (headerLogout) {
            headerLogout.addEventListener('click', handleLogout);
        }
    }

    // Update navigation links
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Remove existing auth elements
        const existingAuthBtns = navLinks.querySelectorAll('.login, .register');
        existingAuthBtns.forEach(btn => btn.parentElement.remove());

        // Add appropriate buttons based on auth state
        const shopNowBtn = navLinks.querySelector('.btn-shop');
        if (shopNowBtn) {
            if (!currentUser) {
                shopNowBtn.insertAdjacentHTML('beforebegin', `
                    <li><a href="login.html" class="btn-nav login">Login</a></li>
                    <li><a href="register.html" class="btn-nav register">Register</a></li>
                `);
            }
        }
    }

    // Update nav-actions
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const existingDropdown = navActions.querySelector('.user-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        if (currentUser) {
            const userDropdown = document.createElement('div');
            userDropdown.className = 'user-dropdown';
            userDropdown.innerHTML = `
                <button class="user-link">
                    <i class="fas fa-user-circle"></i>
                    ${currentUser.name}
                    <i class="fas fa-chevron-down"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="profile.html"><i class="fas fa-user"></i> My Profile</a></li>
                    <li><a href="#"><i class="fas fa-shopping-bag"></i> My Orders</a></li>
                    <li><a href="#"><i class="fas fa-heart"></i> Wishlist</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                    <li class="divider"></li>
                    <li><a href="#" id="logoutButton"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            `;
            navActions.insertBefore(userDropdown, navActions.firstChild);

            // Add logout button functionality
            const logoutButton = userDropdown.querySelector('#logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', handleLogout);
            }
        }
    }
    
    // Update cart badge
    updateCartBadge();
}

function showAuthFeedback(message, isError = false) {
    const feedback = document.createElement('div');
    feedback.className = `auth-feedback ${isError ? 'error' : 'success'}`;
    feedback.innerHTML = `
        <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(feedback);
    
    // Remove feedback after 3 seconds
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

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showAuthFeedback('Passwords do not match!', true);
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        showAuthFeedback('User with this email already exists!', true);
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

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showAuthFeedback('Welcome back, ' + user.name + '!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAuthFeedback('Invalid email or password!', true);
    }
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