# Deploy chatto on Railway

Deploy and Host chatto with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatto)

## About

Chatto is a fast, fully-featured team chat app (an open-source Slack/Discord alternative) for teams and communities that want to own their conversations. It ships as a single Go binary with embedded NATS/JetStream storage — no external database, no message broker — with encryption at rest, roles and permissions, forums and feeds, and GraphQL + NATS APIs.

This template runs Chatto as one service with one volume — that's the whole stack. The embedded NATS/JetStream store keeps messages, users, and uploads on the attached volume at `/data`, and the four required signing/encryption secrets are auto-generated on first boot and persisted there too, so everything survives redeploys with zero configuration. The image honors Railway's injected `PORT`, derives its public URL from your Railway domain, and answers healthchecks on `/healthz`. Add SMTP credentials when you want email/password registration and password resets, or create the first account from the service shell with `/chatto operator user create`. One-command portable backups (`chatto backup`) let you move your instance anywhere, including Chatto Cloud.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatto | `ghcr.io/bon5co/chatto:latest` | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chatto)
