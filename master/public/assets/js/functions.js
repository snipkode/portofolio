import { supabase } from "./config.js";

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