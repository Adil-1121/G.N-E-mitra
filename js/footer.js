document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gnNewsletterForm");
  const emailInput = document.getElementById("gnNewsletterEmail");
  const toast = document.getElementById("gnFooterToast");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function showFooterToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    toast.style.animation = "none";
    toast.offsetHeight;
    toast.style.animation = "gnFooterToastAnim 3s ease forwards";

    setTimeout(() => {
      toast.style.display = "none";
    }, 2800);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = (emailInput?.value || "").trim();

      if (!email) {
        showFooterToast("❌ Please enter your email!");
        return;
      }

      if (!validateEmail(email)) {
        showFooterToast("⚠️ Please enter a valid email!");
        return;
      }

      showFooterToast("✅ Subscribed Successfully!");
      form.reset();
    });
  }

  // inject animation css
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes gnFooterToastAnim {
      0% { opacity: 0; transform: translate(-50%, 10px); }
      12% { opacity: 1; transform: translate(-50%, 0px); }
      85% { opacity: 1; transform: translate(-50%, 0px); }
      100% { opacity: 0; transform: translate(-50%, 10px); }
    }
  `;
  document.head.appendChild(style);
});
