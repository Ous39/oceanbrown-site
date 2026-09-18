# OceanBrown website and administration

Production Next.js application for `oceanbrown.gm` and `publicadmin.oceanbrown.gm`.

## Included

- Responsive public website with light and dark themes
- Detailed project onboarding form at `/form`
- PostgreSQL persistence for contact enquiries, project submissions and CMS content
- Password-protected administration at `/admin`
- Signed, HTTP-only, SameSite admin sessions
- Login and public-form rate limiting
- PM2, PostgreSQL and Nginx deployment files

## Local setup

1. Copy `.env.example` to `.env` and set every value.
2. Generate the password hash with `pnpm admin:hash` and copy its output to `.env`.
3. Run `pnpm install`, `pnpm lint`, and `pnpm build`.
4. Apply `deploy/001_postgresql.sql` to the target database.
5. Start with `PORT=5030 HOSTNAME=127.0.0.1 pnpm start`.

Never commit `.env` or disclose `DATABASE_URL`, `SESSION_SECRET`, or `ADMIN_PASSWORD_HASH`.

## Production

See `deploy/VPS_DEPLOYMENT.md`. Keep the old PM2 process and Nginx configuration until the new service passes its local health, page, form and login checks.
