# Deploy Form Cap on Railway

Self-hosted contact form with anti-spam (Cap CAPTCHA)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/form-cap)

## About

Eary Form is designed to run on Railway. It uses PostgreSQL for data storage, Cap CAPTCHA for spam protection, and Valkey for rate limiting — all available as Railway plugins. The FastAPI backend is automatically built with Nixpacks and requires zero configuration beyond setting your admin password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| form-api | [INAPP-Mobile/railway-form-template](https://github.com/INAPP-Mobile/railway-form-template) (root: /) | Web service |
| valkey | `valkey/valkey:8-alpine` | Database |
| postgres | [INAPP-Mobile/railway-form-template](https://github.com/INAPP-Mobile/railway-form-template) (root: /postgres) | Database |
| cap | `tiago2/cap:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_HOST` | form-api | - | SMTP server hostname for sending notifications. Optional if SendGrid is configured. |
| `SMTP_PASS` | form-api | - | SMTP auth password. Optional for anonymous relays. |
| `SMTP_PORT` | form-api | 587 | SMTP server port. Default 587 (STARTTLS). Use 465 for implicit TLS. |
| `SMTP_USER` | form-api | (secret) | SMTP auth username. Optional for anonymous relays. |
| `FROM_EMAIL` | form-api | noreply@contact-form.app | From-address on outgoing notifications. Use a real address on a domain you control to avoid SPF/DKIM failures. |
| `RATE_LIMIT` | form-api | 10 | Max submissions per IP per minute. Default 10. Lower for stricter anti-abuse, raise for trusted internal use. |
| `CAPTCHA_MODE` | form-api | auto | CAPTCHA mode: 'auto' (use Cap if CAP_ENDPOINT is reachable, else none), 'cap' (force Cap), or 'none' (disabled). |
| `CAP_ENDPOINT` | form-api | - | Public URL of the sibling 'cap' CAPTCHA service. Auto-wired to this template's Cap service. |
| `CAP_SITE_KEY` | form-api | - | Cap site key passed to the frontend widget. Leave empty unless you created a specific site key in the Cap dashboard. |
| `DATABASE_URL` | form-api | - | PostgreSQL connection string. Auto-wired to the sibling 'postgres' service in this template. No need to edit. |
| `ADMIN_PASSWORD` | form-api | (secret) | Password to access the admin dashboard at /admin. Auto-generated on deploy. Change it after first login. |
| `CAP_SECRET_KEY` | form-api | (secret) | Shared secret used to verify Cap challenge tokens (HMAC). Auto-generated; must match what Cap issues. Keep in sync with the Cap service if you rotate it. |
| `SENDGRID_API_KEY` | form-api | (secret) | SendGrid API key for submission notifications. Leave empty to fall back to SMTP (see SMTP_HOST). Optional. |
| `RATE_LIMIT_BACKEND` | form-api | memory | Rate-limit store: 'memory' (per-replica, fine for a single instance) or 'db' (shared via PostgreSQL; requires DATABASE_URL). |
| `SESSION_SECRET_KEY` | form-api | (secret) | Secret used to sign admin session cookies. Auto-generated on deploy. Change to invalidate all active admin sessions. |
| `FORM_RECIPIENT_EMAIL` | form-api | - | Email address that receives form submissions. Set this to your address before going live — submissions are not delivered if it is empty. |
| `VALKEY_ARGS` | valkey | --save 60 1 --maxmemory-policy noeviction | Valkey server startup arguments. Saves a snapshot every 60s if at least 1 key changed, and refuses eviction under memory pressure so Cap session data is not lost. Leave empty for Valkey defaults. |
| `POSTGRES_DB` | postgres | formdb | Default database created on first boot. Referenced by the Form API's DATABASE_URL. |
| `POSTGRES_USER` | postgres | (secret) | Superuser name. Referenced by the Form API's DATABASE_URL. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password. Auto-generated on deploy. Referenced by the Form API's DATABASE_URL — do not edit unless you also update DATABASE_URL there. |
| `ADMIN_KEY` | cap | - | Cap dashboard login password (at least 32 chars recommended). Auto-generated on deploy. |
| `REDIS_URL` | cap | - | Redis-compatible connection string for Cap session/challenge storage. Auto-wired to the sibling 'valkey' service in this template. No need to edit. |
| `CORS_ORIGIN` | cap | * | Allowed origins for redeeming/generating challenges. Defaults to '*' (all origins). Restrict to your domain(s) for production, e.g. https://yourdomain.com. |

## Configuration

- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT --proxy-headers`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Other · **Languages:** TypeScript, Python, HTML, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/form-cap)
