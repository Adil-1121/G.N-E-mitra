document.addEventListener('DOMContentLoaded', () => {
const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Remove 'active' from all links
      navLinks.forEach(l => l.classList.remove('active'));

      // Add 'active' to clicked link
      this.classList.add('active');
      console.log(this.classList); // Check if active class added

      // Smooth scroll
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

