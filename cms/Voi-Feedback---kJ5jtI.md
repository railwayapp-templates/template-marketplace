# Deploy Voi Feedback on Railway

Minimalist self-hosted customer feedback CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kJ5jtI)

## About

You need at least one Postgresql instance up and running.

Then you can deploy like a simple Next.js app.

The environment variables you need:

```
NEXTAUTH_SECRET=topsecret
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=postgres://....

SMTP_USER=yoursmtpuser
SMTP_PASSWORD=yoursmtppass
SMTP_HOST=yoursmtpserver
SMTP_PORT=587
```

More details documentation is coming.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| voi | [getsieutoc/voi](https://github.com/getsieutoc/voi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SMTP_HOST` | voi | - | Server of SMTP |
| `SMTP_PORT` | voi | 587 | Usually it's 25, 2525 or 587 |
| `SMTP_USER` | voi | (secret) | Username of SMTP |
| `EMAIL_FROM` | voi | - | Usually it's info@yourdomain.com |
| `DATABASE_URL` | voi | - | Database URL, you can use DATABASE_URL too. |
| `NEXTAUTH_URL` | voi | - | Remember to generate Railway domain or add your custom domain |
| `SMTP_PASSWORD` | voi | (secret) | Password for SMTP |
| `NEXTAUTH_SECRET` | voi | (secret) | Secret for NextAuth JWT |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm prisma migrate deploy && pnpm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, MDX, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/kJ5jtI)
