# Jennifer Alvina Portfolio

A premium interior design portfolio website built with Next.js App Router, TypeScript, Tailwind CSS, and Sanity CMS.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Sanity CMS

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variables:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## Content Modeling
Sanity schemas are available in:
- `sanity/schemas/project.ts`
- `sanity/schemas/siteSettings.ts`

## Pages
- `/` Home page with hero, featured projects, and CTA
- `/portfolio` Project listing page
- `/portfolio/[slug]` Project detail page
- `/contact` Contact page
