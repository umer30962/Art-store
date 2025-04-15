// Initialize auth state when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthDisplay(currentUser);
    initializeAuthListeners();
});

function updateAuthDisplay(currentUser) {
    const headerAuth = document.querySelector('.header-auth');
    const navLinks = document.querySelector('.nav-links');
    const contactLink = navLinks.querySelector('a[href*="contact"]');

    if (currentUser) {
        // Update header auth section
        headerAuth.innerHTML = `
            <a href="profile.html">${currentUser.name}</a>
            <span class="divider">|</span>
            <a href="#" id="logoutButton">Logout</a>
        `;

        // Remove login/register buttons
        const authLinks = navLinks.querySelectorAll('a[href="login.html"], a[href="register.html"]');
        authLinks.forEach(link => {
            const li = link.closest('li');
            if (li) li.remove();
        });

        // Add profile link if it doesn't exist
        if (!navLinks.querySelector('a[href="profile.html"]')) {
            const profileLi = document.createElement('li');
            profileLi.innerHTML = '<a href="profile.html">Profile</a>';
            if (contactLink) {
                navLinks.insertBefore(profileLi, contactLink.closest('li').nextSibling);
            } else {
                navLinks.appendChild(profileLi);
            }
        }

        // Add logout button functionality
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    } else {
        // Reset header auth to login/register links
        headerAuth.innerHTML = `
            <a href="login.html">Login</a>
            <span class="divider">|</span>
            <a href="register.html">Register</a>
        `;

        // Remove profile link if it exists
        const profileLink = navLinks.querySelector('a[href="profile.html"]');
        if (profileLink) {
            profileLink.closest('li').remove();
        }

        // Add login/register buttons if they don't exist
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        const registerLink = navLinks.querySelector('a[href="register.html"]');
        const shopButton = navLinks.querySelector('.btn-shop');

        if (!loginLink && !registerLink && contactLink) {
            const loginLi = document.createElement('li');
            const registerLi = document.createElement('li');

            loginLi.innerHTML = '<a href="login.html" class="btn-nav">Login</a>';
            registerLi.innerHTML = '<a href="register.html" class="btn-nav">Register</a>';

            if (shopButton) {
                navLinks.insertBefore(registerLi, shopButton.closest('li'));
                navLinks.insertBefore(loginLi, registerLi);
            } else {
                navLinks.appendChild(loginLi);
                navLinks.appendChild(registerLi);
            }
        }
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.reload();
}

function initializeAuthListeners() {
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Login form submission
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
        alert('Passwords do not match!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert('User with this email already exists!');
        return;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('Registration successful! You are now logged in.');
    window.location.href = 'index.html';
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password!');
    }
}

// Initialize cart badge
function updateCartBadge() {
    const cartToggle = document.querySelector('.cart-toggle');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartToggle) {
        cartToggle.setAttribute('data-count', itemCount);
    }
}

// Call updateCartBadge when page loads and when cart changes
document.addEventListener('DOMContentLoaded', updateCartBadge);
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartBadge();
    }
});