# Deploy Stalwart Mail S3 on Railway

Stalwart mail with PostgreSQL and Railway object storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stalwart-mail-s3)

## About

Stalwart is an all-in-one mail and collaboration server supporting SMTP, JMAP, IMAP, POP3, CalDAV, CardDAV, and WebDAV. This template pins Stalwart Server v0.16.15 and configures its supported S3 blob backend to use a Railway Bucket. Raw messages, attachments, Sieve scripts, and files go to object storage; Railway PostgreSQL holds accounts, mailbox state, indexes, and server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| stalwart | [monotykamary/railway-template-stalwart](https://github.com/monotykamary/railway-template-stalwart) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database initialized for Stalwart. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `PORT` | stalwart | 8080 | Pins Railway HTTP routing and health checks to Stalwart's cleartext HTTP listener. |
| `S3_BUCKET` | stalwart | - | Globally unique Railway Bucket API name. |
| `S3_REGION` | stalwart | - | Railway Bucket signing region. |
| `MAIL_DOMAIN` | stalwart | - | Primary email domain served by Stalwart, for example example.com. |
| `S3_ENDPOINT` | stalwart | - | Railway Bucket S3-compatible endpoint. |
| `MAIL_HOSTNAME` | stalwart | - | Public mail hostname used in SMTP greetings and discovery, for example mail.example.com. |
| `POSTGRES_HOST` | stalwart | - | Private PostgreSQL hostname. |
| `POSTGRES_PORT` | stalwart | - | Private PostgreSQL port. |
| `POSTGRES_USER` | stalwart | (secret) | PostgreSQL user referenced from the database service. |
| `S3_ACCESS_KEY_ID` | stalwart | - | Railway Bucket S3 access key reference. |
| `POSTGRES_DATABASE` | stalwart | - | Stalwart metadata database name. |
| `POSTGRES_PASSWORD` | stalwart | (secret) | PostgreSQL password referenced from the database service. |
| `STALWART_PUBLIC_URL` | stalwart | - | Public HTTPS origin advertised by JMAP and OAuth discovery. |
| `S3_SECRET_ACCESS_KEY` | stalwart | (secret) | Railway Bucket secret key reference; it is not written into Stalwart config. |
| `STALWART_BOOTSTRAP_PASSWORD` | stalwart | (secret) | Generated fallback administrator password used for first sign-in as admin. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/stalwart`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/stalwart-mail-s3)
