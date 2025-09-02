// Utility: Load HTML component and optionally run a callback after it's loaded
function loadComponent(id, file, callback = null) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === 'function') {
        callback(); // Run JS logic after component is inserted
      }
    })
    .catch(err => {
      console.error(`Failed to load ${file}:`, err);
    });
}

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', 'common-component/header.html');
  loadComponent('footer', 'common-component/footer.html');
  loadComponent('chatbot', 'common-component/chatbot.html');
  loadComponent('about', 'about.html');
  loadComponent('services', 'services.html'); 
  loadComponent('faq', 'faq.html'); 
  loadComponent('contact', 'contact.html');
});


