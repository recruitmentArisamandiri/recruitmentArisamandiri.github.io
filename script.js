const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-zGyXAoKDizcMFHa6_-FWtMH56Yw178uc-nWBNPINDjEDXYZng71rcYshKzMVpelJ8A/exec";

async function login(event) {
    event.preventDefault(); // Mencegah form submit default

    // Ambil nilai input dari form
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Periksa jika email dan password kosong
    if (!email || !password) {
        alert("Silakan masukkan email dan password!");
        return;
    }

    try {
        // Kirim data ke Google Apps Script menggunakan metode POST
        const response = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        // Periksa apakah respons berhasil
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        // Ambil hasil dari server
        const result = await response.json();

        if (result.status === "success") {
            alert("Login berhasil!");
            // Redirect ke halaman lain jika diperlukan
            window.location.href = "dashboard.html"; 
        } else {
            alert("Login gagal! " + result.message);
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat menghubungi server.");
    }
}

// Tambahkan event listener ke tombol login
document.querySelector("form").addEventListener("submit", login);
