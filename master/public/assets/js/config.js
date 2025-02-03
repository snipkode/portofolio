  // 1️⃣ Import Supabase Client
 import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

 // 2️⃣ Konfigurasi Supabase
 const SUPABASE_URL = "https://azijnhkvxawamtizzirm.supabase.co";  // Ganti dengan URL Supabase kamu
 const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aWpuaGt2eGF3YW10aXp6aXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzM2MjgsImV4cCI6MjA1MzI0OTYyOH0.qnMQXkECqmsMlSYsKwNyv_BUbYApGIzpVfTkdjptW3c";  // Ganti dengan API Key kamu

 export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

 