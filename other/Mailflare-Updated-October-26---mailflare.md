# Deploy Mailflare [Updated October '26] on Railway

Mailflare (Open-Source Custom Domain Email Inbox & Calendar Platform)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mailflare)

## About

Mailflare is an open-source, self-hosted email inbox for custom domains. It gives you mailboxes, shared inboxes, a calendar with invitations, public booking pages, routing rules, an AI assistant, and an MCP endpoint in one web app. Mail is sent and received through Resend, Amazon SES, or Cloudflare, so it replaces paying per seat for Google Workspace just to get `you@yourdomain.com`.

Self hosting Mailflare keeps every message, attachment, and calendar event in a SQLite database and file store you own, with no per-user fees and no provider reading your mail. This template builds Mailflare from a pinned upstream commit and runs its Node runtime on Railway, which handles the build, TLS, public domain, healthcheck, restarts, and a persistent volume at `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mailflare | [Shinyduo/mailflare-railway](https://github.com/Shinyduo/mailflare-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | PORT |
| `APP_URL` | - | APP_URL |
| `AI_MODEL` | gpt-4o-mini | AI_MODEL |
| `DATA_DIR` | /data | DATA_DIR |
| `SMTP_INBOUND_PORT` | 0 | SMTP_INBOUND_PORT |
| `INBOUND_WEBHOOK_SECRET` | (secret) | INBOUND_WEBHOOK_SECRET |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mailflare)
