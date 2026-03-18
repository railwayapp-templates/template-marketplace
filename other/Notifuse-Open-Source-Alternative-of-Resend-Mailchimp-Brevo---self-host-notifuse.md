# Deploy Notifuse | Open Source Alternative of Resend, Mailchimp, Brevo on Railway

Self-Host Notifuse on Railway — email, SMS, push notifications and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/self-host-notifuse)

## About

Self-host Notifuse on Railway with one click — get a fully running email marketing and transactional email platform backed by a dedicated PostgreSQL database. This template provisions two services: the `notifuse/notifuse:latest` Docker image and a Railway-managed Postgres instance, wired together automatically via private networking. 

Notifuse is an open-source alternative to Mailchimp, Brevo, and Listmonk, built with Go and React. Run Notifuse on Railway and keep your subscriber data entirely on your own infrastructure, without per-email fees.

![Notifuse Railway template deployed — two services: notifuse and Postgres](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773469129/notifuse_railway_arch_lwu6so.png)

---

Notifuse is a self-hosted email platform for developers who want full control over their email stack without SaaS pricing. It handles both marketing campaigns and transactional emails from a single interface.

**Key features:**
- Visual MJML drag-and-drop email builder
- Broadcast campaigns with A/B testing and open/click analytics
- Multi-provider support: Amazon SES, Mailgun, Postmark, SendGrid, SparkPost, Mailjet, SMTP
- Transactional email via REST API with automatic provider failover
- Subscriber segmentation, contact lists, and tagging
- SMTP relay — lets tools like Supabase Auth or Firebase route through Notifuse
- Webhook support and event logs
- Notification center widget embeddable in your product

**Architecture:** The Railway template runs Notifuse as a single Docker container. It connects to Postgres over Railway's private network. Notifuse creates one database per workspace automatically — this is why it requires root-level Postgres credentials.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Notifuse | `notifuse/notifuse:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `PORT` | Notifuse | 8080 | HTTP server listening port |
| `DB_HOST` | Notifuse | - | Hostname of Postgres database |
| `DB_PORT` | Notifuse | - | Port of Postgres server |
| `DB_USER` | Notifuse | (secret) | Username for database authentication |
| `LOG_LEVEL` | Notifuse | info | Logging verbosity level |
| `TELEMETRY` | Notifuse | false | Disable telemetry reporting |
| `DB_SSLMODE` | Notifuse | require | Require SSL for database connections |
| `SECRET_KEY` | Notifuse | (secret) | Secret key for application security |
| `DB_PASSWORD` | Notifuse | (secret) | Password for database authentication |
| `ENVIRONMENT` | Notifuse | production | Application runtime environment |
| `SERVER_HOST` | Notifuse | 0.0.0.0 | Bind server to all interfaces |
| `SERVER_PORT` | Notifuse | 8080 | Internal server port configuration |
| `CHECK_FOR_UPDATES` | Notifuse | true | Enable automatic update checks |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/self-host-notifuse)
