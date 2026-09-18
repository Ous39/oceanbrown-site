# VPS deployment

These instructions stage the new application on port 5030 before changing live traffic.

## 1. Install and configure

```bash
cd /var/www/oceanbrown-next
cp .env.example .env
chmod 600 .env
pnpm install --no-frozen-lockfile
pnpm admin:hash
```

Edit `.env`. Reuse the existing `DATABASE_URL`, generate `SESSION_SECRET` with `openssl rand -hex 48`, and paste the generated password hash. Do not expose these values.

## 2. Database and build

```bash
set -a
. ./.env
set +a
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f deploy/001_postgresql.sql
pnpm lint
pnpm build
cp -r public .next/standalone/
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/
```

## 3. Start staging service

```bash
pm2 start ecosystem.config.cjs
pm2 save
curl -fsS http://127.0.0.1:5030/api/health
curl -I http://127.0.0.1:5030/
curl -I http://127.0.0.1:5030/form
curl -I http://127.0.0.1:5030/admin/login
```

Do not proceed unless the health endpoint returns `{"ok":true,...}` and all three pages return HTTP 200.

## 4. DNS and TLS for admin

Create an A record for `publicadmin.oceanbrown.gm` pointing to the VPS. After DNS resolves, temporarily install `deploy/nginx-publicadmin-bootstrap.conf`, test and reload Nginx, then request the certificate:

```bash
sudo cp deploy/nginx-publicadmin-bootstrap.conf /etc/nginx/sites-available/publicadmin.oceanbrown.gm
sudo ln -s /etc/nginx/sites-available/publicadmin.oceanbrown.gm /etc/nginx/sites-enabled/publicadmin.oceanbrown.gm
sudo nginx -t
sudo systemctl reload nginx
sudo certbot certonly --webroot -w /var/www/html -d publicadmin.oceanbrown.gm
```

## 5. Switch Nginx

Back up the active OceanBrown configuration first. Replace it with `deploy/nginx-oceanbrown.conf`, replace the bootstrap admin configuration with `deploy/nginx-publicadmin.conf`, confirm certificate paths, then run:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Keep the old `/var/www/oceanbrown-standalone` directory and `oceanbrown-studio` PM2 process for rollback until production testing is complete.
