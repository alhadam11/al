/**
 * وكالة الحيدم للسفريات والسياحة
 * Slider JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds
    
    // Initialize slider
    function initSlider() {
        // Set first slide as active
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        // Start auto sliding
        startSlideInterval();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Go to next slide
    function nextSlide() {
        let index = currentSlide + 1;
        if (index >= slides.length) {
            index = 0;
        }
        goToSlide(index);
    }
    
    // Go to previous slide
    function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) {
            index = slides.length - 1;
        }
        goToSlide(index);
    }
    
    // Start auto sliding
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Stop auto sliding
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopSlideInterval();
            startSlideInterval();
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopSlideInterval();
            startSlideInterval();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            stopSlideInterval();
            startSlideInterval();
        });
    });
    
    // Pause slider on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideInterval);
        heroSlider.addEventListener('mouseleave', startSlideInterval);
    }
    
    // Initialize slider if it exists
    if (slides.length > 0) {
        initSlider();
    }
    
    // Testimonials Slider (if exists)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        const testimonialDots = testimonialSlider.querySelectorAll('.testimonial-dot');
        const testimonialPrev = testimonialSlider.querySelector('.testimonial-prev');
        const testimonialNext = testimonialSlider.querySelector('.testimonial-next');
        
        let currentTestimonial = 0;
        let testimonialInterval;
        
        // Initialize testimonial slider
        function initTestimonialSlider() {
            testimonials[0].classList.add('active');
            testimonialDots[0].classList.add('active');
            
            startTestimonialInterval();
        }
        
        // Go to specific testimonial
        function goToTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            
            currentTestimonial = index;
        }
        
        // Go to next testimonial
        function nextTestimonial() {
            let index = currentTestimonial + 1;
            if (index >= testimonials.length) {
                index = 0;
            }
            goToTestimonial(index);
        }
        
        // Go to previous testimonial
        function prevTestimonial() {
            let index = currentTestimonial - 1;
            if (index < 0) {
                index = testimonials.length - 1;
            }
            goToTestimonial(index);
        }
        
        // Start auto sliding
        function startTestimonialInterval() {
            testimonialInterval = setInterval(nextTestimonial, 6000);
        }
        
        // Stop auto sliding
        function stopTestimonialInterval() {
            clearInterval(testimonialInterval);
        }
        
        // Event listeners
        if (testimonialPrev && testimonialNext) {
            testimonialPrev.addEventListener('click', function() {
                prevTestimonial();
                stopTestimonialInterval();
                startTestimonialInterval();
            });
            
            testimonialNext.addEventListener('click', function() {
                nextTestimonial();
                stopTestimonialInterval();
                startTestimonialInterval();
            });
        }
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToTestimonial(index);
                stopTestimonialInterval();
                startTestimonialInterval();
            });
        });
        
        // Pause slider on hover
        testimonialSlider.addEventListener('mouseenter', stopTestimonialInterval);
        testimonialSlider.addEventListener('mouseleave', startTestimonialInterval);
        
        // Initialize testimonial slider
        if (testimonials.length > 0) {
            initTestimonialSlider();
        }
    }
});
