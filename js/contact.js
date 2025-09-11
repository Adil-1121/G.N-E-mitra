// ✅ Contact Form & Toast Handler
document.addEventListener("DOMContentLoaded", function () {
    // 🔹 EmailJS Init
    emailjs.init("vhfEAlT_r2FYls8WJ");

    const form = document.getElementById("contact-form");
    const toastContainer = document.getElementById("toast-container");

    // ✅ Custom Toast Function (Bootstrap + Dynamic Message)
    function showToast(message, isSuccess = true) {
        if (!toastContainer) {
            alert(message); // fallback if no container
            return;
        }

        const toast = document.createElement("div");
        toast.className = `toast align-items-center text-white bg-${isSuccess ? "success" : "danger"} border-0 show`;
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

        // ❌ Close button event
        toast.querySelector("button").addEventListener("click", () => {
            toast.classList.remove("show");
            toast.classList.add("hide");
            setTimeout(() => toast.remove(), 300);
        });

        // Add to container
        toastContainer.appendChild(toast);

        // ⏳ Auto remove after 2s
        setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("hide");
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // ✅ Contact Form Submit
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Input values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            // Validation
            if (!name || !email || !phone || !message) {
                showToast("❌ Please fill in all required fields!", false);
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showToast("❌ Please enter a valid email!", false);
                return;
            }

            const phonePattern = /^[0-9]{7,15}$/;
            if (!phonePattern.test(phone)) {
                showToast("📱 Enter valid phone (7-15 digits)!", false);
                return;
            }

            // ✅ Send with EmailJS
            emailjs.sendForm("service_2zkgojg", "template_n4a4rie", form)
                .then(() => {
                    showToast("✅ Message Sent Successfully!", true);
                    form.reset();
                })
                .catch((error) => {
                    showToast("❌ Failed to send. Try again!", false);
                    console.error("EmailJS Error:", error);
                });
        });
    } else {
        console.error('Form with id "contact-form" not found!');
    }
});
