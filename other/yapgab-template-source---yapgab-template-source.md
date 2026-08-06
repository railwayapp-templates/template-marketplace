# Deploy yapgab-template-source on Railway

YapGab template source project

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yapgab-template-source)

## About

YapGab is a white-label AI companion platform. Deploy your own instance in one click — PostgreSQL, session secrets, and encryption keys are all provisioned automatically. You only need your YapGab license key to get started.

YapGab runs as a single Docker container backed by a PostgreSQL database. Railway provisions the database and wires DATABASE_URL automatically. Two secure random secrets (SESSION_SECRET and CONFIG_ENCRYPTION_KEY) are generated on first deploy. After the app starts, an in-app setup wizard guides you through connecting ElevenLabs (voice AI), Stripe (payments), and Resend (email) — no terminal or config file editing required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16` | Database |
| yapgab | `nicknicknicknicko/yapgab:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | - |
| `NODE_ENV` | production | - |
| `SESSION_SECRET` | (secret) | - |
| `YAPGAB_LICENSE_KEY` | - | Your YapGab license key — purchase one at yapgab.com |

## Configuration

- **Start command:** `node dist/index.cjs`
- **Healthcheck:** `/api/license/version`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yapgab-template-source)
