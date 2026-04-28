# Deploy Keila | Open Source Mailchimp Alternative on Railway

Self-host Keila open-source newsletter tool, email marketing on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keila-newsletter)

## About

Keila is an open-source, self-hosted newsletter and email marketing tool that lets you run your own opt-in mailing lists, send transactional and broadcast campaigns, and manage subscribers from a clean Phoenix LiveView dashboard. Self-host Keila on Railway to escape per-subscriber pricing from Mailchimp, Brevo, or ConvertKit while keeping full control of your subscriber data and sending reputation.

This Railway template deploys Keila using the official `pentacent/keila` Docker image, provisions a managed Postgres database (which doubles as Keila's Oban background job queue), and wires up a persistent volume for newsletter campaign images and uploaded user content.

Keila is a complete email marketing platform built in Elixir/Phoenix. It handles subscriber lists with double opt-in confirmation, captcha-protected sign-up forms, drag-and-drop or HTML campaign editing, automatic bounce and complaint processing, click and open tracking, and segmentation by tag or custom field. Background sending uses Oban, a Postgres-backed job queue — there's no separate Redis dependency to deploy or pay for.

Key features:
- Opt-in subscriber management with double opt-in confirmation
- Drag-and-drop campaign editor plus raw HTML mode
- hCaptcha and Friendly Captcha support on public sign-up forms
- Automatic bounce, complaint, and unsubscribe handling
- Click and open tracking with public unsubscribe links
- Per-sender SMTP configuration (multiple senders per instance)
- API access for programmatic subscriber and campaign management
- AGPLv3 open source — no per-subscriber fees, ever

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Keila | `pentacent/keila:0.19.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Keila | 4000 | Internal Phoenix listen port |
| `DB_URL` | Keila | - | Postgres connection string |
| `URL_HOST` | Keila | - | Public hostname for generated URLs |
| `URL_PORT` | Keila | 443 | Public port for generated URLs |
| `KEILA_USER` | Keila | (secret) | Bootstrap root admin email |
| `URL_SCHEMA` | Keila | https | Public scheme for generated URLs |
| `KEILA_PASSWORD` | Keila | (secret) | Bootstrap root admin password |
| `SECRET_KEY_BASE` | Keila | (secret) | Phoenix session signing key |
| `MAILER_SMTP_HOST` | Keila | - | SMTP provider hostname |
| `MAILER_SMTP_PORT` | Keila | - | SMTP port (587 STARTTLS or 465 SSL) |
| `MAILER_SMTP_USER` | Keila | (secret) | SMTP auth username |
| `USER_CONTENT_DIR` | Keila | /opt/app/uploads | Path for uploaded campaign images |
| `DISABLE_REGISTRATION` | Keila | true | Lock public account creation |
| `MAILER_SMTP_PASSWORD` | Keila | (secret) | SMTP auth password (replace before sending) |
| `DISABLE_UPDATE_CHECKS` | Keila | true | Skip outbound update version pings |
| `MAILER_ENABLE_STARTTLS` | Keila | true | Enable STARTTLS on port 587 |
| `MAILER_SMTP_FROM_EMAIL` | Keila | - | System mailer FROM address |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/app/uploads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/keila-newsletter)
