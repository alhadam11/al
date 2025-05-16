/**
 * وكالة الحيدم للسفريات والسياحة
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    // Create close button
    const closeMenu = document.createElement('div');
    closeMenu.classList.add('close-menu');
    closeMenu.innerHTML = '<i class="fas fa-times"></i>';
    mainNav.appendChild(closeMenu);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.add('active');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    function closeMainNav() {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    closeMenu.addEventListener('click', closeMainNav);
    menuOverlay.addEventListener('click', closeMainNav);
    
    // Search Box Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header-top');
    let headerHeight = header.offsetHeight;
    let scrollPosition = window.scrollY;
    
    function handleScroll() {
        scrollPosition = window.scrollY;
        
        if (window.innerWidth > 991) {
            if (scrollPosition > headerTop.offsetHeight) {
                header.classList.add('sticky');
                body.style.paddingTop = headerHeight + 'px';
            } else {
                header.classList.remove('sticky');
                body.style.paddingTop = '0';
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', function() {
        headerHeight = header.offsetHeight;
        handleScroll();
    });
    
    // Initialize AOS Animation Library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Create error message if not exists
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = 'هذا الحقل مطلوب';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
            
            // Create error message if not exists
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        } else {
            input.classList.remove('error');
            
            // Remove error message if exists
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    return isValid;
}

// Email Validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('newsletter-form')) {
            // Here you would normally send the data to your server
            // For now, we'll just show a success message
            const input = this.querySelector('input');
            const successMsg = document.createElement('div');
            successMsg.classList.add('success-message');
            successMsg.textContent = 'تم الاشتراك بنجاح!';
            
            this.innerHTML = '';
            this.appendChild(successMsg);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.innerHTML = `
                    <input type="email" placeholder="البريد الإلكتروني" required>
                    <button type="submit" class="btn btn-primary">اشتراك</button>
                `;
            }, 3000);
        }
    });
}
