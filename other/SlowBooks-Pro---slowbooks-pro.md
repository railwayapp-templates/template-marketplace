# Deploy SlowBooks Pro on Railway

QuickBooks alternative: double-entry bookkeeping, invoicing, US payroll

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slowbooks-pro)

## About

SlowBooks Pro 2026 is a full double-entry accounting system: customers and vendors, invoicing and payments, bills, banking, US payroll with tax tables, inventory, jobs and classes, and a report suite that includes profit and loss, balance sheet, trial balance, AR and AP aging, and printable PDFs. It is a source-available replacement for a desktop QuickBooks install, with no per-seat pricing, no transaction caps, and no vendor holding your ledger.

The app is a FastAPI backend with a single-page frontend, served by uvicorn, backed by PostgreSQL. Upstream distributes it as a desktop app and a Docker Compose stack; this template runs the same container image on Railway, built from the upstream Dockerfile, next to a Railway PostgreSQL service with TLS enabled. Database migrations and the chart-of-accounts seed run automatically on every boot, so the instance is usable the moment the deploy turns green. Receipts, logos and other uploads live on a persistent volume; the database lives on its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| slowbooks | [VonHoltenCodes/SlowBooks-Pro-2026](https://github.com/VonHoltenCodes/SlowBooks-Pro-2026) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | slowbooks | 3001 | Pinned to match APP_PORT. Railway injects 8080 otherwise and port autodetection drifts off the real listener. |
| `APP_HOST` | slowbooks | 0.0.0.0 | - |
| `APP_PORT` | slowbooks | 3001 | The port the app listens on and the public domain targets. |
| `APP_DEBUG` | slowbooks | false | Never true on a public deployment: it disables the startup safety checks. |
| `SUTA_RATE` | slowbooks | 0.012 | State unemployment tax rate for your business, as a decimal. |
| `APP_WORKERS` | slowbooks | 2 | Uvicorn worker processes. Raise with the service's memory. |
| `FORCE_HTTPS` | slowbooks | false | Off because Railway's edge already terminates TLS and its health prober runs before it, so an app-level HTTPS redirect fails every healthcheck. |
| `COMPANY_NAME` | slowbooks | My Company | Shown on invoices and reports. Also editable in the app. |
| `DATABASE_URL` | slowbooks | - | Wired to the Postgres service in this template. sslmode=require is mandatory: the app refuses to start on a plaintext database connection. |
| `EMPLOYER_EIN` | slowbooks | - | Employer Identification Number, for payroll filings. |
| `DEFAULT_TERMS` | slowbooks | Net 30 | - |
| `EMPLOYER_STATE` | slowbooks | WA | Two-letter state code used by the payroll tax tables. |
| `DEFAULT_TAX_RATE` | slowbooks | 0.0 | Sales tax rate as a decimal, for example 0.085 for 8.5 percent. |
| `SESSION_SECRET_KEY` | slowbooks | (secret) | Signs login cookies. Generated for you. Without it the app writes a key inside the container, which Railway discards on every redeploy and logs everyone out. |
| `PAYROLL_ENCRYPTION_SECRET` | slowbooks | (secret) | Encrypts employee bank routing and account numbers at rest. Generated for you. Changing it makes existing payroll bank details unreadable unless the old value is put in PAYROLL_ENCRYPTION_SECRET_PREV. |
| `SLOWBOOKS_PRIVATE_NETWORK` | slowbooks | 1 | Relaxes two production guards that assume the app and its database are not reachable from outside. On Railway they are not: the database is on the private network and Railway's edge terminates TLS. Leave at 1. |
| `POSTGRES_DB` | Postgres | bookkeeper | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/app/static/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, JavaScript, HTML, CSS, PowerShell, Shell, Inno Setup, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/slowbooks-pro)
