# TORANEX V2

Arabic-first responsive portfolio and corporate website for TORANEX, led by Tawfiq Al-Junaid. Visual direction: warm ivory, charcoal, forest green and muted copper; editorial typography and restrained layout rather than generic AI gradients.

## Public website
- index.html, about.html, services.html, portfolio.html, contact.html.
- Responsive Arabic RTL layout and mobile navigation.
- Portfolio page includes verified Vercel account projects plus previously shared public links; unverified descriptions are marked as pending.
- project-catalog.js can replace the static portfolio cards with published Firestore project records after Firebase is configured and the seed data is imported.

## Admin foundation
- admin.html, admin.js, admin.css: Firebase email/password sign-in, allowlisted admin-document check, project create/update/delete, seed import from projects.json, and inbox read UI.
- firebase-config.js: public Firebase Web App configuration placeholders.
- firestore.rules: starter security rules.

## Firebase activation (required before admin use)
1. Use a Firebase project owned by TORANEX and enable Email/Password Authentication.
2. Create Firestore and publish firestore.rules.
3. Fill firebase-config.js with Firebase Web App config values (never Admin SDK secrets).
4. Create the owner's account in Firebase Authentication; copy its UID.
5. In Firestore, manually create admins/{UID} with active: true and role: OWNER. Client-side users cannot create admin records.
6. Sign in at /admin.html, then use the button استيراد المشاريع المكتشفة to seed the portfolio documents.
7. The portfolio page will read published project documents from Firestore; its static project cards remain as a fallback if Firebase is not configured.

## Important limits of this slice
- The contact form prepares a WhatsApp message; it does not currently store messages in Firestore. A server-side endpoint and abuse/rate limiting are required before enabling a persistent public inbox.
- Supabase media uploads, company profile editor, services editor, SEO editor, audit log, role management, full bilingual content management and a complete media library are follow-up modules.
- The current wordmark is a typographic placeholder. Replace it with the exact approved TORANEX logo asset before final production release.
- Verify project titles, screenshots, descriptions and URLs before publishing detailed case studies.

## Safe deployment
All changes are isolated on redesign/toranex-v2; main is unchanged. Review the Vercel preview before merging.
