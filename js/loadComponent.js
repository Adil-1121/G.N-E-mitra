function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// Load on page
window.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', 'common-component/header.html');
  loadComponent('footer', 'common-component/footer.html');
  loadComponent('chatbot', 'common-component/chatbot.html'); // chatbot bhi load karo
});
