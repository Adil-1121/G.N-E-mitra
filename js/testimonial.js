document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('#testimonialCarousel .carousel-inner');

  // Fetch and render reviews from backend
  function loadReviews() {
    fetch('http://127.0.0.1:5000/api/review')
      .then(response => response.json())
      .then(reviews => {
        const filteredReviews = reviews.filter(r => r.name && r.name.trim() !== '');

        carouselInner.innerHTML = '';

        if (filteredReviews.length === 0) {
          carouselInner.innerHTML = `
            <div class="carousel-item active">
              <div class="glass-card d-flex align-items-start gap-3">
                <div>No reviews found.</div>
              </div>
            </div>`;
          return;
        }

        filteredReviews.forEach((review, index) => {
          const activeClass = index === 0 ? 'active' : '';

          let stars = '';
          const rating = parseInt(review.rating) || 0;
          for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '★' : '☆';
          }

          // Avatar image (use uploaded image or fallback)
const avatarUrl = review.image_url 
  ? `http://127.0.0.1:5000${review.image_url}` 
  : 'https://randomuser.me/api/portraits/lego/1.jpg';

          const carouselItem = `
            <div class="carousel-item ${activeClass}">
              <div class="glass-card d-flex align-items-start gap-3">
                <div class="me-3 mt-3">
                  <div class="avatar">
                    <img src="${avatarUrl}" alt="avatar" style="width:100%; height:100%; object-fit:cover;">
                  </div>
                </div>
                <div class="info flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 class="mb-1">${review.name}</h5>
                      <small class="text-muted">${review.city || ''}</small>
                    </div>
                    <div class="text-end">
                      <div class="mb-1 text-warning" style="font-size: 1.2rem;">${stars}</div>
                      <small class="text-muted">Rating</small>
                    </div>
                  </div>
                  <p class="mt-3 mb-0">${review.comment || ''}</p>
                </div>
              </div>
            </div>
          `;

          carouselInner.insertAdjacentHTML('beforeend', carouselItem);
        });
      })
      .catch(err => {
        console.error('Failed to fetch reviews:', err);
        carouselInner.innerHTML = `<div class="carousel-item active">
          <div class="glass-card d-flex align-items-start gap-3">
            <div>Error loading reviews.</div>
          </div>
        </div>`;
      });
  }

  loadReviews();

  // Star rating logic
  const stars = document.querySelectorAll('#starRating i');
  let selectedRating = 0;

  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      selectedRating = idx + 1;
      updateStars(selectedRating);
    });
    star.addEventListener('mouseover', () => {
      updateStars(idx + 1);
    });
    star.addEventListener('mouseout', () => {
      updateStars(selectedRating);
    });
  });

  function updateStars(rating) {
    stars.forEach((star, idx) => {
      if (idx < rating) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
      } else {
        star.classList.remove('fa-solid');
        star.classList.add('fa-regular');
      }
    });
  }

  // Handle form submit
  const saveBtn = document.querySelector('#editProfileModal .btn-primary');
  saveBtn.addEventListener('click', () => {
    const name = document.getElementById('reviewUsername').value.trim();
    const city = document.getElementById('reviewCity').value.trim();
    const email = document.getElementById('reviewEmail').value.trim();
    const comment = document.getElementById('reviewComment').value.trim();
    const imageInput = document.getElementById('reviewImage');
    const imageFile = imageInput.files[0];

    if (!name || !city || !email || !comment || selectedRating === 0) {
      alert('Please fill all fields and select a rating.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('city', city);
    formData.append('email', email);
    formData.append('rating', selectedRating);
    formData.append('comment', comment);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    fetch('http://127.0.0.1:5000/api/review', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Review submitted successfully!');
          // Clear form
          document.getElementById('reviewUsername').value = '';
          document.getElementById('reviewCity').value = '';
          document.getElementById('reviewEmail').value = '';
          document.getElementById('reviewComment').value = '';
          imageInput.value = '';
          selectedRating = 0;
          updateStars(0);

          // Close modal
          const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
          modal.hide();

          // Reload carousel
          loadReviews();
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(err => {
        console.error('Error submitting review:', err);
        alert('Failed to submit review. Try again later.');
      });
  });
});
