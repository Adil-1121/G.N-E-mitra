// =====================
// Elements
// =====================
const filterButtons = document.querySelectorAll(".gn-filter-btn");
const allItems = Array.from(document.querySelectorAll(".gn-item"));
const track = document.querySelector(".gn-slider-track");
const dotsWrap = document.querySelector(".gn-dots");
const prevBtn = document.querySelector(".gn-arrow.prev");
const nextBtn = document.querySelector(".gn-arrow.next");

// =====================
// Config
// =====================
const ITEMS_PER_SLIDE = 8;
let currentSlide = 0;

// =====================
// Build Slider + Dots
// =====================
function buildSlider(items) {
  track.innerHTML = "";
  dotsWrap.innerHTML = "";
  currentSlide = 0;

  // Create slides
  for (let i = 0; i < items.length; i += ITEMS_PER_SLIDE) {
    const slide = document.createElement("div");
    slide.className = "gn-slide";

    const grid = document.createElement("div");
    grid.className = "row";

    items.slice(i, i + ITEMS_PER_SLIDE).forEach(item => {
      grid.appendChild(item);
    });

    slide.appendChild(grid);
    track.appendChild(slide);

    // Create dot (1 dot per slide)
    const dot = document.createElement("div");
    dot.className = "gn-dot";

    const slideIndex = i / ITEMS_PER_SLIDE;
    if (slideIndex === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      moveSlide(slideIndex);
    });

    dotsWrap.appendChild(dot);
  }

  updateSlide();
}

// =====================
// Move Slide
// =====================
function moveSlide(index) {
  currentSlide = index;
  updateSlide();
}

// =====================
// Update UI (CORE BRAIN)
// =====================
function updateSlide() {
  const dots = document.querySelectorAll(".gn-dot");
  const totalSlides = dots.length;

  // Slide movement
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Dot highlight
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  // Arrow enable / disable
  if (prevBtn && nextBtn) {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }
}

// =====================
// Arrow Controls
// =====================
if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalDots = document.querySelectorAll(".gn-dot").length;
    if (currentSlide < totalDots - 1) {
      currentSlide++;
      updateSlide();
    }
  });
}

// =====================
// Filter Logic
// =====================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Active button UI
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    const filteredItems =
      filter === "all"
        ? allItems
        : allItems.filter(item => item.dataset.category === filter);

    buildSlider(filteredItems);
  });
});

// =====================
// Initial Load
// =====================
buildSlider(allItems);
