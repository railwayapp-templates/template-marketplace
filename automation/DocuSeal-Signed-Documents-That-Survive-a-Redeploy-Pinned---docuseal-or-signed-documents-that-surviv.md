# Deploy DocuSeal | Signed Documents That Survive a Redeploy, Pinned on Railway

Self-host DocuSeal on Railway — signed documents on a volume, pinned.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-or-signed-documents-that-surviv)

## About

DocuSeal, the open-source alternative to DocuSign, with its documents on a volume so that uploaded templates and signed PDFs survive a redeploy. Pinned, with Postgres on the private network.

Nothing to fill in. Open the domain and create the first account.

Two services:

- **DocuSeal** `3.3.0`: the app, the signing pages and the API, with a volume at `/data/docuseal` for uploaded and signed documents (public)
- **Postgres 17**: accounts, templates and submissions, on its own volume and on the private network only

Upload a PDF, place the fields, and send it for signature by link or email.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DocuSeal | `docuseal/docuseal:3.3.0` | Web service |
| Postgres | `postgres:17.11-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | DocuSeal | 3000 |
| `SECRET_KEY_BASE` | DocuSeal | (secret) |
| `POSTGRES_DB` | Postgres | docuseal |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/docuseal`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/docuseal-or-signed-documents-that-surviv)
