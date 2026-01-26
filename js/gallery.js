// Filtering gallery items by category (data-category)

const filterButtons = document.querySelectorAll(".gn-filter-btn");
const galleryItems = document.querySelectorAll(".gn-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((button) => button.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 200);
      }
    });
  });
});
