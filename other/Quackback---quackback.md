# Deploy Quackback on Railway

Open-source feedback platform with voting, roadmaps & changelogs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quackback)

## About

Quackback is the open-source alternative to Canny and UserVoice. Collect feature requests, bug reports, and ideas through public voting boards — then ship what matters with roadmaps and changelogs. Self-host for free with no
   per-seat pricing. Includes 14 integrations and a built-in AI MCP server.

  ## About Hosting Quackback

  This template deploys a production-ready Quackback instance in under 5 minutes. Railway provisions everything automatically: PostgreSQL for data, Dragonfly for background jobs, and an S3-compatible bucket for file uploads.
  Migrations run on startup — no manual steps required. Once deployed, create your admin account and start collecting feedback immediately. Optionally add email delivery, OAuth login (GitHub/Google), and AI features through
  environment variables at any time.

  ## Common Use Cases

  - **Replace expensive feedback tools** — Stop paying per-seat for Canny or UserVoice. Get the same feature set — voting boards, admin inbox, status tracking — on your own infrastructure for the cost of hosting.
  - **Launch a public feedback portal** — Give users a place to submit, vote on, and discuss feature requests. Embed the widget directly in your app with a single script tag.
  - **Connect feedback to your dev workflow** — Sync with Slack, Linear, Jira, GitHub, Intercom, Zendesk, and more. Two-way status sync keeps users in the loop automatically when you ship.

  ## Dependencies for Quackback Hosting

  - **PostgreSQL** (pgvector:pg18) — Primary database, provisioned by the template
  - **Dragonfly** — Redis-compatible store for background job queues, provisioned by the template
  - **S3-compatible storage** — For file uploads, provisioned by Railway's built-in bucket service

  ### Deployment Dependencies

  - [Quackback Documentation](https://quackback.io/docs) — Configuration and self-hosting guide
  - [Quackback on GitHub](https://github.com/QuackbackIO/quackback) — Source code (AGPL-3.0)

  ## Why Deploy Quackback on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Quackback on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| quackback | `ghcr.io/quackbackio/quackback:latest` | Web service |
| dragonfly | `ghcr.io/dragonflydb/dragonfly:v1.37.0` | Database |
| postgres | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | quackback | 3000 |
| `NODE_ENV` | quackback | production |
| `SECRET_KEY` | quackback | (secret) |
| `S3_FORCE_PATH_STYLE` | quackback | true |
| `S3_SECRET_ACCESS_KEY` | quackback | (secret) |
| `POSTGRES_DB` | postgres | quackback |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `dragonfly --cluster_mode=emulated --lock_on_hashtags`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/quackback)
