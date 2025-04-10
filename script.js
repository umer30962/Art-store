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