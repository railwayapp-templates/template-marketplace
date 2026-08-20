# Deploy Mattermost | (Just Updated) Slack Alternative Nobody Else Can Claim on Railway

Seeds the admin a stock deploy never creates. Files on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost-or-just-updated-slack-alterna)

## About

Mattermost Team Edition is an open-source, self-hosted Slack alternative: channels, threads, direct messages, file sharing, search, integrations and mobile and desktop clients, running on infrastructure you control. This template deploys it with the system administrator account already created, because a stock Mattermost deploy contains no user and hands the `system_admin` role to whoever opens the URL first.

This template runs Mattermost Team Edition 11.10.0 as two services: the server itself with its file store on a persistent volume, and PostgreSQL for messages, channels, users and the server configuration. The administrator is created while the server is still bound to loopback, so the first request the public URL ever answers is against a claimed instance, and the password is re-applied on every boot, which makes a redeploy a working password reset. The volume's ownership is repaired before the server starts, because Railway mounts volumes as root while the Mattermost image runs as an unprivileged user. Plugins and the search index live on that same volume, and the server configuration is stored in PostgreSQL so System Console changes survive a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mattermost | `ghcr.io/bon5co/mattermost-railway:11.10.0` | Web service |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MM_ADMIN_PASSWORD` | mattermost | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v4/system/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mattermost/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mattermost-or-just-updated-slack-alterna)
