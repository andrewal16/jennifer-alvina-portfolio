# Jennifer Alvina Portfolio

Production-ready premium portfolio website for interior designer **Jennifer Alvina**.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Sanity CMS (content + media)
- Neon Postgres (contact submissions)
- Vercel deployment

## 1) Environment Variables
Set in `.env.local` for local dev and in Vercel Project Settings for production:

```bash
# Sanity (public read)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Neon HTTP SQL endpoint (server-side)
NEON_HTTP_SQL_URL=https://<your-neon-http-sql-endpoint>
NEON_HTTP_SQL_TOKEN=<your_neon_http_token>
```

## 2) Run Database Schema
Execute SQL from:

- `db/schema.sql`

This creates the `contact_submissions` table used by the contact form API route.

## 3) Run Locally
```bash
npm install
npm run dev
```

## 4) Sanity Content Models
Schemas:
- `sanity/schemas/project.ts`
- `sanity/schemas/homePage.ts`
- `sanity/schemas/contactInfo.ts`

## 5) Cara Admin Menambahkan Project Baru
Agar admin bisa tambah project tanpa ubah code, gunakan **Sanity Studio**:

1. Buka Sanity Studio project (tim internal).
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
6. Isi bagian tambahan jika ada:
   - Materials Used
   - Highlights
   - Testimonial
7. Aktifkan **Featured Project** jika ingin tampil di Home.
8. Klik **Publish**.

Setelah publish, project otomatis muncul di:
- `/portfolio`
- `/portfolio/[slug]`

> Catatan: jika project baru belum muncul, tunggu cache revalidate (±60 detik) atau trigger redeploy di Vercel.

## 6) Main Routes
- `/` Home
- `/portfolio` Portfolio listing
- `/portfolio/[slug]` Portfolio detail
- `/contact` Contact form
- `/api/contact` Form submission route (stores in Neon)

## 7) Deploy to Vercel
1. Push to Git provider.
2. Import project in Vercel.
3. Add all env vars in Vercel settings.
4. Deploy.
5. Verify `/api/contact` inserts rows into Neon.
