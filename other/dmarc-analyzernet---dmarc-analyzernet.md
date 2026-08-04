# Deploy dmarc-analyzer.net on Railway

Template for dmarc-analyzer.net

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dmarc-analyzernet)

## About

DMARC Analyzer is an open-source, self-hosted DMARC monitoring platform for agencies and IT teams managing email authentication across many client domains. It ingests the aggregate reports mailbox providers send under `rua=`, parses them, and shows who's sending as your domain, SPF/DKIM alignment, and enforcement progress — unlimited domains, no per-domain pricing.

Hosting DMARC Analyzer means running two pieces: the application (API and worker, shipped as a single container image that can run both roles in one process or split them across services) and a PostgreSQL database. The worker polls an IMAP mailbox on a schedule, extracts and parses DMARC XML reports out of compressed attachments, and stores the results; the API serves the console and dashboards. Mailbox credentials are encrypted at rest with a key you provide. A single service plus a database is enough for most agencies — splitting the API and worker apart is optional and only needed at higher ingestion volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| dmarc-analyzer-net/dmarc-analyzer:latest | `ghcr.io/dmarc-analyzer-net/dmarc-analyzer:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | dmarc-analyzer-net/dmarc-analyzer:latest | 8080 | - |
| `APP_MODE` | dmarc-analyzer-net/dmarc-analyzer:latest | all | - |
| `Database__MigrateOnStartup` | dmarc-analyzer-net/dmarc-analyzer:latest | true | - |
| `Security__CredentialEncryptionKey` | dmarc-analyzer-net/dmarc-analyzer:latest | (secret) | run: openssl rand -base64 32 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/auth/setup`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dmarc-analyzernet)
