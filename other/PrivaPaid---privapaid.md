# Deploy PrivaPaid on Railway

A template for PrivaPaid the paywall

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/privapaid)

## About

PrivaPaid is an open-source, encryption-first content platform for selling media with Bitcoin Lightning payments. Video, audio, articles, photos, podcasts: everything encrypted at rest with AES-256-GCM, paid via SatsRail. No payment processor accounts, no chargebacks, no middlemen. White-label with your name, colors, and domain.

This template deploys PrivaPaid alongside a managed Postgres database. The Next.js app builds from the Dockerfile, runs Prisma migrations on boot, and serves both the admin dashboard and the public storefront. Encryption keys and session secrets are generated per-deploy so each instance is cryptographically isolated. You connect a SatsRail merchant account through the setup wizard, create channels, and upload media. Buyers pay Lightning invoices and decrypt content in their browser after payment. The server never decrypts content for a buyer. Add a custom domain in Railway's networking settings, and SSL is handled automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| privapaid | [SatsRail/privapaid](https://github.com/SatsRail/privapaid) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_SECRET` | privapaid | (secret) | - |
| `SATSRAIL_API_URL` | privapaid | https://satsrail.com/api/v1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Shell, HTML, PLpgSQL, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/privapaid)
