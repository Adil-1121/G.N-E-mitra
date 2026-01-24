// ✅ Contact Form & Toast Handler (UPDATED FOR NEW UI)
// ✅ Supports both: old ids (name/phone/contact-form) + new ids (fullName/subject/gnContactForm)
// ✅ EmailJS + Inline Errors + Bootstrap Toast OR Purple UI Toast

document.addEventListener("DOMContentLoaded", function () {
  // 🔹 EmailJS Init (Safe)
  if (window.emailjs) {
    emailjs.init("vhfEAlT_r2FYls8WJ");
  } else {
    console.warn("⚠️ EmailJS library not loaded!");
  }

  // ✅ Select form (old + new)
  const form =
    document.getElementById("gnContactForm") ||
    document.getElementById("contact-form");

  // ✅ Bootstrap Toast container (optional)
  const toastContainer =
    document.getElementById("toast-container") ||
    document.getElementById("gnToastContainer");

  // ✅ Purple toast (new UI toast inside form)
  const gnToast = document.getElementById("gnToast");

  // ✅ Helper: get value by multiple ids
  function getVal(...ids) {
    for (let id of ids) {
      const el = document.getElementById(id);
      if (el) return el.value.trim();
    }
    return "";
  }

  // ✅ Inline Error setter (works with new UI)
  function setInlineError(id, msg) {
    const errorEl = document.querySelector(`[data-error-for="${id}"]`);
    if (errorEl) errorEl.textContent = msg;
  }

  function clearInlineErrors() {
    const allErrors = document.querySelectorAll(".gn-error,[data-error-for]");
    allErrors.forEach((el) => (el.textContent = ""));
  }

  // ✅ New UI Purple Toast
  function showGnToast(message, isSuccess = true) {
    if (!gnToast) return;

    gnToast.textContent = message;
    gnToast.style.display = "block";
    gnToast.style.border = isSuccess
      ? "1px solid rgba(126,91,255,0.28)"
      : "1px solid rgba(220,53,69,0.35)";

    gnToast.style.background = isSuccess
      ? "rgba(126, 91, 255, 0.12)"
      : "rgba(220, 53, 69, 0.10)";

    gnToast.style.color = isSuccess ? "#4f2cff" : "#b4233b";

    // reset animation
    gnToast.style.animation = "none";
    gnToast.offsetHeight;
    gnToast.style.animation = "gnFadeInOut 3s ease forwards";

    setTimeout(() => {
      gnToast.style.display = "none";
    }, 3000);
  }

  // ✅ Bootstrap Toast (if container exists)
  function showBootstrapToast(message, isSuccess = true) {
    if (!toastContainer) return false;

    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${
      isSuccess ? "success" : "danger"
    } border-0 show`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    toast.style.minWidth = "250px";
    toast.style.marginTop = "10px";
    toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    toast.style.borderRadius = "8px";

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body fw-semibold px-3 py-2">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
      </div>
    `;

    toast.querySelector("button").addEventListener("click", () => {
      toast.classList.remove("show");
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 250);
    });

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 250);
    }, 2200);

    return true;
  }

  // ✅ Universal toast handler
  function showToast(message, isSuccess = true) {
    // 1) try bootstrap toast
    const bootShown = showBootstrapToast(message, isSuccess);
    if (bootShown) return;

    // 2) fallback to purple toast (new UI)
    if (gnToast) {
      showGnToast(message, isSuccess);
      return;
    }

    // 3) fallback alert
    alert(message);
  }

  // ✅ Validators
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function validatePhone(phone) {
    return /^[0-9]{7,15}$/.test(phone);
  }

  // ✅ Submit Handler
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      clearInlineErrors();

      // ✅ Support both old + new UI
      const name = getVal("fullName", "name");
      const email = getVal("email");
      const subject = getVal("subject"); // ✅ required in new UI
      const message = getVal("message");
      const phone = getVal("phone"); // only if exists (old)

      let ok = true;

      // ✅ Name required
      if (!name) {
        setInlineError("fullName", "Full Name is required");
        setInlineError("name", "Name is required");
        ok = false;
      }

      // ✅ Email required + format
      if (!email) {
        setInlineError("email", "Email is required");
        ok = false;
      } else if (!validateEmail(email)) {
        setInlineError("email", "Enter a valid email");
        ok = false;
      }

      // ✅ Subject required (matches image UI)
      const subjectInput = document.getElementById("subject");
      if (subjectInput) {
        if (!subject) {
          setInlineError("subject", "Subject is required");
          ok = false;
        }
      }

      // ✅ Phone validation only if phone input exists
      const phoneInput = document.getElementById("phone");
      if (phoneInput) {
        if (!phone) {
          setInlineError("phone", "Phone is required");
          ok = false;
        } else if (!validatePhone(phone)) {
          setInlineError("phone", "Enter valid phone (7-15 digits)");
          ok = false;
        }
      }

      // ✅ Message required
      if (!message) {
        setInlineError("message", "Message is required");
        ok = false;
      }

      if (!ok) {
        showToast("❌ Please fill all required fields correctly!", false);
        return;
      }

      // ✅ EmailJS Send
      if (!window.emailjs) {
        showToast("❌ Email service not available!", false);
        return;
      }

      emailjs
        .sendForm("service_2zkgojg", "template_n4a4rie", form)
        .then(() => {
          showToast("✅ Message Sent Successfully!", true);
          form.reset();
          clearInlineErrors();
        })
        .catch((error) => {
          showToast("❌ Failed to send. Try again!", false);
          console.error("EmailJS Error:", error);
        });
    });
  } else {
    console.error(
      '❌ Form not found! Expected id="gnContactForm" or id="contact-form"'
    );
  }

  // ✅ Inject animation CSS for purple toast (only once)
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes gnFadeInOut {
      0% { opacity: 0; transform: translateY(8px); }
      12% { opacity: 1; transform: translateY(0px); }
      80% { opacity: 1; transform: translateY(0px); }
      100% { opacity: 0; transform: translateY(8px); }
    }
    #gnToast {
      animation: gnFadeInOut 3s ease forwards;
    }
  `;
  document.head.appendChild(style);
});
