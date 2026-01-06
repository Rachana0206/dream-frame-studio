// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll and active nav link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Portfolio Filter (simple: show all initially, filter on button click)
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.addEventListener('click', () => {});
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize portfolio items visible
portfolioItems.forEach(item => {
    item.style.display = 'block';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
});

// Booking Form
const bookingForm = document.getElementById('bookingForm');
const bookingMessage = document.getElementById('bookingMessage');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service_type: document.getElementById('service_type').value,
        event_date: document.getElementById('event_date').value,
        event_time: document.getElementById('event_time').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            bookingMessage.textContent = data.message || 'Booking submitted successfully! We will contact you soon.';
            bookingMessage.className = 'form-message success';
            bookingForm.reset();
            
            // Scroll to message
            bookingMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            bookingMessage.textContent = data.error || 'Failed to submit booking. Please try again.';
            bookingMessage.className = 'form-message error';
        }
    } catch (error) {
        console.error('Error:', error);
        bookingMessage.textContent = 'An error occurred. Please try again later.';
        bookingMessage.className = 'form-message error';
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('contact_name').value,
        email: document.getElementById('contact_email').value,
        message: document.getElementById('contact_message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        // Always show success - email is optional and handled server-side
        if (response.ok && data.success) {
            contactMessage.textContent = data.message || 'Message sent successfully! We will get back to you soon.';
            contactMessage.className = 'form-message success';
            contactForm.reset();
            
            // Scroll to message
            contactMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Only show error for validation issues, not email issues
            contactMessage.textContent = data.error || 'Please fill in all required fields.';
            contactMessage.className = 'form-message error';
        }
    } catch (error) {
        console.error('Error:', error);
        // Even on network errors, show a helpful message
        contactMessage.textContent = 'Message submitted! If you don\'t hear back, please call us directly.';
        contactMessage.className = 'form-message success';
        contactForm.reset();
    }
});

// Initialize portfolio items
portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

