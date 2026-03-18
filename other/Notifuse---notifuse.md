# Deploy Notifuse on Railway

Open-source alternative to Mailchimp, Brevo, Mailjet, Listmonk, Mailerlite

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notifuse)

## About

Notifuse is an open-source, self-hosted email marketing and transactional email platform. It's a modern alternative to Mailchimp, Brevo, or Listmonk with a visual drag-and-drop email builder (MJML), campaign management, A/B testing, subscriber segmentation, multi-provider support (Amazon SES, Mailgun, Postmark, SendGrid, SparkPost, Mailjet, SMTP), and a powerful transactional API—all without per-email pricing.

Notifuse is built with Go and React and requires a PostgreSQL database. On first launch, an interactive Setup Wizard guides you through configuration—setting up your root administrator email, API endpoint, and SMTP settings. The application creates a separate database for each workspace to ensure data isolation. You'll need PostgreSQL with root credentials (Notifuse creates the databases automatically), and an SMTP server for system emails like password resets and invitations. The only required environment variable is `SECRET_KEY` for encryption; all other settings can be configured through the Setup Wizard or set as environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| notifuse | `notifuse/notifuse:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_HOST` | notifuse | - | Postgres host |
| `DB_PORT` | notifuse | - | Postgres port |
| `DB_USER` | notifuse | (secret) | Database User |
| `SECRET_KEY` | notifuse | (secret) | Secret key for encryption, Never change after initial setup. It encrypts all workspace integration secrets |
| `DB_PASSWORD` | notifuse | (secret) | Database Password |
| `API_ENDPOINT` | notifuse | - | Public API endpoint URL |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/notifuse)
