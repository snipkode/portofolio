Berikut adalah contoh **autentikasi dengan Supabase** menggunakan **JavaScript Vanilla**, di mana pengguna bisa **register, login, dan logout** menggunakan **email & password**.  

---

### **📌 1. Setup di Supabase**  
1. **Buat Project di Supabase** → [https://supabase.com/](https://supabase.com/)  
2. **Aktifkan Authentication**  
   - Masuk ke **Supabase Dashboard** → **Authentication** → **Providers**  
   - Aktifkan **Email + Password**  
3. **Dapatkan API Key & Supabase URL** dari dashboard Supabase.  

---

### **📌 2. Buat File `index.html`**  
Simpan kode berikut dalam file `index.html` dan jalankan di browser.  

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supabase Authentication with JavaScript</title>
</head>
<body>

    <h1>🔥 Supabase Auth - JavaScript Vanilla</h1>

    <div id="auth-section">
        <input type="email" id="email" placeholder="Masukkan Email">
        <input type="password" id="password" placeholder="Masukkan Password">
        <button onclick="signUp()">Register</button>
        <button onclick="signIn()">Login</button>
        <button onclick="signOut()">Logout</button>
    </div>

    <p id="user-info"></p>

    <script type="module">
        // 1️⃣ Import Supabase Client
        import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

        // 2️⃣ Konfigurasi Supabase
        const SUPABASE_URL = "https://xyzcompany.supabase.co";  // Ganti dengan URL Supabase kamu
        const SUPABASE_ANON_KEY = "your-anon-key";  // Ganti dengan API Key kamu

        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // 3️⃣ Function: Register (Sign Up)
        async function signUp() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const { user, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                alert("Error saat mendaftar: " + error.message);
            } else {
                alert("Registrasi berhasil! Cek email untuk verifikasi.");
                console.log(user);
            }
        }

        // 4️⃣ Function: Login (Sign In)
        async function signIn() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const { user, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                alert("Gagal login: " + error.message);
            } else {
                alert("Login berhasil!");
                updateUserInfo(user);
            }
        }

        // 5️⃣ Function: Logout (Sign Out)
        async function signOut() {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert("Gagal logout: " + error.message);
            } else {
                alert("Logout berhasil!");
                updateUserInfo(null);
            }
        }

        // 6️⃣ Function: Cek User Login (Session)
        async function checkUserSession() {
            const { data: { user } } = await supabase.auth.getUser();
            updateUserInfo(user);
        }

        function updateUserInfo(user) {
            const userInfo = document.getElementById("user-info");
            if (user) {
                userInfo.textContent = `🔹 Logged in as: ${user.email}`;
            } else {
                userInfo.textContent = "🔸 Not logged in";
            }
        }

        // Cek session saat halaman dimuat
        checkUserSession();
    </script>

</body>
</html>
```

---

### **📌 3. Cara Menjalankan**
1. **Simpan kode sebagai `index.html`**  
2. **Ganti `SUPABASE_URL` dan `SUPABASE_ANON_KEY`** dengan kredensial dari Supabase kamu  
3. **Buka di browser** atau gunakan **Live Server**  

---

### **📌 4. Fitur dalam Kode**
✅ **Register (Sign Up)** → Membuat akun dengan email & password  
✅ **Login (Sign In)** → Autentikasi pengguna  
✅ **Logout (Sign Out)** → Menghapus sesi pengguna  
✅ **Cek Status Login** → Mengecek sesi user saat halaman dimuat  

🚀 Dengan contoh ini, kamu bisa membangun **sistem login sederhana** tanpa backend tambahan!  

Butuh tambahan fitur seperti **reset password atau login dengan Google?** Beritahu saya! 😊