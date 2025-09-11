// Home Section Code
document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#homeCarousel');

    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 3000,   // Auto-slide every 3 seconds
            ride: 'carousel', // Start automatically
            pause: false,     // Disable pause on hover
            wrap: true        // Infinite loop
        });
    }
});

// For Notification Box
document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('.notification-list');
  const container = document.querySelector('.notification-container');

  if (list && container) {
    container.addEventListener('mouseenter', () => {
      list.style.animationPlayState = 'paused';
    });

    container.addEventListener('mouseleave', () => {
      list.style.animationPlayState = 'running';
    });
  } else {
    console.warn("Notification elements not found");
  }
});

// End 
document.addEventListener("DOMContentLoaded", () => {
    const badge = document.getElementById("badgeCount");
    if (!badge) return; // agar badge element hi na ho to error avoid kare

    let count = 0;
    let finalCount = 99; // final number
    let delay = 3000; // 5 sec delay before start

    setTimeout(() => {
        let interval = setInterval(() => {
            count++;
            badge.textContent = count;

            if (count >= finalCount) {
                badge.textContent = "99+";
                clearInterval(interval);
            }
        }, 50); // speed of counting
    }, delay);
});