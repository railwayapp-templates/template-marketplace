# Deploy Papra on Railway

The minimalistic document archiving platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/papra)

## About

![papra](https://github.com/papra-hq/papra/raw/main/.github/papra-screenshot.png)

Papra is a lightweight, self-hosted document management system focused on fast ingestion, full-text search, and long-term organization of personal or team documents. It emphasizes simplicity over heavy automation, providing a clean web interface for uploading, tagging, and retrieving PDFs and other files without the operational overhead of larger DMS platforms.

Hosting Papra involves running its web service alongside a persistent storage layer for uploaded documents and metadata. On Railway, this typically means deploying the Papra service as a containerized application, configuring environment variables for storage paths and security settings, and optionally attaching a managed database if Papra is configured to use one. Railway handles builds, restarts, and scaling, while persistent volumes or external object storage ensure documents are retained across deploys. The result is a low-maintenance, always-on document archive accessible via a stable public URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Papra | `ghcr.io/papra-hq/papra:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1221 | Application port. |
| `AUTH_SECRET` | (secret) | JWT/auth signing key. |
| `APP_BASE_URL` | - | Application base URL. |
| `OWLRELAY_API_KEY` | (secret) | The API key used to interact with OwlRelay for the intake emails. |
| `INTAKE_EMAILS_DRIVER` | - | The driver to use when generating email addresses for intake emails, value can be one of: `owlrelay`, `catch-all`. |
| `OWLRELAY_WEBHOOK_URL` | - | The webhook URL to use when generating email addresses for intake emails with OwlRelay, if not provided, the webhook will be inferred from the server URL. |
| `INTAKE_EMAILS_IS_ENABLED` | - | Allow intake emails. |
| `INGESTION_FOLDER_IS_ENABLED` | true | A special folder that is watched by Papra for new files. |
| `INTAKE_EMAILS_WEBHOOK_SECRET` | (secret) | The secret to use when verifying webhooks. |

## Configuration

- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/app-data`

**Category:** Other

[View on Railway →](https://railway.com/template/papra)
