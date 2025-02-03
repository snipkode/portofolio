import { supabase } from "./config.js";

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

export { signUp, signIn, signOut, checkUserSession };