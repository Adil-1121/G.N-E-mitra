document.addEventListener('DOMContentLoaded', () => {

  /* ================= DATA ================= */
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
      text: "Great experience with my Aadhaar update. The process was smooth and the charges were transparent."
    }
  ];

  const carouselInner = document.querySelector('.testimonial-carousel-inner');
  const dotsWrap = document.querySelector('.review-section .gn-dots');
  const prevBtn = document.querySelector('.review-section .gn-arrow.prev');
  const nextBtn = document.querySelector('.review-section .gn-arrow.next');
  let currentIndex = 0;
  let autoSlideInterval;

  /* ================= BUILD DOTS ================= */
  function buildDots() {
    dotsWrap.innerHTML = "";
    testimonials.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "gn-dot";
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        renderTestimonial();
        startAutoSlide();
      });
      dotsWrap.appendChild(dot);
    });
  }

  /* ================= RENDER ================= */
  function renderTestimonial() {
    const t = testimonials[currentIndex];

    const stars = Array.from({ length: 5 }, (_, i) =>
      `<i class="fa-${i < t.rating ? 'solid' : 'regular'} fa-star"></i>`
    ).join('');

    carouselInner.innerHTML = `
      <div class="testimonial-card">
        <div class="row align-items-center">
          <div class="col-md-3 text-center mb-3 mb-md-0">
            <div class="profile-img-container mx-auto">
              <img src="${t.image}" alt="${t.name}">
            </div>
          </div>

         <div class="col-md-9" style="text-align:left;">
  
  <div class="d-flex justify-content-between align-items-start">
    
    <!-- LEFT -->
    <div style="text-align:left;">
      <small class="text-muted d-block">${t.location}</small>
      <h5 class="mt-1 mb-0">${t.name}</h5>
    </div>

    <!-- RIGHT -->
    <div class="star-rating text-end">
      ${stars}
      <div class="text-muted small mt-1">Rating</div>
    </div>

  </div>

  <!-- Review Text -->
  <p class="review-text mt-3" style="text-align:left;">
    "${t.text}"
  </p>

</div>

        </div>
      </div>
    `;

    // Update dots
    const dots = document.querySelectorAll('.review-section .gn-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Update arrows
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === testimonials.length - 1;
  }

  /* ================= SLIDER ================= */
  function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  /* ================= CONTROLS ================= */
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }

  carouselInner.addEventListener('mouseenter', stopAutoSlide);
  carouselInner.addEventListener('mouseleave', startAutoSlide);

  /* ================= MODAL STAR RATING ================= */
  const modalStars = document.querySelectorAll('.modal-stars i');
  let selectedRating = 0;

  modalStars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;
      updateModalStars(selectedRating);
    });
    star.addEventListener('mouseover', () => updateModalStars(index + 1));
    star.addEventListener('mouseout', () => updateModalStars(selectedRating));
  });

  function updateModalStars(rating) {
    modalStars.forEach((star, idx) => {
      star.classList.toggle('fa-solid', idx < rating);
      star.classList.toggle('fa-regular', idx >= rating);
      star.classList.toggle('active', idx < rating);
    });
  }

  /* ================= ADD REVIEW ================= */
  document.querySelector('.btn-premium-save').addEventListener('click', () => {
    const name = revName.value.trim();
    const email = revEmail.value.trim();
    const text = revText.value.trim();
    const imageInput = revImage;

    if (!name || !email || !text || selectedRating === 0) return;

    const newReview = {
      name,
      location: "Customer",
      rating: selectedRating,
      image: "https://randomuser.me/api/portraits/lego/1.jpg",
      text
    };
    
    if (imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        newReview.image = e.target.result;
        testimonials.push(newReview);
        closeModal();
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      testimonials.push(newReview);
      closeModal();
    }
  });

  function closeModal() {
    document.getElementById('addReviewForm').reset();
    selectedRating = 0;
    updateModalStars(0);

    const modal = bootstrap.Modal.getInstance(addReviewModal);
    modal.hide();

    currentIndex = testimonials.length - 1;
    buildDots();
    renderTestimonial();
    startAutoSlide();
  }

  /* ================= INIT ================= */
  buildDots();
  renderTestimonial();
  startAutoSlide();

});
