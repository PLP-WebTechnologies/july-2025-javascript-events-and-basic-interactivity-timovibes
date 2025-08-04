// =========================================
// INTERACTIVE WEB PAGE JAVASCRIPT
// =========================================

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initThemeToggle();
    initInteractiveCounter();
    initTabbedInterface();
    initFAQSection();
    initFormValidation();
});

// =========================================
// PART 1: THEME TOGGLE (Dark/Light Mode)
// =========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        }
        
        // Add a smooth transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

// =========================================
// PART 2: INTERACTIVE COUNTER GAME
// =========================================

function initInteractiveCounter() {
    // Get counter elements
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    const clickCount = document.getElementById('clickCount');
    
    // Counter state
    let count = 0;
    let totalClicks = 0;
    
    // Update counter display with animation
    function updateCounterDisplay() {
        counterValue.textContent = count;
        clickCount.textContent = totalClicks;
        
        // Add visual feedback animation
        counterValue.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 150);
        
        // Change color based on value
        if (count > 0) {
            counterValue.style.color = '#28a745'; // Green for positive
        } else if (count < 0) {
            counterValue.style.color = '#dc3545'; // Red for negative
        } else {
            counterValue.style.color = 'var(--primary-color)'; // Default for zero
        }
    }
    
    // Increment button event listener
    incrementBtn.addEventListener('click', function() {
        count++;
        totalClicks++;
        updateCounterDisplay();
        
        // Add button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Decrement button event listener
    decrementBtn.addEventListener('click', function() {
        count--;
        totalClicks++;
        updateCounterDisplay();
        
        // Add button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Reset button event listener
    resetBtn.addEventListener('click', function() {
        count = 0;
        totalClicks = 0;
        updateCounterDisplay();
        
        // Special reset animation
        counterValue.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Keyboard support for counter
    document.addEventListener('keydown', function(event) {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            switch(event.key) {
                case 'ArrowUp':
                case '+':
                    event.preventDefault();
                    incrementBtn.click();
                    break;
                case 'ArrowDown':
                case '-':
                    event.preventDefault();
                    decrementBtn.click();
                    break;
                case 'r':
                case 'R':
                    event.preventDefault();
                    resetBtn.click();
                    break;
            }
        }
    });
}

// =========================================
// PART 3: TABBED INTERFACE
// =========================================

function initTabbedInterface() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Keyboard navigation for tabs
    document.addEventListener('keydown', function(event) {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            const activeTab = document.querySelector('.tab-btn.active');
            const allTabs = Array.from(tabButtons);
            const currentIndex = allTabs.indexOf(activeTab);
            
            if (event.key === 'ArrowLeft' && currentIndex > 0) {
                event.preventDefault();
                allTabs[currentIndex - 1].click();
            } else if (event.key === 'ArrowRight' && currentIndex < allTabs.length - 1) {
                event.preventDefault();
                allTabs[currentIndex + 1].click();
            }
        }
    });
}

// =========================================
// PART 4: COLLAPSIBLE FAQ SECTION
// =========================================

function initFAQSection() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
        
        // Add hover effects
        question.addEventListener('mouseenter', function() {
            if (!item.classList.contains('active')) {
                this.style.backgroundColor = 'var(--card-bg)';
            }
        });
        
        question.addEventListener('mouseleave', function() {
            if (!item.classList.contains('active')) {
                this.style.backgroundColor = 'var(--bg-color)';
            }
        });
    });
}

// =========================================
// PART 5: CUSTOM FORM VALIDATION
// =========================================

