# Deploy Discord-Music on Railway

Deploy and Host Discord-Music with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discord-music)

## About

**Discord-Music** is a Discord music bot application that streams audio into voice channels. It connects to Discord’s API, processes user commands, and plays music from supported sources while handling queues, playback controls, and voice connections reliably.

Hosting Discord-Music involves running a persistent service that maintains a WebSocket connection to Discord, listens for events, and manages audio playback continuously. The service must stay online 24/7 to respond to commands and remain connected to voice channels. Deployment typically includes configuring environment variables such as the bot token, permissions, and audio backend settings, then ensuring sufficient CPU, memory, and network stability for smooth streaming. Using a platform like Railway simplifies this by abstracting server management, restarts, scaling, and environment configuration, allowing you to focus on bot logic rather than infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord-Music | [muhammad-zainal-muttaqin/Discord-Music](https://github.com/muhammad-zainal-muttaqin/Discord-Music) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISCORD_TOKEN` | (secret) | Fill with you Discord Token from Discord Developer Portal. |
| `LAVALINK_HOST` | - | Host Lavalink first, then search for url internal/external. |
| `LAVALINK_SECURE` | true | - |
| `LAVALINK_PASSWORD` | (secret) | Fill with password that you used for .env |

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/discord-music)
