# Deploy DocuSeal (Open-Source DocuSign Alternative) on Railway

Open-source DocuSign alternative. Sign PDFs legally. Postgres included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-open-source-docusign-alternativ)

## About

Self-host DocuSeal — the open-source DocuSign alternative — in one click. Upload a PDF, drag signature and text fields onto it, and send it out for legally-binding e-signatures, with PostgreSQL persistence and a volume for your signed documents.

DocuSeal is a document-signing platform: create reusable templates from PDF/DOCX files, invite signers by email or share a link, collect signatures, and download completed, audit-trailed documents. This template pins the current stable release (docuseal/docuseal:3.1.5) and stores documents on a persistent volume with metadata in a private-only Postgres 17. The Rails `SECRET_KEY_BASE` is auto-generated per deploy, and registration is invite-only by default — the first person to open the app claims the admin account at `/setup`, so do it right after deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docuseal | `docuseal/docuseal:3.1.5` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | docuseal | - | Public hostname of this DocuSeal instance. |
| `DATABASE_URL` | docuseal | - | Postgres connection string over private networking. |
| `SECRET_KEY_BASE` | docuseal | (secret) | Auto-generated Rails secret key base. |
| `POSTGRES_DB` | Postgres | docuseal | Database name created on first boot. |
| `DATABASE_URL` | Postgres | - | Connection string used by DocuSeal over private networking. |
| `POSTGRES_USER` | Postgres | (secret) | Database user for DocuSeal. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/docuseal-open-source-docusign-alternativ)
