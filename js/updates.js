// Smooth hover animation effect for update items
document.querySelectorAll(".update-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("shadow-sm");
  });
  item.addEventListener("mouseleave", () => {
    item.classList.remove("shadow-sm");
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const downloadButtons = document.querySelectorAll("a.btn-primary[download]");

    downloadButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault(); // prevent default link behavior
            const url = button.getAttribute("href");

            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.blob();
                })
                .then(blob => {
                    // Trigger browser download
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = url.split("/").pop(); // filename
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(downloadUrl);

                    // Show success toast
                    const toast = new bootstrap.Toast(document.getElementById('cvToastSuccess'));
                    toast.show();
                })
                .catch(error => {
                    console.error("Download failed:", error);

                    // Show failure toast
                    const toast = new bootstrap.Toast(document.getElementById('cvToastFail'));
                    toast.show();
                });
        });
    });
});
