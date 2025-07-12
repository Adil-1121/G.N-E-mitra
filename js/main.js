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