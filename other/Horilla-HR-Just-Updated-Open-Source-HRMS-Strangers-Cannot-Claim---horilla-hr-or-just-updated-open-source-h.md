# Deploy Horilla HR | (Just Updated) Open-Source HRMS Strangers Cannot Claim on Railway

Open-source HRMS: setup wizard sealed, admin seeded, uploads persist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/horilla-hr-or-just-updated-open-source-h)

## About

Horilla is a free, open-source HR management system (HRMS) covering recruitment, onboarding,
employee records, attendance, leave, payroll, assets, performance and helpdesk. This template
deploys Horilla 2.0 with a PostgreSQL database, a persistent volume for uploaded documents,
and an administrator account that is created for you at first boot.

Horilla is a Django application. It needs a PostgreSQL database, a writable media directory for
uploaded files (contracts, avatars, payslips), static files collected at boot, and a WSGI server.
This template runs Gunicorn with a single worker, because Horilla schedules background jobs
in-process with APScheduler and additional workers would run every job more than once.

Two things matter on a public URL. First, Horilla ships a setup wizard whose account-creation
endpoint has no authentication, so on a stock deployment the first stranger who finds the URL can
create a superuser and sign in. This template blocks the setup routes entirely and seeds the
administrator from a per-deployment generated password instead. Second, `MEDIA_ROOT` must point at
the mounted volume, or every uploaded document disappears on the next redeploy. Both are handled
here, and the deployment refuses to start if the administrator password is empty or is one of the
well-known upstream defaults.

The administrator password is re-applied on every boot, so redeploying the service is a working
password reset — Horilla's own recovery path is an emailed link, and a fresh deployment has no
SMTP server configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| horilla | `ghcr.io/bon5co/horilla-railway:2.0.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY` | horilla | (secret) |
| `DB_INIT_PASSWORD` | horilla | (secret) |
| `HORILLA_ADMIN_PASSWORD` | horilla | (secret) |
| `HORILLA_ADMIN_USERNAME` | horilla | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`

**Category:** Other

[View on Railway →](https://railway.com/deploy/horilla-hr-or-just-updated-open-source-h)
