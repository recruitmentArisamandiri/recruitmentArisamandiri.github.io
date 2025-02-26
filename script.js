const APPS_SCRIPT_URL = "PASTE_WEB_APP_URL_HERE"; // Ganti dengan URL Web App dari Google Apps Script

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.querySelector("select").value;

        if (!email || !password) {
            alert("Email dan password wajib diisi!");
            return;
        }

        login(email, password, role);
    });
});

function login(email, password, role) {
    fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "cors",  // **Tambahkan ini untuk menangani CORS**
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, role })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response dari server:", data);

        if (data.success) {
            alert("Login berhasil! Selamat datang, " + email);
            window.location.href = "dashboard.html"; // Redirect ke halaman dashboard
        } else {
            alert("Login gagal! Periksa email atau password.");
        }
    })
    .catch(error => {
        console.error("Terjadi kesalahan saat menghubungi server:", error);
        alert("Terjadi kesalahan saat menghubungi server!");
    });
}

// Fungsi untuk toggle visibility password
function togglePassword() {
    var passwordField = document.getElementById("password");
    var passwordToggle = document.querySelector(".toggle-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordToggle.classList.remove("fa-eye");
        passwordToggle.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        passwordToggle.classList.remove("fa-eye-slash");
        passwordToggle.classList.add("fa-eye");
    }
}
