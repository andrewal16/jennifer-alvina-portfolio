# Jennifer Alvina Portfolio

Production-ready premium portfolio website for interior designer **Jennifer Alvina**.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Sanity CMS (content + media)
- Neon Postgres (contact submissions)
- Vercel deployment

---

## 1) Setup `.env.local` (Paling Penting)
Kalau kamu belum setup env sama sekali, lakukan ini dulu:

1. Copy template env:
   ```bash
   cp .env.example .env.local
   ```
2. Isi value di `.env.local`.

Template env tersedia di:
- `.env.example`

---

## 2) Cara Sambungin Sanity Studio ke Project Next.js

### Step A — Buat project di Sanity
1. Login ke Sanity: https://www.sanity.io/manage
2. Create project baru (atau pakai project existing).
3. Catat:
   - **Project ID**
   - **Dataset** (umumnya `production`)

### Step B — Isi env di Next.js
Di `.env.local`, isi:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

> Dua env ini dipakai oleh `lib/sanity.ts` untuk fetch data ke Sanity API.

### Step C — Pastikan schema sudah ada
Schema sudah disiapkan di repo ini:
- `sanity/schemas/project.ts`
- `sanity/schemas/homePage.ts`
- `sanity/schemas/contactInfo.ts`
- `sanity/schemas/index.ts`
- `sanity.config.ts`

### Step D — Jalankan app
```bash
npm run dev
```

Kalau env valid, data dari Sanity akan dibaca. Kalau belum ada konten, website tetap jalan dengan fallback data (untuk development).

---

## 3) Cara Admin Tambah Project Baru (tanpa ubah code)
1. Buka **Sanity Studio** project.
2. Masuk ke document type **Project**.
3. Klik **Create new Project**.
4. Isi field utama:
   - Title
   - Slug (klik Generate)
   - Short Summary
   - Category, Location, Year, Area Size, Style
5. Upload media:
   - Cover Image
   - Gallery Images
   - Additional Project Images (optional)
6. Isi tambahan (optional):
   - Materials Used
   - Highlights
   - Testimonial
7. Aktifkan **Featured Project** jika ingin muncul di Home.
8. Klik **Publish**.

Setelah publish, project otomatis muncul di:
- `/portfolio`
- `/portfolio/[slug]`

> Catatan: jika project baru belum muncul, tunggu cache revalidate (±60 detik) atau trigger redeploy di Vercel.

---

## 4) Neon Setup (Contact Form)
Di `.env.local`:

```bash
NEON_HTTP_SQL_URL=https://<your-neon-http-sql-endpoint>
NEON_HTTP_SQL_TOKEN=<your_neon_http_token>
```

Lalu jalankan SQL schema:
- `db/schema.sql`

Ini membuat tabel `contact_submissions` untuk endpoint:
- `POST /api/contact`

---

## 5) Main Routes
- `/` Home
- `/portfolio` Portfolio listing
- `/portfolio/[slug]` Portfolio detail
- `/contact` Contact form
- `/api/contact` Form submission route (stores in Neon)

---

## 6) Deploy ke Vercel
1. Push ke Git provider.
2. Import project di Vercel.
3. Isi semua env var di Vercel Project Settings (sama seperti `.env.local`).
4. Deploy.
5. Verify:
   - data Sanity tampil di page
   - submit contact form masuk ke Neon
