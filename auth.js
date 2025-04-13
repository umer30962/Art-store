document.addEventListener('DOMContentLoaded', function() {
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                alert('User with this email already exists!');
                return;
            }
            
            // Create new user
            const newUser = {
                name,
                email,
                password // Note: In a real app, you would hash the password
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            alert('Registration successful! You are now logged in.');
            window.location.href = 'index.html';
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
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
        });
    }
    
    // Update navigation based on login status
    updateNavForAuth();
});

function updateNavForAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    if (currentUser) {
        // Remove login/register links
        const authLinks = navLinks.querySelectorAll('a[href="login.html"], a[href="register.html"]');
        authLinks.forEach(link => link.parentElement.remove());
        
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
    }
}