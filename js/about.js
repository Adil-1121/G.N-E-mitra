// === About Section Animation on Scroll ===
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(aboutSection);
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
