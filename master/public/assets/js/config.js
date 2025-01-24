// Inisialisasi Supabase Client
const supabaseUrl = 'https://azijnhkvxawamtizzirm.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aWpuaGt2eGF3YW10aXp6aXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzM2MjgsImV4cCI6MjA1MzI0OTYyOH0.qnMQXkECqmsMlSYsKwNyv_BUbYApGIzpVfTkdjptW3c'; // Ganti dengan kunci publik Anda

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fungsi untuk mendaftarkan pengguna baru
 * @param {string} email - Alamat email pengguna
 * @param {string} password - Kata sandi pengguna
 * @returns {Promise<Object>} - Data pengguna atau error
 */
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error);
      return { error };
    }
    console.log('Signed up successfully:', data);
    return { data };
  }
  
  /**
   * Fungsi untuk login pengguna
   * @param {string} email - Alamat email pengguna
   * @param {string} password - Kata sandi pengguna
   * @returns {Promise<Object>} - Data pengguna atau error
   */
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error logging in:', error);
      return { error };
    }
    console.log('Logged in successfully:', data);
    return { data };
  }
  
  /**
   * Fungsi untuk logout pengguna
   * @returns {Promise<Object>} - Konfirmasi logout atau error
   */
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      return { error };
    }
    console.log('Logged out successfully');
    return { message: 'Logged out successfully' };
  }
  
  /**
   * Fungsi untuk mendapatkan informasi pengguna saat ini
   * @returns {Promise<Object>} - Informasi pengguna atau error
   */
  async function getCurrentUser() {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return { error };
    }
    console.log('Current user:', user);
    return { user };
  }
  
  /**
   * Fungsi untuk mengirim email reset password
   * @param {string} email - Alamat email pengguna
   * @returns {Promise<Object>} - Konfirmasi pengiriman email atau error
   */
  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error('Error sending password reset email:', error);
      return { error };
    }
    console.log('Password reset email sent:', data);
    return { data };
  }
  