# Deploy Shugo on Railway

Context-aware Discord auto-moderation bot powered by Jev

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shugo)

## About

Shugo is a context-aware Discord auto-moderation bot powered by Jev, TypeSafe's System One model. It reads every message in your server, weighs it against the author's account age, how long they've been a member and their recent messages, then flags, deletes or times out rule breakers. Every action it takes is reported to a log channel.

Shugo is a single Go binary shipped as a small distroless Docker image. It keeps an outbound gateway connection to Discord and calls the Jev API over HTTPS. It has no web server, no public port and no database: recent messages are kept in memory for a few minutes. Hosting it means running one always-on container with two secrets, a Discord bot token and a TypeSafe API key. Run exactly one replica, because each replica keeps its own history and would moderate every message again. Start with `DRY_RUN=true` and a log channel, tune the thresholds on real traffic, then turn enforcement on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | `ghcr.io/glazk0/shugo` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Bot token from the Discord Developer Portal (Bot → Reset Token). Enable the Message Content intent on the same page. |
| `TYPESAFE_API_KEY` | (secret) | API key for Jev from TypeSafe. If you use OpenRouter, put your OpenRouter key here instead. |

**Category:** Bots

[View on Railway →](https://railway.com/deploy/shugo)
