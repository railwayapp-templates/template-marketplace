# Deploy inboxorcist on Railway

Self-hosted, privacy-first Gmail cleanup tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/inboxorcist)

## About

Inboxorcist is a powerful Gmail cleanup tool with advanced filtering capabilities. Bulk delete emails by sender, category, date range, size,
  and more. Visualize storage savings before you delete. Unsubscribe from unwanted senders in bulk. Handles 100k+ emails that Gmail's native UI
   simply cannot.

  ## About Hosting Inboxorcist

  Inboxorcist gives you complete control over your Gmail inbox cleanup. Unlike cloud-based email cleaners that read your emails on their
  servers, Inboxorcist runs entirely on your own infrastructure. Connect multiple Gmail accounts, apply powerful filters to find exactly what
  you want to delete, preview how much storage you'll reclaim, and execute bulk deletions that would take hours manually. The app syncs your
  email metadata locally, enabling lightning-fast searches across millions of messages without repeatedly hitting Gmail's API.

  ## Common Use Cases

  - **Reclaim Storage** - Filter by size to find and delete emails with large attachments. See exactly how many GB you'll free before clicking
  delete.
  - **Bulk Unsubscribe** - Find all emails from promotional senders, newsletters, and marketing lists. Unsubscribe and delete years of
  accumulated junk in one action.
  - **Inbox Archaeology** - Use advanced filters (sender domain, date range, category, labels) to surgically remove old emails while keeping
  what matters.
  - **Multi-Account Cleanup** - Connect multiple Gmail accounts and clean them all from a single dashboard.

  ## Dependencies for Inboxorcist Hosting

  - PostgreSQL database (provisioned automatically by this template)
  - Google OAuth credentials ([setup guide](https://inboxorcist.com/docs/google-oauth-setup))

  ### Deployment Dependencies

  - [Google Cloud Console](https://console.cloud.google.com/apis/credentials) - Create OAuth 2.0 credentials (5 minutes)
  - [Inboxorcist Documentation](https://inboxorcist.com/docs) - Full feature guide and configuration options

  ## Why Deploy Inboxorcist on Railway?

  Railway provides the simplest path to self-hosting Inboxorcist. One click provisions everything you need - the app, PostgreSQL database, and
  automatic HTTPS. Your email metadata stays on your Railway instance, not on some third-party email cleaner's servers.

  Unlike browser extensions or SaaS email cleaners that require constant access to your inbox, Inboxorcist syncs once and works locally.
  Railway's persistent storage means your sync data survives restarts, so you're not re-downloading metadata every time. Scale up when cleaning
   a massive inbox, scale down when idle - pay only for what you use.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| inboxorcist | [inboxorcist/inboxorcist](https://github.com/inboxorcist/inboxorcist) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | inboxorcist | 8080 | Port to run the server |
| `APP_URL` | inboxorcist | - | Railway public deployment URL or Custom Domain |
| `JWT_SECRET` | inboxorcist | (secret) | Secret key must be 32 characters long. Generate with: openssl rand -base64 32 |
| `DATABASE_URL` | inboxorcist | - | Postgres database URL |
| `ENCRYPTION_KEY` | inboxorcist | - | Must be a 64-character hex string. Generate with: openssl rand -hex 32 |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, MDX, Shell, PowerShell, CSS, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/template/inboxorcist)
