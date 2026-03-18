# Deploy Keila on Railway

Self-hosted newsletter platform with powerful features

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/keila)

## About

Keila is an open source newsletter tool and alternative to Mailchimp or Sendinblue. It lets you send newsletter campaigns, create sign-up forms, and manage contacts. Keila supports SMTP, AWS SES, Sendgrid, Mailgun, and Postmark for email delivery.

Keila is an Elixir/Phoenix application that requires a PostgreSQL database for storing contacts, campaigns, and configuration. Deployment involves setting up the database connection, configuring a secret key for session encryption, and providing SMTP or transactional email service credentials for sending campaigns. The application runs as a Docker container and needs persistent storage for the database. You'll also need to configure the base URL for your deployment so that sign-up forms and unsubscribe links work correctly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Keila | `pentacent/keila` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Postgres database |
| `DATABASE_URL` | Postgres | - | Postgres database URL |
| `POSTGRES_USER` | Postgres | (secret) | Postgres user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public database URL |
| `DB_URL` | Keila | - | URL following the schema postgres://user:password@host/database |
| `URL_HOST` | Keila | - | Domain of your Keila instance |
| `KEILA_USER` | Keila | (secret) | Email address for the root user |
| `KEILA_PASSWORD` | Keila | (secret) | Password for the root user. At least 10 characters |
| `SECRET_KEY_BASE` | Keila | (secret) | Strong secret with at least 64 characters |
| `MAILER_SMTP_HOST` | Keila | - | Hostname of the SMTP server |
| `MAILER_SMTP_PORT` | Keila | - | Port of the SMTP server |
| `MAILER_SMTP_USER` | Keila | (secret) | Username for the SMTP server |
| `MAILER_ENABLE_SSL` | Keila | - | Enable SSL/TLS by setting to true |
| `MAILER_SMTP_PASSWORD` | Keila | (secret) | Password for the SMTP server |
| `MAILER_ENABLE_STARTTLS` | Keila | - | Enable STARTTLS by setting to true |
| `MAILER_SMTP_FROM_EMAIL` | Keila | - | FROM email address |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/keila)
