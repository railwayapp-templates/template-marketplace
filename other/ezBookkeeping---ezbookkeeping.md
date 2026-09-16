# Deploy ezBookkeeping on Railway

Personal finance app for tracking accounts, spending and budgets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ezbookkeeping)

## About

ezBookkeeping is a lightweight, open-source personal finance app that records daily transactions, imports bank statements, and shows where the money actually goes. It keeps two-level accounts and categories, attaches receipt photos, runs scheduled transactions, and ships a statistics module with pie, bar and trend charts. It is a single Go binary with a Vue front end serving tailored desktop and mobile layouts from one URL.

Deploy ezBookkeeping on Railway and you get the production shape in one click, not one container with a SQLite file. The **ezbookkeeping** service serves the UI and JSON API on port 8080 behind a generated HTTPS domain. **Postgres** holds every account, transaction, category and tag. A Railway object-storage bucket holds receipt images and avatars, keeping the app stateless so uploads survive redeploys without a volume. **mailpit** is a private SMTP server with a password-protected inbox on a second domain, so "Forgot password" works from the first minute instead of failing silently. The first account is created at startup from credentials you supply at deploy time, and self-registration is off, so the instance is never briefly open to whoever finds the URL first.

![Railway diagram linking ezBookkeeping, Postgres and Mailpit](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789474841/ezbookkeeping-architecture.webp)

ezBookkeeping solves the problem every budgeting app runs into: you want years of searchable history in one place, not in someone else's analytics warehouse. It suits households tracking several currencies, freelancers separating business from personal spending, and anyone who has outgrown a spreadsheet.

Key features:

- Two-level accounts and categories, multi-currency with automatic exchange-rate updates
- Receipt image attachments and a monthly gallery view
- Scheduled transactions from a built-in job runner
- Pie, bar, column and trend charts, plus a custom Insights Explorer
- Import/export: CSV, OFX, QFX, QIF, IIF, Camt, MT940, GnuCash, Firefly III, Beancount
- 2FA, OIDC login, login rate limiting, PIN/WebAuthn app lock
- Optional receipt recognition and MCP access for AI assistants

Postgres is the only database the app needs. The bucket keeps image uploads off the container filesystem, and mailpit is capture-only: it accepts mail on the private network and shows it in a browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| ezbookkeeping | [gridalpha/ezbookkeeping-railway](https://github.com/gridalpha/ezbookkeeping-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Inbox UI port Railway probes |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `PORT` | ezbookkeeping | 8080 | HTTP port Railway probes |
| `EBK_STORAGE_TYPE` | ezbookkeeping | minio | Store uploads in object storage |
| `EZBK_ADMIN_EMAIL` | ezbookkeeping | - | Email on that account |
| `EBK_DATABASE_HOST` | ezbookkeeping | - | Database host and port |
| `EBK_DATABASE_NAME` | ezbookkeeping | - | Database name |
| `EBK_DATABASE_TYPE` | ezbookkeeping | postgres | Database driver |
| `EBK_DATABASE_USER` | ezbookkeeping | (secret) | Database user |
| `EBK_MAIL_SMTP_HOST` | ezbookkeeping | - | SMTP server host and port |
| `EBK_DATABASE_PASSWD` | ezbookkeeping | - | Database password |
| `EZBK_ADMIN_NICKNAME` | ezbookkeeping | Administrator | Display name for that account |
| `EZBK_ADMIN_PASSWORD` | ezbookkeeping | (secret) | Password for that account |
| `EZBK_ADMIN_USERNAME` | ezbookkeeping | (secret) | First account created at startup |
| `EBK_MAIL_ENABLE_SMTP` | ezbookkeeping | true | Enable outbound mail |
| `EBK_DATABASE_SSL_MODE` | ezbookkeeping | require | Encrypted, no certificate validation |
| `EBK_MAIL_FROM_ADDRESS` | ezbookkeeping | - | Sender address on outgoing mail |
| `EBK_SECURITY_SECRET_KEY` | ezbookkeeping | (secret) | Signs sessions, encrypts 2FA secrets |
| `EBK_STORAGE_MINIO_BUCKET` | ezbookkeeping | - | Bucket name |
| `EBK_USER_ENABLE_REGISTER` | ezbookkeeping | false | Self-registration; true opens signup |
| `EBK_STORAGE_MINIO_ENDPOINT` | ezbookkeeping | - | Bucket endpoint |
| `EBK_STORAGE_MINIO_LOCATION` | ezbookkeeping | - | Bucket region |
| `EZBK_ADMIN_DEFAULT_CURRENCY` | ezbookkeeping | USD | ISO 4217 default currency |
| `EBK_SECURITY_TRUSTED_PROXY_IPS` | ezbookkeeping | 100.64.0.0/10,152.233.0.0/17,fd00::/8,10.0.0.0/8,127.0.0.0/8,169.254.0.0/16,172.16.0.0/12,192.168.0.0/16 | Real client IP behind the edge |
| `EBK_STORAGE_MINIO_ACCESS_KEY_ID` | ezbookkeeping | - | Bucket access key |
| `EBK_STORAGE_MINIO_SECRET_ACCESS_KEY` | ezbookkeeping | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ezbookkeeping)
