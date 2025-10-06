
# 🛍️ E-Commerce App (Laravel & React)

Selamat datang di aplikasi **E-Commerce Full-Stack**.  
Proyek ini dibangun dengan **Laravel** untuk backend yang andal dan **React (Vite)** untuk frontend yang modern dan interaktif.  
Aplikasi ini menggunakan pendekatan seperti **monorepo**, di mana backend dan frontend berada dalam satu repositori untuk memudahkan pengelolaan.

---

## ✨ Fitur Utama

- **Autentikasi Pengguna**  
  Registrasi dan login aman menggunakan **Laravel Sanctum**.

- **Manajemen Produk**  
  Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada produk.

- **Keranjang Belanja**  
  Pengguna dapat menambah, melihat, memperbarui, dan menghapus item di keranjang belanja mereka.

- **Proses Checkout**  
  Alur checkout sederhana untuk menyelesaikan transaksi.

- **Dashboard Admin**  
  Halaman khusus yang dilindungi untuk admin dalam mengelola produk.

- **Desain Responsif**  
  Antarmuka yang dioptimalkan untuk desktop, tablet, dan mobile menggunakan **Tailwind CSS**.

---

## 🚀 Teknologi yang Digunakan

| Bagian | Teknologi |
|---------|------------|
| **Backend (services/)** | PHP, Laravel, MySQL, Laravel Sanctum |
| **Frontend (ui/)** | JavaScript, React, Vite, Tailwind CSS, React Router, TanStack Query, Axios |
| **Development** | concurrently untuk menjalankan kedua server secara bersamaan |

---

## 📁 Struktur Proyek

Proyek ini diorganisir ke dalam dua folder utama di dalam root direktori:

- **`/services/`** → Berisi seluruh kode backend aplikasi Laravel.  
- **`/ui/`** → Berisi seluruh kode frontend aplikasi React.

File `package.json` di root direktori berfungsi sebagai pusat kontrol untuk menginstal dependensi dan menjalankan kedua aplikasi.

---

## 🛠️ Alur Instalasi & Setup

### 🔧 Prasyarat

Pastikan Anda sudah menginstal hal berikut di sistem Anda:

- PHP **8.1+**
- Composer
- Node.js **18+** & NPM
- Database (MySQL atau MariaDB)

---

### 1️⃣ Instalasi Otomatis (Cara Cepat)

Cara termudah untuk memulai adalah dengan menggunakan skrip otomatis yang sudah disiapkan.

#### a. Clone Repository

```bash
git clone <URL_REPOSITORY_ANDA>
cd <NAMA_FOLDER_PROYEK>
````

#### b. Jalankan Instalasi

Jalankan perintah berikut di direktori root:

```bash
npm install
```

Perintah ini akan memicu skrip `postinstall` yang akan menjalankan `install:all`, yang kemudian akan:

1. Menginstal dependensi Composer di `services/`.
2. Menyalin `.env.example` menjadi `.env` di `services/`.
3. Menjalankan `php artisan key:generate`, `migrate --seed`, dan `storage:link`.
4. Menginstal dependensi NPM di `ui/`.

---

### 2️⃣ Konfigurasi Manual

Setelah instalasi, lakukan konfigurasi database secara manual.

#### a. Konfigurasi Backend (`services/.env`)

Buka file `.env` di folder `services/` dan sesuaikan pengaturan database Anda:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=root
DB_PASSWORD=password_anda
```

> Jangan lupa untuk membuat database dengan nama yang sesuai di MySQL Anda.

#### b. Konfigurasi Frontend (`ui/.env`)

Pastikan file `.env` di dalam folder `ui/` sudah ada dan berisi konfigurasi berikut:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> Biasanya tidak perlu diubah jika backend berjalan di port 8000.

---

## ▶️ Menjalankan Aplikasi

Untuk menjalankan server backend (Laravel) dan frontend (Vite) **secara bersamaan**, gunakan perintah berikut dari direktori root:

```bash
npm run dev
```

Ini akan menjalankan:

* Backend Laravel → [http://127.0.0.1:8000](http://127.0.0.1:8000)
* Frontend React → [http://localhost:5173](http://localhost:5173)

Buka `http://localhost:5173` di browser Anda untuk melihat aplikasi.

---

## 📜 Daftar Skrip yang Tersedia

Semua skrip dijalankan dari direktori root proyek.

| Perintah              | Deskripsi                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`         | Menjalankan server backend dan frontend secara bersamaan untuk mode pengembangan.             |
| `npm install`         | Menginstal semua dependensi untuk backend dan frontend.                                       |
| `npm run install:all` | Skrip otomatis yang dipanggil `postinstall` untuk menginstal dependensi di kedua environment. |
| `npm run backend`     | Menjalankan hanya server backend Laravel.                                                     |
| `npm run frontend`    | Menjalankan hanya server frontend Vite.                                                       |

---

## 💡 Catatan Tambahan

* Jika Anda menggunakan Laravel Sanctum, pastikan konfigurasi berikut ada di file `.env` backend Anda:

  ```env
  SANCTUM_STATEFUL_DOMAINS=localhost:5173
  SESSION_DOMAIN=localhost
  ```

* Pastikan juga storage sudah di-link:

  ```bash
  php artisan storage:link
  ```

---

## 🧑‍💻 Kontribusi

Pull request dan saran sangat diterima.
Silakan fork repository ini dan buat branch baru untuk fitur atau perbaikan Anda.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

```

---

Apakah kamu ingin saya tambahkan bagian **contoh environment lengkap** (untuk `.env` backend dan frontend) dan **contoh output folder build (production)** juga di bawahnya? Itu bisa membuat README-mu lebih “developer-friendly” saat rilis versi produksi.
```
