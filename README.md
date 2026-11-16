# TORANEX V2

Arabic-first responsive portfolio and corporate website for TORANEX, led by Tawfiq Al-Junaid. Visual direction: warm ivory, charcoal, forest green and muted copper; editorial typography and restrained layout rather than generic AI gradients.

## Files
- `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`: public website.
- `admin.html`, `admin.js`, `admin.css`: first functional admin slice (Firebase email/password sign-in, allowlisted admin check, project CRUD, inbox read).
- `projects.json`: seed data for nine projects found in the connected Vercel account; previously shared public links can be appended after verification.
- `firebase-config.js`: public Firebase Web App configuration placeholders.
- `firestore.rules`: starter security rules.

## Firebase activation (required)
1. Use a Firebase project owned by TORANEX and enable Email/Password Authentication.
2. Create Firestore and publish `firestore.rules`.
3. Fill `firebase-config.js` with Firebase Web App config values (never Admin SDK secrets).
4. Create the owner's account in Firebase Authentication; copy its UID.
5. In Firestore, manually create `admins/{UID}` with `active: true` and `role: "OWNER"`. Client-side users cannot create admin records.
6. Sign in at `/admin.html`.

## Important limits of this slice
- Admin CRUD currently manages Firestore project documents and reads messages. Seed `projects.json` into Firestore once using a trusted admin process; the static portfolio remains available before database activation.
- Contact form opens the visitor's email application; Firestore message submission and rate limiting require a configured server endpoint before production.
- Supabase media upload, company profile editor, SEO editor, audit log, role management and full bilingual content management are not yet implemented.
- Verify project titles, screenshots, descriptions and URLs before publishing case studies.

## Safe deployment
All changes are isolated on `redesign/toranex-v2`; `main` is unchanged. Review the Vercel preview before merging.
