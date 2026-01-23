document.addEventListener('DOMContentLoaded', () => {
    // Initial Testimonial Data
    const testimonials = [
        {
            name: "Rahul Sharma",
            location: "Ajmer, Rajasthan",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "Excellent service! G.N E-Mitra helped me with my PAN card application quickly. The staff is very professional and helpful."
        },
        {
            name: "Priya Verma",
            location: "Jaipur, Rajasthan",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "Very reliable and fast digital services. I always come here for my utility bill payments and government registrations. Highly recommended!"
        },
        {
            name: "Amit Patel",
            location: "Beawar, Rajasthan",
            rating: 4,
            image: "https://randomuser.me/api/portraits/men/85.jpg",
            text: "Great experience with my Aadhaar update. The process was smooth and the charges were transparent. Best E-Mitra center in the area."
        }
    ];

    const carouselInner = document.querySelector('.testimonial-carousel-inner');
    let currentIndex = 0;
    let autoSlideInterval;

    // Render Testimonials
    function renderTestimonials() {
        carouselInner.innerHTML = '';
        testimonials.forEach((t, index) => {
            const stars = Array(5).fill(0).map((_, i) => 
                `<i class="fa-${i < t.rating ? 'solid' : 'regular'} fa-star"></i>`
            ).join('');

            const card = `
                <div class="testimonial-item ${index === currentIndex ? 'active' : ''}" style="display: ${index === currentIndex ? 'block' : 'none'}">
                    <div class="testimonial-card animate__animated animate__fadeIn">
                        <div class="row align-items-center">
                            <div class="col-md-3 text-center mb-3 mb-md-0">
                                <div class="profile-img-container mx-auto">
                                    <img src="${t.image}" alt="${t.name}">
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 class="mb-0 fw-bold">${t.name}</h5>
                                        <small class="text-muted">${t.location}</small>
                                    </div>
                                    <div class="star-rating text-end">
                                        <div class="stars mb-1">${stars}</div>
                                        <small class="text-muted">Rating</small>
                                    </div>
                                </div>
                                <p class="review-text mt-3">"${t.text}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            carouselInner.insertAdjacentHTML('beforeend', card);
        });
    }

    // Carousel Logic
    function showSlide(index) {
        currentIndex = (index + testimonials.length) % testimonials.length;
        renderTestimonials();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Modal Star Rating
    const modalStars = document.querySelectorAll('.modal-stars i');
    let selectedRating = 0;

    modalStars.forEach((star, idx) => {
        star.addEventListener('click', () => {
            selectedRating = idx + 1;
            updateModalStars(selectedRating);
        });
        star.addEventListener('mouseover', () => updateModalStars(idx + 1));
        star.addEventListener('mouseout', () => updateModalStars(selectedRating));
    });

    function updateModalStars(rating) {
        modalStars.forEach((star, idx) => {
            if (idx < rating) {
                star.classList.replace('fa-regular', 'fa-solid');
                star.classList.add('active');
            } else {
                star.classList.replace('fa-solid', 'fa-regular');
                star.classList.remove('active');
            }
        });
    }

    // Add Review Submission
    const saveBtn = document.querySelector('.btn-premium-save');
    saveBtn.addEventListener('click', () => {
        const name = document.getElementById('revName').value.trim();
        const email = document.getElementById('revEmail').value.trim();
        const text = document.getElementById('revText').value.trim();
        const imageInput = document.getElementById('revImage');
        
        if (!name || !email || !text || selectedRating === 0) {
            const toastEl = document.getElementById('reviewWarningToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
            return;
        }

        // Basic Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const toastEl = document.getElementById('reviewErrorToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
            return;
        }

        // Create new review object
        const newReview = {
            name: name,
            location: "Customer", // Default location
            rating: selectedRating,
            image: "https://randomuser.me/api/portraits/lego/1.jpg", // Default image if none uploaded
            text: text
        };

        // Handle Image Upload (Preview only as this is client-side)
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                newReview.image = e.target.result;
                testimonials.push(newReview);
                finishSubmission();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            testimonials.push(newReview);
            finishSubmission();
        }
    });

    function finishSubmission() {
        // Reset and Close
        document.getElementById('addReviewForm').reset();
        selectedRating = 0;
        updateModalStars(0);
        
        const modalEl = document.getElementById('addReviewModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        // Show Success Toast
        const toastEl = document.getElementById('reviewSuccessToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();

        // Update Carousel
        currentIndex = testimonials.length - 1; // Show the latest review
        renderTestimonials();
        startAutoSlide();
    }

    // Event Listeners for controls
    document.querySelector('.prev-slide').addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });
    document.querySelector('.next-slide').addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    // Pause on Hover
    carouselInner.addEventListener('mouseenter', stopAutoSlide);
    carouselInner.addEventListener('mouseleave', startAutoSlide);

    // Initial Start
    renderTestimonials();
    startAutoSlide();
});
