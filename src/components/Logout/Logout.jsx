import { useEffect } from "react"; // Mengimpor React dan useEffect untuk menangani efek samping
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk melakukan redirect ke halaman lain

export default function Logout() {
  const navigate = useNavigate(); // Menginisialisasi fungsi navigate untuk melakukan redirect

  useEffect(() => {
    // Menggunakan useEffect untuk menjalankan efek samping setelah komponen dipasang
    localStorage.removeItem("authToken"); // Menghapus token autentikasi dari localStorage
    localStorage.removeItem("authUser"); // Menghapus token autentikasi dari localStorage
    navigate("/login"); // Redirect pengguna ke halaman login setelah berhasil logout
  }, [navigate]); // Dependensi 'navigate' untuk menghindari peringatan linting

  return null; // Mengembalikan null karena tidak ada tampilan yang perlu ditampilkan setelah logout
}
