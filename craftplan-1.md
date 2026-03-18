# Deploy Craftplan on Railway

Open-source ERP for artisanal manufacturers and craft businesses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/craftplan-1)

## About

Craftplan is an open-source ERP platform purpose-built for small-scale artisanal manufacturers and craft businesses. It unifies catalog management, inventory control, order processing, production planning, purchasing, and CRM into a single self-hosted application, eliminating the need for multiple separate platforms.

Craftplan is built with Elixir, the Ash Framework, and Phoenix LiveView, and is distributed as a Docker container image (ghcr.io/puemos/craftplan). Hosting it requires a PostgreSQL database and S3-compatible object storage for file uploads. On Railway, the PostgreSQL database is provisioned automatically via a linked service. Environment variables—including cryptographic secrets (SECRET_KEY_BASE, TOKEN_SIGNING_SECRET, CLOAK_KEY), the public HOST, and S3 credentials—must be configured in the Railway dashboard. Migrations run automatically on each startup, so there is no manual setup step after deployment. An external provider such as AWS S3, Cloudflare R2, or Tigris must be configured for file uploads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Craftplan | `ghcr.io/puemos/craftplan:0.3.7` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | Craftplan | - | Host |
| `PORT` | Craftplan | 4000 | Default Port |
| `CLOAK_KEY` | Craftplan | - | Cloack Key |
| `SMTP_HOST` | Craftplan | - | SMTP Host |
| `SMTP_PORT` | Craftplan | 587 | SMPT Port |
| `AWS_REGION` | Craftplan | - | S3 Region |
| `AWS_S3_HOST` | Craftplan | - | S3 Host - Remove the https:// |
| `DATABASE_URL` | Craftplan | - | Database URL |
| `AWS_S3_BUCKET` | Craftplan | - | Bucket name |
| `AWS_S3_SCHEME` | Craftplan | https:// | S3 Scheme (http for minio v.gr) |
| `SMTP_PASSWORD` | Craftplan | (secret) | SMTP Pass |
| `SMTP_USERNAME` | Craftplan | (secret) | SMTP Username |
| `SECRET_KEY_BASE` | Craftplan | (secret) | Key |
| `AWS_ACCESS_KEY_ID` | Craftplan | - | Acces Key |
| `TOKEN_SIGNING_SECRET` | Craftplan | (secret) | Token Key |
| `AWS_SECRET_ACCESS_KEY` | Craftplan | (secret) | Secret access key |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/craftplan-1)
