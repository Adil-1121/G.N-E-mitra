// FAQ Smooth Scroll + Active State
document.addEventListener("DOMContentLoaded", () => {
    const faqButtons = document.querySelectorAll(".accordion-button");

    faqButtons.forEach(button => {
        button.addEventListener("click", () => {
            faqButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
});
