# InnerSky

Corporate travel operations platform.

## Structure

- `/backend` — Express + Prisma API, deploys to Render
- `/frontend` — Next.js site, deploys to Vercel

## Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```
