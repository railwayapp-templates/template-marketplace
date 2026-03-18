# Deploy Cap on Railway

Self-hosted CAPTCHA for the modern web.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cap)

## About

Cap is a modern, self-hosted CAPTCHA alternative that uses proof-of-work challenges instead of annoying visual puzzles. It's privacy-first, lightweight (~20kb), and 250x smaller than hCaptcha, making it perfect for protecting your website without frustrating your users.

Hosting Cap gives you a privacy-respecting CAPTCHA solution that you fully control. Instead of relying on third-party services like Google reCAPTCHA, you run your own CAPTCHA server. Cap verifies that users are human by asking their browser to solve a computational challenge rather than making them click on traffic lights or storefronts. Your users get a faster, cleaner experience, and you get better privacy since Cap doesn't track or collect user data. The server includes a dashboard where you can create API keys, view usage statistics, and customize your CAPTCHA settings. When deployed on Railway, Cap runs automatically without manual configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cap | `tiago2/cap` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_URL` | Cap | - | This tells Cap where our database is located. You shouldn't have to change this |
| `ADMIN_KEY` | Cap | - | The admin key |
| `RATELIMIT_IP_HEADER` | Cap | X-Real-Ip | This tells Cap where to find the connecting users IP |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/.data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/cap)
