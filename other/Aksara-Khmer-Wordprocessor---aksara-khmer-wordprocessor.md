# Deploy Aksara Khmer Wordprocessor on Railway

Khmer web editor with word breaking, grammar, spellcheck, voice input

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aksara-khmer-wordprocessor)

## About

Aksara is a web-based text editor built for the Khmer language. It automatically segments Khmer text into words — something standard editors can't do since Khmer doesn't use spaces between words — and layers on spell checking, grammar checking, voice input, and document management.

This template deploys three services: the Next.js application, a PostgreSQL database for user accounts and documents, and a cron service that processes the email queue on a schedule. The app handles word segmentation, spell checking, and document export entirely in the browser, so server load stays low even with active users. You'll need to configure Cloudflare Turnstile keys for bot protection on signup and login, and SMTP credentials if you want to send transactional emails (verification, password reset). An optional encryption key lets you encrypt stored documents at rest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| nextjs | [sungkhum/aksara](https://github.com/sungkhum/aksara) | Web service |
| Email CRON | [sungkhum/aksara](https://github.com/sungkhum/aksara) (root: /cron-service) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_HOST` | nextjs | - | SMTP server hostname for sending emails |
| `SMTP_PORT` | nextjs | 587 | SMTP server port |
| `SMTP_USER` | nextjs | (secret) | SMTP login email address |
| `CRON_SECRET` | nextjs | (secret) | Secret for authenticating cron job requests. Generate with: openssl rand -base64 32 |
| `DATABASE_URL` | nextjs | - | PostgreSQL connection URL (auto-set by Railway Postgres plugin) |
| `SMTP_PASSWORD` | nextjs | (secret) | SMTP login password |
| `ENCRYPTION_KEY` | nextjs | - | Document encryption key (optional). Generate with: openssl rand -base64 32 |
| `SMTP_FROM_NAME` | nextjs | Aksara | Sender display name for outgoing mail |
| `BETTER_AUTH_URL` | nextjs | - | Public URL of the app (used by Better Auth) |
| `SMTP_FROM_EMAIL` | nextjs | - | Sender email address for outgoing mail |
| `BETTER_AUTH_SECRET` | nextjs | (secret) | Auth session signing key. Generate with: openssl rand -base64 32 |
| `ELEVENLABS_API_KEY` | nextjs | (secret) | ElevenLabs API key for voice input (optional) |
| `TURNSTILE_SECRET_KEY` | nextjs | (secret) | Cloudflare Turnstile server-side secret key for bot protection |
| `INTERNAL_DATABASE_URL` | nextjs | - | Internal PostgreSQL URL for lower latency in production |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | nextjs | - | Public URL of the app (client-side auth) |
| `NEXT_PUBLIC_SIGNUPS_ENABLED` | nextjs | true | Enable user registration |
| `NEXT_PUBLIC_SHOW_SAMPLE_TEXT` | nextjs | true | Show sample Khmer text for new users |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | nextjs | - | Cloudflare Turnstile client-side site key |
| `CRON_SECRET` | Email CRON | (secret) | Shared secret to authenticate cron requests to the app |
| `CRON_TARGET_URL` | Email CRON | - | Internal URL of the Aksara app (e.g. http://aksara.railway.internal) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Python, Shell, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/aksara-khmer-wordprocessor)
