# Jennifer Atelier Portfolio

Production-ready premium portfolio website for interior designer **Jennifer Atelier**.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Sanity CMS (content + media)
- Neon Postgres (contact submissions)
- Vercel deployment

## 1) Environment Variables
Set in `.env.local` for local dev and in Vercel Project Settings for production:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Neon connection string (server-side)
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
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

## 5) Main Routes
- `/` Home
- `/portfolio` Portfolio listing
- `/portfolio/[slug]` Portfolio detail
- `/contact` Contact form
- `/api/contact` Form submission route (stores in Neon)

## 6) Deploy to Vercel
1. Push to Git provider.
2. Import project in Vercel.
3. Add all env vars in Vercel settings.
4. Deploy.
5. Verify `/api/contact` inserts rows into Neon.
