# Deploy Lettertrace AEO Monitor on Railway

AEO and GEO monitoring: how ChatGPT, Claude and Perplexity name your brand

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lettertrace-aeo-monitor)

## About

Lettertrace watches how AI assistants answer questions about your brand. You
describe your brand and a few topics, it generates the questions people actually
ask, runs them against ChatGPT, Claude, Gemini or Perplexity using your own API
key, and records who got named, who got recommended, and which pages got cited.
Over time that becomes a trend line for your visibility and your share of voice
against named competitors.

Lettertrace is a Next.js app that normally expects a hosted Supabase project for
its database and accounts, which means creating an account somewhere else and
pasting over a thousand lines of SQL before the app will start. This template
removes that step. The container carries the two pieces it actually uses, the
accounts service and the data API, alongside the app itself behind a single
router, with Railway's own Postgres holding the data on a volume.

On first boot the container creates its database roles, migrates the accounts
tables, applies the application schema, and only then starts serving. That takes
about two minutes and the deploy logs narrate each step. Nothing is asked of you
at deploy time: the signing secret, the at-rest encryption secret and the
scheduled-run secret are all generated for you.

It is bring your own key by design. No AI provider credentials ship with the
image and none are asked for at deploy time. You add a key inside the app after
signing in, where it is verified against the provider and then encrypted before
it is stored. Every model call your deployment makes is billed to that key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| lettertrace | `ghcr.io/hmseeb/lettertrace-railway:0.1.0-r3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | - |
| `POSTGRES_USER` | postgres | (secret) | - |
| `POSTGRES_PASSWORD` | postgres | (secret) | - |
| `PORT` | lettertrace | 8080 | Port the app is served on. Pinned, because Next.js honours PORT and would otherwise drift off the port the public address points at. |
| `JWT_SECRET` | lettertrace | (secret) | Signs everyone's sessions, and the key the browser uses is derived from it. Generated for you. Changing it signs everybody out; it loses no data. |
| `CRON_SECRET` | lettertrace | (secret) | Required in the Authorization header to trigger a scheduled run. Generated whether or not you wire up a scheduler, because that endpoint spends your AI provider credit and this is the only thing guarding it. |
| `DATABASE_URL` | lettertrace | - | Where everything is stored. Wired to the Postgres service in this template. |
| `ENCRYPTION_SECRET` | lettertrace | (secret) | Encrypts the AI provider keys people add inside the app. Generated for you. Changing it makes every stored provider key permanently unreadable, so leave it alone. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/lettertrace-aeo-monitor)
