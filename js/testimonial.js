document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('#testimonialCarousel .carousel-inner');

  function showToast(toastId) {
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://gn-emitra-backend.onrender.com';


  // Fetch and render reviews
  function loadReviews() {
    fetch(`${API_BASE_URL}/api/review`)
      .then(response => response.json())
      .then(reviews => {
        const filteredReviews = reviews.filter(r => r.name && r.name.trim() !== '');
        carouselInner.innerHTML = '';

        if (filteredReviews.length === 0) {
          carouselInner.innerHTML = `
            <div class="carousel-item active">
              <div class="glass-card d-flex justify-content-center align-items-center">
                <p class="text-muted">No reviews found.</p>
              </div>
            </div>`;
          return;
        }

        filteredReviews.forEach((review, index) => {
          const activeClass = index === 0 ? 'active' : '';
          const rating = parseInt(review.rating) || 0;

          let stars = '';
          for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '<i class="fa-solid fa-star text-warning"></i>' : '<i class="fa-regular fa-star text-warning"></i>';
          }

        const avatarUrl = review.image_url 
  ? `${API_BASE_URL}${review.image_url}` 
  : 'https://randomuser.me/api/portraits/men/75.jpg';

          const carouselItem = `
            <div class="carousel-item ${activeClass}">
<div class="glass-card d-flex flex-row align-items-start gap-3">
                <div class="me-3 avatar-icon-box">
                  <div class="avatar">
                    <img src="${avatarUrl}" alt="avatar" class="w-100 h-100 object-fit-cover">
                  </div>
                </div>
                <div class="info flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start flex-wrap">
                    <div>
                      <h5 class="mb-1 fw-bold">${review.name}</h5>
                      <small class="text-muted">${review.city || ''}</small>
                    </div>
                    <div class="text-end">
                      <div class="mb-1">${stars}</div>
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
          <div class="glass-card d-flex justify-content-center align-items-center">
            <p class="text-danger">Unable to fetch data.</p>
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
    star.addEventListener('mouseover', () => updateStars(idx + 1));
    star.addEventListener('mouseout', () => updateStars(selectedRating));
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
    showToast('reviewWarningToast');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('city', city);
  formData.append('email', email);
  formData.append('rating', selectedRating);
  formData.append('comment', comment);
  if (imageFile) formData.append('image', imageFile);

  fetch(`${API_BASE_URL}/api/review`, { method: 'POST', body: formData })

    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        showToast('reviewSuccessToast');

        // Reset form
        document.getElementById('reviewUsername').value = '';
        document.getElementById('reviewCity').value = '';
        document.getElementById('reviewEmail').value = '';
        document.getElementById('reviewComment').value = '';
        imageInput.value = '';
        selectedRating = 0;
        updateStars(0);

        const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
        modal.hide();

        loadReviews();
      } else {
        showToast('reviewErrorToast');
      }
    })
    .catch(err => {
      console.error('Error submitting review:', err);
      showToast('reviewErrorToast');
    });
});
// Reset form when modal is closed (even without saving)
const reviewModalEl = document.getElementById('editProfileModal');
reviewModalEl.addEventListener('hidden.bs.modal', () => {
  document.getElementById('reviewUsername').value = '';
  document.getElementById('reviewCity').value = '';
  document.getElementById('reviewEmail').value = '';
  document.getElementById('reviewComment').value = '';
  document.getElementById('reviewImage').value = '';
  
  selectedRating = 0;
  updateStars(0);
});

});
