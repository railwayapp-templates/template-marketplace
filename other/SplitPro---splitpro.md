# Deploy SplitPro on Railway

Open-source Splitwise alternative: split expenses, receipts, settle up

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/splitpro)

## About

SplitPro is an open-source alternative to Splitwise. Record who paid for dinner, rent, or the trip;
split it equally, by exact amounts, percentages, or shares; attach the receipt; and let everyone see
a live "who owes whom" balance with one-tap settle-up. Unlimited expenses, groups, currencies,
recurring expenses, Splitwise import, and a PWA you can add to your phone's home screen. This is a
community-maintained template and is not affiliated with OSS Apps, the SplitPro authors.

This template deploys two Railway services:

- **splitpro** — the web app, from a version-specific tag of
  `ghcr.io/youssefsiam38/splitpro-railway` (tags are never moved; each release records its digest)
  that wraps the official `ossapps/splitpro:v2.1.5` image. It adds a wait-for-database step, a readiness gate, and runs the app as a non-root user.
  It gets the public HTTPS domain and a volume at `/app/uploads` for receipt images.
- **postgres** — PostgreSQL 17.7 with the `pg_cron` extension (`ossapps/postgres:17.7-trixie`,
  a version-specific tag whose digest is recorded in the repository). SplitPro's schema requires pg_cron for recurring expenses, so Railway's stock
  PostgreSQL cannot be used. It is private-network only and has its own volume.

Secrets (`NEXTAUTH_SECRET`, `POSTGRES_PASSWORD`) are generated per deployment. `DATABASE_URL` and
`NEXTAUTH_URL` are wired with reference variables, so nothing needs to be copied around. Schema
migrations run automatically on every start. Volume-backed services run as a single replica and
have a few seconds of downtime on redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| splitpro | `ghcr.io/youssefsiam38/splitpro-railway:1.0.1` | Web service |
| postgres | `ossapps/postgres:17.7-trixie` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | splitpro | 3000 | Port SplitPro listens on. Leave at 3000 unless you change the public port. |
| `FROM_EMAIL` | splitpro | - | Sender address for sign-in and invitation emails (e.g. splitpro@yourdomain.com). Must be a sender your SMTP provider allows. |
| `DATABASE_URL` | splitpro | - | Connection string to the postgres service over Railway private networking. Set automatically from the postgres service; do not change. |
| `NEXTAUTH_URL` | splitpro | - | Public origin of your deployment. Set automatically from the Railway domain; change only when you attach a custom domain (e.g. https://split.example.com). |
| `DB_WAIT_TIMEOUT` | splitpro | 180 | Seconds the wrapper waits for PostgreSQL to accept connections before exiting so Railway restarts the service. |
| `NEXTAUTH_SECRET` | splitpro | (secret) | Signs sessions and sign-in tokens. Generated per deployment (64 hex characters). |
| `DEFAULT_HOMEPAGE` | splitpro | /balances | Route that / redirects to. /balances opens the app; upstream's default /home is a marketing page. |
| `APP_READY_TIMEOUT` | splitpro | 300 | Seconds the wrapper waits for SplitPro to answer 200 on /api/auth/providers before exiting so Railway restarts the service. |
| `EMAIL_SERVER_HOST` | splitpro | - | SMTP host of your email provider (e.g. smtp.resend.com). Required: SplitPro has no password login and signs users in by email. |
| `EMAIL_SERVER_PORT` | splitpro | 587 | SMTP port. 587 (STARTTLS) works for most providers; 465 for implicit TLS. |
| `EMAIL_SERVER_USER` | splitpro | (secret) | SMTP username. |
| `DISABLE_EMAIL_SIGNUP` | splitpro | false | Set to true once your friends have signed up, so strangers who find your URL cannot create accounts. Existing accounts keep signing in. |
| `EMAIL_SERVER_PASSWORD` | splitpro | (secret) | SMTP password or API key. |
| `CURRENCY_RATE_PROVIDER` | splitpro | frankfurter | Exchange-rate source: frankfurter (no key needed), openexchangerates (add OPEN_EXCHANGE_RATES_APP_ID), or nbp. |
| `ENABLE_SENDING_INVITES` | splitpro | true | Let users email invitations to friends who are not on this instance yet. |
| `UPLOAD_MAX_FILE_SIZE_MB` | splitpro | 10 | Maximum receipt upload size in MB. |
| `EMAIL_TLS_REJECT_UNAUTHORIZED` | splitpro | 1 | Keep 1 to verify the SMTP server's TLS certificate. Set 0 only for relays with self-signed certificates. |
| `POSTGRES_DB` | postgres | splitpro | Database name. Keep 'splitpro': the start command sets cron.database_name=splitpro for pg_cron. |
| `POSTGRES_USER` | postgres | (secret) | Database role used by SplitPro (superuser inside this container, as in the official PostgreSQL image). |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated per deployment. Referenced by the splitpro service's DATABASE_URL; never needs to be typed. |

## Configuration

- **Healthcheck:** `/api/auth/providers`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Start command:** `docker-entrypoint.sh postgres -c shared_preload_libraries=pg_cron -c cron.database_name=splitpro -c cron.timezone=UTC`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/splitpro)
