// Footer animation helper
document.addEventListener("DOMContentLoaded", () => {
  console.log("Footer Loaded Successfully!");

  // Animate footer links on hover
  document.querySelectorAll(".footer-widget a").forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.transition = "all 0.3s ease";
      link.style.transform = "translateX(3px)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateX(0)";
    });
  });
});
