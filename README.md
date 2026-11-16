# TORANEX V2 — Corporate website + CMS

Arabic RTL website and portfolio for TORANEX Software & Design, founded by Tawfiq Al-Junaid (Sanaa, Al-Jarraf, Yemen).

## Included
- Public pages: home, about, services, portfolio and contact.
- Editorial design: warm ivory, charcoal, forest green and muted copper.
- Ten initial portfolio entries and Firestore live portfolio catalog.
- Firebase email/password authentication with server-side Firebase Admin SDK authorization.
- Admin modules: projects CRUD, services CRUD, contact inbox, company profile/social links, SEO settings, media library upload/delete, audit log, and seed import controls.
- Contact form saved to Firestore with input validation, honeypot and per-IP rate limiting.
- Supabase Storage uploads through a server endpoint; service-role key remains server-side.
- Firestore rules deny browser-side writes.
- One-time owner bootstrap protected by a Vercel environment secret.

## Vercel environment variables
Set these in Project → Settings → Environment Variables:
Firebase public app: FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_APP_ID.
Firebase Admin server secret: FIREBASE_SERVICE_ACCOUNT_JSON (complete service-account JSON in one value).
Owner setup: TORANEX_BOOTSTRAP_SECRET (long random value); RATE_LIMIT_SALT (long random value).
Supabase server settings: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET=toranex-media.

## Firebase setup
1. Create a Firebase project owned by TORANEX.
2. Enable Authentication → Email/Password and create Firestore.
3. Add a Firebase Web App and set its public values in Vercel.
4. Create a service account in Firebase Project Settings → Service Accounts; store its JSON only in Vercel as FIREBASE_SERVICE_ACCOUNT_JSON.
5. Deploy the Vercel preview with the environment variables.
6. Create your owner login in Firebase Authentication.
7. Call POST https://YOUR_DOMAIN/api/bootstrap-owner with header x-bootstrap-secret: YOUR_SECRET and JSON body {"email":"OWNER_EMAIL"}.
8. Remove TORANEX_BOOTSTRAP_SECRET from Vercel and redeploy immediately after successful bootstrap.
9. Publish firestore.rules in Firebase Console → Firestore → Rules.

## Initial content import\n- Open /admin.html after creating the owner account.\n- Use the import buttons in Projects and Services. The import skips existing project URLs and service names.\n- Ten project entries and six editable services are included in the repository as seed JSON files.\n\n## Supabase Storage
1. Create a Storage bucket named toranex-media.
2. Choose a public bucket only if the uploaded media is intended for public display.
3. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY only to Vercel environment variables.
4. The upload endpoint accepts JPEG, PNG, WebP and PDF up to 2.5 MB.

## Firestore collections
admins/{uid}, projects/{id}, services/{id}, siteSettings/main, siteSettings/seo, messages/{id}, media/{id}, auditLogs/{id}, contactRateLimits/{hashed-ip}.

## Deployment
- Development branch: redesign/toranex-v2.
- Production branch main remains unchanged.
- Admin: /admin.html.
- Configure the Vercel preview environment, review it, then promote the branch only when ready.

## Notes
- No Firebase or Supabase secrets are committed to Git.
- The owner bootstrap endpoint closes automatically after the first admin document exists.
- A scalable TORANEX ribbon emblem SVG is included at assets/toranex-mark.svg, based on a visual recreation of the supplied logo. Replace with the original master artwork if exact pixel-level reproduction is required.
- Verify case-study details and project screenshots before publishing outcomes or client claims.