function initFormValidation() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form field elements
    const fields = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        message: document.getElementById('message'),
        terms: document.getElementById('terms')
    };
    
    // Error message elements
    const errors = {
        fullName: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        password: document.getElementById('passwordError'),
        message: document.getElementById('messageError'),
        terms: document.getElementById('termsError')
    };
    
    // Validation rules and patterns
    const validation = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s'-]+$/,
            message: 'Please enter a valid full name (letters, spaces, hyphens, and apostrophes only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 500,
            message: 'Message must be between 10 and 500 characters'
        }
    };
    
    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validation[fieldName];
        if (!rules) return { isValid: true, message: '' };
        
        // Check if required field is empty
        if (rules.required && (!value || value.trim().length === 0)) {
            return { isValid: false, message: `${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} is required` };
        }
        
        // Skip other validations if field is empty and not required
        if (!rules.required && (!value || value.trim().length === 0)) {
            return { isValid: true, message: '' };
        }
        
        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: `Minimum ${rules.minLength} characters required` };
        }
        
        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: `Maximum ${rules.maxLength} characters allowed` };
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }
        
        return { isValid: true, message: '' };
    }
    
    // Update field UI based on validation result
    function updateFieldUI(fieldName, isValid, message) {
        const field = fields[fieldName];
        const errorElement = errors[fieldName];
        
        if (!field || !errorElement) return;
        
        // Remove existing classes
        field.classList.remove('valid', 'error');
        
        if (isValid) {
            field.classList.add('valid');
            errorElement.textContent = '';
        } else {
            field.classList.add('error');
            errorElement.textContent = message;
        }
    }
    
    // Real-time validation on input
    Object.keys(fields).forEach(fieldName => {
        if (fields[fieldName] && fieldName !== 'terms') {
            fields[fieldName].addEventListener('input', function() {
                const result = validateField(fieldName, this.value);
                updateFieldUI(fieldName, result.isValid, result.message);
            });
            
            // Additional blur validation for better UX
            fields[fieldName].addEventListener('blur', function() {
                const result = validateField(fieldName, this.value);
                updateFieldUI(fieldName, result.isValid, result.message);
            });
        }
    });
    
    // Special handling for terms checkbox
    fields.terms.addEventListener('change', function() {
        const errorElement = errors.terms;
        if (this.checked) {
            errorElement.textContent = '';
        } else {
            errorElement.textContent = 'You must agree to the terms and conditions';
        }
    });
    
    // Password strength indicator
    fields.password.addEventListener('input', function() {
        const password = this.value;
        const strengthIndicators = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[@$!%*?&]/.test(password)
        };
        
        const strength = Object.values(strengthIndicators).filter(Boolean).length;
        let strengthText = '';
        let strengthColor = '';
        
        if (password.length === 0) {
            strengthText = '';
        } else if (strength < 3) {
            strengthText = 'Weak';
            strengthColor = '#dc3545';
        } else if (strength < 5) {
            strengthText = 'Medium';
            strengthColor = '#ffc107';
        } else {
            strengthText = 'Strong';
            strengthColor = '#28a745';
        }
        
        // Update password field border color based on strength
        if (strengthText) {
            this.style.borderColor = strengthColor;
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isFormValid = true;
        const formData = new FormData(form);
        
        // Validate all fields
        Object.keys(fields).forEach(fieldName => {
            if (fieldName === 'terms') {
                if (!fields.terms.checked) {
                    errors.terms.textContent = 'You must agree to the terms and conditions';
                    isFormValid = false;
                } else {
                    errors.terms.textContent = '';
                }
            } else if (fields[fieldName]) {
                const result = validateField(fieldName, fields[fieldName].value);
                updateFieldUI(fieldName, result.isValid, result.message);
                if (!result.isValid) {
                    isFormValid = false;
                }
            }
        });
        
        // If form is valid, show success message
        if (isFormValid) {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form after 3 seconds and show it again
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.classList.add('hidden');
                
                // Reset all field styles
                Object.keys(fields).forEach(fieldName => {
                    if (fields[fieldName]) {
                        fields[fieldName].classList.remove('valid', 'error');
                        if (errors[fieldName]) {
                            errors[fieldName].textContent = '';
                        }
                    }
                });
                
                // Scroll back to form
                form.scrollIntoView({ behavior: 'smooth' });
            }, 3000);
            
            console.log('Form submitted successfully with data:', Object.fromEntries(formData));
        } else {
            // Scroll to first error field
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }
    });
    
    // Add form field animations
    Object.keys(fields).forEach(fieldName => {
        if (fields[fieldName]) {
            fields[fieldName].addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            fields[fieldName].addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// =========================================
// ADDITIONAL UTILITY FUNCTIONS
// =========================================

// Smooth scrolling for anchor links (if any are added)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states for interactive elements
function addLoadingState(element, duration = 1000) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.disabled = true;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.disabled = false;
    }, duration);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    
    // Add some easter eggs for fun
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(event) {
        konamiCode.push(event.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg: Make the page more colorful
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #eb4d4b, #6c5ce7)';
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.animation = 'rainbow 3s ease infinite';
            
            // Add rainbow animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.background = '';
                document.body.style.animation = '';
                document.head.removeChild(style);
            }, 5000);
            
            konamiCode = [];
        }
    });
});

// Performance monitoring (optional - for development)
if (typeof performance !== 'undefined') {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }, 0);
    });
}