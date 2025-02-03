Berikut adalah contoh integrasi **Supabase dengan JavaScript Vanilla** tanpa framework tambahan. Contoh ini mencakup **CRUD (Create, Read, Update, Delete)** pada tabel `users`.  

---

### **1️⃣ Setup Supabase di HTML + JavaScript Vanilla**
1. **Buat Project di Supabase** → [https://supabase.com/](https://supabase.com/)  
2. **Dapatkan API Key & Supabase URL** dari dashboard Supabase.  
3. **Buat Tabel `users`** dengan kolom berikut:  
   - `id` → UUID (Primary Key, Default: `gen_random_uuid()`)  
   - `name` → Text  
   - `email` → Text (Unique)  
   - `created_at` → Timestamp (Default: `now()`)  

---

### **2️⃣ Contoh Kode Supabase dengan JavaScript Vanilla**
Simpan kode berikut dalam file **`index.html`** dan jalankan di browser.

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supabase + JavaScript Vanilla</title>
</head>
<body>

    <h1>Supabase + JavaScript Vanilla</h1>

    <button onclick="getUsers()">🔍 Fetch Users</button>
    <button onclick="addUser()">➕ Add User</button>
    <button onclick="updateUser()">✏️ Update User</button>
    <button onclick="deleteUser()">🗑️ Delete User</button>

    <ul id="user-list"></ul>

    <script type="module">
        // 1️⃣ Import Supabase Client
        import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

        // 2️⃣ Konfigurasi Supabase
        const SUPABASE_URL = "https://xyzcompany.supabase.co";  // Ganti dengan URL Supabase kamu
        const SUPABASE_ANON_KEY = "your-anon-key";  // Ganti dengan API Key kamu

        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // 3️⃣ Function: Fetch Users
        async function getUsers() {
            const { data, error } = await supabase.from("users").select("*");
            if (error) {
                console.error("Error fetching users:", error);
                return;
            }

            // Tampilkan data di HTML
            const userList = document.getElementById("user-list");
            userList.innerHTML = "";
            data.forEach(user => {
                const li = document.createElement("li");
                li.textContent = `${user.name} - ${user.email}`;
                userList.appendChild(li);
            });
        }

        // 4️⃣ Function: Add User
        async function addUser() {
            const name = prompt("Masukkan nama:");
            const email = prompt("Masukkan email:");

            const { data, error } = await supabase.from("users").insert([{ name, email }]);

            if (error) {
                console.error("Error adding user:", error);
                alert("Gagal menambahkan user.");
            } else {
                alert("User berhasil ditambahkan!");
                getUsers();
            }
        }

        // 5️⃣ Function: Update User
        async function updateUser() {
            const email = prompt("Masukkan email user yang ingin diupdate:");
            const newName = prompt("Masukkan nama baru:");

            const { data, error } = await supabase.from("users").update({ name: newName }).eq("email", email);

            if (error) {
                console.error("Error updating user:", error);
                alert("Gagal mengupdate user.");
            } else {
                alert("User berhasil diperbarui!");
                getUsers();
            }
        }

        // 6️⃣ Function: Delete User
        async function deleteUser() {
            const email = prompt("Masukkan email user yang ingin dihapus:");

            const { data, error } = await supabase.from("users").delete().eq("email", email);

            if (error) {
                console.error("Error deleting user:", error);
                alert("Gagal menghapus user.");
            } else {
                alert("User berhasil dihapus!");
                getUsers();
            }
        }

        // Fetch data saat halaman dimuat
        getUsers();
    </script>

</body>
</html>
```

---

### **3️⃣ Cara Menjalankan**
1. **Simpan kode di file `index.html`**.  
2. **Ganti `SUPABASE_URL` dan `SUPABASE_ANON_KEY`** dengan kredensial dari Supabase kamu.  
3. **Buka file di browser** atau jalankan dengan **Live Server** di VS Code.  

---

### **4️⃣ Penjelasan**
✅ **Tanpa Framework** → Menggunakan **JavaScript Vanilla** langsung di browser.  
✅ **CRUD Operasi** → Bisa **membaca, menambah, memperbarui, dan menghapus** data di Supabase.  
✅ **Menggunakan API Supabase** → `supabase.from("users").select("*")` untuk fetch data.  
✅ **Event Listener** → Menggunakan `prompt()` untuk input data sederhana.  

Dengan contoh ini, kamu bisa mengintegrasikan **Supabase ke dalam aplikasi berbasis HTML & JavaScript tanpa framework seperti React atau Vue**. 🚀  

Jika kamu butuh tambahan fitur seperti **autentikasi user**, beritahu saya! 😊