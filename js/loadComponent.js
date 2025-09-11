// Utility: Load HTML file into a container
function loadHTML(id, file, callback = null) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(data => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = data;
        if (typeof callback === "function") callback(); // optional callback
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// On Page Load
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "common-component/header.html");
  loadHTML("footer", "common-component/footer.html");
  loadHTML("chatbot", "common-component/chatbot.html");

});
