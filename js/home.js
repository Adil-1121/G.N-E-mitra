// ===== HOME PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function () {
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.service-card');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let index = 0;
const gap = 16;
const visibleCards = 3;

function cardWidth() {
  return cards[0].offsetWidth + gap;
}

function updateCarousel() {
  track.style.transform = `translateX(-${index * cardWidth()}px)`;
}

nextBtn.addEventListener('click', () => {
  if (index < cards.length - visibleCards) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
  } else {
    index = cards.length - visibleCards;
  }
  updateCarousel();
});

/* autoplay */
// setInterval(() => {
//   index = (index + 1) % (cards.length - visibleCards + 1);
//   updateCarousel();
// }, 4000);

  /* =========================================================
     NOTIFICATION ITEM CLICK EFFECT
  ========================================================= */

  const notificationItems = document.querySelectorAll('.notification-item');
  notificationItems.forEach(item => {
    item.addEventListener('click', function () {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateX(5px)';
      }, 150);
    });
  });

  /* =========================================================
     BUTTON HOVER EFFECT
  ========================================================= */

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  /* =========================================================
     SERVICE CARD HOVER EFFECT
  ========================================================= */

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

});


/* =========================================================
   SMOOTH SCROLL FUNCTION
========================================================= */

function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}


/* =========================================================
   PAGE LOAD ANIMATIONS
========================================================= */

window.addEventListener('load', function () {

  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  const bottomSection = document.querySelector('.bottom-section');

  if (heroLeft) {
    heroLeft.style.opacity = '0';
    heroLeft.style.transform = 'translateX(-50px)';

    setTimeout(() => {
      heroLeft.style.transition = 'all 0.8s ease';
      heroLeft.style.opacity = '1';
      heroLeft.style.transform = 'translateX(0)';
    }, 200);
  }

  if (heroRight) {
    heroRight.style.opacity = '0';
    heroRight.style.transform = 'translateX(50px)';

    setTimeout(() => {
      heroRight.style.transition = 'all 0.8s ease';
      heroRight.style.opacity = '1';
      heroRight.style.transform = 'translateX(0)';
    }, 400);
  }

  if (bottomSection) {
    bottomSection.style.opacity = '0';
    bottomSection.style.transform = 'translateY(30px)';

    setTimeout(() => {
      bottomSection.style.transition = 'all 0.8s ease';
      bottomSection.style.opacity = '1';
      bottomSection.style.transform = 'translateY(0)';
    }, 600);
  }
});


/* =========================================================
   OPTIONAL: NOTIFICATION AUTO SCROLL
========================================================= */

function startNotificationScroll() {
  const notificationList = document.querySelector('.notification-list');
  if (!notificationList) return;

  let scrollPosition = 0;
  const scrollSpeed = 1;
  const maxScroll =
    notificationList.scrollHeight - notificationList.clientHeight;

  setInterval(() => {
    if (scrollPosition >= maxScroll) {
      scrollPosition = 0;
    } else {
      scrollPosition += scrollSpeed;
    }
    notificationList.scrollTop = scrollPosition;
  }, 50);
}

// Uncomment if needed
// setTimeout(startNotificationScroll, 3000);
