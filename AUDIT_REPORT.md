# OceanBrown production audit

## Completed fixes

- Standardised production execution on Next.js Node output.
- Added PostgreSQL storage with parameterised SQL queries.
- Added independent, server-side administrator authentication.
- Added password authentication using a salted scrypt hash.
- Added signed, HTTP-only, Secure and SameSite admin session cookies.
- Added login and public-form request throttling.
- Added same-origin validation to authenticated write operations.
- Connected the detailed `/form` to the existing `submissions` table.
- Added linked enquiry records so project submissions appear in the admin dashboard.
- Added status synchronisation between admin enquiries and project submissions.
- Added idempotent PostgreSQL migration and indexes.
- Added PM2 configuration, health endpoint and zero-downtime staging instructions.
- Added separate Nginx configurations for the public and administration domains.
- Blocked `/admin` and `/api/auth` on the public-domain Nginx host.
- Added `noindex` protection for the administration subdomain.
- Added production security headers, canonical HTTPS redirects and HSTS.
- Hardened client-address handling so forged forwarded headers cannot bypass throttling.
- Added same-origin enforcement to all public form write endpoints.
- Corrected the privacy notice so it accurately describes database storage and administrator review.
- Added `robots.txt`, an XML sitemap, canonical metadata and the Gambia software-development landing page.
- Limited the administrator navigation to functional modules and connected published insights to the public website.
- Replaced the password-hash utility with a hidden, confirmed password prompt.
- Removed unused template components, styling layers and dependencies from the deliverable.
- Checked the source for generator/platform branding; none remains in the delivered application.
- Preserved responsive layout and light/dark theme behaviour.

## Verification results

- `pnpm install --frozen-lockfile`: passed
- `pnpm lint`: passed with zero errors
- `pnpm build`: passed
- TypeScript production check: passed
- Production dependency audit: no known vulnerabilities
- Routes generated: public site, form, privacy, terms, Gambia service landing page, sitemap, robots, admin login, admin dashboard, authentication, enquiries, submissions, content and health APIs

## Deployment controls

The old application must remain online while the new service is staged on `127.0.0.1:5030`. Switch Nginx only after local page and health checks pass. Preserve the old directory, PM2 process and Nginx backup until the production acceptance test is complete.

Database-backed form submission, administrator login and email delivery require the VPS environment and must be included in the final production acceptance test.
