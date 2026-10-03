# Deploy Shugo on Railway

Context-aware Discord auto-moderation bot powered by Jev

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shugo)

## About

Shugo is a context-aware Discord auto-moderation bot powered by Jev, TypeSafe's System One model. It reads every message in your server, weighs it against the author's account age, how long they've been a member and their recent messages, then flags, deletes or times out rule breakers. Every action it takes is reported to the log channels each server picks with `/settings`.

Shugo is a single Go binary shipped as a small distroless Docker image. It keeps an outbound gateway connection to Discord and calls the Jev API over HTTPS. It has no web server and no public port. Recent messages are kept in memory for a few minutes, and each server's settings live in a SQLite file on a volume mounted at `/data`, so they survive redeploys. Railway mounts volumes as root while the image runs as a non-root user, so the template sets `RAILWAY_RUN_UID=0` to let Shugo write its database. Hosting it means running one always-on container with two secrets, a Discord bot token and a TypeSafe API key. Run exactly one replica: the volume attaches to a single deployment, and a second replica would moderate every message again. Start with `DRY_RUN=true`, pick a log channel with `/settings log-channel set`, tune the thresholds on real traffic, then turn enforcement on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | `ghcr.io/glazk0/shugo` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Bot token from the Discord Developer Portal (Bot → Reset Token). Enable the Message Content intent on the same page. |
| `TYPESAFE_API_KEY` | (secret) | API key for Jev from TypeSafe. If you use OpenRouter, put your OpenRouter key here instead. |

## Configuration

- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/shugo)
