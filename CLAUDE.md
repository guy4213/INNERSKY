# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InnerSky is a corporate travel operations platform with a bilingual (Hebrew/English) marketing site and an admin panel. It uses a monorepo layout with separate `backend/` and `frontend/` directories.

## Commands

### Backend (`cd backend`)
```bash
npm run dev          # Start dev server with ts-node-dev (hot reload)
npm run build        # Compile TypeScript to dist/
npm run start        # Run compiled output
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma migrate dev  # Run migrations in development
npm run prisma:seed  # Seed 3 default Product rows
```

### Frontend (`cd frontend`)
```bash
npm run dev    # Start Next.js dev server
npm run build  # Production build
npm run lint   # ESLint via next lint
```

## Environment Setup

**Backend** — copy `.env.example` to `.env` and fill in:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — random secret for signing tokens
- `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password
- `CLOUDINARY_*` — image hosting credentials
- `RESEND_API_KEY` / `RESEND_TO_EMAIL` — transactional email
- `FRONTEND_URL` — used for CORS allowlist

**Frontend** — copy `.env.local.example` to `.env.local`:
- `NEXT_PUBLIC_API_URL` — backend base URL (default `http://localhost:8080`)

## Architecture

### Backend (`backend/src/`)
Express + TypeScript + Prisma (PostgreSQL). No test suite; type-checking is the main safety net (`npm run build`).

- `server.ts` — entry point, starts HTTP server
- `app.ts` — Express app, CORS, route mounts
- `routes/` — one file per domain: `auth`, `products`, `contact`, `upload`, `admin`
- `middleware/auth.ts` — `requireAuth` JWT middleware; Bearer token in `Authorization` header
- `lib/` — singleton clients: `db.ts` (PrismaClient), `cloudinary.ts`, `resend.ts`
- `types/index.ts` — `AuthRequest` (Express Request + `user`), `JwtPayload`

Auth is single-admin only: credentials come from env vars (`ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`), not the database. JWT is verified on every protected route via `requireAuth`.

### Frontend (`frontend/`)
Next.js 14 App Router + TypeScript + Tailwind CSS. Single public page (`app/page.tsx`) composed of section components, plus an admin area at `/admin`.

- `app/page.tsx` — home page, assembles all `components/sections/` in order
- `app/admin/` — protected admin UI: login at `/admin/login`, dashboard at `/admin`
- `components/sections/` — one component per landing-page section (Navbar, Hero, About, …)
- `components/ui/` — shared primitives: `Button`, `GlassCard`, `SectionBadge`
- `components/admin/` — `ProductEditor` (inline edit + image upload), `ImageUploader`
- `context/LanguageContext.tsx` — global `lang` state (`'he' | 'en'`), toggles `document.dir` (RTL/LTR) and `document.lang`
- `lib/api.ts` — all fetch calls to the backend; token injected via `lib/auth.ts` (localStorage)
- `types/index.ts` — shared types: `Product`, `ContactSubmission`, `ApiResponse<T>`, `Lang`

### Bilingual / RTL
The site defaults to Hebrew (`lang = 'he'`) with RTL layout. `useLanguage()` from `LanguageContext` exposes `lang` and `toggle`. Every section that shows copy must branch on `lang` to serve `nameHe`/`nameEn` (or equivalent) fields. Tailwind's `dir` utilities handle RTL/LTR layout automatically via the root `dir` attribute.

### Data model
Two Prisma models:
- `Product` — bilingual name + description, Cloudinary image URL, sort order. Seeded with 3 rows on first run.
- `ContactSubmission` — form data stored on submission; readable only by authenticated admin.

### Deployment
- Backend → Render (`npm run build && npm start`)
- Frontend → Vercel (`next build`)
