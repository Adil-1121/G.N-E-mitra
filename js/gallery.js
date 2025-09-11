// Filtering gallery items by category

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach((button) => button.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach((item) => {
      if (filter === 'all') {
        item.style.display = 'flex';
      } else {
        // Show only items matching filter
        if (item.classList.contains(filter)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});
