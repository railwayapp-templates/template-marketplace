# Deploy DocuSeal Document Signing on Railway

Document signing with PostgreSQL and an administrator created at startup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-document--1)

## About

Document signing with PostgreSQL and an administrator created at startup.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Two services: DocuSeal and PostgreSQL. Uploaded documents and generated artifacts are persisted in /data/docuseal; account data is in PostgreSQL. The bootstrap does not reset an existing account or password. Recipient links use native application authorization and need no gateway password. Preserve SECRET_KEY_BASE and the database-backed signing certificates. Review upstream AGPL-3.0 plus LICENSE_ADDITIONAL_TERMS; no paid license or legal compliance certification is included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docuseal | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| postgres | `postgres:17-alpine@sha256:18cfe3ef5e6815560c98237d6216d1e5119702fb0f3894c8785dd58b8bbe5d73` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FORCE_SSL` | docuseal | - | Force ssl resolved automatically from the linked service. Keep this reference when using the included topology. |
| `RAILS_ENV` | docuseal | production | Rails env for docuseal. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_URL` | docuseal | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_EMAIL` | docuseal | - | Required first administrator email. Created before the public listener opens. |
| `ACCOUNT_NAME` | docuseal | My organization | Account name for docuseal. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATABASE_URL` | docuseal | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `ADMIN_PASSWORD` | docuseal | (secret) | Generated admin password. Keep private and preserve with backups. |
| `SECRET_KEY_BASE` | docuseal | (secret) | Generated application signing secret. Preserve across restarts and backup restores. |
| `SIDEKIQ_THREADS` | docuseal | 2 | Sidekiq threads for docuseal. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `RAILS_MAX_THREADS` | docuseal | 5 | Maximum Rails request threads. Tune with available memory and database capacity. |
| `SIDEKIQ_BASIC_AUTH_PASSWORD` | docuseal | (secret) | Generated sidekiq basic auth password. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | docuseal | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/docuseal`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/docuseal-document--1)
