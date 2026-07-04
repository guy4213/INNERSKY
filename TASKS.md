# INNERSKY – Site Fixes Task List

## TASK 1 — Global: Hebrew font → Arial
**File:** `frontend/app/layout.tsx`, `frontend/app/globals.css`, `frontend/tailwind.config.ts`
- Add `font-family: Arial, sans-serif` for Hebrew mode
- When `lang === 'he'` apply Arial font to body (via `dir="rtl"` selector or a `font-arial` Tailwind class)
- Keep Montserrat/Inter for English mode
- Fix font-size proportions so Hebrew text is visually the same size as English (currently Hebrew appears smaller)

---

## TASK 2 — Navbar: Slogan + Logo emphasis
**File:** `frontend/components/sections/Navbar.tsx`
- Update English slogan from `'Corporate Travel Operations'` → `'Corporate Travel Operations ecosystem'`
- Update Hebrew slogan accordingly (e.g. `'מערכת תפעול נסיעות עסקיות'`)
- Make the "InnerSky" logo text larger and more visually prominent (increase font size, add glow or weight)
- Logo color: try adjusting tone slightly (e.g. brighter primary or gradient) while preserving original palette

---

## TASK 3 — Hero: SectionBadge larger
**File:** `frontend/components/sections/Hero.tsx`
- Increase the SectionBadge font size for "מנוע נסיעות עסקיות מהדור הבא" / "Next-Gen Travel Operations" to size 13 (currently small)

---

## TASK 4 — About: Industries table header + add Defense
**File:** `frontend/components/sections/About.tsx`
- Hebrew table header: change `'תחומי פעילות'` → `'התעשיות שאנו משרתים'`
- English table header: stays `'Industries We Serve'`
- Add defense industry entry: `{ he: 'ביטחון', en: 'Defense' }` to the `industries` array

---

## TASK 5 — Challenge: One language at a time + arrows + layout + highlight closing line
**File:** `frontend/components/sections/Challenge.tsx`
- **Language purity:** Each challenge card currently shows both Hebrew title AND English subtitle together. Fix: show only the active language (no bilingual mixing on one card)
- **Arrows:** Add visual arrows between the process steps in the intro paragraph (either as icons between cards or as a flow layout with `→` / Material icon `arrow_forward`)
- **Layout:** Consolidate all 6 challenge cards into a single unified container (like the Industries table in About) OR adjust card proportions to be more uniform — choose the box approach for consistency
- **Closing line:** Make `'זה הרגע שבו ניהול הנסיעות הופך לפונקציה ניהולית.'` significantly larger and bolder (e.g. `text-2xl` or `text-3xl`, `font-bold`)

---

## TASK 6 — Services: Rename + Hebrew-only display + English bilingual
**File:** `frontend/components/sections/Services.tsx`
- **Service 1:**
  - Hebrew title: `'ניתוח תפעול הנסיעות'`
  - Hebrew subtitle/desc: `'להבין את המצב הקיים...'`
  - English title: `'Travel Operations Audit'`
- **Service 2:**
  - Hebrew title: `'שדרוג התשתיות לניהול ותפעול הנסיעות בארגון'`
  - English title: `'Travel Operations Optimization'`
- **Service 3:**
  - Hebrew title: `'שירות חיצוני לניהול ותפעול תהליך הנסיעות בארגון'`
  - English title: `'Outsourced Travel Management'`
  - Remove the English subtitle line that appears alongside Hebrew in service 3
- **Language purity:** The English label currently appears above the Hebrew title at all times. In Hebrew mode show only Hebrew; in English mode show only English title/desc
- **Result text Service 2:** Change `'סקיילבילי'` / `'סקיילביליים'` → not relevant here (see WhyUs), but double-check any occurrence in this file too

---

## TASK 7 — Values: Rename section heading
**File:** `frontend/components/sections/Values.tsx`
- Hebrew heading: `'יתרונות'` → `'למה InnerSky'`
- English heading: `'Values'` → `'Why InnerSky'`
- Fix: description texts currently only exist in Hebrew (`descHe`). Add English descriptions for English mode.
- Language purity: show only active language text (no bilingual mixing in cards)

---

## TASK 8 — WhyUs: Rename + fix wording + language purity
**File:** `frontend/components/sections/WhyUs.tsx`
- Hebrew heading: `'למה אנחנו'` → `'היתרונות שלנו'`
- English heading: `'Why Us'` → `'Our Advantages'`
- In `reasons` array: find `'סקיילביליים'` / `'Scalable Solutions'` → Hebrew label: `'פתרונות מדידים'`, English: `'Measurable Solutions'`
- Language purity: show only active language in cards (currently shows English label above Hebrew title always)
- Add English descriptions for English mode (currently `descHe` only)

---

## TASK 9 — CaseStudy: Update challenge text
**File:** `frontend/components/sections/CaseStudy.tsx`
- Hebrew challenge text: update to `'גידול משמעותי בפעילות החברה יצר עומס תפעולי, ריבוי מאשרים וחוסר שקיפות בתהליך.'`
- English challenge text: `'Significant growth in company activity created operational overload, multiple approvers, and a lack of transparency in the process.'`

---

## TASK 10 — Admin Panel: Add Services management
**File:** `frontend/app/admin/page.tsx`, `frontend/components/admin/` (new component), `frontend/lib/api.ts`, `backend/src/routes/admin.ts` (or new route), `backend/src/app.ts`
- Add a Services section in the admin dashboard (similar to Products)
- Allow admin to edit: service title (HE + EN), description (HE + EN), includes list (HE + EN), result text (HE + EN)
- Services can be stored as JSON in the DB (new Prisma model) or as a seeded config — use a new `Service` Prisma model
- Add GET `/admin/services` and PUT `/admin/services/:id` routes (protected by `requireAuth`)
- Create `ServiceEditor` component in `frontend/components/admin/`
- Wire into admin page tab or section

---

## TASK 11 — Language purity audit (global)
**All section files**
- Audit every component to ensure that when `lang === 'en'` NO Hebrew text is visible, and when `lang === 'he'` NO English text is visible
- Specifically fix: Challenge cards, Values cards, WhyUs cards, Services cards (all currently mix both languages)
- Navbar links: already bilingual-safe via `lang === 'he' ? link.he : link.en` — verify all others follow same pattern

---

## Priority Order
1. TASK 11 (Language purity — affects whole site appearance)
2. TASK 1 (Hebrew font → Arial + size fix)
3. TASK 2 (Navbar logo + slogan)
4. TASK 5 (Challenge — arrows + layout + closing line)
5. TASK 6 (Services rename + cleanup)
6. TASK 7 (Values rename)
7. TASK 8 (WhyUs rename + wording)
8. TASK 4 (About — industries table)
9. TASK 9 (CaseStudy text)
10. TASK 3 (Hero badge size)
11. TASK 10 (Admin services panel — largest scope, do last)
