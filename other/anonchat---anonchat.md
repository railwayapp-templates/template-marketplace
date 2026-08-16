# Deploy anonchat on Railway

End-to-end encrypted, anonymous messaging inbox with admin dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anonchat)

## About

Anonchat is a self-hosted, end-to-end encrypted, anonymous messaging inbox.
Anyone can create an anonymous identity - no email, phone number, or account -
and get a private, persistent conversation with the site owner. The owner
gets a Discord/WhatsApp-style admin dashboard with every conversation,
real-time replies, and moderation tools.

This template provisions the complete stack in one click:

- **anonchat** - the app, pulled from the official Docker image
  (`shirasakaren/anonchat:latest`), with a persistent volume at
  `/app/data/uploads` for attachment storage and a `/health` healthcheck
- **Postgres** - a managed PostgreSQL database on Railway's private network,
  wired to the app automatically; migrations run on every start

Everything is configured for you: the database URL, a freshly generated
session secret, the public URL, and proxy settings. No variables to fill in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| anonchat | `shirasakaren/anonchat:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SESSION_SECRET` | anonchat | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/anonchat)
