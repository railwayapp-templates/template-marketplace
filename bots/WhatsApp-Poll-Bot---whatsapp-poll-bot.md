# Deploy WhatsApp Poll Bot on Railway

Self-hosted WhatsApp bot to schedule recurring polls across multiple groups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-poll-bot)

## About

WhatsApp Poll Bot is a self-hosted bot that schedules and sends recurring polls to multiple WhatsApp groups, with a mobile-first web dashboard to manage polls, view results, and
  administer users. Powered by Baileys (no headless browser), it runs in ~80 MB RAM and supports daily, weekly, monthly, or custom cron schedules.

  ## About Hosting WhatsApp Poll Bot

  Hosting Poll Bot involves running a single Node.js process that combines an Express HTTP dashboard, a Baileys WebSocket client (the WhatsApp connection), and a node-cron scheduler — all
  inside one container. Persistent state lives in SQLite on a mounted volume so the WhatsApp session survives redeploys; optional PostgreSQL backups go to a separate service for safety.
  After the first deploy, you scan a QR code once with the WhatsApp account dedicated to the bot, then sign in to the dashboard with a 6-digit code sent over WhatsApp. From there, you
  create poll schedules, target groups, and watch votes flow in real time.

  ## Common Use Cases

  - Recurring attendance polls across multiple groups (team check-ins, sports practice, weekly meal planning)
  - Self-hosted survey scheduler for communities, clubs, and small organizations
  - Lightweight alternative to commercial WhatsApp group management SaaS, kept fully on infrastructure you control

  ## Dependencies for WhatsApp Poll Bot Hosting

  - A **secondary WhatsApp account** dedicated to the bot (never use your personal account — Meta may flag automated activity)
  - A **persistent volume** mounted at `/app/data` for the SQLite database and WhatsApp session
  - A **PostgreSQL service** (optional, but recommended) for off-volume backups — auto-provisioned by this template

  ### Deployment Dependencies

  - [Source repository](https://github.com/Logorrheique/whatsapp-poll-bot) — MIT licensed, ~290 Vitest tests
  - [Baileys](https://github.com/WhiskeySockets/Baileys) — pure-Node WhatsApp Web protocol library
  - [WhatsApp Web](https://web.whatsapp.com/) — for the initial QR pairing reference

  ### Implementation Details

  After deployment, set two required environment variables in Railway:

  - `ADMIN_PHONES` — your phone number(s) in international format without the `+` (e.g., `33612345678`), comma-separated
  - `PAIR_SECRET` — 24+ random characters that gate the QR display (generate with `openssl rand -hex 24`)

  Optional variables (`VIEWER_PHONES`, `ALLOWED_PHONES`, `TIMEZONE`, `BACKUP_TRIGGER_SECRET`, `BAILEYS_LOG_LEVEL`) are documented in
  [`.env.example`](https://github.com/Logorrheique/whatsapp-poll-bot/blob/master/.env.example).

  Once the service boots, open its public URL, choose **Admin mode**, enter your `PAIR_SECRET`, and scan the QR code with the bot's WhatsApp account (Settings → Linked Devices → Link a
  Device). You'll then be prompted for your phone number and a 6-digit verification code sent via WhatsApp — and you're in.

  ## Why Deploy WhatsApp Poll Bot on Railway?

  
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically
  and horizontally scale it.

  By deploying WhatsApp Poll Bot on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more
  on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| poll-bot-whatsapp | [Logorrheique/poll-bot-whatsapp](https://github.com/Logorrheique/poll-bot-whatsapp) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ADMIN_PHONE` | poll-bot-whatsapp | - | Admin phone that are allowed to connect to the service |
| `PAIR_SECRET` | poll-bot-whatsapp | (secret) | Main password secret - Only used one time |
| `DATABASE_URL` | poll-bot-whatsapp | - | Postgres DATABASE_URL |
| `ALLOWED_PHONES` | poll-bot-whatsapp | - | Observers phone - Only Read Access |
| `BACKUP_TRIGGER_SECRET` | poll-bot-whatsapp | (secret) | Github secret to start github actions |
| `POSTGRES_DB` | Postgres | - | Default postgres DB |
| `DATABASE_URL` | Postgres | - | Default postgres URL  |
| `POSTGRES_USER` | Postgres | (secret) | Default postgres user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Setup your postgres password |
| `DATABASE_PUBLIC_URL` | Postgres | - | DATABASE_PUBLIC_URL |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** TypeScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-poll-bot)
