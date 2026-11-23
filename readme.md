# yasaramdh — Portfolio V3

## 📁 STRUKTUR FOLDER

```
portfolio-v3/
│
├── index.html                  ← FILE UTAMA (semua section ada di sini)
│
├── assets/
│   ├── img/
│   │   ├── profile/
│   │   │   ├── photo.jpg       ← Foto hero section (bulat, min 400x400px)
│   │   │   ├── about.jpg       ← Foto about section (portrait, min 600x800px)
│   │   │   └── og-image.jpg    ← Thumbnail SEO / Open Graph (1200x630px)
│   │   │
│   │   ├── projects/
│   │   │   ├── rumusin.png     ← Screenshot project Rumusin
│   │   │   ├── catetin.png     ← Screenshot project Catetin
│   │   │   ├── bungaku.png     ← Screenshot project Bungaku
│   │   │   ├── codexid.png     ← Screenshot project CodexID
│   │   │   └── iot.png         ← Foto/screenshot project IoT
│   │   │
│   │   └── certificates/
│   │       ├── cert-1.jpg      ← Foto sertifikat (opsional, buat lightbox)
│   │       ├── cert-2.jpg
│   │       └── ...
│   │
│   └── cv/
│       └── Ilyasa-Ramadhany-CV.pdf   ← File CV (untuk tombol Download CV)
│
└── README.md                   ← File ini
```

---

## 🚀 CARA DEPLOY KE NETLIFY

1. Buat folder `portfolio-v3` di komputer lu
2. Taruh `index.html` dan folder `assets/` di dalamnya
3. Login ke netlify.com
4. Drag & drop folder `portfolio-v3` ke dashboard Netlify
5. Done! URL otomatis ter-generate

---

## ⚙️ SETUP EMAILJS (Contact Form)

1. Daftar/login di https://emailjs.com
2. **Email Services** → Add New Service → pilih Gmail → copy **Service ID**
3. **Email Templates** → Create New Template
   - Isi template dengan variable: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
   - Copy **Template ID**
4. **Settings → General** → copy **Public Key**
5. Buka `index.html`, cari bagian ini dan isi:

```javascript
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

---

## 🖼️ CARA PASANG FOTO

Cari komentar `<!-- GANTI -->` di index.html, contoh:

**Hero photo:**
```html
<!-- Hapus div placeholder, ganti dengan: -->
<img src="assets/img/profile/photo.jpg" alt="Ilyasa Ramadhany">
```

**About photo:**
```html
<!-- Hapus div placeholder, ganti dengan: -->
<img src="assets/img/profile/about.jpg" alt="Ilyasa Ramadhany">
```

**Project thumbnail:**
```html
<!-- Uncomment baris img, contoh: -->
<img src="assets/img/projects/rumusin.png" alt="Rumusin">
```

---

## ✏️ CARA UPDATE KONTEN

| Yang mau diubah | Cari di index.html |
|---|---|
| Nama/deskripsi | Cari `Ilyasa Ramadhany` |
| Link sosmed | Cari `linkedin.com`, `instagram.com` |
| No WhatsApp | Cari `wa.me/628...` |
| Tambah project | Duplikat `.proj-card` + tambah ke `projectData` |
| Tambah sertifikat | Duplikat `.cert-card` + tambah ke `certData` |
| Tambah skill | Duplikat `.skill-card` di skills grid |
| EmailJS keys | Cari `YOUR_PUBLIC_KEY` |


