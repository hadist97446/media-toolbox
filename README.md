# Ringkas — Perkecil Video, Audio & Foto

Website statis (HTML/CSS/JavaScript murni) untuk:
1. **Perkecil File** (`compress.html`) — kompres video MP4 dan audio MP3 memakai `ffmpeg.wasm`, berjalan langsung di browser.
2. **Edit Foto** (`photo.html`) — perkecil dimensi foto dan tajamkan gambar buram memakai `<canvas>`.

Tidak ada server dan tidak ada database. Semua proses terjadi di perangkat pengguna.

## Menjalankan di Lokal

Karena `compress.html` memuat script dari CDN dan membaca file lewat `fetch`,
buka projek ini lewat local server (bukan `file://`), contoh:

```bash
npx serve .
# atau
python3 -m http.server 5500
```

Lalu buka `http://localhost:5500` di browser.

## Deploy Online (Gratis, Tanpa Backend)

Upload seluruh folder ini ke salah satu:
- **Netlify** — drag & drop folder di app.netlify.com
- **GitHub Pages** — push ke repo, aktifkan Pages dari branch `main`
- **Vercel** — `vercel deploy` dari folder ini
- **Cloudflare Pages** — hubungkan repo atau upload langsung

Tidak perlu environment variable, database, atau backend apa pun.

## Struktur Folder

```
media-toolbox/
├── index.html         Beranda
├── compress.html       Halaman kompres video/audio
├── photo.html          Halaman edit foto
├── src/
│   ├── css/            Semua styling (theme.css = warna, main.css = layout dasar)
│   ├── js/
│   │   ├── compress/    Logic kompres video & audio
│   │   ├── photo/        Logic resize & sharpen foto
│   │   └── utils/         Fungsi bantu (format ukuran, progress bar, dark mode)
│   └── components/       Navbar, footer, upload box, result card (dipakai berulang)
└── public/assets/        Gambar & ikon statis
```

## Menambah Fitur Baru

Ikuti pola yang sudah ada:
- Fitur besar baru → buat folder baru di `src/js/nama-fitur/`, lalu buat halaman `.html` barunya, isi `<script>` seperti pola di `compress.html`/`photo.html`.
- Komponen UI yang dipakai berulang → tambahkan di `src/components/`.
- Fungsi kecil serba guna → tambahkan di `src/js/utils/`.
- Warna/tema → ubah lewat variabel di `src/css/theme.css`, bukan hex code langsung di file lain.

## Catatan

- Batas ukuran file video/audio diset 500MB, foto 30MB — bisa diubah di `fileHandler.js` / `imageLoader.js` sesuai kebutuhan (device pengguna dengan RAM kecil bisa kesulitan dengan file sangat besar karena semua diproses di browser).
- Untuk menaikkan kualitas "jernihkan foto" lebih jauh (model AI upscaling), pertimbangkan mengganti `imageSharpen.js` dengan library seperti UpscalerJS di kemudian hari.
