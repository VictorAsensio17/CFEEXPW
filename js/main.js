/* ============================================
   JAVASCRIPT - CLUB FINANZAS EXTREMADURA
   ============================================ */

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update active link
                updateActiveLink(href);
            }
        }
    });
});

// Function to scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update active navigation link
function updateActiveLink(href) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-links a[href="${href}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Add active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    if (current) {
        updateActiveLink(current);
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const ctaButton = document.querySelector('.cta-button');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // This would require mobile menu structure - placeholder for now
        console.log('Mobile menu toggled');
    });
}

// Form submission handler
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            degree: document.getElementById('degree').value,
            interests: document.getElementById('interests').value,
            timestamp: new Date().toLocaleString('es-ES')
        };
        
        // Here you would normally send data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        showNotification('¡Solicitud enviada correctamente! Nos pondremos en contacto pronto.', 'success');
        
        // Reset form
        admissionForm.reset();
        
        // Optional: Clear success message after 5 seconds
        setTimeout(() => {
            removeNotification();
        }, 5000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if present
    removeNotification();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.id = 'notification';
    
    const styles = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    notification.style.cssText = styles;
    document.body.appendChild(notification);
}

function removeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in effect to elements
document.querySelectorAll('.pillar-card, .event-card, .resource-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Market data update simulation
function updateMarketData() {
    // This is a simulation - in production, connect to a real API
    const marketItems = document.querySelectorAll('.market-item');
    
    marketItems.forEach(item => {
        const changeElement = item.querySelector('.market-change');
        if (changeElement) {
            // Simulate small random changes
            const isPositive = Math.random() > 0.5;
            const change = (Math.random() * 2).toFixed(2);
            
            changeElement.className = `market-change ${isPositive ? 'positive' : 'negative'}`;
            changeElement.textContent = `${isPositive ? '+' : '-'}${change}%`;
        }
    });
}

// Update market data every 5 seconds
// setInterval(updateMarketData, 5000);

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced form validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
            showNotification('Por favor, ingresa un email válido.', 'error');
        } else {
            this.style.borderColor = '#ecf0f1';
        }
    });
}

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Procesando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Log page load
console.log('Club Finanzas Extremadura - Sitio web cargado correctamente');
