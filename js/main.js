// Home Section Code

document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#homeCarousel');

    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 3000,   // Auto-slide every 3 seconds
            ride: 'carousel', // Start automatically
            pause: false,     // Disable pause on hover
            wrap: true        // Infinite loop
        });
    }
});

// About Section Code

document.addEventListener("DOMContentLoaded", function () {

    // 1. Smooth Scroll to #service
    const serviceLink = document.querySelector('.about-link a');

    if (serviceLink) {
        serviceLink.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#service');

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 2. Animate About section on scroll (fadeIn when in viewport)
    const aboutSection = document.querySelector('.about');

    if (aboutSection) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutSection.classList.add('visible');
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            },
            {
                threshold: 0.3
            }
        );

        observer.observe(aboutSection);
    }
});

// Service Section Code

// Contact Section Code

// Form Popup Code
document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("vhfEAlT_r2FYls8WJ"); // Initialize EmailJS

    const form = document.getElementById('contact-form');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, isSuccess = true) {
        if (!toastContainer) {
            alert(message); // fallback alert if no container
            return;
        }

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${isSuccess ? 'success' : 'danger'} border-0 show`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.style.minWidth = '250px';
        toast.style.marginTop = '10px';
        toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        toast.style.borderRadius = '8px';

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body" style="font-weight:600; padding:12px 16px;">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
            </div>
        `;

        toast.querySelector('button').addEventListener('click', () => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        });

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop form from submitting normally

            // Get values trimmed
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const phone = form.querySelector('#phone').value.trim();
            const message = form.querySelector('#message').value.trim();

            // Validate fields non-empty
            if (!name || !email || !phone || !message) {
                showToast('Please fill in all fields before submitting.', false);
                return;
            }

            // Validate email format (basic)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showToast('Please enter a valid email address.', false);
                return;
            }

            // Validate phone number (basic: only digits, length 7-15)
            const phonePattern = /^[0-9]{7,15}$/;
            if (!phonePattern.test(phone)) {
                showToast('Please enter a valid phone number (7 to 15 digits).', false);
                return;
            }

            // If validation passed, send email
            emailjs.sendForm('service_2zkgojg', 'template_n4a4rie', form)
                .then(() => {
                    showToast('Message sent successfully!', true);
                    form.reset();
                })
                .catch((error) => {
                    showToast('Failed to send message. Please try again later.', false);
                    console.error('EmailJS Error:', error);
                });
        });
    } else {
        console.error('Form with id "contact-form" not found!');
    }
});

// FAQ section code
new WOW().init();

